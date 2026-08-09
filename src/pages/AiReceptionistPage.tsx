import { motion } from 'framer-motion';
import { PhoneCall, Calendar, Clock, HeartPulse, Check, ArrowRight, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/shared/SEO';

function AiReceptionistHero() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
          style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)', border: '1px solid var(--accent-border)' }}
        >
          <Bot size={14} />
          Automated Call Handling
        </motion.div>
        
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The Ultimate <span className="gradient-text">AI Receptionist</span> Software
        </motion.h1>
        
        <motion.p
          className="text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Stop losing leads to voicemail. Our AI voice bot provides 24/7 intelligent answering, appointment scheduling, and automated call routing over VoIP with zero wait times. It's more than an AI Chat bot—it's your complete telephony AI assistant.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{ background: 'var(--accent-gradient)', boxShadow: '0 4px 20px var(--accent-glow)' }}
          >
            Deploy Your AI Agent
          </Link>
          <Link
            to="/services"
            className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
          >
            Explore VoIP Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: '24/7 Availability',
      desc: 'Your AI voice receptionist never sleeps. Answer every inbound call instantly, after hours, or during holidays.'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      desc: 'Integrate directly with your calendar. The AI can book, cancel, and reschedule appointments conversationally.'
    },
    {
      icon: PhoneCall,
      title: 'Intelligent Routing',
      desc: 'Qualify leads automatically and route high-value calls to the right human agent based on conversational intent.'
    }
  ];

  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Why Choose AI Receptionist Software?
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Enhance caller experience while reducing operational costs with conversational AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              className="p-8 rounded-2xl"
              style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--accent-subtle)' }}
              >
                <benefit.icon size={24} style={{ color: 'var(--accent-1)' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{benefit.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MedicalNicheSection() {
  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="flex-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}>
              <HeartPulse size={14} />
              Healthcare Solutions
            </div>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
              The #1 <span className="gradient-text">AI Medical Receptionist</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Medical practices lose thousands of dollars each month due to missed calls. Our AI medical receptionist software is HIPAA-compliant, capable of handling patient triage, booking appointments, and answering FAQs with empathy and precision.
            </p>
            <ul className="space-y-4">
              {['HIPAA-Compliant Architecture', 'EHR/EMR Calendar Integration', 'Patient Triage & Routing', 'No hold times for patients'].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm md:text-base font-medium" style={{ color: 'var(--text-primary)' }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--accent-1)' }}>
                    <Check size={12} color="white" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square rounded-3xl relative overflow-hidden" style={{ background: 'var(--accent-gradient)' }}>
              <div className="absolute inset-1 rounded-[22px] p-8 flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                 <div className="space-y-6">
                   <div className="p-4 rounded-xl w-3/4 mr-auto" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                     <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>"Hi, I'm calling to schedule an appointment with Dr. Smith for next Tuesday."</p>
                   </div>
                   <div className="p-4 rounded-xl w-3/4 ml-auto" style={{ background: 'var(--accent-gradient)' }}>
                     <p className="text-sm font-medium text-white">"I can help with that. Dr. Smith has availability at 10:00 AM or 2:30 PM next Tuesday. Which works best for you?"</p>
                   </div>
                   <div className="p-4 rounded-xl w-3/4 mr-auto" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
                     <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>"10:00 AM works perfectly."</p>
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function AiReceptionistPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Controva AI Receptionist Software',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: 'Contact for Pricing',
      priceCurrency: 'USD'
    },
    description: 'Advanced AI voice receptionist software for handling inbound calls, scheduling appointments, and routing for medical practices and businesses.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '124'
    }
  };

  return (
    <main>
      <SEO 
        title="AI Receptionist Software & Voice Agents | Controva LLC"
        description="Never miss a lead. Our AI receptionist software provides 24/7 intelligent answering and scheduling. Specialize in AI medical receptionist solutions."
        keywords="ai receptionist, ai receptionist software, ai voice receptionist, ai medical receptionist, ai phone bot, AI voice bot, AI Chat bot, telephony AI assistant, VoIP"
        url="https://www.controvallc.com/services/ai-receptionist"
        schema={schema}
      />
      <AiReceptionistHero />
      <BenefitsSection />
      <MedicalNicheSection />
      
      {/* CTA Section */}
      <section className="py-24 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
         <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Ready to Automate Your Front Desk?</h2>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>Get a custom AI voice receptionist deployed in days, not months.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-transform hover:scale-105"
              style={{ background: 'var(--accent-gradient)' }}
            >
              Get a Demo <ArrowRight size={18} />
            </Link>
         </div>
      </section>
    </main>
  );
}
