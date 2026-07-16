import type { Service, Testimonial, CaseStudy, TeamMember, PricingTier, NavLink } from '@/types';

export const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export const heroStats = [
  { value: '$4.2M+', label: 'Revenue Generated for Clients' },
  { value: '97%', label: 'Client Retention Rate' },
  { value: '14 Days', label: 'Average Time to First Lead' },
];

export const processSteps = [
  {
    number: '01',
    title: 'Strategy Call',
    description: 'We audit your market and build your custom growth blueprint.',
  },
  {
    number: '02',
    title: 'System Build',
    description: 'Your website, funnels, and automation go live within 14 days.',
  },
  {
    number: '03',
    title: 'Launch & Optimize',
    description: 'Paid campaigns scale while AI optimizes conversion.',
  },
  {
    number: '04',
    title: 'Profit or Refund',
    description: 'You hit revenue targets, or we refund 100%.',
  },
];

export const aiFeatures = [
  'Lead Scoring',
  'Smart Follow-ups',
  'A/B Testing',
  'Predictive Analytics',
];

export const bentoServices: Service[] = [
  {
    id: 'web-dev',
    title: 'Custom Web & Mobile Apps',
    description: 'React, Next.js, React Native, and Swift. We build pixel-perfect, high-performance applications that convert visitors into customers.',
    image: '/images/service-web-dev.jpg',
    badge: 'Full-Stack',
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    description: 'Platform-native content strategies for Facebook, Instagram, TikTok, LinkedIn, and X. Paid campaigns optimized for ROAS, not vanity metrics.',
    image: '/images/service-social-ads.jpg',
    badge: 'Paid Ads',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Scaling',
    description: 'Shopify, TikTok Shop, and Amazon integrations. From product listing to checkout optimization — we engineer revenue machines.',
    image: '/images/service-ecommerce.jpg',
    badge: 'Revenue',
  },
  {
    id: 'ai-automation',
    title: 'AI Automation & Lead Systems',
    description: 'Custom LLM integrations, chatbot deployments, CRM automation, and intelligent lead scoring. Your backend becomes a self-optimizing engine.',
    image: '/images/service-ai-automation.jpg',
    badge: 'AI/ML',
  },
  {
    id: 'infrastructure',
    title: 'Enterprise Infrastructure',
    description: 'Self-hosted solutions, Docker deployments, CI/CD pipelines, and payment gateway integrations. Built for scale from day one.',
    image: '/images/service-devops.jpg',
    badge: 'DevOps',
  },
  {
    id: 'branding',
    title: 'Brand Identity & Design',
    description: 'From logo systems to complete design languages. Every touchpoint reinforces authority and drives conversion.',
    image: '/images/service-branding.jpg',
    badge: 'Design',
  },
];

export const horizontalCapabilities = [
  {
    number: '01',
    title: 'Shopify Mastery',
    description: 'Custom theme development, app integrations, and conversion rate optimization. Your store becomes a revenue engine.',
    features: ['Headless Commerce Ready', 'One-Click Upsells', 'A/B Tested Checkout Flows'],
  },
  {
    number: '02',
    title: 'TikTok Shop Domination',
    description: 'TikTok Shop API integrations, live shopping events, and viral product strategies that turn views into revenue.',
    features: ['Live Shopping Setup', 'Product Sync Automation', 'Viral Content Strategy'],
  },
  {
    number: '03',
    title: 'Social Ad Engineering',
    description: 'Facebook, Instagram, TikTok, LinkedIn, and X campaign management with AI-driven creative optimization.',
    features: ['Lookalike Audience Engineering', 'AI Creative Optimization', 'Cross-Platform Attribution'],
  },
  {
    number: '04',
    title: 'AI & Automation',
    description: 'Custom GPT integrations, lead qualification bots, automated follow-up sequences, and predictive revenue analytics.',
    features: ['Conversational AI', 'Predictive Lead Scoring', 'Revenue Forecasting'],
  },
  {
    number: '05',
    title: 'Mobile-First Development',
    description: 'React Native and Swift development for iOS/Android. Push notifications, in-app purchases, and deep linking.',
    features: ['Cross-Platform Codebase', 'Native Performance', 'App Store Optimization'],
  },
  {
    number: '06',
    title: 'Enterprise DevOps',
    description: 'Docker, Kubernetes, AWS/GCP deployment, payment gateway integrations, and high-availability infrastructure.',
    features: ['Container Orchestration', 'Auto-Scaling Architecture', '99.9% Uptime SLA'],
  },
];

