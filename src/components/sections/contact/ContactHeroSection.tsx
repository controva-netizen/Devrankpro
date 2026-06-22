import { motion } from 'framer-motion';

export default function ContactHeroSection() {
  return (
    <section
      className="relative min-h-[40vh] flex items-center justify-center"
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
          Let's Build
          <span className="gradient-text"> Something</span>
        </motion.h1>
        <motion.p
          className="text-base md:text-lg"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Every great partnership starts with a conversation.
        </motion.p>
      </div>
    </section>
  );
}
