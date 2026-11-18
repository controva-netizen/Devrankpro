/**
 * Puppeteer is no longer used at build time: pages are prerendered by
 * scripts/ssg.mjs (react-dom/static), which needs no browser. It remains only for
 * the one-off PDF scripts in scripts/, which use a locally installed Chrome, so
 * skip downloading any browser during `npm install` (this is what kept failing on
 * Hostinger).
 */
module.exports = {
  chrome: { skipDownload: true },
  'chrome-headless-shell': { skipDownload: true },
};
