import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

/**
 * Static site generation, with no browser.
 *
 * Renders every public route to real HTML (via the SSR bundle built from
 * src/entry-server.tsx) and writes it to dist/<route>/index.html, so crawlers
 * and AI fetchers that do not run JavaScript get the full page: content, <h1>,
 * title, description, canonical and JSON-LD.
 *
 * Replaces the old Puppeteer prerender, which could not launch Chromium on
 * Hostinger and silently shipped an empty shell for every URL.
 *
 * Build order (see package.json): vite build -> vite build --ssr -> this script.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distPath = path.join(root, 'dist');
const ssrBundle = path.join(root, 'dist-ssr', 'entry-server.js');

// ── Routes ────────────────────────────────────────────────────────────────
function extractSlugs(relPath, blockRegex) {
  let raw = fs.readFileSync(path.join(root, relPath), 'utf-8');
  if (blockRegex) {
    const block = raw.match(blockRegex);
    raw = block ? block[1] : '';
  }
  return [...raw.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
}

const blogSlugs = extractSlugs('src/data/blog.ts');
// Only the nicheServices array - content.ts has other `slug:` fields (case studies etc.)
const nicheSlugs = extractSlugs('src/data/content.ts', /export const nicheServices[\s\S]*?=\s*\[([\s\S]*?)\n\];/);

const routes = [
  ...new Set([
    '/',
    '/services',
    '/services/ai-receptionist',
    ...nicheSlugs.map((s) => `/services/${s}`),
    '/about',
    '/case-studies',
    '/contact',
    '/privacy',
    '/terms',
    '/blog',
    ...blogSlugs.map((s) => `/blog/${s}`),
  ]),
];

// ── HTML assembly ─────────────────────────────────────────────────────────
/** Replace the contents of <div id="root"> by matching nested <div>s. */
function replaceRoot(template, inner) {
  const open = template.indexOf('<div id="root"');
  if (open === -1) throw new Error('<div id="root"> not found in dist/index.html');
  const openEnd = template.indexOf('>', open) + 1;
  const tag = /<\/?div\b[^>]*>/g;
  tag.lastIndex = openEnd;
  let depth = 1;
  let m;
  while ((m = tag.exec(template))) {
    depth += m[0].startsWith('</') ? -1 : 1;
    if (depth === 0) {
      return template.slice(0, openEnd) + inner + template.slice(m.index);
    }
  }
  throw new Error('unbalanced <div id="root"> in dist/index.html');
}

function buildPage(template, rendered) {
  // React 19 hoists <title>, <meta> and <link> to the very start of the rendered
  // output. Split that head block from the page body.
  const headBlock = rendered.match(/^(?:\s*(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>))+/);
  if (!headBlock || !/<title>/.test(headBlock[0])) throw new Error('page rendered without a <title> (SEO component missing?)');
  const hoisted = headBlock[0];
  const body = rendered.slice(hoisted.length);

  // Tag the static copies so the client can drop them once React owns the head
  // (see src/App.tsx); otherwise the first page's <title> would stay first.
  const tagged = hoisted
    .replace(/<title>/g, '<title data-ssg>')
    .replace(/<meta /g, '<meta data-ssg ')
    .replace(/<link /g, '<link data-ssg ');

  // The page owns title/meta/canonical. Drop the shell's generic copies of the
  // same tags so the served HTML has exactly one of each; keep everything else
  // (analytics, fonts, favicon, site-wide JSON-LD, bundles).
  const keys = new Set([...hoisted.matchAll(/<meta\b[^>]*?(?:name|property)="([^"]+)"/g)].map((m) => m[1]));
  let page = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta\s[^>]*?(?:name|property)="([^"]+)"[^>]*>\s*/g, (all, k) => (keys.has(k) ? '' : all))
    .replace(/<link\s[^>]*rel="canonical"[^>]*>\s*/g, '');

  page = page.replace('</head>', tagged + '</head>');
  return replaceRoot(page, body);
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(path.join(distPath, 'index.html'))) {
    console.error('x dist/index.html not found - run `vite build` first.');
    process.exit(1);
  }
  if (!fs.existsSync(ssrBundle)) {
    console.error(`x ${ssrBundle} not found - run \`vite build --ssr src/entry-server.tsx --outDir dist-ssr\` first.`);
    process.exit(1);
  }

  // Read the pristine shell once; route "/" overwrites dist/index.html below.
  const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
  const { render } = await import(pathToFileURL(ssrBundle).href);

  console.log(`\nStatic generation: ${routes.length} routes\n`);
  let ok = 0;
  const failed = [];

  for (const route of routes) {
    try {
      const { html } = await render(route);
      const page = buildPage(template, html);
      const dir = route === '/' ? distPath : path.join(distPath, route.slice(1));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), page, 'utf-8');
      ok++;
      if (ok <= 12 || route.endsWith('session-border-controller-architecture')) {
        console.log(`   ok ${route}  (${(page.length / 1024).toFixed(1)} KB)`);
      }
    } catch (err) {
      failed.push(route);
      console.error(`   FAILED ${route}: ${err.stack || err.message}`);
    }
  }

  console.log(`\nStatic generation finished: ${ok}/${routes.length} routes written.`);
  if (failed.length) {
    console.error(`   ${failed.length} route(s) failed; they will fall back to the client-rendered shell:`);
    failed.slice(0, 20).forEach((r) => console.error(`     ${r}`));
  }
  // Non-fatal on purpose: a partial failure must not block a deploy. The
  // verify step (npm run verify:prerender) is the loud gate.
  process.exit(0);
}

main().catch((err) => {
  console.error(`\nStatic generation FAILED: ${err.stack || err.message}`);
  console.error('   Shipping the client-rendered build (no prerendered HTML this deploy).');
  process.exit(0);
});
