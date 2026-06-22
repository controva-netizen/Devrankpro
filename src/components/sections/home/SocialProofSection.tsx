import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/content';
import SectionHeader from '@/components/shared/SectionHeader';

export default function SocialProofSection() {
  return (
    <section className="py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-16">
          <SectionHeader label="CLIENT RESULTS" headline="Businesses That Chose Growth" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="rounded-2xl p-8 card-hover"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Quote size={24} style={{ color: 'var(--accent-1)' }} className="mb-4 opacity-50" />
              <p className="text-base italic leading-relaxed mb-6" style={{ color: 'var(--text-primary)' }}>
                "{t.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {t.title}
                  </p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}
                >
                  {t.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 flex items-center justify-center gap-12 opacity-40 grayscale"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {['Forbes', 'TechCrunch', 'Bloomberg', 'Wired', 'Fast Company', 'Inc.'].map((name) => (
            <span key={name} className="text-lg font-bold hidden md:block" style={{ color: 'var(--text-muted)' }}>
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
