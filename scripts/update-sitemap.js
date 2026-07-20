import fs from 'fs';
import path from 'path';

const today = new Date().toISOString().split('T')[0];
const blogData = fs.readFileSync('src/data/blog.ts', 'utf-8');
const slugs = [...blogData.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);

let sitemap = fs.readFileSync('public/sitemap.xml', 'utf-8');

const newBlogXml = slugs.map(slug => `  <url>
    <loc>https://www.controvallc.com/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n\n');

// Replace everything between <!-- ── Blog Posts ───────────────────────────────────── --> and <!-- ── Programmatic Industry Pages ───────────────────── -->
sitemap = sitemap.replace(/(<!-- ── Blog Posts ───────────────────────────────────── -->)[\s\S]*?(<!-- ── Programmatic Industry Pages ───────────────────── -->)/, `$1\n\n${newBlogXml}\n\n  $2`);

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Updated sitemap.xml with ' + slugs.length + ' blog posts!');
