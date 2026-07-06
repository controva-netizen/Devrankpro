import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  /* JSON-LD Structured Data Schema for AEO / GEO */
  schema?: Record<string, any>;
}

export default function SEO({
  title = 'Controva LLC — Engineering-Driven Digital Growth',
  description = 'Elite full-stack engineering meets performance marketing. We architect your entire digital presence from code to conversion.',
  image = 'https://www.controvallc.com/images/og-home.jpg',
  url = 'https://www.controvallc.com',
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
    description: 'Engineering-driven digital growth agency specializing in full-stack development, AI automation, Shopify e-commerce, and performance marketing.',
    sameAs: [
      'https://linkedin.com/company/controvallc',
      'https://x.com/controvallc',
      'https://instagram.com/controvallc',
      'https://github.com/controva-netizen'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Engineering and Marketing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Web Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation Systems' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shopify E-commerce' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity Design' } }
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
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Answer Engine & Generative Engine Optimization (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
