import { motion } from 'framer-motion';
import GradientButton from '@/components/shared/GradientButton';

export default function FinalCTASection() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        backgroundColor: 'transparent',
        backgroundImage: `radial-gradient(ellipse at 50% 50%, var(--accent-subtle) 0%, transparent 70%)`,
      }}
    >
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Engineer Your Growth?
        </motion.h2>

        <motion.p
          className="text-base md:text-lg mb-10 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Book a free strategy call. We'll audit your current digital presence and deliver a custom
          growth blueprint — no pitch, no pressure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }}
        >
          <GradientButton href="/contact" className="text-lg px-10 py-5">
            Book Your Free Strategy Call
          </GradientButton>
        </motion.div>

        <motion.p
          className="mt-6 text-sm"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Or call us: <span style={{ color: 'var(--text-secondary)' }}>+1 (555) 234-5678</span>
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-2 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm font-medium opacity-80 uppercase tracking-widest mt-8 flex items-center gap-2 text-primary-text">
            <span className="w-2 h-2 rounded-full bg-accent-1 animate-pulse"></span>
            Enterprise-grade SLA & Latency Optimization
          </p>
        </motion.div>
      </div>
    </section>
  );
}
