import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import GradientButton from '@/components/shared/GradientButton';
import { sendContactInquiry } from '@/lib/contact-service';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    source: '',
    botcheck: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await sendContactInquiry(formData);
      if (res.success) {
        setStatus('success');
        setStatusMessage(res.message);

        // Google Ads & GA4 Lead Conversion Event
        if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'generate_lead', {
            event_category: 'Leads',
            event_label: formData.budget || 'Contact Form Submission',
            value: formData.budget === 'gt25k' ? 25000 : formData.budget === '10k-25k' ? 10000 : 5000,
            currency: 'USD',
          });
        }
      } else {
        setStatus('error');
        setStatusMessage(res.message);
      }
    } catch {
      setStatus('error');
      setStatusMessage('An unexpected network error occurred. Please try again or email us directly.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: '',
      message: '',
      source: '',
      botcheck: '',
    });
    setStatus('idle');
    setStatusMessage('');
  };

  const inputClasses = 'w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed';
  const inputStyle = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
  };

  const focusStyle = { '--tw-ring-color': 'var(--accent-1)' } as React.CSSProperties;

  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div
            className="w-full lg:w-[45%]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Start the Conversation
            </h2>

            <div className="space-y-6 mb-8">
              {[
                { icon: Mail, label: 'Email', value: 'support@controvallc.com', href: 'mailto:support@controvallc.com' },
                { icon: Phone, label: 'Phone', value: '+447763090208', href: 'tel:+447763090208' },
                { icon: MapPin, label: 'Location', value: 'San Francisco, CA / Remote Worldwide' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--accent-subtle)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--accent-1)' }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium transition-colors hover:underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              We respond to all inquiries within 4 business hours. Direct SLA guaranteed for enterprise engineering audits.
            </p>
          </motion.div>

          <div className="w-full lg:w-[55%]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl border text-center flex flex-col items-center justify-center min-h-[420px]"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}
                  >
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    Inquiry Received!
                  </h3>

                  <p className="text-sm max-w-md mb-6" style={{ color: 'var(--text-secondary)' }}>
                    Thank you{formData.name ? `, ${formData.name}` : ''}. Your inquiry has been transmitted directly to{' '}
                    <strong className="text-white">support@controvallc.com</strong>. Our engineering team will review your specifications and follow up within 4 business hours.
                  </p>

                  <button
                    onClick={handleReset}
                    type="button"
                    className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Honeypot field for anti-spam (hidden from users) */}
                  <input
                    type="text"
                    name="botcheck"
                    value={formData.botcheck}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none' }}
                  />

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl flex items-start gap-3 border"
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderColor: 'rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                      }}
                    >
                      <AlertCircle size={20} className="shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold">Unable to dispatch inquiry automatically</p>
                        <p className="opacity-90">{statusMessage}</p>
                        <a
                          href={`mailto:support@controvallc.com?subject=Project Inquiry from ${encodeURIComponent(formData.name || 'Website')}&body=${encodeURIComponent(formData.message)}`}
                          className="inline-block mt-2 underline font-medium text-white hover:text-white/80"
                        >
                          Click here to send via your email app instead &rarr;
                        </a>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        required
                        disabled={status === 'loading'}
                        className={inputClasses}
                        style={{ ...inputStyle, ...focusStyle }}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        required
                        disabled={status === 'loading'}
                        className={inputClasses}
                        style={{ ...inputStyle, ...focusStyle }}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    disabled={status === 'loading'}
                    className={inputClasses}
                    style={{ ...inputStyle, ...focusStyle }}
                    value={formData.company}
                    onChange={handleChange}
                  />

                  <select
                    name="budget"
                    disabled={status === 'loading'}
                    className={inputClasses}
                    style={{ ...inputStyle, ...focusStyle, color: formData.budget ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Budget Range</option>
                    <option value="lt5k">&lt; $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="gt25k">$25,000+</option>
                  </select>

                  <textarea
                    name="message"
                    placeholder="Tell us about your project requirements or infrastructure challenges... *"
                    required
                    disabled={status === 'loading'}
                    rows={5}
                    className={inputClasses}
                    style={{ ...inputStyle, ...focusStyle, resize: 'vertical' }}
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <select
                    name="source"
                    disabled={status === 'loading'}
                    className={inputClasses}
                    style={{ ...inputStyle, ...focusStyle, color: formData.source ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    value={formData.source}
                    onChange={handleChange}
                  >
                    <option value="">How did you hear about us?</option>
                    <option value="google">Google Search / Ads</option>
                    <option value="social">Social Media (LinkedIn, X)</option>
                    <option value="referral">Referral / Colleague</option>
                    <option value="other">Other</option>
                  </select>

                  <GradientButton
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full rounded-xl py-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </GradientButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
