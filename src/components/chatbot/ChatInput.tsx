import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChatbot } from '@/context/ChatbotContext';

export default function ChatInput() {
  const { sendMessage, isTyping, isLeadCaptureActive } = useChatbot();
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getPlaceholder = () => {
    if (isLeadCaptureActive) {
      return 'Type your answer...';
    }
    return 'Ask about our services, pricing, or book a call...';
  };

  return (
    <div
      className="flex items-end gap-2 p-3"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          rows={1}
          className="w-full text-sm px-3.5 py-2.5 rounded-xl outline-none resize-none overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            minHeight: '40px',
            maxHeight: '120px',
            lineHeight: '1.5',
          }}
          disabled={isTyping}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!input.trim() || isTyping}
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
        style={{
          background: input.trim() && !isTyping ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
        }}
      >
        <Send size={16} className={input.trim() && !isTyping ? 'text-white' : ''} style={{ color: input.trim() && !isTyping ? '#FFFFFF' : 'var(--text-muted)' }} />
      </button>
    </div>
  );
}
