import SEO from '@/components/shared/SEO';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const privacySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy | Controva LLC',
    description: 'Privacy Policy and data protection terms for Controva LLC.',
    url: 'https://www.controvallc.com/privacy',
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        title="Privacy Policy | Controva LLC"
        description="Learn how Controva LLC collects, uses, and protects your personal data in accordance with global privacy standards."
        keywords="Controva LLC privacy policy, data protection, privacy terms"
        url="https://www.controvallc.com/privacy"
        schema={privacySchema}
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
              <Shield size={14} />
              Legal & Compliance
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              Privacy Policy
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
                1. Overview & Commitment
              </h2>
              <p className="mb-4">
                Controva LLC (&quot;Controva&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is an engineering and digital growth agency providing custom VoIP architectures, Voice AI development, and enterprise software engineering. We respect your privacy and are committed to protecting the personally identifiable information (&quot;Personal Information&quot;) you share with us through our website at{' '}
                <a href="https://www.controvallc.com" className="hover:underline font-medium" style={{ color: 'var(--accent-1)' }}>
                  https://www.controvallc.com
                </a>.
              </p>
              <p>
                This Privacy Policy outlines how we collect, store, process, and safeguard your data when you visit our site, submit a contact inquiry, schedule an architecture audit, or engage our services.
              </p>
            </div>

            <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--accent-subtle)' }}>
                  <Lock size={20} style={{ color: 'var(--accent-1)' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    Our Core Promise: Zero Data Selling
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    We never sell, rent, lease, or monetize your personal information to third-party data brokers or advertisers. All information collected is strictly utilized to provide engineering consultations, communicate service proposals, and deliver contractual deliverables.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                2. Information We Collect
              </h2>
              <p className="mb-3">We collect information that you voluntarily provide to us when contacting us or requesting a consultation:</p>
              <ul className="space-y-2.5 list-disc pl-6 mb-4">
                <li><strong style={{ color: 'var(--text-primary)' }}>Contact Information:</strong> Name, work email address, company name, telephone number, and acquisition source.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Project Specifications:</strong> Infrastructure requirements, current telecom stack, approximate project budget, and technical details shared in your message.</li>
                <li><strong style={{ color: 'var(--text-primary)' }}>Automated Technical Data:</strong> Browser user agent, operating system, IP address, general geographic location, and interaction timestamps collected via server access logs and analytics cookies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                3. Google Analytics & Advertising Technologies
              </h2>
              <p className="mb-4">
                We use Google Analytics 4 (GA4) and Google Ads tracking technologies (such as the Google Tag / gtag.js) to understand visitor traffic patterns and evaluate the effectiveness of our digital advertising campaigns.
              </p>
              <p className="mb-4">
                These tools use cookies and unique identifiers to measure conversions (e.g., when a visitor completes our inquiry form). Google does not receive your confidential project requirements or raw communication records.
              </p>
              <p>
                You may opt out of Google Analytics tracking at any time by installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-medium"
                  style={{ color: 'var(--accent-1)' }}
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                4. How We Use Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Responding to project inquiries & sending technical proposals',
                  'Auditing telecom architectures & scoping Voice AI integrations',
                  'Fulfilling agreed-upon engineering Service Level Agreements (SLAs)',
                  'Preventing spam, bot intrusions, and cyber threats',
                  'Improving website performance, latency, and usability',
                  'Complying with applicable commercial laws and accounting regulations',
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
                5. Data Retention & Security
              </h2>
              <p className="mb-4">
                We implement industry-standard encryption protocols (including HTTPS/TLS 1.3 in transit and AES-256 at rest) across all infrastructure components. Contact inquiries and correspondence are retained only as long as necessary to fulfill commercial and legal obligations.
              </p>
              <p>
                Access to prospective client records is strictly restricted to authorized Controva LLC engineers and account managers bound by rigorous non-disclosure agreements (NDAs).
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                6. Your Privacy Rights (GDPR & CCPA/CPRA)
              </h2>
              <p className="mb-3">Depending on your geographic jurisdiction, you hold the following rights regarding your personal data:</p>
              <ul className="space-y-2 list-disc pl-6">
                <li>The right to access, inspect, or request copies of the personal data we hold about you.</li>
                <li>The right to request immediate correction or rectification of any inaccurate information.</li>
                <li>The right to request the permanent erasure (&quot;Right to be Forgotten&quot;) of your information from our systems.</li>
                <li>The right to withdraw consent or object to legitimate-interest processing at any time.</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-3 mb-4">
                <Eye size={22} style={{ color: 'var(--accent-1)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  7. Contact Our Privacy & Data Protection Team
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us directly:
              </p>
              <div className="space-y-2 text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                <p>Controva LLC</p>
                <p>
                  Email:{' '}
                  <a href="mailto:support@controvallc.com" className="hover:underline" style={{ color: 'var(--accent-1)' }}>
                    support@controvallc.com
                  </a>
                </p>
                <p>Phone: +44 7763 090208</p>
                <p>Headquarters: San Francisco, CA / Remote Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
