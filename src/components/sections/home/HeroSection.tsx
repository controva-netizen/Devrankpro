import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { heroStats } from '@/data/content';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
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

/* ─── Rotating Word Animation ────────────────────────────── */
const ROTATING_WORDS = ['Scale.', 'Perform.', 'Convert.', 'Dominate.'];

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="inline-grid [grid-template-areas:'word']">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="[grid-area:word] inline-block whitespace-nowrap"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ─── Network Nodes Background ────────────────────────────── */
function NetworkNodesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const dotColor = isDark ? 'rgba(130, 100, 255, 0.8)' : 'rgba(80, 50, 200, 0.8)';
      const lineColor = isDark ? 'rgba(100, 120, 255, ' : 'rgba(50, 70, 200, ';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = dotColor;
        // Draw squares as requested
        ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 160) {
            const opacity = 1 - distance / 160;
            ctx.beginPath();
            ctx.strokeStyle = `${lineColor}${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ─── Hero Section ─────────────────────────────────────── */
export default function HeroSection() {
  const { isDark } = useTheme();
  const statIcons = [TrendingUp, Users, Zap];
  const [statsVisible, setStatsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt effect for the content box
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const rotateX = useTransform(springY, [-500, 500], [4, -4]);
  const rotateY = useTransform(springX, [-800, 800], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
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
  const headline2 = 'Empires That'.split(' ');

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

      {/* ── Network Nodes Layer ── */}
      <div className="absolute inset-0 -z-15 opacity-80">
        <NetworkNodesBackground />
      </div>

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
      {/* ── Content ── */}
      <motion.div
        style={{ perspective: 1200, rotateX, rotateY }}
        className="relative max-w-5xl mx-auto px-6 pt-28 pb-14 text-center z-10 w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 mb-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium uppercase tracking-widest text-primary-text/60"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-1 animate-pulse shadow-[0_0_10px_var(--accent-1)]" />
            Production-Grade Voice AI & SIP Infrastructure
          </div>
        </motion.div>

        {/* Headline with Blur Reveal & Rotating Word */}
        <h1
          className="text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          <div>
            {headline1.map((w, i) => <BlurWord key={i} word={w} index={i} />)}
          </div>
          <div className="gradient-text flex justify-center items-center gap-[0.3em] flex-wrap">
            {headline2.map((w, i) => <BlurWord key={i} word={w} index={i + headline1.length} />)}
            <RotatingWord words={ROTATING_WORDS} />
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
          className="flex flex-wrap items-center justify-center gap-4 mb-16 relative z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm btn-fill-bottom glow-button transition-transform active:scale-95"
            style={{
              backgroundColor: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent-1)',
              boxShadow: '0 4px 20px var(--accent-glow)'
            }}
          >
            Claim Your Growth Blueprint
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm btn-fill-bottom transition-all duration-200"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            See Our Results
          </Link>
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
