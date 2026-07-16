import type { QuickReply } from '@/types/chatbot';

// ============================================================
// FALLBACK RESPONSE TEMPLATES
// Used when OpenAI API is unavailable or for structured responses
// ============================================================

export interface FallbackResponse {
  text: string;
  quickReplies?: QuickReply[];
}

// Greeting responses
export const greetingResponses: FallbackResponse[] = [
  {
    text: "Hello! Welcome to Controva LLC. I'm your AI assistant, ready to help you scale your business. What can I help you with today?",
    quickReplies: [
      { label: 'Our Services', value: 'What services do you offer?', action: 'message' },
      { label: 'Pricing', value: 'How much do your services cost?', action: 'message' },
      { label: 'Book a Call', value: 'I want to book a strategy call', action: 'lead_capture' },
      { label: 'Case Studies', value: 'Show me your case studies', action: 'message' },
    ],
  },
  {
    text: "Hey there! Ready to grow your business? I'm here to answer questions about our services, pricing, or help you book a free strategy call.",
    quickReplies: [
      { label: 'View Services', value: 'Tell me about your services', action: 'message' },
      { label: 'See Pricing', value: 'What are your pricing plans?', action: 'message' },
      { label: 'Talk to Expert', value: 'I want to speak with an expert', action: 'lead_capture' },
    ],
  },
];

// Service inquiry responses
export const serviceResponses: FallbackResponse[] = [
  {
    text: "We offer six core services designed to scale your business: (1) Custom Web & Mobile Development, (2) Social Media Marketing, (3) E-commerce Scaling, (4) AI Automation & Lead Systems, (5) Enterprise Infrastructure, and (6) Brand Identity Design. Which area interests you most?",
    quickReplies: [
      { label: 'Web Development', value: 'Tell me about web development', action: 'message' },
      { label: 'AI Automation', value: 'Tell me about AI automation', action: 'message' },
      { label: 'E-commerce', value: 'Tell me about e-commerce services', action: 'message' },
      { label: 'Marketing', value: 'Tell me about marketing services', action: 'message' },
    ],
  },
];

// Pricing responses
export const pricingResponses: FallbackResponse[] = [
  {
    text: "We offer three tiers: Starter ($3,500/mo), Growth ($6,500/mo — our most popular), and Enterprise ($12,000/mo). All plans include our 30-Day Profit Guarantee. Individual services start from $2,500/mo. Would you like details on a specific plan?",
    quickReplies: [
      { label: 'Starter Plan', value: 'Tell me about the Starter plan', action: 'message' },
      { label: 'Growth Plan', value: 'Tell me about the Growth plan', action: 'message' },
      { label: 'Enterprise Plan', value: 'Tell me about the Enterprise plan', action: 'message' },
      { label: 'Get Custom Quote', value: 'I need a custom quote', action: 'lead_capture' },
    ],
  },
];

// Case study responses
export const caseStudyResponses: FallbackResponse[] = [
  {
    text: "We've delivered exceptional results across 8+ major projects. Highlights include: DTX Realty (+45% leads), IQAAI (10,000 leads/day automated), Lumiuns (-32% bounce rate, +18% conversion), and a $10M Shopify Plus migration with 42% higher mobile conversions. Want to hear about a specific case study?",
    quickReplies: [
      { label: 'DTX Realty', value: 'Tell me about the DTX Realty case study', action: 'message' },
      { label: 'IQAAI', value: 'Tell me about the IQAAI case study', action: 'message' },
      { label: 'Shopify Migration', value: 'Tell me about the Shopify migration', action: 'message' },
      { label: 'View All', value: 'Show me all case studies', action: 'navigate', url: '/case-studies' },
    ],
  },
];

// Team responses
export const teamResponses: FallbackResponse[] = [
  {
    text: "Our leadership team brings deep expertise across engineering, strategy, growth, and design: Muhammad Aafaq (Founder & Lead Engineer), Muhammad Ahsan Ali (Co-Founder & Director), Waheeb Ullah (Director of Growth), and Nida Siyal (Creative Director). Each leader drives excellence in their domain.",
    quickReplies: [
      { label: 'About the Founder', value: 'Tell me about Muhammad Aafaq', action: 'message' },
      { label: 'Growth Team', value: 'Tell me about the growth team', action: 'message' },
      { label: 'View Team Page', value: 'View full team', action: 'navigate', url: '/about' },
    ],
  },
];

