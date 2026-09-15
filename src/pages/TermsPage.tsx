import SEO from '@/components/shared/SEO';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  const termsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service | Controva LLC',
    description: 'Terms of Service governing the use of Controva LLC website and engineering services.',
    url: 'https://www.controvallc.com/terms',
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        title="Terms of Service | Controva LLC"
        description="Review the Terms of Service and contractual guidelines governing Controva LLC telecom engineering, Voice AI systems, and consulting deliverables."
        keywords="Controva LLC terms of service, engineering contract terms, service terms"
        url="https://www.controvallc.com/terms"
        schema={termsSchema}
      />

      <section className="pt-36 pb-20 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
              style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}
            >
              <FileText size={14} />
              Terms & Conditions
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              Terms of Service
            </h1>

            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Last Updated: March 2026 • Effective Date: January 1, 2025
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="space-y-12 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing or using the website at{' '}
                <a href="https://www.controvallc.com" className="hover:underline font-medium" style={{ color: 'var(--accent-1)' }}>
                  https://www.controvallc.com
                </a>{' '}
                or retaining Controva LLC (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;) for custom engineering, VoIP architecture, or Voice AI services, you agree to be bound by these Terms of Service.
              </p>
              <p>
                If you are entering into this agreement on behalf of a corporation or legal entity, you represent that you possess the full legal authority to bind that entity to these provisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                2. Scope of Services & Engagements
              </h2>
              <p className="mb-4">
                Controva LLC provides high-performance telecom infrastructure engineering, custom FreeSWITCH / Kamailio module development, WebRTC application development, Voice AI agent integration, and cloud DevOps solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                {[
                  'Formal Statements of Work (SOW) dictate specific engineering deliverables',
                  'Audits and blueprints are conducted in accordance with documented SLA criteria',
                  'Client maintains ownership of their proprietary code and telecom carrier accounts',
                  'Controva LLC guarantees sub-second latency targets agreed under verified load tests',
                ].map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-xl border flex items-start gap-3"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
                  >
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--accent-1)' }} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                3. Intellectual Property Rights
              </h2>
              <p className="mb-4">
                All materials on this website, including but not limited to branding, design tokens, logos, graphics, case study narratives, and code snippets, are the exclusive intellectual property of Controva LLC and are protected by international copyright laws.
              </p>
              <p>
                Client custom software developments and custom dialplans engineered under an executed Master Services Agreement (MSA) are transferred upon full settlement of contract invoices as designated in the governing SOW.
              </p>
            </div>

            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    4. Limitation of Liability & Telecom Compliance
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Clients are solely responsible for ensuring that their automated dialing, outbound telephony campaigns, and Voice AI systems adhere to local regulatory frameworks, including TCPA, STIR/SHAKEN, FCC regulations in the USA, and equivalent global telecom authorities. Controva LLC is not liable for carrier-level blocking resulting from client spam practices.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                5. Confidentiality & Non-Disclosure
              </h2>
              <p className="mb-4">
                We hold our clients&apos; architectural topologies, network logs, SIP traces, and proprietary business logic in the strictest confidence. Both parties agree not to disclose confidential engineering specs to any unapproved third party without prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                6. Governing Law
              </h2>
              <p>
                These Terms shall be construed and enforced in accordance with the laws of the United States and the State of California, without regard to its conflict of law principles.
              </p>
            </div>

            <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                7. Questions & Inquiries
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                For contract inquiries or questions regarding these terms, please contact:
              </p>
              <div className="space-y-1.5 text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                <p>Controva LLC — Legal & Contracts</p>
                <p>
                  Email:{' '}
                  <a href="mailto:support@controvallc.com" className="hover:underline" style={{ color: 'var(--accent-1)' }}>
                    support@controvallc.com
                  </a>
                </p>
                <p>Website: https://www.controvallc.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
