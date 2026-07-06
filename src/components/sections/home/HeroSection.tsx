import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { heroStats } from '@/data/content';
import { useTheme } from '@/context/ThemeContext';
import SEO from '@/components/shared/SEO';

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

/* ─── Blur Reveal Word Animation ───────────────────────── */
function BlurWord({ word, index }: { word: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="inline-block mr-[0.3em]"
    >
      {word}
    </motion.span>
  );
}

/* ─── Hero Section ─────────────────────────────────────── */
export default function HeroSection() {
  const { isDark } = useTheme();
  const statIcons = [TrendingUp, Users, Zap];
  const [statsVisible, setStatsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Spotlight mouse effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // 3D Tilt effect for the content box
  const rotateX = useTransform(springY, [-500, 500], [4, -4]);
  const rotateY = useTransform(springX, [-800, 800], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Spotlight position (relative to container)
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    // Reset to center smoothly
    if (containerRef.current) {
      mouseX.set(containerRef.current.offsetWidth / 2);
      mouseY.set(containerRef.current.offsetHeight / 2);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      mouseX.set(containerRef.current.offsetWidth / 2);
      mouseY.set(containerRef.current.offsetHeight / 2);
    }
  }, [mouseX, mouseY]);

  const headline1 = 'We Build Digital'.split(' ');
  const headline2 = 'Empires That Scale.'.split(' ');

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '90vh' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <SEO />
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 -z-20" style={{ backgroundColor: 'var(--bg-primary)' }} />

      {/* ── Subtle Grid ── */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* ── Interactive Spotlight ── */}
      <motion.div
        className="absolute -z-10 pointer-events-none rounded-full"
        style={{
          width: 800,
          height: 800,
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          background: 'var(--accent-glow)',
          filter: 'blur(100px)',
          opacity: 0.8,
        }}
      />

      {/* ── Content ── */}
      <motion.div 
        style={{ perspective: 1200, rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative max-w-5xl mx-auto px-6 pt-28 pb-14 text-center z-10 w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-8"
          style={{
            backgroundColor: 'var(--accent-subtle)',
            color: 'var(--accent-1)',
            border: '1px solid var(--accent-border)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Shield size={12} strokeWidth={2.5} />
          30-Day Profit Guarantee
        </motion.div>

        {/* Headline with Blur Reveal */}
        <h1
          className="text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          <div>
            {headline1.map((w, i) => <BlurWord key={i} word={w} index={i} />)}
          </div>
          <div className="gradient-text">
            {headline2.map((w, i) => <BlurWord key={i} word={w} index={i + headline1.length} />)}
          </div>
        </h1>

        {/* Subheadline */}
        <motion.p
          className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Elite full-stack engineering meets performance marketing. We architect your entire
          digital presence — from code to conversion — and guarantee measurable profit in 30 days.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm btn-fill-bottom glow-button transition-transform active:scale-95 hover:scale-[1.02]"
            style={{ 
              backgroundColor: 'var(--accent-subtle)', 
              border: '1px solid var(--accent-border)',
              color: 'var(--accent-1)',
              boxShadow: '0 4px 20px var(--accent-glow)' 
            }}
          >
            Claim Your Growth Blueprint
            <ArrowRight size={16} />
          </a>
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm btn-fill-bottom transition-all duration-200"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            See Our Results
          </a>
        </motion.div>

        {/* Premium Glass Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setStatsVisible(true)}
        >
          {heroStats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <motion.div
                key={stat.label}
                className="relative rounded-2xl p-5 text-left overflow-hidden group"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
                  border: '1px solid var(--border-subtle)',
                  backdropFilter: 'blur(20px)',
                }}
                whileHover={{ y: -4, borderColor: 'var(--accent-border)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {/* Subtle internal gradient on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, var(--accent-subtle) 0%, transparent 100%)' }}
                />
                
                <div className="relative z-10 flex flex-col gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--accent-1)' }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                      {statsVisible ? <AnimatedCounter target={stat.value} /> : '0'}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ zIndex: 20, background: `linear-gradient(to bottom, transparent, var(--bg-primary))` }}
      />
    </section>
  );
}
