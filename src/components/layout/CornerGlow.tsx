export default function CornerGlow() {

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Top Left */}
      <div
        className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, var(--glow-tl) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      {/* Top Right */}
      <div
        className="absolute -top-[250px] -right-[250px] w-[500px] h-[500px] rounded-full transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, var(--glow-tr) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      {/* Bottom Left */}
      <div
        className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] rounded-full transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, var(--glow-bl) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      {/* Bottom Right */}
      <div
        className="absolute -bottom-[300px] -right-[300px] w-[600px] h-[600px] rounded-full transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, var(--glow-br) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
}
