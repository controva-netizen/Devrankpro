import { motion } from 'framer-motion';
import type { CaseStudy } from '@/types';

interface FeaturedCaseStudyProps {
  study: CaseStudy;
  index: number;
}

export default function FeaturedCaseStudySection({ study, index }: FeaturedCaseStudyProps) {
  return (
    <motion.div
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 rounded-2xl overflow-hidden`}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="w-full lg:w-1/2">
        <img src={study.image} alt={study.title} className="w-full h-full object-cover min-h-[300px]" loading="lazy" />
      </div>
      <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--accent-1)' }}>
          {study.category}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {study.title}
        </h3>
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          {study.description}
        </p>
        <span
          className="inline-block self-start px-4 py-2 rounded-full text-sm font-medium"
          style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}
        >
          {study.result}
        </span>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 mt-5 text-sm font-semibold self-start group"
          style={{ color: 'var(--accent-1)' }}
        >
          Start a Similar Project
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
