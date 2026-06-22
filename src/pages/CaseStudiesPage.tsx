import { caseStudies } from '@/data/content';
import CaseStudiesHeroSection from '@/components/sections/case-studies/CaseStudiesHeroSection';
import FeaturedCaseStudySection from '@/components/sections/case-studies/FeaturedCaseStudySection';
import ResultsBarSection from '@/components/sections/case-studies/ResultsBarSection';
import FinalCTASection from '@/components/sections/home/FinalCTASection';

export default function CaseStudiesPage() {
  return (
    <main>
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
