import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import type { ChatMessage, LeadCaptureStep, LeadData, ChatbotSettings } from '@/types/chatbot';
import { generateBotResponse, getLeadCaptureResponse, validateLeadStep } from '@/lib/chatbot-engine';
import { storeLead, notifyLeadViaWhatsApp } from '@/lib/chatbot-leads';
import { getPreferredProvider, type AIProvider } from '@/lib/ai-providers';
import { v4 as uuidv4 } from 'uuid';

// ============================================================
// CHATBOT CONTEXT
// Manages chat state, AI responses, lead capture, persistence
// ============================================================

interface ChatbotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  hasInteracted: boolean;
  leadData: Partial<LeadData>;
  leadCaptureStep: LeadCaptureStep;
  sessionId: string;
  unreadCount: number;
  settings: ChatbotSettings;
  activeProvider: AIProvider;
  sendMessage: (text: string) => Promise<void>;
  sendQuickReply: (reply: { label: string; value: string; action: string; url?: string }) => void;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  clearChat: () => void;
  isLeadCaptureActive: boolean;
}

const ChatbotContext = createContext<ChatbotContextType | null>(null);

// Default settings
const defaultSettings: ChatbotSettings = {
  botName: 'Controva AI Assistant',
  greetingMessage: "Hi! I'm the Controva AI Assistant. Ask me about our services, pricing, or how we can help grow your business!",
  tone: 'professional',
  proactiveEnabled: true,
  proactiveDelay: 8000,
  proactiveMessage: '👋 Need help growing your business? Ask me anything!',
  leadCaptureEnabled: true,
  leadCaptureAutoTrigger: 4,
  openaiModel: 'gpt-4o-mini',
  whatsappProvider: 'callmebot',
  requiredLeadFields: ['name', 'email', 'interest'],
};

