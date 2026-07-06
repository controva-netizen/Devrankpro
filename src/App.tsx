import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeCustomizer from '@/components/layout/ThemeCustomizer';
import CornerGlow from '@/components/layout/CornerGlow';
import AIChatbot from '@/components/layout/AIChatbot';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import BlogPage from '@/pages/BlogPage';
import BlogSlugPage from '@/pages/BlogSlugPage';
import BlogAdminPage from '@/pages/BlogAdminPage';
import { BlogProvider } from '@/context/BlogContext';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
        <Route path="/case-studies" element={<PageWrapper><CaseStudiesPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
        <Route path="/blog/:slug" element={<PageWrapper><BlogSlugPage /></PageWrapper>} />
        <Route path="/admin/blog" element={<PageWrapper><BlogAdminPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BlogProvider>
      <div className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <CornerGlow />
        <ScrollToTop />
        <Navbar />
        <div className="relative z-10">
          <AnimatedRoutes />
        </div>
        <Footer />
        <AIChatbot />
        <ThemeCustomizer />
      </div>
      </BlogProvider>
    </ThemeProvider>
  );
}
