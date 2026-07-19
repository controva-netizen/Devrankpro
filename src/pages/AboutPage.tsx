import SEO from '@/components/shared/SEO';
import AboutHeroSection from '@/components/sections/about/AboutHeroSection';
import MissionValuesSection from '@/components/sections/about/MissionValuesSection';
import TeamSection from '@/components/sections/about/TeamSection';
import FinalCTASection from '@/components/sections/home/FinalCTASection';

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Controva LLC',
    url: 'https://www.controvallc.com',
    logo: 'https://www.controvallc.com/favicon.svg',
    description: 'We are an elite team of VoIP engineers and AI specialists building high-performance communication systems.',
    founder: {
      '@type': 'Person',
      name: 'Muhammad Aafaq'
    }
  };

  return (
    <main>
      <SEO 
        title="About Us | Controva LLC VoIP Engineers"
        description="Meet the telecom engineering team at Controva LLC. We build custom voice infrastructure, FreeSWITCH routing, and AI Voice Agents without the technical debt."
        keywords="Controva LLC VoIP engineers, telecom engineering team, custom voice infrastructure"
        url="https://www.controvallc.com/about"
        schema={aboutSchema}
      />
      <AboutHeroSection />
      <MissionValuesSection />
      <TeamSection />
      <FinalCTASection />
    </main>
  );
}
