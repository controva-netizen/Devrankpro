import type { ChatMessage, ChatbotIntent, KnowledgeEntry, LeadCaptureStep, LeadData } from '@/types/chatbot';
import { findKnowledgeByQuery, getAllKnowledge } from '@/data/chatbot-knowledge';
import {
  getRandomResponse,
  greetingResponses,
  serviceResponses,
  pricingResponses,
  caseStudyResponses,
  teamResponses,
  contactResponses,
  blogResponses,
  leadCaptureResponses,
  humanHandoffResponses,
  goodbyeResponses,
  fallbackResponses,
  smallTalkResponses,
} from '@/data/chatbot-responses';
import { callAIProvider, getActiveProvider, isProviderAvailable, type AIProvider } from '@/lib/ai-providers';

// ============================================================
// CHATBOT ENGINE
// Hybrid: Multi-Provider AI (OpenAI, Claude, DeepSeek, Gemini, Llama) + Smart Fallback
// ============================================================

// Intent classification keywords
const intentPatterns: Record<ChatbotIntent, string[]> = {
  greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'hola', 'sup'],
  service_inquiry: ['service', 'what do you do', 'what do you offer', 'capabilities', 'solutions', 'web dev', 'marketing', 'ecommerce', 'ai', 'automation', 'shopify', 'app development', 'mobile app', 'branding', 'design'],
  pricing_inquiry: ['price', 'pricing', 'cost', 'how much', 'fee', 'rates', 'budget', 'plan', 'tier', 'starter', 'growth', 'enterprise', 'expensive', 'cheap', 'afford'],
  case_study_inquiry: ['case study', 'portfolio', 'client', 'result', 'work', 'project', 'past', 'example', 'success', 'dtx', 'iqaai', 'imaginestudio', 'lumiuns', 'signage'],
  team_inquiry: ['team', 'who works', 'founder', 'ceo', 'leadership', 'staff', 'employee', 'muhammad aafaq', 'ahsan', 'waheeb', 'nida', 'engineer'],
  blog_inquiry: ['blog', 'article', 'post', 'read', 'content', 'news', 'insights', 'headless shopify', 'ai automation', 'b2b funnel'],
  contact_inquiry: ['contact', 'email', 'phone', 'call', 'reach', 'talk', 'speak', 'message', 'support', 'help', 'book a call', 'schedule', 'meeting'],
  lead_capture: ['book', 'demo', 'consultation', 'strategy call', 'get started', 'sign up', 'register', 'quote', 'proposal', 'interested', 'want to hire', 'work with you', 'start project'],
  human_handoff: ['human', 'agent', 'person', 'real person', 'talk to someone', 'representative', 'sales', 'not helpful', 'doesn\'t work', 'wrong answer'],
  goodbye: ['bye', 'goodbye', 'see you', 'later', 'talk soon', 'thanks', 'thank you', 'done', 'exit', 'close'],
  fallback: [],
  small_talk: ['how are you', 'what\'s up', 'how is it going', 'nice day', 'weather', 'joke', 'funny'],
};

// Classify user intent from text
export function classifyIntent(text: string): ChatbotIntent {
  const lower = text.toLowerCase().trim();

  // Check each intent pattern
  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    if (intent === 'fallback') continue;
    for (const pattern of patterns) {
      if (lower.includes(pattern)) {
        return intent as ChatbotIntent;
      }
    }
  }

  return 'fallback';
}

// Build system prompt for AI with knowledge injection
function buildSystemPrompt(relevantKnowledge: KnowledgeEntry[]): string {
  const knowledgeContext = relevantKnowledge
    .map((k) => `[${k.category.toUpperCase()}] ${k.title}: ${k.content}`)
    .join('\n\n');

  return `You are the AI assistant for Controva LLC, an engineering-driven digital growth agency. You help website visitors learn about our services, pricing, team, case studies, and blog content. You are professional, knowledgeable, and concise.

CRITICAL RULES:
- Answer ONLY based on the provided knowledge context below. Do not make up information.
- If you don't know something, say "I don't have that specific information, but I'd be happy to connect you with our team."
- Keep responses under 120 words. Use bullet points for lists.
- Be friendly but professional. Use emojis sparingly (max 1 per response).
- Always end with a subtle CTA when relevant: "Would you like to book a free strategy call?" or "Want to learn more about [topic]?"
- If the user seems ready to buy or wants to talk to someone, suggest leaving their contact details.

KNOWLEDGE CONTEXT:
${knowledgeContext}

COMPANY INFO:
- Website: https://www.controvallc.com
- Email: support@controvallc.com
- Focus: We prioritize sub-second latency and custom VoIP architectures over generic templates.
- Process: Audit, Engineering, Load Testing, SLA Guarantee.
- Guarantee: Enterprise-grade SLA & Falsifiable Deployment Outcomes`;
}

