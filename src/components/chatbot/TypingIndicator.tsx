import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2.5"
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: 'var(--accent-subtle)',
          border: '1px solid var(--accent-border)',
        }}
      >
        <Bot size={15} style={{ color: 'var(--accent-1)' }} />
      </div>

      {/* Typing dots */}
      <div
        className="rounded-2xl px-4 py-3 flex items-center gap-1.5"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px 16px 16px 16px',
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-typing-1"
          style={{ backgroundColor: 'var(--accent-1)' }}
        />
        <span
          className="w-2 h-2 rounded-full animate-typing-2"
          style={{ backgroundColor: 'var(--accent-1)' }}
        />
        <span
          className="w-2 h-2 rounded-full animate-typing-3"
          style={{ backgroundColor: 'var(--accent-1)' }}
        />
      </div>
    </motion.div>
  );
}
