import { motion } from 'framer-motion';

export default function AboutHeroSection() {
  return (
    <section
      className="relative min-h-[50vh] flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-[800px] mx-auto px-6 text-center pt-24">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Built by Engineers.
          <br />
          <span className="gradient-text">Driven by Results.</span>
        </motion.h1>
        <motion.p
          className="text-base md:text-lg"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          We're not marketers who learned to code. We're engineers who mastered growth.
        </motion.p>
      </div>
    </section>
  );
}
