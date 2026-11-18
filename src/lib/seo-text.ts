/**
 * Trim a meta description to a SERP-safe length without cutting mid-sentence
 * where possible. Google shows roughly 155-160 characters.
 */
export function clipDescription(text: string, max = 160): string {
  const s = text.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;

  // Keep whole sentences while they fit.
  const sentences = s.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  let out = '';
  for (const sentence of sentences) {
    if ((out + sentence).trim().length <= max - 2) out += sentence;
    else break;
  }
  out = out.trim();
  if (out.length >= 70) return out;

  // Otherwise cut on a word boundary.
  let cut = s.slice(0, max - 1);
  cut = cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:\-—]+$/, '');
  return `${cut}…`;
}
