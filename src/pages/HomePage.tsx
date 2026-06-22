import HeroSection from '@/components/sections/home/HeroSection';
import RiskReversalSection from '@/components/sections/home/RiskReversalSection';
import NeuralNetworkSection from '@/components/sections/home/NeuralNetworkSection';
import CapabilitiesBentoSection from '@/components/sections/home/CapabilitiesBentoSection';
import HorizontalScrollSection from '@/components/sections/home/HorizontalScrollSection';
import OrbitalEcosystemSection from '@/components/sections/home/OrbitalEcosystemSection';
import SocialProofSection from '@/components/sections/home/SocialProofSection';
import FinalCTASection from '@/components/sections/home/FinalCTASection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <RiskReversalSection />
      <NeuralNetworkSection />
      <CapabilitiesBentoSection />
      <HorizontalScrollSection />
      <OrbitalEcosystemSection />
      <SocialProofSection />
      <FinalCTASection />
    </main>
  );
}
