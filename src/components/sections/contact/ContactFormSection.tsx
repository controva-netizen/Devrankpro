import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import GradientButton from '@/components/shared/GradientButton';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    source: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will respond within 4 business hours.');
  };

  const inputClasses = 'w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2';
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
                { icon: Mail, label: 'Email', value: 'hello@nexusgrowth.io' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 234-5678' },
                { icon: MapPin, label: 'Location', value: 'San Francisco, CA / Remote Worldwide' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--accent-subtle)' }}
                  >
                    <Icon size={18} style={{ color: 'var(--accent-1)' }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              We respond to all inquiries within 4 business hours.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="w-full lg:w-[55%] space-y-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className={inputClasses}
                style={{ ...inputStyle, ...focusStyle }}
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className={inputClasses}
                style={{ ...inputStyle, ...focusStyle }}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className={inputClasses}
              style={{ ...inputStyle, ...focusStyle }}
              value={formData.company}
              onChange={handleChange}
            />

            <select
              name="budget"
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
              placeholder="Tell us about your project..."
              required
              rows={5}
              className={inputClasses}
              style={{ ...inputStyle, ...focusStyle, resize: 'vertical' }}
              value={formData.message}
              onChange={handleChange}
            />

            <select
              name="source"
              className={inputClasses}
              style={{ ...inputStyle, ...focusStyle, color: formData.source ? 'var(--text-primary)' : 'var(--text-muted)' }}
              value={formData.source}
              onChange={handleChange}
            >
              <option value="">How did you hear about us?</option>
              <option value="google">Google Search</option>
              <option value="social">Social Media</option>
              <option value="referral">Referral</option>
              <option value="other">Other</option>
            </select>

            <GradientButton className="w-full rounded-xl py-4">
              Send Message
            </GradientButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
