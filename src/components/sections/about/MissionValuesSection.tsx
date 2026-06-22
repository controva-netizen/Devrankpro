import { motion } from 'framer-motion';
import { Code2, Eye, TrendingUp, Zap } from 'lucide-react';
import { missionValues } from '@/data/content';

export default function MissionValuesSection() {
  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.p
          className="text-center text-lg md:text-xl leading-relaxed mb-20 max-w-3xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our mission is simple: eliminate the gap between great engineering and great marketing.
          Most agencies do one or the other. We do both — because in 2025, you can't win without both.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missionValues.map((value, i) => (
            <motion.div
              key={value.title}
              className="rounded-xl p-8 card-hover"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'var(--accent-subtle)' }}
              >
                {value.icon === 'Code2' && <Code2 size={22} style={{ color: 'var(--accent-1)' }} />}
                {value.icon === 'Eye' && <Eye size={22} style={{ color: 'var(--accent-1)' }} />}
                {value.icon === 'TrendingUp' && <TrendingUp size={22} style={{ color: 'var(--accent-1)' }} />}
                {value.icon === 'Zap' && <Zap size={22} style={{ color: 'var(--accent-1)' }} />}
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
