import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  default: "Thanks for your message! Our team will get back to you shortly. In the meantime, you can book a free strategy call or explore our services page.",
  hi: "Hello! Welcome to NexusGrowth. How can I help you scale your business today?",
  hello: "Hey there! Ready to grow your business? Ask me about our services, pricing, or book a call!",
  pricing: "We offer three tiers: Starter ($3,500/mo), Growth ($6,500/mo — most popular), and Enterprise ($12,000/mo). All include our 30-Day Profit Guarantee. Want details on any plan?",
  services: "We offer: Custom Web & Mobile Development, Social Media Marketing, E-commerce Scaling (Shopify/TikTok Shop), AI Automation & Lead Systems, Enterprise Infrastructure, and Brand Identity Design. Which interests you?",
  shopify: "Our Shopify Mastery service includes custom theme development, app integrations, headless commerce, one-click upsells, and A/B tested checkout flows. We've generated $1.2M+ in revenue for Shopify clients.",
  marketing: "Our performance marketing covers Facebook, Instagram, TikTok, LinkedIn, and X. We use AI-driven creative optimization and lookalike audience engineering. Average ROAS is 3.2x.",
  ai: "Our AI systems include custom GPT integrations, lead qualification bots, automated follow-ups, predictive analytics, and conversational AI. These run 24/7 to qualify and nurture your leads.",
  guarantee: "Our 30-Day Profit Guarantee: if you don't see measurable profit within 30 days of launch, we refund 100% of your fees. No questions asked. We're that confident in our system.",
  contact: "You can reach us at hello@nexusgrowth.io or call +1 (555) 234-5678. Or book a free strategy call — we'll audit your business and create a custom growth blueprint.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) return response;
  }
  return botResponses.default;
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! I'm the DevRank Pro AI assistant. Ask me about our services, pricing, or how we can help grow your business!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: messages.length,
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: messages.length + 1,
        text: getBotResponse(userMsg.text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-[99] w-[360px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{
                background: 'var(--accent-gradient)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">NexusGrowth AI</p>
                  <p className="text-xs text-white/70">Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-[320px] overflow-y-auto p-4 space-y-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: msg.sender === 'bot' ? 'var(--accent-subtle)' : 'var(--bg-tertiary)',
                    }}
                  >
                    {msg.sender === 'bot' ? (
                      <Bot size={14} style={{ color: 'var(--accent-1)' }} />
                    ) : (
                      <User size={14} style={{ color: 'var(--text-secondary)' }} />
                    )}
                  </div>
                  <div
                    className="max-w-[75%] rounded-xl px-3 py-2 text-sm leading-relaxed"
                    style={{
                      backgroundColor: msg.sender === 'bot' ? 'var(--bg-secondary)' : 'var(--accent-1)',
                      color: msg.sender === 'bot' ? 'var(--text-primary)' : 'white',
                      border: msg.sender === 'bot' ? '1px solid var(--border-subtle)' : 'none',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--accent-subtle)' }}
                  >
                    <Bot size={14} style={{ color: 'var(--accent-1)' }} />
                  </div>
                  <div
                    className="rounded-xl px-4 py-3 flex items-center gap-1"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-typing-1" style={{ backgroundColor: 'var(--accent-1)' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-typing-2" style={{ backgroundColor: 'var(--accent-1)' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-typing-3" style={{ backgroundColor: 'var(--accent-1)' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 p-3"
              style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services..."
                className="flex-1 text-sm px-3 py-2 rounded-xl outline-none"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                onClick={handleSend}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl glow-button"
        style={{
          background: 'var(--accent-gradient)',
          boxShadow: '0 4px 20px var(--accent-glow)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </motion.button>
    </>
  );
}
