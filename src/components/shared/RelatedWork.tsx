import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/data/content';

export default function RelatedWork({ titles }: { titles?: string[] }) {
  const matched = titles
    ? caseStudies.filter((cs) => titles.includes(cs.title))
    : [];

  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-1)' }}>
            OUR WORK
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {matched.length > 0 ? 'Related Engineering Work' : 'See Our Engineering Work'}
          </h2>
        </div>

        {matched.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-[900px] mx-auto">
            {matched.map((study, i) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
              >
                <img src={study.image} alt={study.title} className="w-full h-40 object-cover" loading="lazy" />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--accent-1)' }}>
                    {study.category}
                  </p>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{study.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {study.description}
                  </p>
                  {study.metrics && (
                    <div className="flex flex-wrap gap-2">
                      {study.metrics.map((m) => (
                        <span
                          key={m}
                          className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
          >
            View all case studies <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