export const platformImages = [
  '/images/platform-shopify.png',
  '/images/platform-tiktok.png',
  '/images/platform-instagram.png',
  '/images/platform-facebook.png',
  '/images/platform-linkedin.png',
  '/images/platform-x.png',
  '/images/platform-amazon.png',
  '/images/platform-google-ads.png',
  '/images/platform-react.png',
  '/images/platform-aws.png',
  '/images/platform-stripe.png',
  '/images/platform-openai.png',
];

export const testimonials: Testimonial[] = [
  {
    quote: "We went from zero online presence to $87K in monthly revenue within 60 days. The system they built runs itself.",
    name: 'Marcus Chen',
    title: 'Founder, Apex Fitness Gear',
    avatar: '/images/team-alex.jpg',
    badge: '+$87K/mo',
  },
  {
    quote: "Their AI lead system replaced our entire sales team. We're closing 3x more deals with zero manual follow-up.",
    name: 'Sarah Kimura',
    title: 'CEO, Luxe Skin Co.',
    avatar: '/images/team-jordan.jpg',
    badge: '3x Close Rate',
  },
  {
    quote: "The Shopify store they built converted at 4.7% on day one. Our previous agency never broke 1.2%.",
    name: 'David Okafor',
    title: 'Co-Founder, Nomad Leatherworks',
    avatar: '/images/team-marcus.jpg',
    badge: '4.7% CVR',
  },
];

export const serviceCategories = [
  {
    title: 'Custom Web & Mobile Development',
    description: "We don't use templates. Every application is architected from the ground up for your specific business logic, user flow, and growth trajectory. From React/Next.js web apps to React Native & Swift mobile apps — we build what your business actually needs.",
    features: ['React / Next.js / TypeScript', 'React Native & Swift', 'Headless CMS Architecture', 'Real-time WebSocket Systems', 'Stripe / PayPal Integration'],
    image: '/images/service-web-dev.jpg',
  },
  {
    title: 'Performance Marketing',
    description: 'Data-driven campaigns across every major platform. We optimize for revenue, not impressions. Our AI-powered creative engine tests hundreds of ad variations to find what converts best for your audience.',
    features: ['Facebook & Instagram Ads', 'TikTok Ads', 'Google Ads', 'LinkedIn & X Campaigns', 'AI Creative Optimization'],
    image: '/images/service-social-ads.jpg',
  },
  {
    title: 'E-commerce Engineering',
    description: 'End-to-end e-commerce solutions that transform browsers into buyers. From custom Shopify themes to TikTok Shop API integrations and Amazon listing optimization — every pixel is engineered for revenue.',
    features: ['Shopify Custom Themes', 'TikTok Shop API', 'Amazon Integration', 'Checkout Optimization', 'Inventory Sync'],
    image: '/images/service-ecommerce.jpg',
  },
  {
    title: 'AI Systems & Automation',
    description: 'Intelligent systems that work 24/7. From lead qualification to customer support, our AI solutions scale without adding headcount. Custom GPT integrations, chatbots, and predictive analytics tailored to your business.',
    features: ['Custom GPT Integrations', 'Lead Qualification Bots', 'CRM Automation', 'Predictive Analytics', 'Conversational AI'],
    image: '/images/service-ai-automation.jpg',
  },
];

