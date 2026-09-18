import SEO, { professionalServiceEntity } from '@/components/shared/SEO';
import FAQSection from '@/components/shared/FAQSection';
import { homeFaqs, buildFaqPageSchema } from '@/data/faq';
import HeroSection from '@/components/sections/home/HeroSection';
import RiskReversalSection from '@/components/sections/home/RiskReversalSection';
import NeuralNetworkSection from '@/components/sections/home/NeuralNetworkSection';
import CapabilitiesBentoSection from '@/components/sections/home/CapabilitiesBentoSection';
import HorizontalScrollSection from '@/components/sections/home/HorizontalScrollSection';
import OrbitalEcosystemSection from '@/components/sections/home/OrbitalEcosystemSection';
import SocialProofSection from '@/components/sections/home/SocialProofSection';
import FinalCTASection from '@/components/sections/home/FinalCTASection';

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [professionalServiceEntity, buildFaqPageSchema(homeFaqs)],
  };

  return (
    <main>
      <SEO 
        title="Controva LLC — Custom VoIP & AI Voice Infrastructure"
        description="We engineer production-grade VoIP infrastructure and AI Voice Agents. Specializing in FreeSWITCH, Kamailio, SIP trunking, AI receptionist software, and low-latency voice AI."
        keywords="voice ai agents, ai receptionist, ai receptionist software, ai medical receptionist, FreeSWITCH development, Kamailio, sip trunking, twilio alternative, custom VoIP architecture, open source pbx"
        url="https://www.controvallc.com"
        schema={schema}
      />
      <HeroSection />
      <RiskReversalSection />
      <NeuralNetworkSection />
      <CapabilitiesBentoSection />
      <HorizontalScrollSection />
      <OrbitalEcosystemSection />
      <SocialProofSection />
      <FAQSection faqs={homeFaqs} />
      <FinalCTASection />
    </main>
  );
}
