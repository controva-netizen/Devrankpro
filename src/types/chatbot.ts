// ============================================================
// CHATBOT TYPES
// ============================================================

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: number;
  quickReplies?: { label: string; value: string; action: string; url?: string }[];
  isLeadCapture?: boolean;
  leadCaptureStep?: LeadCaptureStep;
}

export interface QuickReply {
  label: string;
  value: string;
  action: 'navigate' | 'message' | 'lead_capture' | 'external' | 'human_handoff';
  url?: string;
}

export type LeadCaptureStep = 'name' | 'email' | 'phone' | 'interest' | 'budget' | 'complete' | null;

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  budget?: string;
  timeline?: string;
  notes?: string;
  pagePath?: string;
}

export interface LeadRecord extends LeadData {
  id: string;
  conversationId: string;
  leadScore: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  whatsappNotified: boolean;
  createdAt: string;
}

export interface ChatbotConversation {
  id: string;
  sessionId: string;
  messages: ChatMessage[];
  leadData?: Partial<LeadData>;
  pagePath: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeEntry {
  id: string;
  category: KnowledgeCategory;
  keywords: string[];
  title: string;
  content: string;
  relatedEntries?: string[];
  sourceUrl?: string;
}

export type KnowledgeCategory =
  | 'service'
  | 'pricing'
  | 'case_study'
  | 'team'
  | 'blog'
  | 'process'
  | 'faq'
  | 'general'
  | 'value_prop';

export interface ChatbotSettings {
  botName: string;
  greetingMessage: string;
  tone: 'professional' | 'friendly' | 'technical';
  proactiveEnabled: boolean;
  proactiveDelay: number;
  proactiveMessage: string;
  leadCaptureEnabled: boolean;
  leadCaptureAutoTrigger: number;
  openaiApiKey?: string;
  openaiModel: string;
  whatsappProvider: 'callmebot' | 'whatsapp_business' | 'none';
  whatsappCallmebotPhone?: string;
  whatsappCallmebotApiKey?: string;
  whatsappBusinessPhoneId?: string;
  whatsappBusinessAccessToken?: string;
  requiredLeadFields: ('name' | 'email' | 'phone' | 'interest')[];
}

export interface ChatbotStats {
  totalConversations: number;
  totalLeads: number;
  conversionRate: number;
  avgSessionDuration: number;
  aiResponseRate: number;
  fallbackRate: number;
}

export type ChatbotIntent =
  | 'greeting'
  | 'service_inquiry'
  | 'pricing_inquiry'
  | 'case_study_inquiry'
  | 'team_inquiry'
  | 'blog_inquiry'
  | 'contact_inquiry'
  | 'lead_capture'
  | 'human_handoff'
  | 'goodbye'
  | 'fallback'
  | 'small_talk';
