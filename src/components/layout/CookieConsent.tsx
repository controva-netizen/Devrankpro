import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'controva_cookie_consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent(granted: boolean) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const status = granted ? 'granted' : 'denied';
  window.gtag('consent', 'update', {
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
    analytics_storage: status,
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'granted') {
        applyConsent(true);
      } else if (stored !== 'denied') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied');
    } catch {
      /* private browsing / storage blocked — consent still applies for this session */
    }
    applyConsent(granted);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[60] p-5 rounded-2xl border shadow-lg"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="flex gap-3">
            <Cookie size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--accent-1)' }} />
            <div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We use cookies for analytics and advertising measurement. See our{' '}
                <Link to="/privacy" className="underline" style={{ color: 'var(--accent-1)' }}>
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => choose(true)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-transform hover:scale-105"
                  style={{ background: 'var(--accent-gradient)' }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => choose(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold border"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