export const detailedServices = [
  {
    icon: 'Globe',
    title: 'Web Development',
    description: 'Custom websites and web applications built with React, Next.js, and TypeScript. From marketing sites to complex dashboards.',
    features: ['Responsive Design', 'SEO Optimization', 'CMS Integration', 'Analytics Setup'],
    price: 'From $3,500',
  },
  {
    icon: 'Smartphone',
    title: 'Mobile Apps',
    description: 'Native-quality iOS and Android apps using React Native and Swift. Push notifications, in-app purchases, and deep linking.',
    features: ['iOS & Android', 'Push Notifications', 'In-App Purchases', 'App Store Optimization'],
    price: 'From $8,000',
  },
  {
    icon: 'ShoppingCart',
    title: 'E-commerce',
    description: 'Shopify, TikTok Shop, and Amazon store development. Custom themes, app integrations, and conversion optimization.',
    features: ['Custom Themes', 'Payment Gateways', 'Inventory Sync', 'Abandoned Cart Recovery'],
    price: 'From $5,000',
  },
  {
    icon: 'Megaphone',
    title: 'Paid Advertising',
    description: 'Performance marketing across Facebook, Instagram, TikTok, Google, LinkedIn, and X. AI-optimized creatives and targeting.',
    features: ['Campaign Management', 'A/B Testing', 'Lookalike Audiences', 'ROAS Tracking'],
    price: 'From $2,500/mo',
  },
  {
    icon: 'Bot',
    title: 'AI Automation',
    description: 'Custom AI solutions including chatbots, lead qualification, automated follow-ups, and predictive revenue analytics.',
    features: ['GPT Integration', 'Lead Scoring', 'Auto Follow-ups', 'Revenue Forecasting'],
    price: 'From $4,000',
  },
  {
    icon: 'Server',
    title: 'DevOps & Infrastructure',
    description: 'Scalable cloud infrastructure with Docker, Kubernetes, and CI/CD pipelines. 99.9% uptime guarantee.',
    features: ['Cloud Deployment', 'Auto Scaling', 'CI/CD Pipelines', 'Monitoring & Alerts'],
    price: 'From $3,000/mo',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$3,500',
    description: 'For businesses launching their digital presence',
    features: ['Custom landing page', 'Facebook & Instagram ads', 'Basic lead capture', 'Monthly reporting', 'Email support'],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '$6,500',
    description: 'For businesses ready to scale revenue',
    features: ['Full website (up to 10 pages)', 'TikTok Shop integration', 'AI lead qualification', 'A/B testing', 'Weekly strategy calls', '30-Day Profit Guarantee'],
    featured: true,
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    price: '$12,000',
    description: 'For businesses demanding market dominance',
    features: ['Custom mobile app', 'Multi-platform ads (all 5)', 'Advanced AI automation', 'Dedicated account team', 'Custom integrations', 'SLA guarantee'],
    cta: 'Contact Sales',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: 'DTX Realty',
    category: 'PropTech Platform',
    description: 'Enterprise real estate technology infrastructure. Scaled property discovery through advanced headless architecture, resulting in a 45% increase in lead generation.',
    image: '/images/case_study_dtx_1783322777978.png',
    link: '#',
    metrics: ['+45% Leads', '<0.8s Load', 'Scale']
  },
  {
    title: 'IQAAI',
    category: 'AI Automation',
    description: 'Autonomous neural network lead qualification system. Built custom LLM pipelines that process 10,000+ leads daily with zero human intervention.',
    image: '/images/case_study_iqaai_1783322787712.png',
    link: '#',
    metrics: ['10k/day', '0 Humans', '99.9% Up']
  },
  {
    title: 'ImagineStudio',
    category: 'Digital Agency',
    description: 'Creative studio platform redesign. Implemented WebGL interactions and high-performance React architecture for an immersive luxury brand experience.',
    image: '/images/case_study_imaginestudio_1783322797152.png',
    link: '#',
    metrics: ['+120% Time', 'WebGL', 'Awwwards']
  },
  {
    title: 'Controva AI',
    category: 'Cloud Infrastructure',
    description: 'Internal AI infrastructure scaling. Deployed distributed server clusters to handle complex machine learning model training and inference pipelines.',
    image: '/images/case_study_controva_ai_1783322816322.png',
    link: '#',
    metrics: ['1ms Latency', 'Auto-scale', 'Docker']
  },
  {
    title: 'Lumiuns',
    category: 'Headless E-Commerce',
    description: 'High-end luxury commerce migration. Moved from monolithic Shopify to Next.js/Sanity, dropping bounce rates by 32% and increasing conversion value.',
    image: '/images/case_study_lumiuns_1783322826776.png',
    link: '#',
    metrics: ['-32% Bounce', '+18% CR', 'Sanity']
  },
  {
    title: 'Signage',
    category: 'Enterprise IoT',
    description: 'Digital billboard management system. Engineered the real-time websocket architecture controlling over 500+ screens globally.',
    image: '/images/case_study_signage_1783322837970.png',
    link: '#',
    metrics: ['500+ Nodes', 'WebSockets', 'Global']
  },
  {
    title: 'Total Office',
    category: 'B2B Solutions',
    description: 'Corporate procurement platform. Streamlined B2B ordering and inventory sync with legacy ERPs via custom API middleware.',
    image: '/images/case_study_totaloffice_1783322856246.png',
    link: '#',
    metrics: ['ERP Sync', 'B2B', 'Automated']
  },
  {
    title: 'Hyperstackdev',
    category: 'Developer Tools',
    description: 'DevOps infrastructure scaling platform. Automated CI/CD pipelines and infrastructure-as-code deployments for modern startup teams.',
    image: '/images/case_study_hyperstack_1783322866456.png',
    link: '#',
    metrics: ['CI/CD', 'Terraform', 'DevOps']
  }
];

