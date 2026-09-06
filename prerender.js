import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Prerender the SPA into fully-populated static HTML so that crawlers and
 * AI fetchers (which do NOT execute JavaScript) receive real page content.
 *
 * This step is intentionally NON-FATAL: if the headless browser fails to
 * launch in a CI/build environment, we log a warning and exit 0 so the
 * deploy still ships the client-rendered build (no regression).
 */

// ── Extract dynamic route slugs ───────────────────────────────────────────
function extractSlugs(relPath) {
  try {
    const raw = fs.readFileSync(path.resolve(__dirname, relPath), 'utf-8');
    const slugs = [];
    const re = /slug:\s*'([^']+)'/g;
    let m;
    while ((m = re.exec(raw)) !== null) slugs.push(m[1]);
    return slugs;
  } catch (err) {
    console.warn(`  [warn] could not read ${relPath}: ${err.message}`);
    return [];
  }
}

const blogSlugs = extractSlugs('./src/data/blog.ts');
const nicheSlugs = extractSlugs('./src/data/content.ts');

const routes = [
  '/',
  '/services',
  '/services/ai-receptionist',
  ...nicheSlugs.map((slug) => `/services/${slug}`),
  '/about',
  '/case-studies',
  '/contact',
  '/blog',
  ...blogSlugs.map((slug) => `/blog/${slug}`),
];

const uniqueRoutes = Array.from(new Set(routes));

// ── Local static server used only during prerender ────────────────────────
const app = express();
const distPath = path.resolve(__dirname, 'dist');

if (!fs.existsSync(path.join(distPath, 'index.html'))) {
  console.error('✗ dist/index.html not found — run `vite build` before prerendering.');
  process.exit(1); // this IS fatal: nothing to prerender
}

app.use(express.static(distPath));
app.use((_req, res) => res.sendFile(path.resolve(distPath, 'index.html')));

// ── Locate a Chrome/Chromium binary ──────────────────────────────────────
function getExecutablePath() {
  // Windows dev machines: prefer an installed browser.
  const localBrowsers = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  for (const p of localBrowsers) {
    if (fs.existsSync(p)) return p;
  }
  // CI / Linux (Vercel): use the Chromium puppeteer downloaded on install.
  try {
    const bundled = puppeteer.executablePath();
    if (bundled && fs.existsSync(bundled)) return bundled;
  } catch {
    /* fall through to puppeteer's own resolution */
  }
  return undefined;
}

const PORT = 3456;
const server = app.listen(PORT, async () => {
  console.log(`🚀 Prerender server on http://127.0.0.1:${PORT}`);

  let browser;
  try {
    const executablePath = getExecutablePath();
    console.log(`   Browser: ${executablePath || 'puppeteer default'}`);

    browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    // Block heavy media that doesn't affect crawlable text.
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const type = req.resourceType();
      if (type === 'media' || type === 'font') req.abort();
      else req.continue();
    });

    console.log(`\n⏳ Prerendering ${uniqueRoutes.length} routes...\n`);

    let ok = 0;
    for (const route of uniqueRoutes) {
      try {
        await page.goto(`http://127.0.0.1:${PORT}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 45000,
        });

        await page
          .waitForFunction(
            () =>
              !document.querySelector('.initial-loader') &&
              document.querySelector('#root > div'),
            { timeout: 12000 },
          )
          .catch(() => console.log(`   [notice] loader-wait timeout on ${route}`));

        // Let react-helmet-async flush <head> and Framer Motion settle.
        await new Promise((r) => setTimeout(r, 400));

        // Collapse duplicate head tags. react-helmet-async can leave stale
        // <title>/<meta>/<link rel=canonical> nodes behind during rapid
        // updates; keep only the last (most specific) of each so the served
        // HTML has exactly one canonical, one title, one description, etc.
        await page.evaluate(() => {
          const head = document.head;
          const keepLast = (nodes) =>
            nodes.slice(0, -1).forEach((n) => n.remove());
          const keepFirst = (nodes) =>
            nodes.slice(1).forEach((n) => n.remove());

          // react-helmet-async prepends <title> but appends <meta>/<link>.
          keepFirst([...head.querySelectorAll('title')]);
          keepLast([...head.querySelectorAll('link[rel="canonical"]')]);

          const seen = new Set();
          [...head.querySelectorAll('meta[name], meta[property]')]
            .reverse()
            .forEach((m) => {
              const key = m.getAttribute('name') || m.getAttribute('property');
              if (key === 'viewport' || key === 'charset') return;
              if (seen.has(key)) m.remove();
              else seen.add(key);
            });
        });

        const html = await page.content();
        const targetDir =
          route === '/' ? distPath : path.join(distPath, route.replace(/^\//, ''));
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');

        ok++;
        console.log(`   ✓ ${route}  (${(html.length / 1024).toFixed(1)} KB)`);
      } catch (err) {
        console.error(`   ✗ ${route}: ${err.message}`);
      }
    }

    await browser.close();
    server.close();
    console.log(`\n🎉 Prerendered ${ok}/${uniqueRoutes.length} routes.\n`);
    if (ok === 0) console.warn('   [warn] no routes prerendered — shipping client-rendered build.');
    process.exit(0);
  } catch (err) {
    console.warn(`\n⚠️  Prerender skipped — headless browser unavailable: ${err.message}`);
    console.warn('   Shipping client-rendered build (no prerendered HTML this deploy).\n');
    try {
      if (browser) await browser.close();
    } catch {
      /* ignore */
    }
    server.close();
    process.exit(0); // non-fatal: do not break the deploy
  }
});
