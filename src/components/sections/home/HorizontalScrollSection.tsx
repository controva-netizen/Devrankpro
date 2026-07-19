import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { horizontalCapabilities } from '@/data/content';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';

export default function HorizontalScrollSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const { isDark } = useTheme();

  /* ── Track active card from scroll position ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const firstChild = el.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 24 : el.offsetWidth * 0.75;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, horizontalCapabilities.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Mouse drag-to-scroll ── */
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.pageX,
      scrollLeft: scrollRef.current?.scrollLeft ?? 0,
    };
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.pageX - dragStart.current.x;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  /* ── Navigation ── */
  const scrollToCard = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement;
    const cardWidth = firstChild ? firstChild.offsetWidth + 24 : el.offsetWidth * 0.75;
    el.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
  }, []);

  const prev = () => scrollToCard(Math.max(0, activeIndex - 1));
  const next = () => scrollToCard(Math.min(horizontalCapabilities.length - 1, activeIndex + 1));

  return (
    <section className="relative py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header + arrow controls */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.p
            className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: 'var(--accent-1)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            PLATFORM ECOSYSTEM
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.1]"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Every Channel.{' '}
            <span className="gradient-text">One Strategy.</span>
          </motion.h2>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: '1px solid',
              borderColor: activeIndex === 0 ? 'var(--border-subtle)' : 'var(--accent-border)',
              backgroundColor: activeIndex === 0 ? 'transparent' : 'var(--accent-subtle)',
              color: activeIndex === 0 ? 'var(--text-muted)' : 'var(--accent-1)',
              opacity: activeIndex === 0 ? 0.4 : 1,
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={activeIndex === horizontalCapabilities.length - 1}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: '1px solid',
              borderColor: activeIndex === horizontalCapabilities.length - 1 ? 'var(--border-subtle)' : 'var(--accent-border)',
              backgroundColor: activeIndex === horizontalCapabilities.length - 1 ? 'transparent' : 'var(--accent-subtle)',
              color: activeIndex === horizontalCapabilities.length - 1 ? 'var(--text-muted)' : 'var(--accent-1)',
              opacity: activeIndex === horizontalCapabilities.length - 1 ? 0.4 : 1,
            }}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Glass Cards Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar scroll-snap-x pb-8 pt-4"
        style={{
          paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
          paddingRight: '1.5rem',
          cursor: 'grab',
          overscrollBehaviorX: 'contain',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {horizontalCapabilities.map((cap, i) => {
          const isActive = activeIndex === i;

          return (
            <motion.article
              key={cap.number}
              onClick={() => scrollToCard(i)}
              className="scroll-snap-start flex-shrink-0 rounded-[28px] overflow-hidden relative group transition-all duration-500"
              style={{
                width: 'min(75vw, 850px)',
                minHeight: '420px',
                backgroundColor: isActive 
                  ? (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)')
                  : (isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.02)'),
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-border)' : 'var(--border-subtle)',
                backdropFilter: 'blur(20px)',
                boxShadow: isActive ? '0 12px 40px var(--accent-glow)' : 'none',
                transform: isActive ? 'scale(1)' : 'scale(0.98)',
                opacity: isActive ? 1 : 0.6,
              }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              {/* Massive Faded Background Number */}
              <div 
                className="absolute -right-8 -bottom-16 text-[16rem] md:text-[22rem] font-extrabold font-display leading-none select-none pointer-events-none transition-all duration-700"
                style={{ 
                  color: 'var(--text-primary)',
                  opacity: isActive ? 0.04 : 0.02,
                  transform: isActive ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {cap.number}
              </div>

              {/* Subtle Inner Gradient Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 0% 0%, var(--accent-subtle), transparent 70%)' }}
              />

              <div className="relative z-10 p-8 md:p-14 flex flex-col h-full">
                {/* Number Badge */}
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold font-display text-lg mb-8 transition-colors duration-500"
                  style={{ 
                    backgroundColor: isActive ? 'var(--accent-1)' : 'var(--bg-tertiary)',
                    color: isActive ? '#FFFFFF' : 'var(--text-muted)'
                  }}
                >
                  {cap.number}
                </div>

                <h3
                  className="text-2xl md:text-4xl font-bold mb-4 font-display tracking-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {cap.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                  {cap.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-10 mt-auto">
                  {cap.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'var(--accent-subtle)' }}
                      >
                        <Check size={14} strokeWidth={3} style={{ color: 'var(--accent-1)' }} />
                      </div>
                      <span className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-bold group self-start transition-colors"
                  style={{ color: 'var(--accent-1)' }}
                >
                  Explore Capabilities
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          );
        })}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {horizontalCapabilities.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to card ${i + 1}`}
            className="transition-all duration-500 rounded-full"
            style={{
              width: activeIndex === i ? 32 : 8,
              height: 8,
              backgroundColor: activeIndex === i ? 'var(--accent-1)' : 'var(--border-subtle)',
              opacity: activeIndex === i ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
}
