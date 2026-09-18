import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '..', 'dist');

// Prerendering has silently failed in production before (Puppeteer unable to
// launch on the hosting provider), shipping an empty loading-spinner shell
// to every crawler with zero content, no <h1>, no meta description. This
// check turns that into a loud build failure instead of a silent one.
const MIN_BYTES = 20_000;
const routesToCheck = ['', 'services', 'about', 'blog', 'contact'];

let failed = false;

for (const route of routesToCheck) {
  const filePath = path.join(distPath, route, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error(`✗ ${filePath} does not exist`);
    failed = true;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  if (html.length < MIN_BYTES) {
    console.error(`✗ /${route} — index.html is only ${html.length} bytes (expected >= ${MIN_BYTES}); prerender likely failed`);
    failed = true;
    continue;
  }

  if (!/<h1[\s>]/i.test(html)) {
    console.error(`✗ /${route} — index.html has no <h1> tag; prerender likely failed`);
    failed = true;
    continue;
  }

  if (!/<meta\s+name="description"/i.test(html)) {
    console.error(`✗ /${route} — index.html has no meta description; prerender likely failed`);
    failed = true;
    continue;
  }

  console.log(`✓ /${route} — ${(html.length / 1024).toFixed(1)} KB, has <h1> and meta description`);
}

if (failed) {
  console.error('\n✗ Prerender verification FAILED — the build would have shipped blank pages to search engines and AI crawlers. Failing the build instead.');
  process.exit(1);
}

console.log('\n✓ Prerender verification passed.');
