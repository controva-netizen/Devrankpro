import type { KnowledgeEntry } from '@/types/chatbot';

// ============================================================
// CHATBOT KNOWLEDGE BASE
// Complete business information for AI context injection
// ============================================================

export const knowledgeBase: KnowledgeEntry[] = [
  // ── GENERAL / COMPANY ─────────────────────────────────────
  {
    id: 'general-about',
    category: 'general',
    keywords: ['about', 'company', 'who are you', 'what is controva', 'controva llc'],
    title: 'About Controva LLC',
    content: `Controva LLC is an engineering-driven digital growth agency. We build high-performance systems, run data-driven marketing campaigns, and deploy AI automation that scales revenue for B2B and e-commerce brands. We are not a typical marketing agency — we are engineers who understand business outcomes. Our motto: "We tie our success to your revenue. If you don't grow, we don't eat."`,
  },
  {
    id: 'general-mission',
    category: 'general',
    keywords: ['mission', 'values', 'philosophy', 'why controva', 'what makes you different'],
    title: 'Mission & Values',
    content: `Our four core values are: (1) Engineering Excellence — clean, scalable code with no shortcuts. (2) Radical Transparency — you see every dollar spent and every metric tracked. (3) Profit Accountability — we tie our fees to your revenue growth. (4) Speed Without Sacrifice — we move fast but never compromise quality.`,
  },
  {
    id: 'general-guarantee',
    category: 'value_prop',
    keywords: ['guarantee', 'refund', 'money back', 'risk', '30 day', 'profit guarantee'],
    title: '30-Day Profit Guarantee',
    content: `Our 30-Day Profit Guarantee: if you don't see measurable profit within 30 days of launch, we refund 100% of your fees. No questions asked. We're that confident in our system. This applies to our Growth and Enterprise tiers.`,
  },
  {
    id: 'general-stats',
    category: 'general',
    keywords: ['stats', 'numbers', 'revenue', 'results', 'clients', 'retention'],
    title: 'Company Stats',
    content: `Key metrics: $4.2M+ revenue generated for clients. 97% client retention rate. 14 days average time to first lead. $12M+ total revenue generated. 94% client satisfaction. 3.2x average ROAS. 18 days average to profit.`,
  },
  {
    id: 'general-contact',
    category: 'general',
    keywords: ['contact', 'email', 'phone', 'reach', 'support', 'call', 'book', 'strategy call'],
    title: 'Contact Information',
    content: `You can reach us at support@controvallc.com. You can also book a free strategy call on our website — we'll audit your business and create a custom growth blueprint. Our team typically responds within 2 hours during business hours.`,
  },

  // ── SERVICES ──────────────────────────────────────────────
  {
    id: 'service-web-dev',
    category: 'service',
    keywords: ['web development', 'website', 'react', 'next.js', 'app', 'mobile app', 'custom web'],
    title: 'Custom Web & Mobile Development',
    content: `We build custom websites and web applications with React, Next.js, and TypeScript. From marketing sites to complex dashboards. We also develop native-quality iOS and Android apps using React Native and Swift. Features include: responsive design, SEO optimization, CMS integration, analytics setup, push notifications, in-app purchases, and app store optimization. Pricing starts from $3,500 for websites and $8,000 for mobile apps.`,
  },
  {
    id: 'service-social-media',
    category: 'service',
    keywords: ['social media', 'marketing', 'facebook', 'instagram', 'tiktok', 'linkedin', 'ads', 'paid ads', 'roas'],
    title: 'Social Media Marketing & Paid Advertising',
    content: `Data-driven campaigns across every major platform: Facebook, Instagram, TikTok, Google, LinkedIn, and X. We optimize for revenue, not impressions. Our AI-powered creative engine tests hundreds of ad variations. Average ROAS is 3.2x. Features include: campaign management, A/B testing, lookalike audience engineering, cross-platform attribution, and AI creative optimization. Pricing starts from $2,500/month.`,
  },
  {
    id: 'service-ecommerce',
    category: 'service',
    keywords: ['ecommerce', 'e-commerce', 'shopify', 'tiktok shop', 'amazon', 'store', 'online store', 'checkout'],
    title: 'E-commerce Scaling',
    content: `End-to-end e-commerce solutions: Shopify custom themes, TikTok Shop API integrations, Amazon listing optimization, and checkout optimization. We engineer revenue machines. Our Shopify Mastery includes custom theme development, app integrations, headless commerce, one-click upsells, and A/B tested checkout flows. We've generated $1.2M+ in revenue for Shopify clients. Pricing starts from $5,000.`,
  },
  {
    id: 'service-ai-automation',
    category: 'service',
    keywords: ['ai', 'automation', 'chatbot', 'gpt', 'lead qualification', 'follow up', 'crm', 'predictive'],
    title: 'AI Automation & Lead Systems',
    content: `Intelligent systems that work 24/7. Custom GPT integrations, lead qualification bots, automated follow-up sequences, predictive revenue analytics, and conversational AI. We built an autonomous lead qualification system that processes 10,000+ leads daily with zero human intervention. Features: lead scoring, smart follow-ups, A/B testing, predictive analytics. Pricing starts from $4,000.`,
  },
  {
    id: 'service-infrastructure',
    category: 'service',
    keywords: ['devops', 'infrastructure', 'cloud', 'docker', 'kubernetes', 'aws', 'hosting', 'server'],
    title: 'Enterprise Infrastructure & DevOps',
    content: `Scalable cloud infrastructure with Docker, Kubernetes, AWS/GCP deployment, CI/CD pipelines, and payment gateway integrations. 99.9% uptime SLA guarantee. Features: container orchestration, auto-scaling architecture, monitoring & alerts, continuous integration and deployment. Pricing starts from $3,000/month.`,
  },
  {
    id: 'service-branding',
    category: 'service',
    keywords: ['branding', 'brand identity', 'design', 'logo', 'visual', 'creative'],
    title: 'Brand Identity & Design',
    content: `From logo systems to complete design languages. Every touchpoint reinforces authority and drives conversion. We create cohesive brand identities that scale across digital and physical channels.`,
  },
  {
    id: 'service-shopify-mastery',
    category: 'service',
    keywords: ['shopify mastery', 'headless shopify', 'next.js shopify', 'shopify theme', 'shopify plus'],
    title: 'Shopify Mastery',
    content: `Custom theme development, app integrations, headless commerce ready, one-click upsells, A/B tested checkout flows. We decouple the frontend from Shopify backend using Next.js for sub-second latency. We've achieved 4.7% conversion rates on day one (previous agency never broke 1.2%). We use the Strangler Fig Pattern for zero-risk migrations.`,
  },
  {
    id: 'service-tiktok-shop',
    category: 'service',
    keywords: ['tiktok shop', 'live shopping', 'viral product', 'tiktok api'],
    title: 'TikTok Shop Domination',
    content: `TikTok Shop API integrations, live shopping events, and viral product strategies that turn views into revenue. Features: live shopping setup, product sync automation, viral content strategy.`,
  },

  // ── PRICING ───────────────────────────────────────────────
  {
    id: 'pricing-starter',
    category: 'pricing',
    keywords: ['starter', 'starter plan', 'basic', 'beginner', '$3500', '3500'],
    title: 'Starter Plan - $3,500/mo',
    content: `Starter Plan ($3,500/month): For businesses launching their digital presence. Includes: custom landing page, Facebook & Instagram ads, basic lead capture, monthly reporting, and email support. This is our entry-level plan for businesses just getting started with digital marketing.`,
  },
  {
    id: 'pricing-growth',
    category: 'pricing',
    keywords: ['growth', 'growth plan', 'popular', '$6500', '6500', 'most popular'],
    title: 'Growth Plan - $6,500/mo (Most Popular)',
    content: `Growth Plan ($6,500/month): For businesses ready to scale revenue. Our most popular plan. Includes: full website (up to 10 pages), TikTok Shop integration, AI lead qualification, A/B testing, weekly strategy calls, and our 30-Day Profit Guarantee. This is the plan most clients choose.`,
  },
  {
    id: 'pricing-enterprise',
    category: 'pricing',
    keywords: ['enterprise', 'enterprise plan', 'custom', '$12000', '12000', 'dedicated'],
    title: 'Enterprise Plan - $12,000/mo',
    content: `Enterprise Plan ($12,000/month): For businesses demanding market dominance. Includes: custom mobile app, multi-platform ads (all 5 platforms), advanced AI automation, dedicated account team, custom integrations, and SLA guarantee. Contact us for a custom proposal.`,
  },
  {
    id: 'pricing-detailed',
    category: 'pricing',
    keywords: ['pricing', 'cost', 'how much', 'price', 'fee', 'rates', 'budget'],
    title: 'Pricing Overview',
    content: `We offer three tiers: Starter ($3,500/mo), Growth ($6,500/mo — most popular), and Enterprise ($12,000/mo). All include our 30-Day Profit Guarantee. Individual services: Web Development from $3,500, Mobile Apps from $8,000, E-commerce from $5,000, Paid Advertising from $2,500/mo, AI Automation from $4,000, DevOps from $3,000/mo. We also offer performance-based pricing where we tie our fees to your revenue growth.`,
  },

  // ── CASE STUDIES ──────────────────────────────────────────
  {
    id: 'case-dtx',
    category: 'case_study',
    keywords: ['dtx', 'dtx realty', 'proptech', 'real estate', 'lead generation'],
    title: 'Case Study: DTX Realty',
    content: `DTX Realty — PropTech Platform. Enterprise real estate technology infrastructure. Scaled property discovery through advanced headless architecture, resulting in a 45% increase in lead generation. Metrics: +45% Leads, <0.8s Load Time, Enterprise Scale.`,
  },
  {
    id: 'case-iqaai',
    category: 'case_study',
    keywords: ['iqaai', 'ai automation', 'neural network', 'lead qualification', 'autonomous'],
    title: 'Case Study: IQAAI',
    content: `IQAAI — AI Automation. Autonomous neural network lead qualification system. Built custom LLM pipelines that process 10,000+ leads daily with zero human intervention. Metrics: 10k/day processing, 0 Humans required, 99.9% Uptime.`,
  },
  {
    id: 'case-imaginestudio',
    category: 'case_study',
    keywords: ['imaginestudio', 'digital agency', 'webgl', 'creative', 'luxury'],
    title: 'Case Study: ImagineStudio',
    content: `ImagineStudio — Digital Agency. Creative studio platform redesign. Implemented WebGL interactions and high-performance React architecture for an immersive luxury brand experience. Metrics: +120% Time on Site, WebGL Implementation, Awwwards recognition.`,
  },
  {
    id: 'case-controva-ai',
    category: 'case_study',
    keywords: ['controva ai', 'cloud infrastructure', 'docker', 'machine learning'],
    title: 'Case Study: Controva AI',
    content: `Controva AI — Cloud Infrastructure. Internal AI infrastructure scaling. Deployed distributed server clusters to handle complex machine learning model training and inference pipelines. Metrics: 1ms Latency, Auto-scaling, Docker orchestration.`,
  },
  {
    id: 'case-lumiuns',
    category: 'case_study',
    keywords: ['lumiuns', 'headless ecommerce', 'luxury', 'sanity', 'next.js'],
    title: 'Case Study: Lumiuns',
    content: `Lumiuns — Headless E-Commerce. High-end luxury commerce migration. Moved from monolithic Shopify to Next.js/Sanity, dropping bounce rates by 32% and increasing conversion value. Metrics: -32% Bounce Rate, +18% Conversion Rate, Sanity CMS.`,
  },
  {
    id: 'case-signage',
    category: 'case_study',
    keywords: ['signage', 'iot', 'digital billboard', 'websocket', 'enterprise'],
    title: 'Case Study: Signage',
    content: `Signage — Enterprise IoT. Digital billboard management system. Engineered real-time websocket architecture controlling over 500+ screens globally. Metrics: 500+ Nodes, WebSockets, Global deployment.`,
  },
  {
    id: 'case-totaloffice',
    category: 'case_study',
    keywords: ['total office', 'b2b', 'procurement', 'erp', 'api middleware'],
    title: 'Case Study: Total Office',
    content: `Total Office — B2B Solutions. Corporate procurement platform. Streamlined B2B ordering and inventory sync with legacy ERPs via custom API middleware. Metrics: ERP Sync, B2B Platform, Automated workflows.`,
  },
  {
    id: 'case-hyperstackdev',
    category: 'case_study',
    keywords: ['hyperstackdev', 'developer tools', 'ci/cd', 'terraform', 'devops'],
    title: 'Case Study: Hyperstackdev',
    content: `Hyperstackdev — Developer Tools. DevOps infrastructure scaling platform. Automated CI/CD pipelines and infrastructure-as-code deployments for modern startup teams. Metrics: CI/CD Automation, Terraform, DevOps excellence.`,
  },

  // ── TEAM ──────────────────────────────────────────────────
  {
    id: 'team-aafaq',
    category: 'team',
    keywords: ['muhammad aafaq', 'aafaq', 'founder', 'lead engineer', 'ceo'],
    title: 'Team: Muhammad Aafaq — Founder & Lead Engineer',
    content: `Muhammad Aafaq is the Founder & Lead Engineer at Controva LLC. He is a visionary technical leader steering the company's architecture, building high-performance systems and driving engineering excellence.`,
  },
  {
    id: 'team-ahsan',
    category: 'team',
    keywords: ['muhammad ahsan ali', 'ahsan', 'co founder', 'director', 'cofounder'],
    title: 'Team: Muhammad Ahsan Ali — Co-Founder & Director',
    content: `Muhammad Ahsan Ali is the Co-Founder & Director at Controva LLC. He is a strategic leader focused on expanding the company's footprint, ensuring operational success and leading high-level company initiatives.`,
  },
  {
    id: 'team-waheeb',
    category: 'team',
    keywords: ['waheeb ullah', 'waheeb', 'growth', 'director of growth', 'cmo'],
    title: 'Team: Waheeb Ullah — Director of Growth',
    content: `Waheeb Ullah is the Director of Growth at Controva LLC. He is a data-driven growth expert scaling client success through advanced marketing strategies and optimized revenue channels.`,
  },
  {
    id: 'team-nida',
    category: 'team',
    keywords: ['nida siyal', 'nida', 'creative director', 'design', 'creative'],
    title: 'Team: Nida Siyal — Creative Director',
    content: `Nida Siyal is the Creative Director at Controva LLC. She is an award-winning creative mastermind ensuring every project achieves stunning visual excellence and outstanding user experience.`,
  },

  // ── PROCESS ───────────────────────────────────────────────
  {
    id: 'process-overview',
    category: 'process',
    keywords: ['process', 'how it works', 'steps', 'workflow', 'onboarding', 'getting started'],
    title: 'Our 4-Step Process',
    content: `Our process: (1) Strategy Call — We audit your market and build your custom growth blueprint. (2) System Build — Your website, funnels, and automation go live within 14 days. (3) Launch & Optimize — Paid campaigns scale while AI optimizes conversion. (4) Profit or Refund — You hit revenue targets, or we refund 100%.`,
  },

  // ── TESTIMONIALS ──────────────────────────────────────────
  {
    id: 'testimonials',
    category: 'general',
    keywords: ['testimonial', 'review', 'client feedback', 'success story', 'what clients say'],
    title: 'Client Testimonials',
    content: `Marcus Chen (Founder, Apex Fitness Gear): "We went from zero online presence to $87K in monthly revenue within 60 days. The system they built runs itself." Sarah Kimura (CEO, Luxe Skin Co.): "Their AI lead system replaced our entire sales team. We're closing 3x more deals with zero manual follow-up." David Okafor (Co-Founder, Nomad Leatherworks): "The Shopify store they built converted at 4.7% on day one. Our previous agency never broke 1.2%."`,
  },

  // ── BLOGS (Summaries) ───────────────────────────────────
  {
    id: 'blog-headless-shopify',
    category: 'blog',
    keywords: ['headless shopify', 'next.js ecommerce', 'shopify roi', 'monolithic', 'sanity'],
    title: 'Blog: Why Monolithic E-Commerce is Dead',
    content: `Our blog post explains why enterprise brands are abandoning traditional Shopify for Next.js + Sanity headless architecture. Every 100ms delay strips 1% off revenue. Headless commerce decouples the frontend from backend, achieving sub-second latency, perfect Core Web Vitals, and 42% higher mobile conversion rates. We use the Strangler Fig Pattern for zero-risk migrations.`,
  },
  {
    id: 'blog-ai-automation',
    category: 'blog',
    keywords: ['ai automation pipeline', 'llm', 'zapier', 'lead qualification', 'data entry'],
    title: 'Blog: Stop Paying Humans for Data Entry',
    content: `Our blog post details how we built an autonomous lead qualification system using LLMs and Zapier that processes 10,000 leads per day with zero human intervention. The pipeline: ingestion → enrichment → qualification → routing. Result: zero-second response time and 300% increase in lead-to-meeting conversion.`,
  },
  {
    id: 'blog-b2b-lead-gen',
    category: 'blog',
    keywords: ['b2b lead generation', 'conversational terminal', 'contact form', 'conversion'],
    title: 'Blog: Rethinking B2B Lead Generation',
    content: `Our blog post explains why we replaced traditional HTML contact forms with a conversational terminal-based lead generation engine. This filters out low-intent traffic while engaging high-intent founders who appreciate engineering-driven interfaces. The terminal uses a custom state machine with sequential data capture and command-driven interaction.`,
  },
  {
    id: 'blog-interactive-case-studies',
    category: 'blog',
    keywords: ['interactive case studies', 'terminal ui', 'roi', 'b2b saas', 'technical'],
    title: 'Blog: Interactive Case Studies for B2B SaaS',
    content: `Our blog post describes how we built an interactive terminal UI component that translates technical execution into business ROI. Instead of showing code, the terminal outputs tangible milestones like "AI agent qualifies lead → appointment booked." This bridges the gap between engineering and business decision-makers.`,
  },
  {
    id: 'blog-zero-shift',
    category: 'blog',
    keywords: ['zero shift rendering', 'cls', 'cumulative layout shift', 'edge deployment', 'vercel'],
    title: 'Blog: Zero-Shift Rendering & Edge Deployments',
    content: `Our blog post covers how we eliminated Cumulative Layout Shift (CLS) in Next.js by fixing DOM stabilization, architecting mobile-first experiences, and overcoming CI/CD bottlenecks with React 19 and Vercel. We use preMinHeight props and strict padding constraints to prevent layout jumps.`,
  },
  {
    id: 'blog-performance-marketing',
    category: 'blog',
    keywords: ['performance marketing', 'retainers', 'zero risk', 'roi', 'agency model'],
    title: 'Blog: The Zero-Risk Offer',
    content: `Our blog post explains why performance-based marketing outperforms traditional agency retainers. When an agency charges a flat retainer, their incentive is to do the minimum. Performance marketing ties compensation to revenue generated, creating true alignment. You only pay for tangible results.`,
  },
  {
    id: 'blog-shopify-plus-migration',
    category: 'blog',
    keywords: ['shopify plus', 'migration', 'next.js', 'performance breakdown', 'headless'],
    title: 'Blog: Migrating from Shopify Plus to Next.js',
    content: `Our blog post is an inside look at migrating a $10M/year store from Shopify Plus to Next.js. Results: 42% increase in mobile conversion rate, 60% drop in bounce rate, perfect 100/100 Core Web Vitals scores. We decoupled the frontend using React Server Components and Incremental Static Regeneration.`,
  },
  {
    id: 'blog-b2b-funnel',
    category: 'blog',
    keywords: ['b2b sales funnel', '$1m arr', 'landing pages', 'email sequences', 'saas'],
    title: 'Blog: Reverse-Engineering a $1M B2B Sales Funnel',
    content: `Our blog post breaks down the exact landing pages, email sequences, and ad creatives used to scale a B2B SaaS client past $1M ARR in under 14 months. Key elements: interactive calculator lead magnet (35% conversion on cold traffic), 5-day educational email sequence, and embedded calendar for frictionless demos.`,
  },
  {
    id: 'blog-ai-sdr',
    category: 'blog',
    keywords: ['ai sdr', 'sales development rep', 'follow up', 'autonomous', '24/7'],
    title: 'Blog: The AI Sales Development Rep',
    content: `Our blog post explains how to deploy an AI agent that handles inbound lead responses, books meetings, and handles objections autonomously. The AI SDR monitors email, website chat, and LinkedIn 24/7, answers technical questions, handles objections, and books meetings directly in the calendar. Human closers spend 100% of their time on qualified prospects.`,
  },

  // ── FAQ ───────────────────────────────────────────────────
  {
    id: 'faq-timezone',
    category: 'faq',
    keywords: ['timezone', 'hours', 'business hours', 'when available', 'response time'],
    title: 'FAQ: What are your business hours?',
    content: `We operate globally and our team is distributed across multiple time zones. We typically respond to inquiries within 2 hours during business hours. For Enterprise clients, we offer dedicated support with SLA guarantees.`,
  },
  {
    id: 'faq-industries',
    category: 'faq',
    keywords: ['industries', 'niche', 'vertical', 'who do you work with', 'clients'],
    title: 'FAQ: What industries do you serve?',
    content: `We primarily serve e-commerce brands, B2B SaaS companies, PropTech platforms, and digital agencies. Our expertise spans fitness, beauty, luxury goods, real estate, and technology sectors. If you're generating revenue and ready to scale, we can help.`,
  },
  {
    id: 'faq-contract',
    category: 'faq',
    keywords: ['contract', 'commitment', 'minimum term', 'cancel', 'month to month'],
    title: 'FAQ: Is there a long-term contract?',
    content: `Our Starter and Growth plans are month-to-month with no long-term commitment. Enterprise plans typically include a 3-month minimum to allow for proper implementation and optimization. All plans include our 30-Day Profit Guarantee.`,
  },
  {
    id: 'faq-results',
    category: 'faq',
    keywords: ['results', 'how long', 'timeline', 'when will i see', 'first lead', 'roi'],
    title: 'FAQ: How long until I see results?',
    content: `Most clients see their first qualified lead within 14 days of launch. Revenue impact typically becomes measurable within 30 days — which is why we offer our 30-Day Profit Guarantee. For e-commerce brands, we've seen conversion improvements on day one after launch.`,
  },
  {
    id: 'faq-tech-stack',
    category: 'faq',
    keywords: ['tech stack', 'technologies', 'react', 'next.js', 'shopify', 'what do you use'],
    title: 'FAQ: What technologies do you use?',
    content: `Our tech stack includes: React, Next.js, TypeScript, React Native, Swift, Shopify, TikTok Shop API, Node.js, Python, Docker, Kubernetes, AWS/GCP, Vercel, Sanity CMS, Stripe, OpenAI, and various AI/ML frameworks. We choose the right tool for each project.`,
  },
];

// Helper: get all knowledge entries
export function getAllKnowledge(): KnowledgeEntry[] {
  return knowledgeBase;
}

// Helper: get knowledge by category
export function getKnowledgeByCategory(category: string): KnowledgeEntry[] {
  return knowledgeBase.filter((k) => k.category === category);
}

// Helper: find knowledge by keyword match (scored)
export function findKnowledgeByQuery(query: string): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = knowledgeBase.map((entry) => {
    let score = 0;
    // Title match
    if (entry.title.toLowerCase().includes(lowerQuery)) score += 5;
    // Keyword match
    for (const kw of entry.keywords) {
      if (lowerQuery.includes(kw.toLowerCase())) score += 3;
    }
    // Content word match
    for (const word of words) {
      if (entry.content.toLowerCase().includes(word)) score += 1;
      if (entry.title.toLowerCase().includes(word)) score += 2;
    }
    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.entry);
}
