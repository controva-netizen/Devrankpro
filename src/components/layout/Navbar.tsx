import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ChevronDown, Globe, Smartphone, ShoppingCart, Megaphone, Bot, Server, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { navLinks, servicesMenu } from '@/data/content';

const serviceIcons: Record<string, typeof Globe> = { Globe, Smartphone, ShoppingCart, Megaphone, Bot, Server };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isDark, toggleMode } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = location.pathname.startsWith('/services');

  const openServicesMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesMenuOpen(true);
  };
  const scheduleCloseServicesMenu = () => {
    closeTimer.current = setTimeout(() => setServicesMenuOpen(false), 150);
  };

  // Exclude "Contact" from center links — it lives on the right
  const centerLinks = navLinks.filter((l) => l.path !== '/contact');

  return (
    <>
      {/* ── Floating island row ──────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-3 pointer-events-none">
        <motion.nav
          className="pointer-events-auto flex items-center justify-between w-full max-w-7xl rounded-full transition-all duration-500 ease-out border px-3 sm:px-5"
          style={{
            height: 60,
            backgroundColor: scrolled
              ? (isDark ? 'rgba(14,14,18,0.82)' : 'rgba(255,255,255,0.82)')
              : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            borderColor: scrolled
              ? (isDark ? 'rgba(255,255,255,0.09)' : 'rgba(148,163,184,0.45)')
              : 'transparent',
            boxShadow: scrolled
              ? (isDark ? '0 20px 40px -15px rgba(0,0,0,0.55)' : '0 8px 32px -8px rgba(0,0,0,0.12)')
              : 'none',
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Logo ──────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center group pl-1 pr-3 shrink-0"
            aria-label="Controva LLC — Home"
          >
            {/* SVG wordmark — matches the IQAAI style from reference */}
            <svg
              viewBox="0 0 240 52"
              height="32"
              width="auto"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-opacity duration-300 group-hover:opacity-75"
            >
              <defs>
                <linearGradient id="nav-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-1)" />
                  <stop offset="100%" stopColor="var(--accent-2)" />
                </linearGradient>
              </defs>
              {/* "Controva" in Space Grotesk style */}
              <text
                x="0"
                y="37"
                fontFamily="'Space Grotesk', -apple-system, sans-serif"
                fontSize="34"
                fontWeight="700"
                letterSpacing="-0.5"
                fill={isDark ? '#FFFFFF' : '#0D1117'}
              >
                Controva
              </text>
              {/* "LLC" accent */}
              <text
                x="177"
                y="37"
                fontFamily="'Space Grotesk', -apple-system, sans-serif"
                fontSize="34"
                fontWeight="400"
                fill="url(#nav-grad)"
              >
                LLC
              </text>
              {/* Underline flourish under LLC */}
              <path
                d="M177 44 Q207 49 237 44"
                stroke="url(#nav-grad)"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          {/* ── Desktop nav links (centered) ──────────────────── */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {centerLinks.map((link) => {
              if (link.path === '/services') {
                const active = isServicesActive;
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={scheduleCloseServicesMenu}
                  >
                    <Link
                      to={link.path}
                      className="relative flex items-center gap-1 px-4 py-2 text-[13px] font-medium tracking-tight transition-all rounded-full"
                      style={{
                        color: active
                          ? isDark ? '#FFFFFF' : '#0D1117'
                          : isDark ? 'rgba(148,163,184,0.9)' : 'rgba(71,85,105,0.9)',
                        backgroundColor: active
                          ? isDark ? 'rgba(255,255,255,0.1)' : 'rgba(241,245,249,1)'
                          : servicesMenuOpen
                            ? isDark ? 'rgba(255,255,255,0.05)' : 'rgba(248,250,252,1)'
                            : 'transparent',
                        fontFamily: "'Inter', sans-serif",
                      }}
                      aria-haspopup="true"
                      aria-expanded={servicesMenuOpen}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        strokeWidth={2}
                        style={{
                          transition: 'transform 200ms ease',
                          transform: servicesMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </Link>

                    <AnimatePresence>
                      {servicesMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[560px]"
                          style={{ zIndex: 60 }}
                        >
                          <div
                            className="rounded-2xl overflow-hidden p-3"
                            style={{
                              backgroundColor: isDark ? 'rgba(20,20,26,0.98)' : 'rgba(255,255,255,0.98)',
                              backdropFilter: 'blur(24px) saturate(180%)',
                              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                              border: isDark ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(148,163,184,0.35)',
                              boxShadow: isDark
                                ? '0 24px 48px -12px rgba(0,0,0,0.6)'
                                : '0 16px 40px -12px rgba(0,0,0,0.16)',
                            }}
                          >
                            <div className="grid grid-cols-2 gap-1">
                              {servicesMenu.map((item) => {
                                const Icon = serviceIcons[item.icon] ?? Globe;
                                return (
                                  <Link
                                    key={item.path}
                                    to={item.path}
                                    className="flex items-start gap-3 p-3 rounded-xl transition-colors duration-150"
                                    style={{ backgroundColor: 'transparent' }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = isDark
                                        ? 'rgba(255,255,255,0.06)'
                                        : 'rgba(248,250,252,1)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                  >
                                    <div
                                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                      style={{ backgroundColor: 'var(--accent-subtle)' }}
                                    >
                                      <Icon size={16} style={{ color: 'var(--accent-1)' }} />
                                    </div>
                                    <div>
                                      <p
                                        className="text-[13px] font-semibold leading-tight"
                                        style={{ color: isDark ? '#FFFFFF' : '#0D1117', fontFamily: "'Inter', sans-serif" }}
                                      >
                                        {item.title}
                                      </p>
                                      <p
                                        className="text-[11.5px] mt-0.5 leading-snug"
                                        style={{
                                          color: isDark ? 'rgba(148,163,184,0.85)' : 'rgba(100,116,139,1)',
                                          fontFamily: "'Inter', sans-serif",
                                        }}
                                      >
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>

                            <div
                              className="mt-2 pt-2"
                              style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(148,163,184,0.25)' }}
                            >
                              <Link
                                to="/services"
                                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors duration-150"
                                style={{ color: 'var(--accent-1)', fontFamily: "'Inter', sans-serif" }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = isDark
                                    ? 'rgba(255,255,255,0.06)'
                                    : 'rgba(248,250,252,1)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                View all services
                                <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 text-[13px] font-medium tracking-tight transition-all rounded-full"
                  style={{
                    color: isActive(link.path)
                      ? isDark ? '#FFFFFF' : '#0D1117'
                      : isDark ? 'rgba(148,163,184,0.9)' : 'rgba(71,85,105,0.9)',
                    backgroundColor: isActive(link.path)
                      ? isDark ? 'rgba(255,255,255,0.1)' : 'rgba(241,245,249,1)'
                      : 'transparent',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.path)) {
                      e.currentTarget.style.backgroundColor = isDark
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(248,250,252,1)';
                      e.currentTarget.style.color = isDark ? '#FFFFFF' : '#0D1117';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.path)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = isDark
                        ? 'rgba(148,163,184,0.9)'
                        : 'rgba(71,85,105,0.9)';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Right side: theme toggle + divider + contact ───── */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">

            {/* Theme toggle */}
            <button
              onClick={toggleMode}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{
                color: isDark ? 'rgba(148,163,184,1)' : 'rgba(100,116,139,1)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(241,245,249,1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Toggle theme"
            >
              {isDark
                ? <Sun size={15} strokeWidth={1.6} />
                : <Moon size={15} strokeWidth={1.6} />
              }
            </button>

            {/* Divider */}
            <div
              className="hidden sm:block w-[1px] h-4 mx-1"
              style={{
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(148,163,184,0.4)',
              }}
            />

            {/* Contact — bordered style, NOT filled gradient */}
            <Link
              to="/contact"
              className="hidden sm:flex items-center justify-center px-5 py-[7px] text-[13px] font-medium tracking-tight rounded-full border transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                borderColor: isDark
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(148,163,184,0.6)',
                color: isDark ? '#FFFFFF' : '#0D1117',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? '#FFFFFF' : '#0D1117';
                e.currentTarget.style.color = isDark ? '#0D1117' : '#FFFFFF';
                e.currentTarget.style.borderColor = isDark ? '#FFFFFF' : '#0D1117';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = isDark ? '#FFFFFF' : '#0D1117';
                e.currentTarget.style.borderColor = isDark
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(148,163,184,0.6)';
              }}
            >
              Book a Call
            </Link>

            {/* Mobile hamburger — three-line style like reference */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{
                color: isDark ? 'rgba(148,163,184,1)' : 'rgba(71,85,105,1)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(241,245,249,1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Toggle navigation menu"
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <span
                  className="absolute h-[1.5px] w-4 bg-current transform transition-all duration-300 ease-in-out"
                  style={{ transform: mobileOpen ? 'rotate(45deg)' : 'translateY(-5px)' }}
                />
                <span
                  className="absolute h-[1.5px] w-4 bg-current transform transition-all duration-300 ease-in-out"
                  style={{ opacity: mobileOpen ? 0 : 1 }}
                />
                <span
                  className="absolute h-[1.5px] w-4 bg-current transform transition-all duration-300 ease-in-out"
                  style={{ transform: mobileOpen ? 'rotate(-45deg)' : 'translateY(5px)' }}
                />
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile menu — slides down from top ───────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-[72px] left-4 right-4 z-40 md:hidden rounded-2xl overflow-hidden"
            style={{
              backgroundColor: isDark
                ? 'rgba(14,14,18,0.96)'
                : 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: isDark
                ? '1px solid rgba(255,255,255,0.09)'
                : '1px solid rgba(148,163,184,0.4)',
              boxShadow: isDark
                ? '0 24px 48px -12px rgba(0,0,0,0.6)'
                : '0 12px 32px -8px rgba(0,0,0,0.12)',
            }}
          >
            <div className="flex flex-col p-2">
              {navLinks.map((link, i) => {
                if (link.path === '/services') {
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-3 text-[14px] font-medium rounded-xl transition-colors duration-150"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: isServicesActive
                            ? 'var(--accent-1)'
                            : isDark ? 'rgba(226,232,240,1)' : 'rgba(15,23,42,1)',
                          backgroundColor: isServicesActive ? 'var(--accent-subtle)' : 'transparent',
                        }}
                        aria-expanded={mobileServicesOpen}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          style={{
                            transition: 'transform 200ms ease',
                            transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div className="pl-3 pb-1 flex flex-col gap-0.5">
                              {servicesMenu.map((item) => {
                                const Icon = serviceIcons[item.icon] ?? Globe;
                                return (
                                  <Link
                                    key={item.path}
                                    to={item.path}
                                    className="flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium rounded-xl transition-colors duration-150"
                                    style={{
                                      fontFamily: "'Inter', sans-serif",
                                      color: isActive(item.path)
                                        ? 'var(--accent-1)'
                                        : isDark ? 'rgba(203,213,225,1)' : 'rgba(51,65,85,1)',
                                      backgroundColor: isActive(item.path) ? 'var(--accent-subtle)' : 'transparent',
                                    }}
                                  >
                                    <Icon size={14} style={{ opacity: 0.7 }} />
                                    {item.title}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      to={link.path}
                      className="flex items-center px-4 py-3 text-[14px] font-medium rounded-xl transition-colors duration-150"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: isActive(link.path)
                          ? 'var(--accent-1)'
                          : isDark ? 'rgba(226,232,240,1)' : 'rgba(15,23,42,1)',
                        backgroundColor: isActive(link.path)
                          ? 'var(--accent-subtle)'
                          : 'transparent',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div
                className="my-2 h-[1px] mx-4"
                style={{
                  backgroundColor: isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(148,163,184,0.25)',
                }}
              />
              <div className="px-4 py-3 flex items-center justify-between">
                <span
                  className="text-[12px] font-medium"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: isDark ? 'rgba(100,116,139,1)' : 'rgba(100,116,139,1)',
                  }}
                >
                  {isDark ? 'Dark mode' : 'Light mode'}
                </span>
                <button
                  onClick={toggleMode}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: isDark ? 'rgba(148,163,184,1)' : 'rgba(71,85,105,1)',
                    backgroundColor: isDark
                      ? 'rgba(255,255,255,0.07)'
                      : 'rgba(241,245,249,1)',
                  }}
                >
                  {isDark ? <Sun size={13} /> : <Moon size={13} />}
                  Toggle
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