// Process responses
export const processResponses: FallbackResponse[] = [
  {
    text: "Our 4-step process is designed for speed and results: (1) Strategy Call — We audit your market and build a custom growth blueprint. (2) System Build — Your website, funnels, and automation go live within 14 days. (3) Launch & Optimize — Paid campaigns scale while AI optimizes conversion. (4) Profit or Refund — You hit revenue targets, or we refund 100%.",
    quickReplies: [
      { label: 'Book Strategy Call', value: 'I want to book a strategy call', action: 'lead_capture' },
      { label: 'Learn More', value: 'Tell me more about your process', action: 'message' },
      { label: 'View Services', value: 'What services do you offer?', action: 'message' },
    ],
  },
];

// Contact responses
export const contactResponses: FallbackResponse[] = [
  {
    text: "You can reach us at support@controvallc.com. The best way to get started is to book a free strategy call — we'll audit your business and create a custom growth blueprint. Our team typically responds within 2 hours.",
    quickReplies: [
      { label: 'Book Strategy Call', value: 'I want to book a strategy call', action: 'lead_capture' },
      { label: 'Send Email', value: 'I want to send an email', action: 'external', url: 'mailto:support@controvallc.com' },
      { label: 'View Contact Page', value: 'View contact page', action: 'navigate', url: '/contact' },
    ],
  },
];

// Blog responses
export const blogResponses: FallbackResponse[] = [
  {
    text: "We publish deep technical and strategic content on our blog. Recent topics include: Headless Shopify ROI, AI Automation Pipelines, B2B Lead Generation, Interactive Case Studies, Zero-Shift Rendering, Performance Marketing, and AI Sales Development Reps. Which topic interests you?",
    quickReplies: [
      { label: 'View All Blogs', value: 'Show me all blogs', action: 'navigate', url: '/blog' },
      { label: 'AI & Automation', value: 'Show me AI automation blogs', action: 'message' },
      { label: 'E-commerce', value: 'Show me e-commerce blogs', action: 'message' },
    ],
  },
];

// Lead capture trigger responses
export const leadCaptureResponses: FallbackResponse[] = [
  {
    text: "I'd love to connect you with the right expert! To get started, could you share your name?",
    quickReplies: [
      { label: 'Skip & Email', value: 'I prefer to email', action: 'external', url: 'mailto:support@controvallc.com' },
    ],
  },
];

// Human handoff responses
export const humanHandoffResponses: FallbackResponse[] = [
  {
    text: "I'll connect you with a human expert right away. In the meantime, please share your name and email so our team can reach you directly.",
    quickReplies: [
      { label: 'Leave Details', value: 'I want to leave my contact details', action: 'lead_capture' },
      { label: 'Send Email', value: 'I want to send an email', action: 'external', url: 'mailto:support@controvallc.com' },
    ],
  },
];

// Goodbye responses
export const goodbyeResponses: FallbackResponse[] = [
  {
    text: "Thanks for chatting! If you have any more questions, I'm here 24/7. Have a great day! 🚀",
    quickReplies: [
      { label: 'Book a Call', value: 'I want to book a strategy call', action: 'lead_capture' },
      { label: 'View Services', value: 'What services do you offer?', action: 'message' },
    ],
  },
];

// Fallback / unknown responses
export const fallbackResponses: FallbackResponse[] = [
  {
    text: "That's a great question! I want to make sure I give you the most accurate answer. Let me connect you with one of our experts who can help. Could you share your name and email?",
    quickReplies: [
      { label: 'Leave Details', value: 'I want to leave my contact details', action: 'lead_capture' },
      { label: 'View Services', value: 'What services do you offer?', action: 'message' },
      { label: 'See Pricing', value: 'What are your pricing plans?', action: 'message' },
    ],
  },
  {
    text: "I don't have a specific answer for that, but our team definitely does! Would you like me to connect you with an expert? Just share your contact details.",
    quickReplies: [
      { label: 'Talk to Expert', value: 'I want to speak with an expert', action: 'lead_capture' },
      { label: 'View FAQ', value: 'Show me frequently asked questions', action: 'message' },
    ],
  },
];

// Small talk responses
export const smallTalkResponses: FallbackResponse[] = [
  {
    text: "I'm doing great, thanks for asking! Ready to help you grow your business. What can I assist you with today?",
    quickReplies: [
      { label: 'Our Services', value: 'What services do you offer?', action: 'message' },
      { label: 'Pricing', value: 'How much do your services cost?', action: 'message' },
    ],
  },
];

// Get a random response from a category
export function getRandomResponse(responses: FallbackResponse[]): FallbackResponse {
  return responses[Math.floor(Math.random() * responses.length)];
}
