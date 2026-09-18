import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  headline: string;
  centered?: boolean;
  /* Heading level for `headline` — defaults to h2 since most sections sit
     below a page's own <h1>. Pass "h1" for a page whose only heading lives
     inside this component (e.g. BlogPage). */
  as?: 'h1' | 'h2';
}

export default function SectionHeader({ label, headline, centered = true, as: Heading = 'h2' }: SectionHeaderProps) {
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
      <Heading className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {headline}
      </Heading>
    </motion.div>
  );
}