// Get preferred AI provider (from localStorage or auto-detect)
function getPreferredProvider(): AIProvider {
  const saved = localStorage.getItem('controva_ai_provider') as AIProvider | null;
  if (saved && isProviderAvailable(saved)) return saved;
  
  const active = getActiveProvider();
  if (active !== 'fallback') return active;
  
  return 'fallback';
}

// Save preferred provider
export function savePreferredProvider(provider: AIProvider): void {
  localStorage.setItem('controva_ai_provider', provider);
}

// Call AI with multi-provider support
export async function callAI(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[]
): Promise<string | null> {
  const provider = getPreferredProvider();
  
  if (provider === 'fallback') {
    return null;
  }

  const systemPrompt = messages.find((m) => m.role === 'system')?.content || '';
  const conversationMessages = messages.filter((m) => m.role !== 'system').map((m) => ({
    role: m.role,
    content: m.content,
  }));

  return await callAIProvider(provider, systemPrompt, conversationMessages);
}

// Legacy OpenAI call (kept for backward compatibility)
export async function callOpenAI(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[]
): Promise<string | null> {
  return callAI(messages);
}

// Main response generator
export async function generateBotResponse(
  userMessage: string,
  _conversationHistory: ChatMessage[]
): Promise<{ text: string; quickReplies?: { label: string; value: string; action: string; url?: string }[] }> {
  const intent = classifyIntent(userMessage);

  // Handle special intents with structured flows
  switch (intent) {
    case 'greeting':
      return getRandomResponse(greetingResponses);
    case 'goodbye':
      return getRandomResponse(goodbyeResponses);
    case 'small_talk':
      return getRandomResponse(smallTalkResponses);
    case 'human_handoff':
      return getRandomResponse(humanHandoffResponses);
    case 'lead_capture':
      return getRandomResponse(leadCaptureResponses);
  }

  // Find relevant knowledge
  const relevantKnowledge = findKnowledgeByQuery(userMessage).slice(0, 5);

  // If no knowledge found, use category-specific fallback
  if (relevantKnowledge.length === 0) {
    switch (intent) {
      case 'service_inquiry':
        return getRandomResponse(serviceResponses);
      case 'pricing_inquiry':
        return getRandomResponse(pricingResponses);
      case 'case_study_inquiry':
        return getRandomResponse(caseStudyResponses);
      case 'team_inquiry':
        return getRandomResponse(teamResponses);
      case 'blog_inquiry':
        return getRandomResponse(blogResponses);
      case 'contact_inquiry':
        return getRandomResponse(contactResponses);
      default:
        return getRandomResponse(fallbackResponses);
    }
  }

  // Try AI with knowledge context (multi-provider)
  const systemPrompt = buildSystemPrompt(relevantKnowledge);
  const recentHistory = _conversationHistory
    .slice(-6)
    .map((msg) => ({
      role: msg.sender === 'user' ? 'user' : ('assistant' as 'user' | 'assistant'),
      content: msg.text,
    }));

  const aiResponse = await callAI([
    { role: 'system', content: systemPrompt },
    ...recentHistory,
    { role: 'user', content: userMessage },
  ]);

  if (aiResponse) {
    // Generate quick replies based on intent
    const quickReplies = generateQuickReplies(intent, relevantKnowledge[0]);
    return { text: aiResponse, quickReplies };
  }

  // Fallback to knowledge-based response
  const topKnowledge = relevantKnowledge[0];
  const fallbackText = `${topKnowledge.content}\n\nWould you like to know more about this or explore our other services?`;
  return {
    text: fallbackText,
    quickReplies: generateQuickReplies(intent, topKnowledge),
  };
}

