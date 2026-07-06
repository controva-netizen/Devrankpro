import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BorderButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function BorderButton({ children, onClick, className = '', href }: BorderButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-sm md:text-base border transition-all duration-200 ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} btn-fill-bottom`}
        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
        whileHover={{ scale: 1.03, borderColor: 'var(--accent-1)' }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} btn-fill-bottom`}
      style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
      whileHover={{ scale: 1.03, borderColor: 'var(--accent-1)' }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
