import fs from 'fs';

// Adds any blog post missing from public/sitemap.xml. Existing entries (blog
// posts, service pages, anything else) are left untouched, so this is safe to
// re-run and never drops URLs that other sections of the file depend on.
const today = new Date().toISOString().split('T')[0];
const blogData = fs.readFileSync('src/data/blog.ts', 'utf-8');
const slugs = [...blogData.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

let sitemap = fs.readFileSync('public/sitemap.xml', 'utf-8');
const eol = sitemap.includes('\r\n') ? '\r\n' : '\n';
sitemap = sitemap.split('\r\n').join('\n');

// Each post's own publish date (e.g. "Oct 14, 2026") becomes its <lastmod>, so the
// sitemap tells crawlers the truth instead of stamping every URL with "today".
const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
const dateBySlug = {};
for (const m of blogData.matchAll(/date:\s*'([A-Za-z]{3}) (\d{1,2}), (\d{4})',[\s\S]*?slug:\s*'([^']+)'/g)) {
  dateBySlug[m[4]] = `${m[3]}-${String(MONTHS[m[1]]).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
}

const missing = slugs.filter((slug) => !sitemap.includes(`<loc>https://www.controvallc.com/blog/${slug}</loc>`));

if (missing.length === 0) {
  console.log('sitemap.xml already lists all ' + slugs.length + ' blog posts.');
} else {
  const xml = missing
    .map(
      (slug) => `  <url>
    <loc>https://www.controvallc.com/blog/${slug}</loc>
    <lastmod>${dateBySlug[slug] || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`,
    )
    .join('\n');

  // Insert after the last existing blog URL block; fall back to before </urlset>.
  const lastBlog = sitemap.lastIndexOf('/blog/');
  const blockEnd = lastBlog === -1 ? -1 : sitemap.indexOf('</url>', lastBlog);
  if (blockEnd !== -1) {
    const at = blockEnd + '</url>'.length;
    sitemap = sitemap.slice(0, at) + '\n\n' + xml.trimEnd() + sitemap.slice(at);
  } else {
    sitemap = sitemap.replace('</urlset>', xml + '\n</urlset>');
  }
  console.log('Added ' + missing.length + ' blog posts to sitemap.xml: ' + missing.join(', '));
}

fs.writeFileSync('public/sitemap.xml', sitemap.split('\n').join(eol));
