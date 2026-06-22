import { motion } from 'framer-motion';

export default function ServicesHeroSection() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 30%, var(--accent-subtle) 0%, transparent 50%),
                           radial-gradient(ellipse at 80% 70%, var(--accent-subtle) 0%, transparent 50%)`,
        }}
      />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center pt-24">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          style={{ color: 'var(--accent-1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          WHAT WE DO
        </motion.p>
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Engineering-Driven Growth
        </motion.h1>
        <motion.p
          className="text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          From custom application development to AI-powered marketing automation — we build the
          systems that scale businesses.
        </motion.p>
      </div>
    </section>
  );
}
