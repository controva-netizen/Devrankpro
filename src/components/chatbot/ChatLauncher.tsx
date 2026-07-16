import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useChatbot } from '@/context/ChatbotContext';

export default function ChatLauncher() {
  const { isOpen, toggleChat, unreadCount, settings, openChat } = useChatbot();

  return (
    <>
      {/* Proactive Message Bubble - BOTTOM LEFT (aligned with launcher) */}
      <AnimatePresence>
        {!isOpen && unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 left-6 z-[98] max-w-[260px] cursor-pointer"
            onClick={openChat}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            }}
          >
            <div className="px-4 py-3">
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                {settings.proactiveMessage}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <span
                  className="text-xs font-medium"
                  style={{ color: 'var(--accent-1)' }}
                >
                  Click to chat
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  — Controva AI
                </span>
              </div>
            </div>
            {/* Triangle pointer - points to bottom-left launcher */}
            <div
              className="absolute -bottom-2 left-5 w-4 h-4 rotate-45"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRight: '1px solid var(--border-subtle)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button - BOTTOM LEFT */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 left-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl glow-button"
        style={{
          background: 'var(--accent-gradient)',
          boxShadow: '0 4px 20px var(--accent-glow)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={22} className="text-white" />
              {/* Unread badge */}
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
