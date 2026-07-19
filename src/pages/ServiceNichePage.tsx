import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { nicheServices } from '@/data/content';
import SEO from '@/components/shared/SEO';
import FinalCTASection from '@/components/sections/home/FinalCTASection';

export default function ServiceNichePage() {
  const { niche } = useParams<{ niche: string }>();
  const service = nicheServices.find((s) => s.slug === niche);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const nicheSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Controva LLC'
    },
    areaServed: 'US'
  };

  return (
    <main>
      <SEO 
        title={`${service.title} | Controva LLC`}
        description={service.description}
        keywords={service.keywords}
        url={`https://www.controvallc.com/services/${service.slug}`}
        schema={nicheSchema}
      />
      
      {/* Niche Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: 'var(--accent-1)' }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none" style={{ background: 'var(--accent-2)' }} />
        </div>
        
        <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-8 border" style={{ color: 'var(--accent-1)', borderColor: 'var(--accent-1)', backgroundColor: 'rgba(0, 240, 255, 0.05)' }}>
              Industry Solution
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display leading-tight" style={{ color: 'var(--text-primary)' }}>
              {service.title}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {service.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(0, 240, 255, 0.1)' }}>
                  <Check className="w-6 h-6" style={{ color: 'var(--accent-1)' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{benefit}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </main>
  );
}
