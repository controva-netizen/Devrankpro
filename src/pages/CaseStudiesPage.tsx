import SEO from '@/components/shared/SEO';
import { caseStudies } from '@/data/content';
import CaseStudiesHeroSection from '@/components/sections/case-studies/CaseStudiesHeroSection';
import FeaturedCaseStudySection from '@/components/sections/case-studies/FeaturedCaseStudySection';
import ResultsBarSection from '@/components/sections/case-studies/ResultsBarSection';
import FinalCTASection from '@/components/sections/home/FinalCTASection';

export default function CaseStudiesPage() {
  const caseStudiesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: caseStudies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: study.title,
        description: study.description,
        url: `https://www.controvallc.com/case-studies#${study.title.replace(/\s+/g, '-').toLowerCase()}`
      }
    }))
  };

  return (
    <main>
      <SEO 
        title="Case Studies | VoIP Engineering Portfolio"
        description="Explore our VoIP engineering case studies. See how we've scaled SIP infrastructure, built Voice AI projects, and improved system reliability for our clients."
        keywords="VoIP engineering case studies, SIP infrastructure portfolio, Voice AI projects, telecom success stories"
        url="https://www.controvallc.com/case-studies"
        schema={caseStudiesSchema}
      />
      <CaseStudiesHeroSection />
      <section className="py-24 space-y-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          {caseStudies.map((study, i) => (
            <FeaturedCaseStudySection key={study.title} study={study} index={i} />
          ))}
        </div>
      </section>
      <ResultsBarSection />
      <FinalCTASection />
    </main>
  );
}
