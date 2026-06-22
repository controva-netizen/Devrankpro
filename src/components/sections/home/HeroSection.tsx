import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';
import { heroStats } from '@/data/content';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      },
      { rootMargin: '200px' }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const statIcons = [TrendingUp, Users, Zap];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay - theme aware */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `
            linear-gradient(180deg, rgba(7,7,11,0.55) 0%, rgba(7,7,11,0.80) 50%, rgba(7,7,11,1) 100%)
          `,
        }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, var(--accent-subtle) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
          style={{
            backgroundColor: 'rgba(79,107,255,0.12)',
            color: '#8BA4FF',
            border: '1px solid rgba(79,107,255,0.25)',
          }}
        >
          <Shield size={13} />
          30-Day Profit Guarantee — Or Your Money Back
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-6"
          style={{ color: '#FFFFFF' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          We Build Digital
          <br />
          <span className="gradient-text">Empires That Scale</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: '#A8A8B8' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Elite full-stack engineering meets performance marketing. We architect your entire
          digital presence — from code to conversion — and guarantee measurable profit in 30 days.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-sm glow-button"
            style={{ background: 'var(--accent-gradient)' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Claim Your Growth Blueprint
            <ArrowRight size={15} />
          </motion.a>
          <motion.a
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#FFFFFF',
              backgroundColor: 'rgba(255,255,255,0.04)',
            }}
            whileHover={{ scale: 1.03, borderColor: 'var(--accent-1)', backgroundColor: 'var(--accent-subtle)' }}
          >
            See Our Results
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {heroStats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <div
                key={stat.label}
                className="rounded-xl p-5 text-center"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: 'var(--accent-subtle)' }}
                >
                  <Icon size={16} style={{ color: 'var(--accent-1)' }} />
                </div>
                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs mt-1 font-medium" style={{ color: '#7A7A8A' }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: '#555566' }}>
          Scroll
        </span>
        <div className="w-[1px] h-5 animate-pulse-line" style={{ backgroundColor: 'var(--accent-1)' }} />
      </motion.div>
    </section>
  );
}
