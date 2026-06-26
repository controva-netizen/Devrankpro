import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function GradientButton({ children, onClick, className = '', href, type = 'button', disabled }: GradientButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-semibold text-sm md:text-base transition-shadow duration-200 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`;
  const style = { background: 'var(--accent-gradient)' };

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        style={style}
        whileHover={disabled ? {} : { scale: 1.05, boxShadow: '0 0 30px var(--accent-glow)' }}
        whileTap={disabled ? {} : { scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      style={style}
      whileHover={disabled ? {} : { scale: 1.05, boxShadow: '0 0 30px var(--accent-glow)' }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
