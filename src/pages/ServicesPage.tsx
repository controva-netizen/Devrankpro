import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, Smartphone, ShoppingCart, Megaphone, Bot, Server,
  Check, ArrowRight, Sparkles, Code2, Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceCategories, detailedServices, pricingTiers } from '@/data/content';
import ServiceCategorySection from '@/components/sections/services/ServiceCategorySection';
import SEO from '@/components/shared/SEO';

function ServicesHero() {
  return (
    <section
      className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
          style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)', border: '1px solid var(--accent-border)' }}
        >
          <Sparkles size={14} />
          What We Do
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Engineering-Driven
          <br />
          <span className="gradient-text">Growth Services</span>
        </motion.h1>
        <motion.p
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We don't just build websites or run ads. We engineer complete growth systems
          that combine elite development, AI automation, and performance marketing.
        </motion.p>
      </div>
    </section>
  );
}

function ServiceCardsGrid() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-1)' }}>
            OUR SERVICES
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Everything You Need to Scale
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            From code to conversion — one team handles every piece of your growth puzzle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedServices.map((service, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <motion.div
                key={service.title}
                className="group relative rounded-2xl p-8 cursor-default"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all 300ms ease-out',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{
                  y: -4,
                  borderColor: 'var(--accent-1)',
                  boxShadow: '0 8px 32px var(--accent-glow)',
                }}
              >
                {/* Gradient top line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full transition-opacity duration-300"
                  style={{
                    background: 'var(--accent-gradient)',
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? 'var(--accent-1)' : 'var(--accent-subtle)',
                  }}
                >
                  {service.icon === 'Globe' && <Globe size={22} style={{ color: isHovered ? 'white' : 'var(--accent-1)' }} className="transition-colors duration-300" />}
                  {service.icon === 'Smartphone' && <Smartphone size={22} style={{ color: isHovered ? 'white' : 'var(--accent-1)' }} className="transition-colors duration-300" />}
                  {service.icon === 'ShoppingCart' && <ShoppingCart size={22} style={{ color: isHovered ? 'white' : 'var(--accent-1)' }} className="transition-colors duration-300" />}
                  {service.icon === 'Megaphone' && <Megaphone size={22} style={{ color: isHovered ? 'white' : 'var(--accent-1)' }} className="transition-colors duration-300" />}
                  {service.icon === 'Bot' && <Bot size={22} style={{ color: isHovered ? 'white' : 'var(--accent-1)' }} className="transition-colors duration-300" />}
                  {service.icon === 'Server' && <Server size={22} style={{ color: isHovered ? 'white' : 'var(--accent-1)' }} className="transition-colors duration-300" />}
                </div>

                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <Check size={12} style={{ color: 'var(--accent-1)' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <span className="text-sm font-semibold gradient-text">{service.price}</span>
                  <Link
                    to="/contact"
                    className="flex items-center gap-1 text-xs font-medium transition-all duration-200 group-hover:gap-2"
                    style={{ color: 'var(--accent-1)' }}
                  >
                    Get Started <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceProcess() {
  const steps = [
    { icon: Code2, title: 'Discovery', desc: 'We audit your business, market, and competitors to find growth opportunities.' },
    { icon: Sparkles, title: 'Strategy', desc: 'We build a custom roadmap with clear milestones and revenue targets.' },
    { icon: Rocket, title: 'Execution', desc: 'We build, launch, and optimize — delivering measurable results every week.' },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-1)' }}>
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Simple Process. Powerful Results.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px]" style={{ backgroundColor: 'var(--border-subtle)' }}>
            <motion.div
              className="h-full"
              style={{ background: 'var(--accent-gradient)' }}
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10"
                style={{
                  background: 'var(--accent-gradient)',
                  boxShadow: '0 4px 20px var(--accent-glow)',
                }}
              >
                <step.icon size={24} color="white" />
              </div>
              <span className="text-xs font-semibold mb-2 block" style={{ color: 'var(--accent-1)' }}>
                Step {i + 1}
              </span>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-1)' }}>
            PRICING
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Invest in Growth
          </h2>
          <p className="text-primary-text/60 max-w-2xl mx-auto">
            Every plan includes Falsifiable Deployment Outcomes and guaranteed latency SLA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className="relative rounded-2xl p-8"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: tier.featured
                  ? '2px solid transparent'
                  : '1px solid var(--border-subtle)',
                backgroundClip: tier.featured ? 'padding-box' : undefined,
                ...(tier.featured ? {
                  backgroundImage: 'linear-gradient(var(--bg-secondary), var(--bg-secondary)), var(--accent-gradient)',
                  backgroundOrigin: 'border-box',
                } : {}),
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
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
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>/mo</span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                {tier.description}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent-subtle)' }}>
                      <Check size={10} style={{ color: 'var(--accent-1)' }} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                style={
                  tier.featured
                    ? { background: 'var(--accent-gradient)', color: 'white' }
                    : { border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', backgroundColor: 'rgba(255,255,255,0.02)' }
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

export default function ServicesPage() {
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, item: { '@type': 'Service', name: 'Custom VoIP Architecture' } },
          { '@type': 'ListItem', position: 2, item: { '@type': 'Service', name: 'FreeSWITCH & Kamailio Integration' } },
          { '@type': 'ListItem', position: 3, item: { '@type': 'Service', name: 'Voice AI Agents' } },
          { '@type': 'ListItem', position: 4, item: { '@type': 'Service', name: 'WebRTC & App Integration' } }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do you provide FreeSWITCH development services in the USA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Controva LLC provides comprehensive FreeSWITCH development and custom SIP architecture services for enterprises and call centers operating across the USA. We specialize in high-availability clustering and WebRTC integration.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much does it cost to build a custom VoIP network?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Custom VoIP architectures vary depending on scale. Standard deployments start with our Growth tier, while high-volume carrier-grade setups require custom engineering. By owning the infrastructure, USA businesses save substantially on per-minute SaaS fees.'
            }
          }
        ]
      }
    ]
  };

  return (
    <main>
      <SEO 
        title="VoIP Engineering Services | FreeSWITCH & Kamailio Integration"
        description="We engineer custom VoIP networks, FreeSWITCH/Kamailio deployments, and Voice AI solutions. Scale your SIP infrastructure with sub-second latency."
        keywords="FreeSWITCH Kamailio integration, SIP trunking service USA, Voice AI development, WebRTC solutions, custom VoIP architecture USA"
        url="https://www.controvallc.com/services"
        schema={servicesSchema}
      />
      <ServicesHero />
      <ServiceCardsGrid />
      <ServiceProcess />

      {/* Detailed Service Breakdown */}
      <section className="py-24 space-y-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-[1280px] mx-auto px-6 space-y-24">
          {serviceCategories.map((service, i) => (
            <ServiceCategorySection
              key={service.title}
              title={service.title}
              description={service.description}
              features={service.features}
              image={service.image}
              reversed={i % 2 !== 0}
            />
          ))}
        </div>
      </section>

      <PricingSection />
    </main>
  );
}
