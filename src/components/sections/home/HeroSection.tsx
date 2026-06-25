import { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Shield, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, MeshDistortMaterial, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { heroStats } from '@/data/content';
import { useTheme } from '@/context/ThemeContext';

/* ─── 3D Scene ─────────────────────────────────────────── */
function ParticleField({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!);
  const geo = useRef<THREE.BufferGeometry>(null!);

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 22;
    if (geo.current) geo.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }, [count]);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geo} />
      <pointsMaterial size={0.07} color="#E91E8C" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function RotatingKnot({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.18;
      meshRef.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <TorusKnot ref={meshRef} args={[1.1, 0.32, 160, 18]} position={[3.2, 0, 0]}>
        <MeshDistortMaterial
          color="#E91E8C"
          emissive="#FF6EC7"
          emissiveIntensity={isDark ? 0.5 : 0.25}
          metalness={0.6}
          roughness={0.15}
          distort={0.28}
          speed={2.5}
          transparent
          opacity={isDark ? 0.9 : 0.75}
        />
      </TorusKnot>
    </Float>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.6} />
      <pointLight position={[-5, 5, 5]} intensity={isDark ? 1.5 : 1.0} color="#E91E8C" />
      <pointLight position={[5, -4, 3]} intensity={0.8} color="#FF6EC7" />
      <Sparkles count={60} scale={12} size={1.2} speed={0.3} color="#E91E8C" opacity={0.4} />
      <ParticleField count={150} />
      <RotatingKnot isDark={isDark} />
    </>
  );
}

/* ─── Animated stat counter ────────────────────────────── */
function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setDisplay(target); return; }
    const prefix = target.match(/^\D+/)?.[0] ?? '';
    const postfix = target.replace(/[\d.]/g, '').replace(prefix, '') + suffix;
    let start = 0;
    const step = num / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setDisplay(`${prefix}${target.replace(/^\D+/, '')}`); clearInterval(timer); return; }
      setDisplay(`${prefix}${num < 10 ? start.toFixed(1) : Math.floor(start)}${postfix}`);
    }, 30);
    return () => clearInterval(timer);
  }, [target, suffix]);

  return <>{display}</>;
}

/* ─── Hero Section ─────────────────────────────────────── */
export default function HeroSection() {
  const { isDark } = useTheme();
  const statIcons = [TrendingUp, Users, Zap];
  const [statsVisible, setStatsVisible] = useState(false);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(springY, [-300, 300], [6, -6]);
  const rotateY = useTransform(springX, [-600, 600], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  // Text stagger variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const word = {
    hidden: { opacity: 0, y: 40, rotateX: -25 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  const headline1 = 'We Build Digital'.split(' ');
  const headline2 = 'Empires That Scale'.split(' ');

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '88vh' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── 3D Canvas Background ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene isDark={isDark} />
          </Suspense>
        </Canvas>
      </div>

      {/* Flat page-color background behind canvas */}
      <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'var(--bg-primary)' }} />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: isDark
            ? 'radial-gradient(ellipse 85% 70% at 50% 50%, transparent 30%, rgba(7,7,11,0.92) 100%)'
            : 'radial-gradient(ellipse 85% 70% at 50% 50%, rgba(250,250,251,0.0) 20%, rgba(250,250,251,0.82) 80%, rgba(250,250,251,1) 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ zIndex: 2, background: `linear-gradient(to bottom, transparent, var(--bg-primary))` }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-14 text-center" style={{ zIndex: 3 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-7"
          style={{
            backgroundColor: 'var(--accent-subtle)',
            color: 'var(--accent-1)',
            border: '1px solid var(--accent-border)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Shield size={12} />
          30-Day Profit Guarantee — Or Your Money Back
        </motion.div>

        {/* Headline with per-word stagger + 3D perspective parallax */}
        <motion.div
          style={{ perspective: 1000, rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="mb-5"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.1] tracking-tight"
            style={{ color: 'var(--text-primary)' }}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <span className="inline-block" style={{ transformStyle: 'preserve-3d' }}>
              {headline1.map((w, i) => (
                <motion.span key={i} variants={word} className="inline-block mr-3">
                  {w}
                </motion.span>
              ))}
            </span>
            <br />
            <span className="inline-block gradient-text" style={{ transformStyle: 'preserve-3d' }}>
              {headline2.map((w, i) => (
                <motion.span key={i} variants={word} className="inline-block mr-3">
                  {w}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          className="text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          Elite full-stack engineering meets performance marketing. We architect your entire
          digital presence — from code to conversion — and guarantee measurable profit in 30 days.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
        >
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white font-semibold text-sm glow-button"
            style={{ background: 'var(--accent-gradient)', boxShadow: '0 4px 24px var(--accent-glow)' }}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 32px var(--accent-glow)' }}
            whileTap={{ scale: 0.96 }}
          >
            Claim Your Growth Blueprint
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.a>
          <motion.a
            href="/case-studies"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              border: '1px solid var(--accent-border)',
              color: 'var(--accent-1)',
              backgroundColor: 'var(--accent-subtle)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 4px 16px var(--accent-glow)' }}
            whileTap={{ scale: 0.96 }}
          >
            See Our Results
          </motion.a>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          onAnimationComplete={() => setStatsVisible(true)}
        >
          {heroStats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <motion.div
                key={stat.label}
                className="rounded-xl p-4 text-center"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.82)',
                  border: '1px solid var(--border-subtle)',
                  backdropFilter: 'blur(14px)',
                  boxShadow: '0 2px 20px var(--accent-glow)',
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 6px 32px var(--accent-glow)',
                  borderColor: 'var(--accent-border)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: 'var(--accent-subtle)' }}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                >
                  <Icon size={15} style={{ color: 'var(--accent-1)' }} />
                </motion.div>
                <p className="text-xl font-bold gradient-text">
                  {statsVisible ? <AnimatedCounter target={stat.value} /> : '0'}
                </p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ zIndex: 4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-medium" style={{ color: 'var(--text-muted)' }}>
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-4"
          style={{ backgroundColor: 'var(--accent-1)' }}
          animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
