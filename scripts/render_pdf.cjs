const fs = require('fs');
const path = require('path');

const htmlPath = 'C:\\Users\\ANC\\.gemini\\antigravity-ide\\brain\\5b6e1fd5-7221-476b-aa3d-5a773762103e\\Client_Proposal_Squarespace_vs_Custom_Codebase.html';
const pdfPath = 'C:\\Users\\ANC\\.gemini\\antigravity-ide\\brain\\5b6e1fd5-7221-476b-aa3d-5a773762103e\\Client_Proposal_Squarespace_vs_Custom_Codebase.pdf';

async function generatePdf() {
  try {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
      printBackground: true
    });
    await browser.close();
    console.log('PDF successfully created at:', pdfPath);
  } catch (err) {
    console.log('Puppeteer PDF generation notice:', err.message);
  }
}

generatePdf();
