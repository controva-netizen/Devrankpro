import ChatbotAdminPage from '@/pages/ChatbotAdminPage'; import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeCustomizer from '@/components/layout/ThemeCustomizer';
import CornerGlow from '@/components/layout/CornerGlow';
import AIChatbot from '@/components/layout/AIChatbot';
import CookieConsent from '@/components/layout/CookieConsent';
import HomePage from '@/pages/HomePage';
import AiReceptionistPage from '@/pages/AiReceptionistPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceNichePage from '@/pages/ServiceNichePage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsPage from '@/pages/TermsPage';
import BlogPage from '@/pages/BlogPage';
import BlogSlugPage from '@/pages/BlogSlugPage';
import BlogAdminPage from '@/pages/BlogAdminPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { BlogProvider } from '@/context/BlogContext';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// The prerenderer (scripts/ssg.mjs) bakes each page's <title>/<meta>/<link> into
// the static HTML and tags them data-ssg. Once React has rendered and owns the
// head, remove those static copies so there are no duplicates and the tab title
// follows client-side navigation.
function RemovePrerenderedHead() {
  useEffect(() => {
    document.head.querySelectorAll('[data-ssg]').forEach((n) => n.remove());
  }, []);
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/services/ai-receptionist" element={<PageWrapper><AiReceptionistPage /></PageWrapper>} />
        <Route path="/services/:niche" element={<PageWrapper><ServiceNichePage /></PageWrapper>} />
        <Route path="/case-studies" element={<PageWrapper><CaseStudiesPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
        <Route path="/blog/:slug" element={<PageWrapper><BlogSlugPage /></PageWrapper>} />
        <Route path="/admin/blog" element={<PageWrapper><BlogAdminPage /></PageWrapper>} />
        <Route path="/admin/ai-chatbot" element={<PageWrapper><ChatbotAdminPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><PrivacyPolicyPage /></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// `helmetContext` is only passed by the build-time prerenderer
// (src/entry-server.tsx) so it can read the <head> tags each page sets.
export default function App({ helmetContext }: { helmetContext?: object }) {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <BlogProvider>
          <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <CornerGlow />
            <ScrollToTop />
            <RemovePrerenderedHead />
            <Navbar />
            <div className="relative z-10">
              <AnimatedRoutes />
            </div>
            <Footer />
            <AIChatbot />
            <ThemeCustomizer />
            <CookieConsent />
          </div>
        </BlogProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
