import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Trash2 } from 'lucide-react';
import { useChatbot } from '@/context/ChatbotContext';
import ChatMessageBubble from './ChatMessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';

export default function ChatWindow() {
  const { messages, isOpen, isTyping, closeChat, clearChat, settings, activeProvider } = useChatbot();
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMessageCount = useRef(messages.length);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current && messages.length !== lastMessageCount.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
      lastMessageCount.current = messages.length;
    }
  }, [messages.length]);

  // Scroll to bottom when typing starts
  useEffect(() => {
    if (isTyping && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [isTyping]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 left-6 z-[99] overflow-hidden shadow-2xl"
          style={{
            width: 'min(420px, calc(100vw - 48px))',
            height: 'min(580px, calc(100vh - 140px))',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
          }}
          role="dialog"
          aria-label="Chatbot conversation"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{
              background: 'var(--accent-gradient)',
            }}
          >
            <div className="flex items-center gap-3">
              {/* Bot Avatar with pulse */}
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot size={18} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white font-display">{settings.botName}</p>
                <p className="text-xs text-white/70 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online
                  {activeProvider !== 'fallback' && (
                    <span className="ml-1 px-1.5 py-0.5 rounded bg-white/20 text-[9px] uppercase tracking-wider">
                      {activeProvider}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Clear chat button */}
              <button
                onClick={clearChat}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear conversation"
              >
                <Trash2 size={15} />
              </button>
              {/* Close button */}
              <button
                onClick={closeChat}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="overflow-y-auto p-4 space-y-4"
            style={{
              height: 'calc(100% - 140px)',
              backgroundColor: 'var(--bg-primary)',
            }}
          >
            {/* Welcome badge */}
            {messages.length <= 1 && (
              <div className="flex justify-center mb-4">
                <span
                  className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  Today
                </span>
              </div>
            )}

            {messages.map((msg, index) => (
              <ChatMessageBubble
                key={msg.id}
                message={msg}
                isLast={index === messages.length - 1}
              />
            ))}

            {isTyping && <TypingIndicator />}

            {/* Bottom spacer */}
            <div className="h-2" />
          </div>

          {/* Input Area */}
          <ChatInput />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
