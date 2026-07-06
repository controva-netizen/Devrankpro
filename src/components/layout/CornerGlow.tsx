/**
 * CornerGlow — vintage-style ambient corner gradients.
 *
 * All colours are driven by CSS custom properties (--glow-tl, etc.)
 * which are set dynamically by ThemeContext whenever the user changes
 * the palette. The component itself never needs to re-render for colour
 * changes — the browser handles it automatically via CSS vars.
 *
 * Intentionally very low opacity so it reads as a warm/cool vignette
 * rather than a neon spotlight.
 */
export default function CornerGlow() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* ── Top-left: primary accent, lightest wash ─────── */}
      <div
        className="absolute transition-all duration-1000"
        style={{
          top: '-20%',
          left: '-15%',
          width: '55vw',
          height: '55vw',
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, var(--glow-tl) 0%, transparent 68%)',
          filter: 'blur(48px)',
        }}
      />

      {/* ── Top-right: secondary accent, softer ─────────── */}
      <div
        className="absolute transition-all duration-1000"
        style={{
          top: '-15%',
          right: '-12%',
          width: '45vw',
          height: '45vw',
          maxWidth: 580,
          maxHeight: 580,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, var(--glow-tr) 0%, transparent 65%)',
          filter: 'blur(56px)',
        }}
      />

      {/* ── Bottom-left: primary accent, very faint ──────── */}
      <div
        className="absolute transition-all duration-1000"
        style={{
          bottom: '-18%',
          left: '-10%',
          width: '40vw',
          height: '40vw',
          maxWidth: 520,
          maxHeight: 520,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, var(--glow-bl) 0%, transparent 60%)',
          filter: 'blur(52px)',
        }}
      />

      {/* ── Bottom-right: secondary accent, most subtle ──── */}
      <div
        className="absolute transition-all duration-1000"
        style={{
          bottom: '-20%',
          right: '-15%',
          width: '50vw',
          height: '50vw',
          maxWidth: 640,
          maxHeight: 640,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, var(--glow-br) 0%, transparent 62%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
