import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  /* JSON-LD Structured Data Schema for AEO / GEO */
  schema?: Record<string, any>;
}

export default function SEO({
  title = 'Controva LLC — Custom VoIP & AI Voice Infrastructure',
  description = 'Controva LLC engineers production-grade VoIP infrastructure and AI Voice Agents. Specializing in FreeSWITCH, Kamailio, SIP integrations, and low-latency voice AI.',
  keywords = 'VoIP engineering, FreeSWITCH, Kamailio, AI Voice Agents, SIP trunking, telecom infrastructure, WebRTC, low-latency voice AI',
  image = 'https://www.controvallc.com/images/og-home.jpg',
  url = 'https://www.controvallc.com/',
  type = 'website',
  schema,
}: SEOProps) {
  // Base Schema (ProfessionalService is perfect for Agencies and supports Services natively)
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Controva LLC',
    url: 'https://www.controvallc.com',
    logo: 'https://www.controvallc.com/favicon.svg',
    description: 'Controva LLC engineers production-grade VoIP infrastructure and AI Voice Agents. Specializing in FreeSWITCH, Kamailio, SIP integrations, and low-latency voice AI.',
    telephone: '+1-800-000-0000',
    areaServed: 'Worldwide',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    sameAs: [
      'https://linkedin.com/company/controvallc',
      'https://x.com/controvallc',
      'https://instagram.com/controvallc',
      'https://github.com/controva-netizen'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Custom VoIP and Voice AI Engineering Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'FreeSWITCH & Kamailio Integration' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Voice AI Agent Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom VoIP Architecture' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SIP Trunking & Routing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Low-Latency WebRTC Solutions' } }
      ]
    }
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* GEO Targeting (USA) */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Controva LLC" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@controvallc" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Answer Engine & Generative Engine Optimization (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
