import AboutHeroSection from '@/components/sections/about/AboutHeroSection';
import MissionValuesSection from '@/components/sections/about/MissionValuesSection';
import TeamSection from '@/components/sections/about/TeamSection';
import FinalCTASection from '@/components/sections/home/FinalCTASection';

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <MissionValuesSection />
      <TeamSection />
      <FinalCTASection />
    </main>
  );
}
