import fs from 'fs';

// Regenerates public/rss.xml from src/data/blog.ts so the feed never drifts
// out of sync with the actual post list again (it previously went stale at
// 9 of 31 posts). Run with `npm run generate:rss` after adding/editing posts.

const blogSource = fs.readFileSync('src/data/blog.ts', 'utf-8');

// Fields use single OR double quotes depending on whether the value itself
// contains an apostrophe (e.g. "Twilio's"), so each field is extracted
// independently rather than via one big single-quote-only regex.
function extractField(block, name) {
  const re = new RegExp(`${name}:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`);
  const m = block.match(re);
  if (!m) return '';
  return (m[1] ?? m[2] ?? '').replace(/\\(.)/g, '$1');
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const postBlocks = blogSource.split(/\n\s*\{\s*\n\s*id:\s*/).slice(1);

const posts = postBlocks.map((block) => ({
  title: extractField(block, 'title'),
  excerpt: extractField(block, 'excerpt'),
  category: extractField(block, 'category'),
  author: extractField(block, 'author'),
  date: extractField(block, 'date'),
  slug: extractField(block, 'slug'),
})).filter((post) => post.slug);

if (posts.length === 0) {
  console.error('✗ No posts found in src/data/blog.ts — regex may be out of sync with the file structure.');
  process.exit(1);
}

// Newest first, by parsed date (falls back to source order if unparseable).
posts.sort((a, b) => (new Date(`${b.date} UTC`).getTime() || 0) - (new Date(`${a.date} UTC`).getTime() || 0));

const items = posts
  .map((post) => {
    // Parse as UTC explicitly — plain `new Date(post.date)` parses in the
    // local timezone, which shifts the date backward by a day once
    // converted via toUTCString() in any UTC+ timezone.
    const pubDate = new Date(`${post.date} UTC`);
    const pubDateStr = isNaN(pubDate.getTime())
      ? new Date().toUTCString()
      : pubDate.toUTCString();
    const link = `https://www.controvallc.com/blog/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDateStr}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`;
  })
  .join('\n\n');

const lastBuildDate = new Date().toUTCString();

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Controva LLC — Insights &amp; Engineering</title>
    <link>https://www.controvallc.com/blog</link>
    <description>Engineering-driven insights on VoIP Architecture, FreeSWITCH, Kamailio, and AI Voice Automation.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="https://www.controvallc.com/rss.xml" rel="self" type="application/rss+xml" />

${items}
  </channel>
</rss>
`;

fs.writeFileSync('public/rss.xml', rss);
console.log(`Regenerated public/rss.xml with ${posts.length} posts.`);