// Storage keys
const STORAGE_KEY = 'controva_chatbot_session';
const SETTINGS_KEY = 'controva_chatbot_settings';
const INTERACTED_KEY = 'controva_chatbot_interacted';

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [sessionId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.sessionId || uuidv4();
      } catch {
        return uuidv4();
      }
    }
    return uuidv4();
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.messages && parsed.messages.length > 0) {
          return parsed.messages;
        }
      } catch {
        // ignore
      }
    }
    return [
      {
        id: uuidv4(),
        text: defaultSettings.greetingMessage,
        sender: 'bot',
        timestamp: Date.now(),
        quickReplies: [
          { label: 'Our Services', value: 'What services do you offer?', action: 'message' },
          { label: 'Pricing', value: 'How much do your services cost?', action: 'message' },
          { label: 'Book a Call', value: 'I want to book a strategy call', action: 'lead_capture' },
          { label: 'Case Studies', value: 'Show me your case studies', action: 'message' },
        ],
      },
    ];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(() => {
    return localStorage.getItem(INTERACTED_KEY) === 'true';
  });
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [leadCaptureStep, setLeadCaptureStep] = useState<LeadCaptureStep>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [settings] = useState<ChatbotSettings>(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });
  const [activeProvider] = useState<AIProvider>(getPreferredProvider);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const leadDataRef = useRef(leadData);
  leadDataRef.current = leadData;
  const leadCaptureStepRef = useRef(leadCaptureStep);
  leadCaptureStepRef.current = leadCaptureStep;

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ sessionId, messages, leadData, leadCaptureStep })
    );
  }, [messages, sessionId, leadData, leadCaptureStep]);

  // Proactive message timer
  useEffect(() => {
    if (!settings.proactiveEnabled || hasInteracted || isOpen) return;

    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, settings.proactiveDelay);

    return () => clearTimeout(timer);
  }, [settings.proactiveEnabled, hasInteracted, isOpen, settings.proactiveDelay]);

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const handleLeadCapture = useCallback(
    async (userText: string) => {
      const currentStep = leadCaptureStepRef.current;
      const currentData = leadDataRef.current;

      if (!currentStep || currentStep === 'complete') {
        // Start lead capture
        const response = getLeadCaptureResponse(null, {});
        setLeadCaptureStep(response.nextStep);
        addMessage({
          id: uuidv4(),
          text: response.text,
          sender: 'bot',
          timestamp: Date.now(),
          quickReplies: response.quickReplies,
          isLeadCapture: true,
          leadCaptureStep: response.nextStep,
        });
        return true;
      }

      // Validate and store the answer
      const lowerText = userText.toLowerCase().trim();
      if (lowerText === 'cancel' || lowerText === 'exit' || lowerText === 'stop') {
        setLeadCaptureStep(null);
        addMessage({
          id: uuidv4(),
          text: "Okay, I've canceled that. What else can I help you with?",
          sender: 'bot',
          timestamp: Date.now(),
        });
        return true;
      }

      if (validateLeadStep(currentStep, userText)) {
        const newData = { ...currentData };
        switch (currentStep) {
          case 'name':
            newData.name = userText.trim();
            break;
          case 'email':
            newData.email = userText.trim();
            break;
          case 'phone':
            if (userText.trim() && userText.trim().toLowerCase() !== 'skip phone') {
              newData.phone = userText.trim();
            }
            break;
          case 'interest':
            newData.interest = userText.trim();
            break;
        }
        setLeadData(newData);

        const response = getLeadCaptureResponse(currentStep, newData);
        setLeadCaptureStep(response.nextStep);

        // If complete, store lead and send WhatsApp
        if (response.nextStep === 'complete') {
          const finalData: LeadData = {
            name: newData.name || '',
            email: newData.email || '',
            phone: newData.phone || undefined,
            interest: newData.interest || '',
            pagePath: window.location.pathname,
          };

          // Store in Supabase
          await storeLead(finalData, sessionId);

          // Send WhatsApp notification
          const conversationMessages = messagesRef.current.map((m) => ({
            text: m.text,
            sender: m.sender,
          }));
          await notifyLeadViaWhatsApp(finalData, sessionId, conversationMessages);
        }

        addMessage({
          id: uuidv4(),
          text: response.text,
          sender: 'bot',
          timestamp: Date.now(),
          quickReplies: response.quickReplies,
          isLeadCapture: true,
          leadCaptureStep: response.nextStep,
        });
        return true;
      } else {
        // Invalid input
        const retryText =
          currentStep === 'email'
            ? "That doesn't look like a valid email. Could you try again?"
            : currentStep === 'name'
            ? "Please provide a valid name (at least 2 characters)."
            : "Please provide a valid response.";

        addMessage({
          id: uuidv4(),
          text: retryText,
          sender: 'bot',
          timestamp: Date.now(),
          isLeadCapture: true,
          leadCaptureStep: currentStep,
        });
        return true;
      }
    },
    [addMessage, sessionId]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      setHasInteracted(true);
      localStorage.setItem(INTERACTED_KEY, 'true');
      setUnreadCount(0);

      // Add user message
      const userMsg: ChatMessage = {
        id: uuidv4(),
        text: text.trim(),
        sender: 'user',
        timestamp: Date.now(),
      };
      addMessage(userMsg);

      // Check if we're in lead capture mode
      if (leadCaptureStepRef.current && leadCaptureStepRef.current !== 'complete') {
        await handleLeadCapture(text.trim());
        return;
      }

      // Check if user wants to start lead capture
      if (text.toLowerCase().includes('book') || text.toLowerCase().includes('call') || text.toLowerCase().includes('contact')) {
        await handleLeadCapture(text.trim());
        return;
      }

      setIsTyping(true);

      try {
        // Small delay for natural feel
        await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 800));

        const response = await generateBotResponse(text.trim(), messagesRef.current);

        const botMsg: ChatMessage = {
          id: uuidv4(),
          text: response.text,
          sender: 'bot',
          timestamp: Date.now(),
          quickReplies: response.quickReplies,
        };

        addMessage(botMsg);

        // Auto-trigger lead capture after N messages if enabled and no lead data
        const userMsgCount = messagesRef.current.filter((m) => m.sender === 'user').length;
        if (
          settings.leadCaptureEnabled &&
          userMsgCount >= settings.leadCaptureAutoTrigger &&
          !leadDataRef.current.name &&
          !leadCaptureStepRef.current
        ) {
          setTimeout(() => {
            handleLeadCapture('');
          }, 1500);
        }
      } catch (error) {
        console.error('Chatbot error:', error);
        addMessage({
          id: uuidv4(),
          text: "I'm having trouble connecting right now. Please try again in a moment, or email us at support@controvallc.com.",
          sender: 'bot',
          timestamp: Date.now(),
          quickReplies: [
            { label: 'Send Email', value: 'Email us', action: 'external', url: 'mailto:support@controvallc.com' },
            { label: 'Try Again', value: 'Try again', action: 'message' },
          ],
        });
      } finally {
        setIsTyping(false);
      }
    },
    [addMessage, handleLeadCapture, settings]
  );

  const sendQuickReply = useCallback(
    (reply: { label: string; value: string; action: string; url?: string }) => {
      if (reply.action === 'navigate' && reply.url) {
        window.location.href = reply.url;
        return;
      }
      if (reply.action === 'external' && reply.url) {
        window.open(reply.url, '_blank');
        return;
      }
      if (reply.action === 'lead_capture') {
        sendMessage(reply.value);
        return;
      }
      if (reply.action === 'human_handoff') {
        sendMessage('I want to talk to a human expert');
        return;
      }
      sendMessage(reply.value);
    },
    [sendMessage]
  );

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: uuidv4(),
        text: defaultSettings.greetingMessage,
        sender: 'bot',
        timestamp: Date.now(),
        quickReplies: [
          { label: 'Our Services', value: 'What services do you offer?', action: 'message' },
          { label: 'Pricing', value: 'How much do your services cost?', action: 'message' },
          { label: 'Book a Call', value: 'I want to book a strategy call', action: 'lead_capture' },
          { label: 'Case Studies', value: 'Show me your case studies', action: 'message' },
        ],
      },
    ]);
    setLeadData({});
    setLeadCaptureStep(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isLeadCaptureActive = leadCaptureStep !== null && leadCaptureStep !== 'complete';

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        isTyping,
        hasInteracted,
        leadData,
        leadCaptureStep,
        sessionId,
        unreadCount,
        settings,
        activeProvider,
        sendMessage,
        sendQuickReply,
        toggleChat,
        openChat,
        closeChat,
        clearChat,
        isLeadCaptureActive,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error('useChatbot must be used inside ChatbotProvider');
  return ctx;
}
