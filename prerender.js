import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract blog slugs
const blogDataRaw = fs.readFileSync(path.resolve(__dirname, './src/data/blog.ts'), 'utf-8');
const blogSlugs = [];
const blogSlugRegex = /slug:\s*'([^']+)'/g;
let match;
while ((match = blogSlugRegex.exec(blogDataRaw)) !== null) {
  blogSlugs.push(match[1]);
}

// Extract niche service slugs (only from the nicheServices array, not other data blocks)
const contentDataRaw = fs.readFileSync(path.resolve(__dirname, './src/data/content.ts'), 'utf-8');
const nicheBlockMatch = contentDataRaw.match(/export const nicheServices[\s\S]*?=\s*\[([\s\S]*?)\n\];/);
const nicheSlugs = [];
if (nicheBlockMatch) {
  const nicheSlugRegex = /slug:\s*'([^']+)'/g;
  let nicheMatch;
  while ((nicheMatch = nicheSlugRegex.exec(nicheBlockMatch[1])) !== null) {
    nicheSlugs.push(nicheMatch[1]);
  }
}

const routes = [
  '/',
  '/services',
  '/services/ai-receptionist',
  ...nicheSlugs.map(slug => `/services/${slug}`),
  '/about',
  '/case-studies',
  '/contact',
  '/blog',
  ...blogSlugs.map(slug => `/blog/${slug}`)
];

console.log(`Prerendering ${routes.length} routes (${nicheSlugs.length} niche service pages, ${blogSlugs.length} blog posts)...`);

// Snapshot the pristine SPA shell once, in memory, before any route is
// prerendered. Route "/" is first in the route list and its output lands
// at this same dist/index.html path — without this snapshot, every route
// crawled afterward would fall back to serving an already-hydrated (and
// increasingly stale) copy of the *homepage's* rendered HTML instead of
// the real bootstrap shell, silently inheriting the previous route's
// title/description/canonical tags alongside its own.
const pristineIndexHtml = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');

const app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));

// Fallback for SPA routing — always the untouched shell, never whatever
// dist/index.html currently holds on disk.
app.use((req, res) => {
  res.type('html').send(pristineIndexHtml);
});

// Port 0 = let the OS assign a free port. Avoids silently colliding with
// anything else already bound to a fixed port (e.g. Vite's own dev server,
// which defaults to 3000 in vite.config.ts — the same port this script used
// to hardcode).
const server = app.listen(0, async () => {
  const port = server.address().port;
  console.log(`Server started on port ${port} for prerendering`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  } catch (err) {
    console.warn(`Skipping prerender: no Chromium available (${err.message}).`);
    console.warn('The site will still deploy from the plain Vite build — run "npm run prerender" locally (where Chromium is installed) before uploading to get prerendered HTML.');
    server.close();
    return;
  }
  const page = await browser.newPage();

  const failedRoutes = [];

  for (const route of routes) {
    try {
      console.log(`Prerendering ${route}...`);
      await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for React to actually replace the loading shell. NOTE: the
      // pre-hydration loader markup (index.html) is itself "#root > div"
      // (the spinner wrapper), so that selector resolves immediately on
      // first paint whether or not the app ever mounts — it's not a valid
      // hydration signal. ".min-h-screen" only exists on App.tsx's real
      // root wrapper, so it only appears once React has actually rendered.
      await page.waitForSelector('#root > div.min-h-screen', { timeout: 20000 });

      // Give react-helmet-async a moment to commit head tags after hydration
      await new Promise(resolve => setTimeout(resolve, 200));

      const html = await page.content();

      // Sanity checks: fail loudly instead of silently writing bad HTML.
      // (1) catches a wrong/unrelated app answering this port (happened
      // once in testing — Navbar/Footer/JSON-LD put "Controva" on every
      // route, so this alone can't catch a stuck loading shell).
      // (2) catches the loading shell never actually being replaced.
      if (!html.includes('Controva')) {
        throw new Error('rendered page does not contain "Controva" — local prerender server may not be serving the right app');
      }
      if (html.includes('initial-loader')) {
        throw new Error('captured HTML is still the pre-hydration loading shell — React never finished mounting');
      }

      const dir = path.join(__dirname, 'dist', route);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(path.join(dir, 'index.html'), html);
    } catch (err) {
      console.error(`  FAILED to prerender ${route}: ${err.message}`);
      failedRoutes.push(route);
    }
  }

  await browser.close();
  server.close();

  if (failedRoutes.length > 0) {
    console.error(`Prerendering finished with ${failedRoutes.length} failure(s): ${failedRoutes.join(', ')}`);
    process.exitCode = 1;
  } else {
    console.log('Prerendering complete!');
  }
});
