import type { KnowledgeEntry } from '@/types/chatbot';

// ============================================================
// CHATBOT KNOWLEDGE BASE
// Complete business information for AI context injection
// ============================================================

export const knowledgeBase: KnowledgeEntry[] = [
  // ── GENERAL / COMPANY ─────────────────────────────────────
  {
    id: 'general-about',
    category: 'general',
    keywords: ['about', 'company', 'who are you', 'what is controva', 'controva llc'],
    title: 'About Controva LLC',
    content: `Controva LLC is an engineering-driven digital infrastructure agency. We build highly concurrent VoIP architectures, configure FreeSWITCH and Kamailio, and deploy sub-second latency Voice AI agents for enterprises. We are not a typical agency — we are low-level network engineers who understand scale. Our motto: "We tie our success to system stability. If the latency spikes, we take the hit."`,
  },
  {
    id: 'general-mission',
    category: 'general',
    keywords: ['mission', 'values', 'philosophy', 'why controva', 'what makes you different'],
    title: 'Mission & Values',
    content: `Our four core values are: (1) Engineering Excellence — clean, performant network code. (2) Radical Transparency — you see raw SIP traces and latency benchmarks. (3) SLA Accountability — we tie our success to system stability. (4) Sub-second Speeds — we optimize every packet for minimum latency.`,
  },
  {
    id: 'general-guarantee',
    category: 'value_prop',
    keywords: ['guarantee', 'sla', 'latency', 'performance', 'benchmark'],
    title: 'Enterprise-grade SLA',
    content: `We guarantee sub-second latency benchmarks and provide falsifiable deployment outcomes. Our Enterprise-grade SLA ensures production readiness for all VoIP and AI implementations. This applies to our Growth and Enterprise tiers.`,
  },
  {
    id: 'general-stats',
    category: 'general',
    keywords: ['stats', 'numbers', 'calls', 'results', 'clients', 'latency'],
    title: 'Company Stats',
    content: `Key metrics: 500M+ calls routed. <600ms AI Voice Latency. 99.99% Infrastructure Uptime. 0.5s Call Setup Time. We manage over 50,000 concurrent calls for our largest deployments.`,
  },
  {
    id: 'general-contact',
    category: 'general',
    keywords: ['contact', 'email', 'phone', 'reach', 'support', 'call', 'book', 'strategy call'],
    title: 'Contact Information',
    content: `You can reach us at support@controvallc.com. You can also book a free architecture audit on our website — we'll audit your infrastructure and design a scalable VoIP or AI blueprint. Our engineering team typically responds within 2 hours during business hours.`,
  },

  // ── SERVICES ──────────────────────────────────────────────
  {
    id: 'service-voip-arch',
    category: 'service',
    keywords: ['voip architecture', 'sip trunking', 'webrtc', 'rtp', 'media routing'],
    title: 'Custom VoIP Architecture',
    content: `We architect distributed SIP and media networks that scale. High-availability SIP trunking, WebRTC, and RTP media routing built for massive concurrency. Features include SIP Trunking, RTP Proxy / RTPEngine, Carrier Interconnects, High Availability Clusters, and STUN/TURN configurations. Pricing starts from $5,000.`,
  },
  {
    id: 'service-freeswitch',
    category: 'service',
    keywords: ['freeswitch', 'kamailio', 'sip proxy', 'load balancing', 'dialplan'],
    title: 'FreeSWITCH & Kamailio',
    content: `Enterprise-grade switch configuration, ESL module development, and Kamailio load balancing. We deploy Kamailio as a highly available SIP proxy to distribute traffic and protect your media servers. Features include Kamailio SIP Proxy, FreeSWITCH Media Server, ESL Automation, Custom C/C++ Modules, and NAT Traversal. Pricing starts from $4,000.`,
  },
  {
    id: 'service-voice-ai',
    category: 'service',
    keywords: ['voice ai', 'agents', 'deepgram', 'cartesia', 'llm', 'conversational ai'],
    title: 'Voice AI Agents',
    content: `Sub-second latency conversational AI using Deepgram, Cartesia, and custom LLM integration. We build autonomous, ultra-low latency conversational agents for inbound support and outbound qualification over phone lines. Features include Deepgram STT, Cartesia TTS, LLM Integration, VAD optimization, and sub-second latency. Pricing starts from $8,000.`,
  },
  {
    id: 'service-webrtc',
    category: 'service',
    keywords: ['webrtc', 'softphone', 'video conferencing', 'stun', 'turn'],
    title: 'WebRTC & App Integration',
    content: `Browser-based softphones and secure video conferencing with optimized STUN/TURN routing. We bridge the gap between web browsers, mobile apps, and the PSTN. Features include SIP.js / JsSIP, React Native WebRTC, Secure Signaling (WSS), Video Conferencing, and Screen Sharing.`,
  },
  {
    id: 'service-infrastructure',
    category: 'service',
    keywords: ['devops', 'infrastructure', 'cloud', 'docker', 'kubernetes', 'aws', 'hosting', 'server'],
    title: 'Enterprise DevOps',
    content: `Scalable cloud infrastructure tailored for real-time UDP media and high availability. Docker deployments, Kubernetes, Anycast IP, and SIP failover clusters. We ensure 99.99% uptime SLA for critical voice infrastructure. Pricing starts from $3,000/month.`,
  },
  {
    id: 'service-middleware',
    category: 'service',
    keywords: ['api', 'middleware', 'telecom', 'crm', 'billing', 'stripe', 'cdr'],
    title: 'Telecom API Middleware',
    content: `Bridging legacy SIP networks with modern REST/GraphQL APIs and CRM platforms. Connecting raw CDR (Call Detail Record) outputs into structured billing platforms and enterprise CRMs. Features include CDR Processing, Stripe Billing, HubSpot/Salesforce integration, and WebSocket Events. Pricing starts from $3,500.`,
  },

  // ── PRICING ───────────────────────────────────────────────
  {
    id: 'pricing-starter',
    category: 'pricing',
    keywords: ['starter', 'starter plan', 'basic', 'beginner', '$5000', '5000'],
    title: 'Starter Plan - $5,000',
    content: `Starter Plan ($5,000): For businesses launching their first VoIP or Voice AI implementation. Includes: Initial Architecture Audit, FreeSWITCH Setup, Basic SIP Routing, Standard Documentation, and Email support.`,
  },
  {
    id: 'pricing-growth',
    category: 'pricing',
    keywords: ['growth', 'growth plan', 'popular', '$9500', '9500', 'most popular'],
    title: 'Growth Plan - $9,500 (Most Popular)',
    content: `Growth Plan ($9,500): For businesses requiring high availability and advanced integrations. Includes: Kamailio Load Balancing, Custom Voice AI Agent, CRM API Integration, Load Testing, Weekly strategy calls, and Falsifiable Deployment Outcomes.`,
  },
  {
    id: 'pricing-enterprise',
    category: 'pricing',
    keywords: ['enterprise', 'enterprise plan', 'custom', '$18000', '18000', 'dedicated'],
    title: 'Enterprise Plan - $18,000+',
    content: `Enterprise Plan ($18,000+): For carriers and enterprises demanding massive concurrent scale. Includes: Geo-redundant Clusters, Custom C/C++ Modules, Advanced AI Automation, Dedicated engineering team, Custom dashboards, and our Enterprise-grade SLA.`,
  },
  {
    id: 'pricing-detailed',
    category: 'pricing',
    keywords: ['pricing', 'cost', 'how much', 'price', 'fee', 'rates', 'budget'],
    title: 'Pricing Overview',
    content: `We offer three tiers: Starter ($5,000), Growth ($9,500 — most popular), and Enterprise ($18,000+). All include our Enterprise-grade SLA. Individual services: VoIP Architecture from $5,000, FreeSWITCH Config from $4,000, Kamailio Load Balancing from $6,000, Voice AI Agents from $8,000, Telecom Middleware from $3,500, DevOps from $3,000/mo.`,
  },

  // ── CASE STUDIES ──────────────────────────────────────────
  {
    id: 'case-globalsip',
    category: 'case_study',
    keywords: ['globalsip', 'kamailio', 'carrier', 'infrastructure', 'proxy'],
    title: 'Case Study: GlobalSIP',
    content: `GlobalSIP — Carrier Infrastructure. Engineered a highly available Kamailio proxy layer handling 50,000 concurrent calls, drastically reducing dropped connections. Metrics: 50k CPS, <5ms Proxy Latency, Geo-scale deployment.`,
  },
  {
    id: 'case-voicebot-ai',
    category: 'case_study',
    keywords: ['voicebot', 'ai', 'voice agent', 'deepgram', 'cartesia'],
    title: 'Case Study: VoiceBot AI',
    content: `VoiceBot AI — AI Voice Agents. Built a Deepgram + Cartesia powered voice agent for inbound logistics support with an average response latency of 600ms. Metrics: 600ms Time-To-First-Byte (TTFB), 80% Containment, Cartesia TTS integration.`,
  },
  {
    id: 'case-webrtc-health',
    category: 'case_study',
    keywords: ['webrtc', 'telehealth', 'stun', 'turn', 'video'],
    title: 'Case Study: WebRTC Health',
    content: `WebRTC Health — Telehealth Video. Developed a HIPAA-compliant WebRTC telehealth portal using custom STUN/TURN servers to bypass strict hospital firewalls. Metrics: 99.99% Connect rate, WebRTC custom signaling, HIPAA compliant.`,
  },
  {
    id: 'case-switchcore',
    category: 'case_study',
    keywords: ['switchcore', 'freeswitch', 'cluster', 'aws', 'kubernetes'],
    title: 'Case Study: SwitchCore',
    content: `SwitchCore — Media Server Cluster. Deployed an auto-scaling FreeSWITCH cluster on AWS orchestrated via Kubernetes, handling dynamic traffic spikes during live events. Metrics: Auto-scaling enabled, FreeSWITCH optimized, Docker containerized.`,
  },
  {
    id: 'case-legacy-pbx',
    category: 'case_study',
    keywords: ['legacy pbx', 'salesforce', 'crm', 'middleware', 'cdr'],
    title: 'Case Study: Legacy PBX Sync',
    content: `Legacy PBX Sync — Telecom API Middleware. Created an event-driven middleware to sync legacy PBX CDRs into Salesforce in real-time, automating enterprise billing. Metrics: API Bridge created, Real-time syncing, Salesforce integration.`,
  },

  // ── TEAM ──────────────────────────────────────────────────
  {
    id: 'team-aafaq',
    category: 'team',
    keywords: ['muhammad aafaq', 'aafaq', 'founder', 'lead engineer', 'ceo'],
    title: 'Team: Muhammad Aafaq — Founder & Lead Network Architect',
    content: `Muhammad Aafaq is the Founder & Lead Network Architect at Controva LLC. He is a visionary technical leader steering the company's VoIP architecture, building high-performance SIP networks and driving engineering excellence.`,
  },
  {
    id: 'team-ahsan',
    category: 'team',
    keywords: ['muhammad ahsan ali', 'ahsan', 'co founder', 'director', 'cofounder'],
    title: 'Team: Muhammad Ahsan Ali — Co-Founder & Director',
    content: `Muhammad Ahsan Ali is the Co-Founder & Director at Controva LLC. He is a strategic leader focused on expanding the company's footprint, ensuring operational success and leading high-level infrastructure initiatives.`,
  },
  {
    id: 'team-waheeb',
    category: 'team',
    keywords: ['waheeb ullah', 'waheeb', 'growth', 'director of growth', 'cmo'],
    title: 'Team: Waheeb Ullah — Director of Infrastructure',
    content: `Waheeb Ullah is the Director of Infrastructure at Controva LLC. He is a data-driven systems expert scaling client capacity through advanced deployment strategies and optimized network channels.`,
  },
  {
    id: 'team-armghan',
    category: 'team',
    keywords: ['armghan ahamd', 'armghan', 'creative director', 'design', 'creative'],
    title: 'Team: Armghan Ahamd — Director of Voice UX',
    content: `Armghan Ahamd is the Director of Voice UX at Controva LLC. He ensures every Voice AI project achieves stunning conversational flow, turn-taking accuracy, and outstanding user experience over phone lines.`,
  },

  // ── PROCESS ───────────────────────────────────────────────
  {
    id: 'process-overview',
    category: 'process',
    keywords: ['process', 'how it works', 'steps', 'workflow', 'onboarding', 'getting started'],
    title: 'Our 4-Step Engineering Process',
    content: `Our process: (1) Architecture Audit — We audit your infrastructure and design a scalable VoIP or AI blueprint. (2) System Engineering — We integrate FreeSWITCH, Kamailio, and custom Voice AI within 14 days. (3) Load Testing — Rigorous SIP traffic simulation and latency benchmarking to ensure stability. (4) SLA Guarantee — Falsifiable deployment outcomes with guaranteed sub-second latency.`,
  },

  // ── TESTIMONIALS ──────────────────────────────────────────
  {
    id: 'testimonials',
    category: 'general',
    keywords: ['testimonial', 'review', 'client feedback', 'success story', 'what clients say'],
    title: 'Client Testimonials',
    content: `Marcus Chen (CTO, Global Comm): "We were dropping 5% of calls during peak hours. Controva's Kamailio deployment fixed it overnight." Sarah Kimura (VP Engineering, AI Assist): "Their Voice AI latency is incredible. 600ms response times make the AI feel completely human." David Okafor (Director of IT, MedConnect): "The WebRTC portal they built bypassed all our firewall issues. Unmatched technical expertise."`,
  },

  // ── BLOGS (Summaries) ───────────────────────────────────
  {
    id: 'blog-kamailio-load-balancing',
    category: 'blog',
    keywords: ['kamailio', 'load balancing', 'freeswitch cluster', 'sip proxy'],
    title: 'Blog: Scaling FreeSWITCH with Kamailio',
    content: `Our blog post explains how to deploy Kamailio as a load balancer in front of a FreeSWITCH cluster. We detail the dispatcher module configuration and how to achieve active-active high availability for thousands of concurrent SIP sessions.`,
  },
  {
    id: 'blog-sub-second-voice-ai',
    category: 'blog',
    keywords: ['voice ai', 'latency', 'deepgram', 'cartesia', 'ttfb'],
    title: 'Blog: Achieving Sub-Second Voice AI',
    content: `Our blog post details how we eliminated latency in conversational AI. By streaming audio via WebSockets to Deepgram, piping the LLM text stream directly into Cartesia TTS, and optimizing VAD (Voice Activity Detection), we achieve <600ms response times.`,
  },

  // ── FAQ ───────────────────────────────────────────────────
  {
    id: 'faq-timezone',
    category: 'faq',
    keywords: ['timezone', 'hours', 'business hours', 'when available', 'response time'],
    title: 'FAQ: What are your support hours?',
    content: `We operate globally and our engineering team is distributed across multiple time zones. We typically respond to inquiries within 2 hours during business hours. For Enterprise clients, we offer 24/7 dedicated support with SLA guarantees.`,
  },
  {
    id: 'faq-industries',
    category: 'faq',
    keywords: ['industries', 'niche', 'vertical', 'who do you work with', 'clients'],
    title: 'FAQ: What types of clients do you serve?',
    content: `We primarily serve telecommunications carriers, B2B SaaS companies, enterprise contact centers, and healthcare providers. Our expertise is in highly concurrent, real-time media and Voice AI. If latency and uptime are critical to you, we can help.`,
  },
  {
    id: 'faq-contract',
    category: 'faq',
    keywords: ['contract', 'commitment', 'minimum term', 'cancel', 'month to month'],
    title: 'FAQ: Is there a long-term contract?',
    content: `Our VoIP architecture audits and initial setups are billed per project. Ongoing DevOps and Enterprise plans typically include a 3-month minimum to ensure proper load testing and SLA optimization.`,
  },
  {
    id: 'faq-results',
    category: 'faq',
    keywords: ['results', 'how long', 'timeline', 'when will i see', 'first lead', 'roi'],
    title: 'FAQ: How long until deployment?',
    content: `Most initial architectures are deployed within 14 days. Load testing and latency benchmarking are completed immediately after, providing falsifiable deployment outcomes and guaranteeing our sub-second latency SLA.`,
  },
  {
    id: 'faq-tech-stack',
    category: 'faq',
    keywords: ['tech stack', 'technologies', 'freeswitch', 'kamailio', 'webrtc', 'what do you use'],
    title: 'FAQ: What is your core tech stack?',
    content: `Our tech stack includes: FreeSWITCH, Kamailio, SIP.js, WebRTC, RTPEngine, Node.js, Python, C/C++, Docker, Kubernetes, AWS/GCP, Deepgram, Cartesia, and OpenAI Realtime API. We choose the right tool for high-performance network engineering.`,
  },
];

// Helper: get all knowledge entries
export function getAllKnowledge(): KnowledgeEntry[] {
  return knowledgeBase;
}

// Helper: get knowledge by category
export function getKnowledgeByCategory(category: string): KnowledgeEntry[] {
  return knowledgeBase.filter((k) => k.category === category);
}

// Helper: find knowledge by keyword match (scored)
export function findKnowledgeByQuery(query: string): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = knowledgeBase.map((entry) => {
    let score = 0;
    // Title match
    if (entry.title.toLowerCase().includes(lowerQuery)) score += 5;
    // Keyword match
    for (const kw of entry.keywords) {
      if (lowerQuery.includes(kw.toLowerCase())) score += 3;
    }
    // Content word match
    for (const word of words) {
      if (entry.content.toLowerCase().includes(word)) score += 1;
      if (entry.title.toLowerCase().includes(word)) score += 2;
    }
    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.entry);
}
