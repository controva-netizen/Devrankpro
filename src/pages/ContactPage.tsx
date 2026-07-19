import SEO from '@/components/shared/SEO';
import ContactHeroSection from '@/components/sections/contact/ContactHeroSection';
import ContactFormSection from '@/components/sections/contact/ContactFormSection';

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Controva LLC',
    description: 'Get in touch with our VoIP engineers to discuss your SIP infrastructure or Voice AI needs.',
    url: 'https://www.controvallc.com/contact'
  };

  return (
    <main>
      <SEO 
        title="Contact Us | Hire VoIP Engineers & Developers"
        description="Hire Controva LLC's telecom engineering team for custom FreeSWITCH development, Kamailio load balancing, and SIP infrastructure consulting."
        keywords="hire VoIP engineers, FreeSWITCH developers for hire, SIP infrastructure consulting, telecom engineering team"
        url="https://www.controvallc.com/contact"
        schema={contactSchema}
      />
      <ContactHeroSection />
      <ContactFormSection />
    </main>
  );
}
