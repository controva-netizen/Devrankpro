import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { horizontalCapabilities } from '@/data/content';

export default function HorizontalScrollSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.offsetWidth * 0.75;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, horizontalCapabilities.length - 1));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.pageX - (scrollRef.current?.offsetLeft || 0), scrollLeft: scrollRef.current?.scrollLeft || 0 };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - dragStart.current.x) * 1.5;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - walk;
  };
  const handleMouseUp = () => setIsDragging(false);

  const scrollToCard = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.75;
    el.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
  };

  return (
    <section className="relative py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
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
          Every Channel. <span className="gradient-text">One Strategy.</span>
        </motion.h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar scroll-snap-x px-6 pb-4 cursor-grab active:cursor-grabbing"
        style={{ paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {horizontalCapabilities.map((cap, i) => (
          <motion.article
            key={cap.number}
            className="scroll-snap-start flex-shrink-0 rounded-2xl overflow-hidden flex flex-col md:flex-row"
            style={{
              width: 'min(75vw, 900px)',
              minHeight: '420px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            {/* Left: Gradient Sidebar */}
            <div
              className="w-full md:w-[38%] flex items-center justify-center relative overflow-hidden py-12 md:py-0"
              style={{ background: 'var(--accent-gradient)', minHeight: '140px' }}
            >
              <span className="text-[8rem] md:text-[10rem] font-extrabold text-white opacity-20 leading-none select-none">
                {cap.number}
              </span>
            </div>

            {/* Right: Content */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <h3
                className="text-2xl md:text-3xl font-bold mb-4 tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {cap.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {cap.description}
              </p>
              <ul className="space-y-3 mb-6">
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

        {/* Spacer for last card */}
        <div className="flex-shrink-0 w-[5vw]" />
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {horizontalCapabilities.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: activeIndex === i ? 24 : 8,
              height: 8,
              backgroundColor: activeIndex === i ? 'var(--accent-1)' : 'var(--border-active)',
              borderRadius: 9999,
            }}
          />
        ))}
      </div>
    </section>
  );
}
