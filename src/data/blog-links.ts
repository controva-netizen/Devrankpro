import type { BlogPost } from '@/data/blog';

export interface ServiceLink {
  slug: string;
  path: string;
  title: string;
  blurb: string;
  /** Substrings matched against a post's slug, title and category. */
  keywords: string[];
}

export const serviceLinks: ServiceLink[] = [
  {
    slug: 'freeswitch-development',
    path: '/services/freeswitch-development',
    title: 'FreeSWITCH Development',
    blurb: 'Carrier-grade media servers, IVR, and call center logic built on FreeSWITCH.',
    keywords: ['freeswitch', 'asterisk', 'ivr', 'mod-callcenter', 'dialplan', 'sip-response', 'concurrency'],
  },
  {
    slug: 'kamailio-load-balancing',
    path: '/services/kamailio-load-balancing',
    title: 'Kamailio Load Balancing & SBC',
    blurb: 'Highly available SIP edge, load balancing, and session border control with Kamailio and rtpengine.',
    keywords: ['kamailio', 'sbc', 'session-border', 'load-balanc', 'horizontal-scaling', 'nat-traversal', 'sip-alg', 'sip-trunk', 'rtpengine', 'sip-response'],
  },
  {
    slug: 'custom-voip-development',
    path: '/services/custom-voip-development',
    title: 'Custom VoIP Development',
    blurb: 'Purpose-built VoIP platforms: multi-tenant, white-label, and carrier-direct.',
    keywords: ['voip', 'pbx', 'multi-tenant', 'white-label', 'migrat', 'number-port', 'byoc', 'cpaas', 'ucaas', 'sip-alg', 'sip-trunk', 'ringcentral'],
  },
  {
    slug: 'telecom-api-middleware',
    path: '/services/telecom-api-middleware',
    title: 'Telecom API & Middleware',
    blurb: 'Carrier abstraction, CRM integrations, and routing layers that remove vendor lock-in.',
    keywords: ['twilio', 'cpaas', 'salesforce', 'hubspot', 'integration', 'byoc', 'api', 'carrier', 'stir-shaken', 'number-port'],
  },
  {
    slug: 'enterprise-voip-devops',
    path: '/services/enterprise-voip-devops',
    title: 'Enterprise VoIP DevOps',
    blurb: 'Monitoring, load testing, failover, and SLA engineering for production telephony.',
    keywords: ['sla', 'uptime', 'disaster', 'failover', 'testing', 'monitor', 'quality', 'load-testing', 'devops', 'e911'],
  },
  {
    slug: 'healthcare-voip-usa',
    path: '/services/healthcare-voip-usa',
    title: 'Healthcare VoIP Engineering',
    blurb: 'HIPAA-aware telephony for practices and health-tech: encryption, auditing, redundancy.',
    keywords: ['hipaa', 'medical', 'healthcare', 'dental', 'patient'],
  },
  {
    slug: 'call-center-sip-usa',
    path: '/services/call-center-sip-usa',
    title: 'Call Center SIP Engineering',
    blurb: 'High-concurrency SIP trunking, queues, dialers, and contact center infrastructure.',
    keywords: ['call-center', 'callcenter', 'sip-trunk', 'dialer', 'queue', 'concurrency', 'outbound', 'tcpa', 'call-recording', 'pri'],
  },
  {
    slug: 'financial-services-voip-usa',
    path: '/services/financial-services-voip-usa',
    title: 'Financial Services VoIP',
    blurb: 'Recorded, auditable, compliant voice infrastructure for regulated financial firms.',
    keywords: ['finra', 'financial', 'sec-', 'call-recording', 'biometric', 'fraud'],
  },
  {
    slug: 'ai-voice-agents-usa',
    path: '/services/ai-voice-agents-usa',
    title: 'AI Voice Agent Development',
    blurb: 'Low-latency voice agents connected to real telephony and your business systems.',
    keywords: ['voice-ai', 'ai-voice', 'agent', 'asr', 'tts', 'barge', 'llm', 'pipecat', 'livekit', 'outbound', 'voice-biometrics', 'multi-language', 'streaming'],
  },
  {
    slug: 'webrtc-development-usa',
    path: '/services/webrtc-development-usa',
    title: 'WebRTC Development',
    blurb: 'Browser and mobile real-time voice and video, bridged to SIP infrastructure.',
    keywords: ['webrtc', 'stun', 'turn', 'screen-sharing', 'opus', 'livekit'],
  },
  {
    slug: 'ai-receptionist',
    path: '/services/ai-receptionist',
    title: 'AI Receptionist',
    blurb: 'An AI voice receptionist that answers, qualifies, and books appointments around the clock.',
    keywords: ['receptionist', 'missed-calls', 'appointment'],
  },
];

const STOP = new Set([
  'the', 'and', 'for', 'with', 'vs', 'to', 'of', 'in', 'a', 'an', 'how', 'what', 'your', 'you',
  'guide', 'explained', '2026', '2027', 'architecture', 'enterprise', 'ai', 'voip', 'voice',
]);

function tokens(slug: string): string[] {
  return slug.split('-').filter((t) => t.length > 2 && !STOP.has(t));
}

/** Services most relevant to a post, strongest match first (max 3). */
export function relatedServicesFor(post: Pick<BlogPost, 'slug' | 'title' | 'category'>): ServiceLink[] {
  const slug = post.slug.toLowerCase();
  const title = post.title.toLowerCase();
  const category = post.category.toLowerCase();
  const scored = serviceLinks
    .map((s) => {
      let score = 0;
      for (const k of s.keywords) {
        if (slug.includes(k)) score += 3;
        else if (title.includes(k.replace(/-/g, ' '))) score += 1;
      }
      return { s, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);

  if (scored.length > 0) return scored.slice(0, 3);

  // Fallback by category so every telephony post still links to a service.
  if (/voip|telephony|compliance|industry/.test(category)) {
    return serviceLinks.filter((s) => s.slug === 'custom-voip-development' || s.slug === 'enterprise-voip-devops');
  }
  if (/voice ai|ai &/.test(category)) {
    return serviceLinks.filter((s) => s.slug === 'ai-voice-agents-usa' || s.slug === 'ai-receptionist');
  }
  return [];
}

/** Other posts on a similar topic: shared slug tokens plus a same-category bonus. */
export function relatedPostsFor(post: BlogPost, posts: BlogPost[], limit = 3): BlogPost[] {
  const mine = new Set(tokens(post.slug));
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = p.category === post.category ? 1 : 0;
      for (const t of tokens(p.slug)) if (mine.has(t)) score += 2;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
