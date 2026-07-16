import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Check, Clock } from 'lucide-react';
import type { ChatMessage } from '@/types/chatbot';
import { useChatbot } from '@/context/ChatbotContext';
import QuickReplies from './QuickReplies';
import { useState } from 'react';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  isLast: boolean;
}

export default function ChatMessageBubble({ message, isLast }: ChatMessageBubbleProps) {
  const { sendQuickReply } = useChatbot();
  const [showTimestamp, setShowTimestamp] = useState(false);

  const isBot = message.sender === 'bot';
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-2.5 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          backgroundColor: isBot ? 'var(--accent-subtle)' : 'var(--bg-tertiary)',
          border: `1px solid ${isBot ? 'var(--accent-border)' : 'var(--border-subtle)'}`,
        }}
      >
        {isBot ? (
          <Bot size={15} style={{ color: 'var(--accent-1)' }} />
        ) : (
          <User size={15} style={{ color: 'var(--text-secondary)' }} />
        )}
      </div>

      {/* Message Content */}
      <div className="flex flex-col max-w-[78%]">
        <div
          className="relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed cursor-default"
          style={{
            backgroundColor: isBot ? 'var(--bg-secondary)' : 'var(--accent-1)',
            color: isBot ? 'var(--text-primary)' : '#FFFFFF',
            border: isBot ? '1px solid var(--border-subtle)' : 'none',
            borderRadius: isBot ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
          }}
          onMouseEnter={() => setShowTimestamp(true)}
          onMouseLeave={() => setShowTimestamp(false)}
        >
          {/* Message text with line breaks */}
          <div className="whitespace-pre-wrap">{message.text}</div>

          {/* Timestamp (hover) */}
          <AnimatePresence>
            {showTimestamp && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-5 text-[10px]"
                style={{
                  color: 'var(--text-muted)',
                  right: isBot ? 'auto' : '0',
                  left: isBot ? '0' : 'auto',
                }}
              >
                <span className="flex items-center gap-1">
                  <Clock size={9} />
                  {time}
                  {!isBot && <Check size={9} className="ml-0.5" />}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Replies */}
        {isLast && message.quickReplies && message.quickReplies.length > 0 && (
          <QuickReplies replies={message.quickReplies} onSelect={sendQuickReply} />
        )}
      </div>
    </motion.div>
  );
}
