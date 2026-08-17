import { lazy, Suspense } from 'react';
import SEO from '@/components/shared/SEO';
import HeroSection from '@/components/sections/home/HeroSection';
import RiskReversalSection from '@/components/sections/home/RiskReversalSection';
import CapabilitiesBentoSection from '@/components/sections/home/CapabilitiesBentoSection';
import HorizontalScrollSection from '@/components/sections/home/HorizontalScrollSection';
import OrbitalEcosystemSection from '@/components/sections/home/OrbitalEcosystemSection';
import SocialProofSection from '@/components/sections/home/SocialProofSection';
import FinalCTASection from '@/components/sections/home/FinalCTASection';
import FaqSection from '@/components/shared/FaqSection';

// Pulls in three.js + @react-three/fiber (a full 3D engine) — code-split so
// only the homepage pays that weight, instead of it landing in the shared
// bundle every page loads.
const NeuralNetworkSection = lazy(() => import('@/components/sections/home/NeuralNetworkSection'));

const homeFaqs = [
  {
    question: 'What are the benefits of custom VoIP infrastructure in the USA?',
    answer: 'Custom VoIP infrastructure gives USA-based enterprises complete control over SIP routing, sub-second latency, and data privacy. By utilizing FreeSWITCH and Kamailio, businesses can scale to millions of concurrent calls without the per-minute licensing fees of monolithic platforms.'
  },
  {
    question: 'How do AI Voice Agents integrate with SIP trunking?',
    answer: 'AI Voice Agents are integrated directly into the SIP trunk via WebRTC or native SIP routing. Controva LLC engineers low-latency pipelines that allow Large Language Models to handle inbound and outbound calls autonomously, replacing standard IVR menus with conversational AI.'
  },
  {
    question: 'Why do enterprise call centers use Kamailio and FreeSWITCH?',
    answer: 'Kamailio acts as an ultra-fast SIP load balancer, handling thousands of registrations per second. FreeSWITCH acts as the core media server handling audio transcoding and WebRTC bridges. Together, they form a highly resilient telecom stack used by top carriers across the USA.'
  }
];

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <main>
      <SEO
        title="Controva LLC — Custom VoIP & AI Voice Infrastructure"
        description="We engineer production-grade VoIP infrastructure and AI Voice Agents. Specializing in FreeSWITCH, Kamailio, SIP integrations, and low-latency voice AI."
        keywords="VoIP infrastructure company USA, FreeSWITCH development, Voice AI agents, custom SIP architecture, Kamailio integration USA"
        schema={faqSchema}
      />
      <HeroSection />
      <RiskReversalSection />
      <Suspense fallback={<div style={{ height: '400px' }} />}>
        <NeuralNetworkSection />
      </Suspense>
      <CapabilitiesBentoSection />
      <HorizontalScrollSection />
      <OrbitalEcosystemSection />
      <SocialProofSection />
      <FaqSection faqs={homeFaqs} heading="Frequently Asked Questions" />
      <FinalCTASection />
    </main>
  );
}
