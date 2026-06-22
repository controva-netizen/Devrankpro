import { motion } from 'framer-motion';
import { resultsBar } from '@/data/content';

export default function ResultsBarSection() {
  return (
    <section
      className="py-16"
      style={{ backgroundColor: 'var(--accent-subtle)' }}
    >
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {resultsBar.map((item, i) => (
            <motion.div
              key={item.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-2xl md:text-3xl font-bold gradient-text">{item.value}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
