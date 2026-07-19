import { motion } from 'framer-motion';
import { platformImages } from '@/data/content';
import BorderButton from '@/components/shared/BorderButton';
import { useTheme } from '@/context/ThemeContext';

export default function OrbitalEcosystemSection() {
  const { isDark } = useTheme();

  // Duplicate the logos to create an infinite scrolling effect
  const marqueeLogos = [...platformImages, ...platformImages, ...platformImages];

  return (
    <section className="relative py-32 overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <motion.div
        className="text-center mb-16 relative z-10 px-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-1)' }}>
          INTEGRATED ECOSYSTEM
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          One Team. Every Platform.
        </h2>
        <p className="text-lg md:text-xl font-medium" style={{ color: 'var(--text-secondary)' }}>
          We don't just understand these platforms — we engineer at the API level. 
          Seamless integration with the tools your enterprise already trusts.
        </p>
      </motion.div>

      {/* ── Marquee Container ── */}
      <div className="relative w-full overflow-hidden py-10 flex">
        {/* Gradient fades on the edges for a polished look */}
        <div 
          className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none" 
          style={{ background: `linear-gradient(to right, var(--bg-secondary), transparent)` }} 
        />
        <div 
          className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none" 
          style={{ background: `linear-gradient(to left, var(--bg-secondary), transparent)` }} 
        />

        {/* Scrolling Content */}
        <motion.div
          className="flex gap-16 items-center w-max"
          animate={{ x: ['0%', '-33.333333%'] }}
          transition={{
            ease: 'linear',
            duration: 30,
            repeat: Infinity,
          }}
        >
          {marqueeLogos.map((url, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-48 h-24 relative flex items-center justify-center p-6 rounded-2xl group transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <img 
                src={url} 
                alt="Platform Logo" 
                className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="mt-20 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <BorderButton>Explore Our Tech Stack</BorderButton>
      </motion.div>
    </section>
  );
}
