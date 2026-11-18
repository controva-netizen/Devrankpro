import fs from 'fs';

// Keeps public/sitemap.xml in sync with src/data/blog.ts:
//   - adds any blog post that is missing from the sitemap
//   - refreshes <lastmod> on existing blog URLs to the post's real date
//     (its "updated" date when it has been substantively revised, otherwise
//     its publish date)
// Other sections of the sitemap (core pages, service pages, anything else) are
// left untouched, so this is safe to re-run and never drops URLs.
const today = new Date().toISOString().split('T')[0];
const blogData = fs.readFileSync('src/data/blog.ts', 'utf-8');
const slugs = [...blogData.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

let sitemap = fs.readFileSync('public/sitemap.xml', 'utf-8');
const eol = sitemap.includes('\r\n') ? '\r\n' : '\n';
sitemap = sitemap.split('\r\n').join('\n');

const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
const toIso = (mon, day, year) => `${year}-${String(MONTHS[mon]).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

// date: 'Nov 08, 2026', [updated: 'Nov 18, 2026',] ... slug: '...'
const dateBySlug = {};
const dateRe = /date:\s*'([A-Za-z]{3}) (\d{1,2}), (\d{4})',(?:\s*updated:\s*'([A-Za-z]{3}) (\d{1,2}), (\d{4})',)?[\s\S]*?slug:\s*'([^']+)'/g;
for (const m of blogData.matchAll(dateRe)) {
  dateBySlug[m[7]] = m[4] ? toIso(m[4], m[5], m[6]) : toIso(m[1], m[2], m[3]);
}

// 1) Refresh lastmod on blog URLs that are already listed.
let refreshed = 0;
sitemap = sitemap.replace(
  /(<loc>https:\/\/www\.controvallc\.com\/blog\/([^<]+)<\/loc>\s*<lastmod>)([^<]*)(<\/lastmod>)/g,
  (all, head, slug, old, tail) => {
    const next = dateBySlug[slug];
    if (!next || next === old) return all;
    refreshed++;
    return head + next + tail;
  },
);

// 2) Add posts that are missing.
const missing = slugs.filter((slug) => !sitemap.includes(`<loc>https://www.controvallc.com/blog/${slug}</loc>`));

if (missing.length > 0) {
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
}

console.log(
  `sitemap.xml: ${slugs.length} blog posts in blog.ts | lastmod refreshed on ${refreshed} | added ${missing.length}` +
    (missing.length ? ': ' + missing.join(', ') : ''),
);

fs.writeFileSync('public/sitemap.xml', sitemap.split('\n').join(eol));
