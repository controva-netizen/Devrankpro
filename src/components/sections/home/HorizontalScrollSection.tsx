import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { horizontalCapabilities } from '@/data/content';

export default function HorizontalScrollSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  /* ── Track active card from scroll position ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.offsetWidth * 0.75;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, horizontalCapabilities.length - 1));
    };
    // passive:true — never blocks page scroll
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Mouse drag-to-scroll (horizontal only) ── */
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.pageX,
      scrollLeft: scrollRef.current?.scrollLeft ?? 0,
    };
    // Change cursor
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    // Only prevent default on the drag, NOT on wheel
    const dx = e.pageX - dragStart.current.x;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  /* ── Dot / arrow navigation ── */
  const scrollToCard = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.75;
    el.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
  }, []);

  const prev = () => scrollToCard(Math.max(0, activeIndex - 1));
  const next = () => scrollToCard(Math.min(horizontalCapabilities.length - 1, activeIndex + 1));

  return (
    <section className="relative py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Header + arrow controls row */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-end justify-between gap-4">
        <div>
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--accent-1)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            PLATFORM ECOSYSTEM
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
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

        {/* Prev / Next arrows */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              border: '1px solid var(--border-active)',
              backgroundColor: activeIndex === 0 ? 'transparent' : 'var(--accent-subtle)',
              color: activeIndex === 0 ? 'var(--text-muted)' : 'var(--accent-1)',
              opacity: activeIndex === 0 ? 0.4 : 1,
            }}
            aria-label="Previous card"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            disabled={activeIndex === horizontalCapabilities.length - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              border: '1px solid var(--border-active)',
              backgroundColor:
                activeIndex === horizontalCapabilities.length - 1
                  ? 'transparent'
                  : 'var(--accent-subtle)',
              color:
                activeIndex === horizontalCapabilities.length - 1
                  ? 'var(--text-muted)'
                  : 'var(--accent-1)',
              opacity: activeIndex === horizontalCapabilities.length - 1 ? 0.4 : 1,
            }}
            aria-label="Next card"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container — NO wheel interception */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar scroll-snap-x pb-4"
        style={{
          paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
          paddingRight: '1.5rem',
          cursor: 'grab',
          // Critical: allow normal page scroll via touchpad/wheel
          overscrollBehaviorX: 'contain',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {horizontalCapabilities.map((cap, i) => (
          <motion.article
            key={cap.number}
            className="scroll-snap-start flex-shrink-0 rounded-2xl overflow-hidden flex flex-col md:flex-row"
            style={{
              width: 'min(75vw, 900px)',
              minHeight: '400px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            {/* Left: Gradient Sidebar */}
            <div
              className="w-full md:w-[38%] flex items-center justify-center relative overflow-hidden py-10 md:py-0"
              style={{ background: 'var(--accent-gradient)', minHeight: '130px' }}
            >
              <span className="text-[8rem] md:text-[9rem] font-extrabold text-white opacity-20 leading-none select-none">
                {cap.number}
              </span>
            </div>

            {/* Right: Content */}
            <div className="flex-1 p-7 md:p-9 flex flex-col justify-center">
              <h3
                className="text-xl md:text-2xl font-bold mb-3 tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {cap.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                {cap.description}
              </p>
              <ul className="space-y-2.5 mb-5">
                {cap.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--accent-subtle)' }}
                    >
                      <Check size={11} style={{ color: 'var(--accent-1)' }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold group self-start"
                style={{ color: 'var(--accent-1)' }}
              >
                Learn More
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.article>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {horizontalCapabilities.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to card ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: activeIndex === i ? 24 : 8,
              height: 8,
              backgroundColor:
                activeIndex === i ? 'var(--accent-1)' : 'var(--border-active)',
              borderRadius: 9999,
            }}
          />
        ))}
      </div>
    </section>
  );
}