// Generate contextual quick replies based on intent and knowledge
function generateQuickReplies(
  intent: ChatbotIntent,
  _knowledge: KnowledgeEntry
): { label: string; value: string; action: string; url?: string }[] {
  const common = [
    { label: 'Book a Call', value: 'I want to book a strategy call', action: 'lead_capture' },
  ];

  switch (intent) {
    case 'service_inquiry':
      return [
        { label: 'View Pricing', value: 'How much does this cost?', action: 'message' },
        { label: 'See Case Studies', value: 'Show me relevant case studies', action: 'message' },
        ...common,
      ];
    case 'pricing_inquiry':
      return [
        { label: 'Starter Plan', value: 'Tell me about Starter', action: 'message' },
        { label: 'Growth Plan', value: 'Tell me about Growth', action: 'message' },
        { label: 'Enterprise', value: 'Tell me about Enterprise', action: 'message' },
        ...common,
      ];
    case 'case_study_inquiry':
      return [
        { label: 'View All', value: 'Show all case studies', action: 'navigate', url: '/case-studies' },
        { label: 'Our Services', value: 'What services do you offer?', action: 'message' },
        ...common,
      ];
    case 'blog_inquiry':
      return [
        { label: 'Read Blog', value: 'Show me the blog', action: 'navigate', url: '/blog' },
        { label: 'Our Services', value: 'What services do you offer?', action: 'message' },
        ...common,
      ];
    case 'contact_inquiry':
      return [
        { label: 'Send Email', value: 'Email us', action: 'external', url: 'mailto:support@controvallc.com' },
        { label: 'Contact Page', value: 'View contact page', action: 'navigate', url: '/contact' },
        ...common,
      ];
    default:
      return [
        { label: 'Our Services', value: 'What services do you offer?', action: 'message' },
        { label: 'Pricing', value: 'How much do you charge?', action: 'message' },
        ...common,
      ];
  }
}

// Lead capture flow logic
export function getLeadCaptureResponse(
  step: LeadCaptureStep,
  leadData: Partial<LeadData>
): { text: string; nextStep: LeadCaptureStep; quickReplies?: { label: string; value: string; action: string }[] } {
  switch (step) {
    case null:
    case undefined:
      return {
        text: "I'd love to connect you with the right expert! To get started, could you share your name?",
        nextStep: 'name',
        quickReplies: [{ label: 'Skip for now', value: 'skip', action: 'message' }],
      };
    case 'name':
      return {
        text: `Great to meet you, ${leadData.name || 'there'}! What's the best email to reach you?`,
        nextStep: 'email',
      };
    case 'email':
      return {
        text: "Thanks! And your phone number (optional but recommended for faster response)?",
        nextStep: 'phone',
        quickReplies: [
          { label: 'Skip phone', value: 'skip phone', action: 'message' },
        ],
      };
    case 'phone':
      return {
        text: "What service are you most interested in?",
        nextStep: 'interest',
        quickReplies: [
          { label: 'Web Development', value: 'Web Development', action: 'message' },
          { label: 'AI Automation', value: 'AI Automation', action: 'message' },
          { label: 'E-commerce', value: 'E-commerce', action: 'message' },
          { label: 'Marketing', value: 'Marketing', action: 'message' },
          { label: 'Other', value: 'Other', action: 'message' },
        ],
      };
    case 'interest':
      return {
        text: "Perfect! I've sent your details to our team. You'll hear back within 2 hours. Meanwhile, feel free to ask me anything else! 🚀",
        nextStep: 'complete',
        quickReplies: [
          { label: 'Our Services', value: 'What services do you offer?', action: 'message' },
          { label: 'Pricing', value: 'How much do you charge?', action: 'message' },
          { label: 'Case Studies', value: 'Show me case studies', action: 'message' },
        ],
      };
    case 'complete':
      return {
        text: "You've already shared your details with us! Our team will reach out within 2 hours. In the meantime, what else can I help you with?",
        nextStep: 'complete',
      };
    default:
      return {
        text: "Could you share that information again? I want to make sure I have it right.",
        nextStep: step,
      };
  }
}

// Validate lead data step
export function validateLeadStep(step: LeadCaptureStep, value: string): boolean {
  switch (step) {
    case 'name':
      return value.trim().length >= 2;
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    case 'phone':
      return value.trim() === '' || value.trim().length >= 7;
    case 'interest':
      return value.trim().length >= 2;
    default:
      return true;
  }
}

// Calculate lead score based on data completeness
export function calculateLeadScore(leadData: Partial<LeadData>): number {
  let score = 0;
  if (leadData.name) score += 2;
  if (leadData.email) score += 3;
  if (leadData.phone) score += 2;
  if (leadData.interest) score += 2;
  if (leadData.budget) score += 1;
  return score;
}

// Export for admin panel
export { getAllKnowledge };
