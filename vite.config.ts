import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import prerender from '@prerenderer/rollup-plugin'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'
import { blogPosts } from "./src/data/blog"

const blogRoutes = blogPosts.map(post => `/blog/${post.slug}`);
const staticRoutes = ['/', '/about', '/contact', '/services', '/case-studies', '/blog'];
const allRoutes = [...staticRoutes, ...blogRoutes];

let executablePath: string | undefined;
let args = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'];

if (process.env.VERCEL) {
  // @ts-ignore
  const chromium = (await import('@sparticuz/chromium')).default;
  executablePath = await chromium.executablePath();
  args = chromium.args;
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    prerender({
      routes: allRoutes,
      renderer: new PuppeteerRenderer({
        renderAfterTime: 2000,
        launchOptions: {
          headless: true,
          executablePath,
          args
        }
      }),
      server: {
        port: 3000,
        host: 'localhost',
      },
    })
  ],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
