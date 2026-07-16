import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract blog slugs
const blogDataRaw = fs.readFileSync(path.resolve(__dirname, './src/data/blog.ts'), 'utf-8');
const slugs = [];
const slugRegex = /slug:\s*'([^']+)'/g;
let match;
while ((match = slugRegex.exec(blogDataRaw)) !== null) {
  slugs.push(match[1]);
}

const routes = [
  '/',
  '/services',
  '/about',
  '/case-studies',
  '/contact',
  '/blog',
  ...slugs.map(slug => `/blog/${slug}`)
];

const app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));

// Fallback for SPA routing
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

const server = app.listen(3000, async () => {
  console.log('Server started on port 3000 for prerendering');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'networkidle2' });
    
    // Wait for the main content to be hydrated
    await page.waitForSelector('#root > div', { timeout: 10000 }).catch(() => console.log('Timeout waiting for root > div'));
    
    // Get the HTML
    const html = await page.content();
    
    const dir = path.join(__dirname, 'dist', route);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  
  await browser.close();
  server.close();
  console.log('Prerendering complete!');
});
