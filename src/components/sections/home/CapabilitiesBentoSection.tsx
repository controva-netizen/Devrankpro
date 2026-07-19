import { motion } from 'framer-motion';
import { bentoServices } from '@/data/content';
import SectionHeader from '@/components/shared/SectionHeader';
import { Link } from 'react-router-dom';

const gridLayout = [
  'col-span-1 md:col-span-2',
  'col-span-1',
  'col-span-1',
  'col-span-1 md:col-span-2',
  'col-span-1 md:col-span-2',
  'col-span-1',
];

export default function CapabilitiesBentoSection() {
  return (
    <section className="py-32" style={{ backgroundColor: 'transparent' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-16">
          <SectionHeader label="OUR CAPABILITIES" headline="One Team. Every Discipline." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoServices.map((service, i) => (
            <Link
              key={service.id}
              to="/services"
              className={`${gridLayout[i]} group rounded-[20px] overflow-hidden card-hover block`}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={`${i === 4 ? 'relative h-full' : ''}`}>
                  <div className={`overflow-hidden ${i === 4 ? 'h-full' : i === 1 || i === 2 ? 'h-[200px]' : 'h-[240px]'}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                      loading="lazy"
                    />
                    {i === 4 && (
                      <div
                        className="absolute inset-0 flex items-end p-8"
                        style={{
                          background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.5) 50%, transparent 100%)',
                        }}
                      >
                        <div>
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                            style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}
                          >
                            {service.badge}
                          </span>
                          <h3 className="text-xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                            {service.title}
                          </h3>
                          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            {service.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {i !== 4 && (
                    <div className="p-6">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                        style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}
                      >
                        {service.badge}
                      </span>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {service.description}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
