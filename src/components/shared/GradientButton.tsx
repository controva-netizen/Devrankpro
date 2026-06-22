import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function GradientButton({ children, onClick, className = '', href }: GradientButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-semibold text-sm md:text-base transition-shadow duration-200 ${className}`;
  const style = { background: 'var(--accent-gradient)' };

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        style={style}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent-glow)' }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClasses}
      style={style}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--accent-glow)' }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
