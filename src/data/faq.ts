export interface FAQItem {
  question: string;
  answer: string;
}

// Single source of truth for FAQ content: both the visible <FAQSection> and
// the FAQPage JSON-LD schema read from these arrays, so the structured data
// can never drift from what a visitor (or an AI crawler) actually sees.
export const homeFaqs: FAQItem[] = [
  {
    question: 'What are the benefits of custom VoIP infrastructure in the USA?',
    answer:
      'Custom VoIP infrastructure gives USA-based enterprises complete control over SIP routing, sub-second latency, and data privacy. By utilizing FreeSWITCH and Kamailio, businesses can scale to millions of concurrent calls without the per-minute licensing fees of monolithic platforms.',
  },
  {
    question: 'How do AI Voice Agents integrate with SIP trunking?',
    answer:
      'AI Voice Agents are integrated directly into the SIP trunk via WebRTC or native SIP routing. Controva LLC engineers low-latency pipelines that allow Large Language Models to handle inbound and outbound calls autonomously, replacing standard IVR menus with conversational AI.',
  },
  {
    question: 'Why do enterprise call centers use Kamailio and FreeSWITCH?',
    answer:
      'Kamailio acts as an ultra-fast SIP load balancer, handling thousands of registrations per second. FreeSWITCH acts as the core media server handling audio transcoding and WebRTC bridges. Together, they form a highly resilient telecom stack used by top carriers across the USA.',
  },
];

export const servicesFaqs: FAQItem[] = [
  {
    question: 'Do you provide FreeSWITCH development services in the USA?',
    answer:
      'Yes, Controva LLC provides comprehensive FreeSWITCH development and custom SIP architecture services for enterprises and call centers operating across the USA. We specialize in high-availability clustering and WebRTC integration.',
  },
  {
    question: 'How much does it cost to build a custom VoIP network?',
    answer:
      'Custom VoIP architectures vary depending on scale. Standard deployments start with our Growth tier, while high-volume carrier-grade setups require custom engineering. By owning the infrastructure, USA businesses save substantially on per-minute SaaS fees.',
  },
];

export function buildFaqPageSchema(faqs: FAQItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
