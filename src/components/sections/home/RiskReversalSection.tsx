import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Rocket, BarChart3, ShieldCheck } from 'lucide-react';
import { processSteps } from '@/data/content';
import SectionHeader from '@/components/shared/SectionHeader';

const icons = [Phone, Rocket, BarChart3, ShieldCheck];

export default function RiskReversalSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        backgroundColor: 'transparent',
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, var(--accent-subtle) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-[900px] mx-auto px-6">
        <SectionHeader label="ZERO-RISK ENGAGEMENT" headline="Profit in 30 Days, Or It's Free" />

        <motion.p
          className="text-center text-base md:text-lg mt-6 mb-16 max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Most agencies charge retainers and deliver excuses. We charge for results. If you don't
          see measurable profit within 30 days of launch, every dollar you've paid is refunded. No
          questions. No negotiation.
        </motion.p>

        <div className="relative">
          <div className="hidden md:block absolute top-[60px] left-[12.5%] right-[12.5%] h-[2px] overflow-hidden">
            <motion.div
              className="h-full"
              style={{ background: 'var(--accent-gradient)' }}
              initial={{ width: '0%' }}
              animate={isInView ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {processSteps.map((step, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={step.number}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10"
                    style={{
                      background: 'var(--accent-gradient)',
                      boxShadow: '0 4px 20px var(--accent-glow)',
                    }}
                  >
                    <Icon size={24} color="white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
