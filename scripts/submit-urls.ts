import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the user has provided the service account JSON
const keyFilePath = path.join(__dirname, '..', 'service-account.json');
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

if (!fs.existsSync(keyFilePath)) {
  console.error('\n[ERROR] Service Account key not found.');
  console.error('Please create a "service-account.json" file in the root of your project.');
  console.error('You cannot use a simple API Key (AIzaSy...) for the Indexing API. You MUST use a Service Account JSON file.\n');
  process.exit(1);
}

if (!fs.existsSync(sitemapPath)) {
  console.error('\n[ERROR] sitemap.xml not found in public/ directory.\n');
  process.exit(1);
}

// Initialize the Google API client with the Service Account
const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

const indexing = google.indexing({
  version: 'v3',
  auth: auth,
});

async function extractUrlsFromSitemap() {
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);
  
  if (!result.urlset || !result.urlset.url) return [];
  return result.urlset.url.map((u: any) => u.loc[0]);
}

async function submitUrlForIndexing(url: string) {
  try {
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });
    console.log(`[SUCCESS] Submitted: ${url}`);
  } catch (error: any) {
    console.error(`[FAILED] Could not submit ${url}`);
    if (error.response && error.response.data && error.response.data.error) {
      console.error(`Reason: ${error.response.data.error.message}`);
    } else {
      console.error(error.message);
    }
  }
}

async function run() {
  console.log('--- Google Indexing API Submission ---');
  console.log('Extracting URLs from sitemap.xml...');
  
  const urls = await extractUrlsFromSitemap();
  console.log(`Found ${urls.length} URLs. Commencing submission...\n`);

  for (const url of urls) {
    // Avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
    await submitUrlForIndexing(url);
  }

  console.log('\n--- Finished Submission ---');
}

run();
