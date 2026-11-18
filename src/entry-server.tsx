import { StaticRouter } from 'react-router-dom';
import { prerender } from 'react-dom/static';
import App from './App';

/**
 * Build-time renderer used by scripts/ssg.mjs. It renders a route to an HTML
 * string with no browser involved, so it works on any build host (including
 * Hostinger, where launching headless Chromium for prerendering kept failing).
 *
 * `prerender` waits for lazy components and Suspense boundaries to resolve, so
 * the output contains the full page rather than loading fallbacks.
 */
export async function render(url: string) {
  const helmetContext: { helmet?: Record<string, { toString(): string }> } = {};

  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <App helmetContext={helmetContext} />
    </StaticRouter>,
    {
      onError(error) {
        // A failing client-only widget (e.g. the WebGL section) must not break the page.
        console.warn(`   [ssr warn] ${url}: ${(error as Error)?.message ?? error}`);
      },
    },
  );

  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  html += decoder.decode();

  return { html, helmet: helmetContext.helmet };
}
