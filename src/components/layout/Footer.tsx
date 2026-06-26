import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Web Development', path: '/services' },
    { label: 'Mobile Apps', path: '/services' },
    { label: 'E-commerce', path: '/services' },
    { label: 'AI Automation', path: '/services' },
    { label: 'Paid Ads', path: '/services' },
  ],
  company: [
    { label: 'About', path: '/about' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Blog', path: '#' },
    { label: 'Contact', path: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Service', path: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                <span className="text-white text-[10px] font-bold tracking-wider">CL</span>
              </div>
              <span className="text-[15px] font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Controva<span className="font-normal" style={{ color: 'var(--text-muted)' }}> LLC</span>
              </span>
            </div>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Engineering-driven growth for businesses that refuse to settle. We build systems, not just websites.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Linkedin, href: 'https://linkedin.com/company/controvallc', label: 'LinkedIn' },
                { Icon: Twitter, href: 'https://x.com/controvallc', label: 'X / Twitter' },
                { Icon: Instagram, href: 'https://instagram.com/controvallc', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-1)';
                    e.currentTarget.style.backgroundColor = 'var(--accent-subtle)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-muted)' }}>Services</p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'var(--text-muted)' }}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-muted)' }}>Company</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'var(--text-muted)' }}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-muted)' }}>Legal</p>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'var(--text-muted)' }}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2025 Controva LLC. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Built with obsessive attention to detail.</p>
        </div>
      </div>
    </footer>
  );
}
