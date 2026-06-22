import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  headline: string;
  centered?: boolean;
}

export default function SectionHeader({ label, headline, centered = true }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={centered ? 'text-center' : ''}
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
        style={{ color: 'var(--accent-1)' }}
      >
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {headline}
      </h2>
    </motion.div>
  );
}