export const resultsBar = [
  { value: '$12M+', label: 'Revenue Generated' },
  { value: '94%', label: 'Client Satisfaction' },
  { value: '3.2x', label: 'Average ROAS' },
  { value: '18 Days', label: 'Avg. to Profit' },
];

export const missionValues = [
  {
    title: 'Engineering Excellence',
    description: 'We write clean, scalable code. No shortcuts. No technical debt that haunts you later.',
    icon: 'Code2',
  },
  {
    title: 'Radical Transparency',
    description: 'You see every dollar spent, every metric tracked, every decision made. No black boxes.',
    icon: 'Eye',
  },
  {
    title: 'Profit Accountability',
    description: "We tie our success to your revenue. If you don't grow, we don't eat.",
    icon: 'TrendingUp',
  },
  {
    title: 'Speed Without Sacrifice',
    description: 'We move fast — but never at the cost of quality. Your system is production-ready from day one.',
    icon: 'Zap',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Muhammad Aafaq',
    title: 'Founder & Lead Engineer',
    bio: 'Visionary technical leader steering Controva LLC’s architecture, building high-performance systems and driving engineering excellence.',
    avatar: '/images/Armaghan.png',
  },
  {
    name: 'Muhammad Ahsan Ali',
    title: 'Co Founder & Director',
    bio: 'Strategic leader focused on expanding Controva LLC’s footprint, ensuring operational success and leading high-level company initiatives.',
    avatar: '/images/Ahsin.png',
  },
  {
    name: 'Waheeb Ullah',
    title: 'Director of Growth',
    bio: 'Data-driven growth expert scaling Controva LLC’s client success through advanced marketing strategies and optimized revenue channels.',
    avatar: '/images/Waheeb ullah.png',
  },
  {
    name: 'Nida Siyal',
    title: 'Creative Director',
    bio: 'Award-winning creative mastermind ensuring every Controva LLC project achieves stunning visual excellence and outstanding user experience.',
    avatar: '/images/Nida.png',
  },
];
