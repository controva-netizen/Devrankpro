import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '..', 'dist');
const SITE = 'https://www.controvallc.com';

// Prerendering has silently failed in production before (an empty loading shell
// served to every crawler: no <h1>, same <title> on every URL). This audits EVERY
// generated page and fails the build loudly if any of them regress.
const MIN_BYTES = 15_000;
const SKIP_DIRS = new Set(['assets', 'images', 'videos', 'api']);

function* pages(dir, rel = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || (rel === '' && SKIP_DIRS.has(entry.name))) continue;
    const next = path.join(dir, entry.name);
    const route = `${rel}/${entry.name}`;
    if (fs.existsSync(path.join(next, 'index.html'))) yield { route, file: path.join(next, 'index.html') };
    yield* pages(next, route);
  }
}

const all = [{ route: '/', file: path.join(distPath, 'index.html') }, ...pages(distPath)];
const count = (re, s) => (s.match(re) || []).length;
const titles = new Map();
const problems = [];
let checked = 0;

for (const { route, file } of all) {
  if (!fs.existsSync(file)) { problems.push(`${route}: index.html missing`); continue; }
  const html = fs.readFileSync(file, 'utf-8');
  checked++;
  const fail = (msg) => problems.push(`${route}: ${msg}`);

  if (html.length < MIN_BYTES) fail(`only ${html.length} bytes (expected >= ${MIN_BYTES})`);
  if (count(/<h1[\s>]/gi, html) !== 1) fail(`expected exactly one <h1>, found ${count(/<h1[\s>]/gi, html)}`);
  if (count(/<title[\s>]/gi, html) !== 1) fail(`expected exactly one <title>, found ${count(/<title[\s>]/gi, html)}`);
  if (count(/<meta\s[^>]*name="description"/gi, html) !== 1) fail('expected exactly one meta description');

  const canon = [...html.matchAll(/<link\s[^>]*rel="canonical"[^>]*>/gi)];
  if (canon.length !== 1) fail(`expected exactly one canonical, found ${canon.length}`);
  else {
    const href = canon[0][0].match(/href="([^"]+)"/)?.[1];
    const expected = route === '/' ? SITE : `${SITE}${route}`;
    if (href !== expected && href !== `${expected}/`) fail(`canonical is ${href}, expected ${expected}`);
  }

  if (/Loading (insights|article)\.\.\./i.test(html)) fail('contains a "Loading..." placeholder instead of content');
  if (route.startsWith('/blog/') && !/"@type":"BlogPosting"/.test(html)) fail('blog post has no BlogPosting JSON-LD');

  const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  const desc = html.match(/<meta\s[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1];
  if (title && decode(title).length > 60) fail(`<title> is ${decode(title).length} chars (max 60): ${decode(title)}`);
  if (desc !== undefined && (decode(desc).length > 160 || decode(desc).length < 50)) fail(`meta description is ${decode(desc).length} chars (want 50-160)`);
  if (title) {
    if (!titles.has(title)) titles.set(title, []);
    titles.get(title).push(route);
  }
}

for (const [title, routes] of titles) {
  if (routes.length > 1) problems.push(`duplicate <title> "${title}" on ${routes.length} pages: ${routes.slice(0, 4).join(', ')}`);
}

console.log(`Checked ${checked} prerendered pages.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  problems.slice(0, 40).forEach((p) => console.error(`  x ${p}`));
  console.error('\nPrerender verification FAILED - the build would ship broken pages to search engines and AI crawlers.');
  process.exit(1);
}
console.log('Prerender verification passed: unique title, one h1, one meta description, one correct canonical on every page.');
