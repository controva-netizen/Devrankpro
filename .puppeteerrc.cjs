/**
 * Puppeteer is only used by prerender.js at build time.
 *
 * On Hostinger the full-Chrome download fails during `npm install` (stale
 * cache folder with a missing executable), which aborts the whole install and
 * the deploy. The much smaller chrome-headless-shell downloads fine and is all
 * prerender.js needs, so skip only full Chrome.
 */
module.exports = {
  chrome: { skipDownload: true },
  'chrome-headless-shell': { skipDownload: false },
};
