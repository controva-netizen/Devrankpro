import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { pricingTiers } from '@/data/content';
import SectionHeader from '@/components/shared/SectionHeader';
import { Link } from 'react-router-dom';

export default function PricingTiersSection() {
  return (
    <section className="py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-16">
          <SectionHeader label="INVESTMENT" headline="Simple. Transparent. Results-Driven." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className="relative rounded-2xl p-8 card-hover"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderTop: tier.featured ? '4px solid transparent' : '1px solid var(--border-subtle)',
                borderImage: tier.featured ? 'var(--accent-gradient) 1' : 'none',
                borderImageSlice: tier.featured ? '4' : 'none',
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {tier.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'var(--accent-gradient)' }}
                >
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {tier.name}
              </h3>
              <p className="text-3xl font-bold mb-2 gradient-text">{tier.price}<span className="text-base font-normal" style={{ color: 'var(--text-muted)' }}>/mo</span></p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                {tier.description}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <Check size={16} style={{ color: 'var(--accent-1)' }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={
                  tier.featured
                    ? { background: 'var(--accent-gradient)', color: 'white' }
                    : { border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }
                }
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
