import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/shared/SEO';

export default function NotFoundPage() {
  return (
    <main className="min-h-[80vh] pt-32 pb-24 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        title="Page Not Found | Controva LLC"
        description="The page you are looking for does not exist or has been moved."
        url="https://www.controvallc.com/404"
        noindex
      />
      <div className="max-w-[720px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-8 border"
            style={{ color: 'var(--accent-1)', borderColor: 'var(--accent-1)', backgroundColor: 'rgba(0, 240, 255, 0.05)' }}
          >
            404
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold font-display leading-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Page not found
          </h1>
          <p
            className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            The page you requested does not exist or has been moved. Return home to keep exploring.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-transform hover:scale-105"
            style={{ background: 'var(--accent-gradient)', color: 'white' }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
