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
    title: 'Architecture Audit',
    description: 'We audit your infrastructure and design a scalable VoIP or AI blueprint.',
  },
  {
    number: '02',
    title: 'System Engineering',
    description: 'We integrate FreeSWITCH, Kamailio, and custom Voice AI within 14 days.',
  },
  {
    number: '03',
    title: 'Load Testing',
    description: 'Rigorous SIP traffic simulation and latency benchmarking to ensure stability.',
  },
  {
    number: '04',
    title: 'SLA Guarantee',
    description: 'Falsifiable deployment outcomes with guaranteed sub-second latency.',
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
    id: 'voip-arch',
    title: 'Custom VoIP Architecture',
    description: 'High-availability SIP trunking, WebRTC, and RTP media routing built for massive concurrency.',
    image: '/images/service-web-dev.jpg',
    badge: 'Infrastructure',
  },
  {
    id: 'freeswitch',
    title: 'FreeSWITCH & Kamailio',
    description: 'Enterprise-grade switch configuration, ESL module development, and load balancing.',
    image: '/images/service-social-ads.jpg',
    badge: 'Switching',
  },
  {
    id: 'voice-ai',
    title: 'Voice AI Agents',
    description: 'Sub-second latency conversational AI using Deepgram, Cartesia, and custom LLM integration.',
    image: '/images/service-ecommerce.jpg',
    badge: 'AI/ML',
  },
  {
    id: 'webrtc',
    title: 'WebRTC Applications',
    description: 'Browser-based softphones and secure video conferencing with optimized STUN/TURN routing.',
    image: '/images/service-ai-automation.jpg',
    badge: 'Real-Time',
  },
  {
    id: 'infrastructure',
    title: 'Enterprise DevOps',
    description: 'Self-hosted solutions, Docker deployments, CI/CD pipelines, and SIP failover clusters.',
    image: '/images/service-devops.jpg',
    badge: 'DevOps',
  },
  {
    id: 'api-middleware',
    title: 'Telecom API Middleware',
    description: 'Bridging legacy SIP networks with modern REST/GraphQL APIs and CRM platforms.',
    image: '/images/service-branding.jpg',
    badge: 'Integration',
  },
];

export const horizontalCapabilities = [
  {
    number: '01',
    title: 'FreeSWITCH Engineering',
    description: 'Custom module development, Event Socket Library (ESL) integration, and highly concurrent SIP routing configurations.',
    features: ['Custom Dialplans', 'ESL Python/NodeJS', 'High CPS Optimization'],
  },
  {
    number: '02',
    title: 'Kamailio Load Balancing',
    description: 'Deploying Kamailio as a highly available SIP proxy and load balancer to distribute traffic across media servers.',
    features: ['SIP Proxy Setup', 'Dispatcher Modules', 'NAT Traversal'],
  },
  {
    number: '03',
    title: 'Voice AI Agents',
    description: 'Building autonomous, ultra-low latency conversational agents powered by Deepgram, Cartesia, and OpenAI Realtime API.',
    features: ['<500ms Response Times', 'Interruption Handling', 'VAD Optimization'],
  },
  {
    number: '04',
    title: 'WebRTC & Softphones',
    description: 'Engineering browser-based secure communication portals using WebRTC, SIP.js, and custom signaling servers.',
    features: ['SIP.js Integration', 'STUN/TURN Configuration', 'Encrypted Media'],
  },
  {
    number: '05',
    title: 'Telecom Billing & CRM',
    description: 'Connecting raw CDR (Call Detail Record) outputs into structured billing platforms and enterprise CRM systems.',
    features: ['Real-time CDR Processing', 'Stripe Integration', 'Salesforce/HubSpot Sync'],
  },
  {
    number: '06',
    title: 'Enterprise DevOps',
    description: 'Docker, Kubernetes, AWS/GCP deployment, and high-availability infrastructure tailored for real-time media.',
    features: ['RTP Engine Scaling', 'Anycast Routing', '99.99% Uptime SLA'],
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
    title: 'Custom VoIP Architecture',
    description: "We architect distributed SIP and media networks that scale. From initial carrier interconnects to edge media relay, we engineer reliable real-time communication systems.",
    features: ['SIP Trunking', 'RTP Proxy / RTPEngine', 'Carrier Interconnects', 'High Availability Clusters', 'STUN/TURN'],
    image: '/images/service-web-dev.jpg',
  },
  {
    title: 'FreeSWITCH & Kamailio',
    description: 'Expert configuration and module development for the industry leading open-source telephony engines. We handle complex dialplans, routing logic, and load balancing.',
    features: ['Kamailio SIP Proxy', 'FreeSWITCH Media Server', 'ESL Automation', 'Custom C/C++ Modules', 'NAT Traversal'],
    image: '/images/service-social-ads.jpg',
  },
  {
    title: 'Voice AI Agents',
    description: 'We integrate cutting-edge LLMs with traditional telephony. Deploy AI agents that can handle inbound customer support, outbound qualification, and intelligent IVR with sub-second latency.',
    features: ['Deepgram / Cartesia API', 'OpenAI Realtime Integration', 'VAD (Voice Activity Detection)', 'Conversational Turn-taking', 'Agent Handoff'],
    image: '/images/service-ecommerce.jpg',
  },
  {
    title: 'WebRTC & App Integration',
    description: 'Bridge the gap between web browsers, mobile apps, and the PSTN. We build custom softphones and embeddable communication widgets using modern WebRTC standards.',
    features: ['SIP.js / JsSIP', 'React Native WebRTC', 'Secure Signaling (WSS)', 'Video Conferencing', 'Screen Sharing'],
    image: '/images/service-ai-automation.jpg',
  },
];

export const detailedServices = [
  {
    icon: 'Globe',
    title: 'VoIP Architecture',
    description: 'Custom carrier-grade SIP networks and WebRTC infrastructure built for reliability and scale.',
    features: ['SIP Trunking', 'RTP Routing', 'STUN/TURN', 'WebRTC Signaling'],
    price: 'From $5,000',
  },
  {
    icon: 'Smartphone',
    title: 'FreeSWITCH Config',
    description: 'Advanced media server routing, custom ESL scripts, and enterprise dialplan engineering.',
    features: ['ESL Integration', 'Dialplan Logic', 'Media Transcoding', 'Recording Systems'],
    price: 'From $4,000',
  },
  {
    icon: 'ShoppingCart',
    title: 'Kamailio Load Balancing',
    description: 'High-performance SIP proxies to distribute traffic and protect your media servers.',
    features: ['SIP Load Balancing', 'DDoS Protection', 'NAT Traversal', 'Dispatcher'],
    price: 'From $6,000',
  },
  {
    icon: 'Megaphone',
    title: 'Voice AI Agents',
    description: 'Low-latency autonomous voice agents for customer support and lead qualification over phone lines.',
    features: ['Deepgram STT', 'Cartesia TTS', 'LLM Integration', 'Sub-second Latency'],
    price: 'From $8,000',
  },
  {
    icon: 'Bot',
    title: 'Telecom Middleware',
    description: 'Custom APIs to bridge your SIP network with modern CRMs, billing systems, and web apps.',
    features: ['CDR Processing', 'Stripe Billing', 'HubSpot/Salesforce', 'WebSocket Events'],
    price: 'From $3,500',
  },
  {
    icon: 'Server',
    title: 'DevOps & Infrastructure',
    description: 'Scalable cloud infrastructure tailored for real-time UDP media and high availability.',
    features: ['Docker/Kubernetes', 'Anycast IP', 'Network Optimization', 'Monitoring & Alerts'],
    price: 'From $3,000/mo',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$5,000',
    description: 'For businesses launching their first VoIP or Voice AI implementation',
    features: ['Initial Architecture Audit', 'FreeSWITCH Setup', 'Basic SIP Routing', 'Standard Documentation', 'Email support'],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '$9,500',
    description: 'For businesses requiring high availability and advanced integrations',
    features: ['Kamailio Load Balancing', 'Custom Voice AI Agent', 'CRM API Integration', 'Load Testing', 'Weekly strategy calls', 'Falsifiable Deployment Outcomes'],
    featured: true,
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    price: '$18,000',
    description: 'For carriers and enterprises demanding massive concurrent scale',
    features: ['Geo-redundant Clusters', 'Custom C/C++ Modules', 'Advanced AI Automation', 'Dedicated engineering team', 'Custom dashboards', 'Enterprise-grade SLA'],
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
  { value: '500M+', label: 'Calls Routed' },
  { value: '<600ms', label: 'AI Voice Latency' },
  { value: '99.99%', label: 'Infrastructure Uptime' },
  { value: '0.5s', label: 'Call Setup Time' },
];

export const missionValues = [
  {
    title: 'Engineering Excellence',
    description: 'We write performant, low-level network code. No unoptimized middleware. No technical debt.',
    icon: 'Code2',
  },
  {
    title: 'Radical Transparency',
    description: 'You see the raw SIP traces, the latency benchmarks, and every architectural decision made.',
    icon: 'Eye',
  },
  {
    title: 'SLA Accountability',
    description: "We tie our success to system stability. If the latency spikes, we take the hit.",
    icon: 'TrendingUp',
  },
  {
    title: 'Sub-second Speeds',
    description: 'In VoIP and Voice AI, latency is everything. We optimize every packet and every API call.',
    icon: 'Zap',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Muhammad Aafaq',
    title: 'Founder & Lead Engineer',
    bio: 'Visionary technical leader steering Controva LLC’s architecture, building high-performance systems and driving engineering excellence.',
    avatar: '/images/aafaq.png',
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
    name: 'Armghan Ahamd',
    title: 'Creative Director',
    bio: 'Award-winning creative mastermind ensuring every Controva LLC project achieves stunning visual excellence and outstanding user experience.',
    avatar: '/images/Armaghan.png',
  },
];

export interface NicheService {
  id: string;
  slug: string;
  title: string;
  description: string;
  keywords: string;
  benefits: string[];
}

export const nicheServices: NicheService[] = [
  {
    id: 'healthcare-voip-usa',
    slug: 'healthcare-voip-usa',
    title: 'VoIP & HIPAA-Compliant SIP Engineering for Healthcare in the USA',
    description: 'We build end-to-end, HIPAA-compliant VoIP architectures for USA-based healthcare providers using highly secure FreeSWITCH and Kamailio deployments. Ensure patient data privacy while handling thousands of concurrent telemedicine calls.',
    keywords: 'healthcare VoIP USA, HIPAA compliant SIP trunking, FreeSWITCH telemedicine, Kamailio healthcare routing',
    benefits: ['End-to-end SRTP encryption', 'HIPAA-compliant data handling', 'Sub-second telemedicine latency', 'Automated appointment AI voice agents']
  },
  {
    id: 'call-center-sip-usa',
    slug: 'call-center-sip-usa',
    title: 'High-Volume SIP Infrastructure for USA Call Centers',
    description: 'Scale your USA call center to 10,000+ concurrent calls with zero dropped packets. We engineer robust load balancing with Kamailio and core media handling with FreeSWITCH to eliminate SaaS per-minute fees.',
    keywords: 'USA call center SIP trunking, high volume Kamailio load balancing, FreeSWITCH call center architecture',
    benefits: ['Zero per-minute SaaS licensing fees', '10,000+ concurrent call capacity', 'Real-time AI transcriptions', 'Predictive dialing integrations']
  },
  {
    id: 'financial-services-voip-usa',
    slug: 'financial-services-voip-usa',
    title: 'Ultra-Low Latency VoIP for Financial Services & Trading Floors in the USA',
    description: 'For USA trading floors and financial institutions, every millisecond counts. We deploy edge-optimized SIP networks that guarantee ultra-low latency and strict SEC compliance for voice recording.',
    keywords: 'financial services VoIP USA, low latency SIP trading, SEC compliant voice recording, FreeSWITCH finance',
    benefits: ['Ultra-low latency edge routing', 'SEC-compliant SIP recording pipelines', 'High-availability failover (99.999% uptime)', 'Encrypted signaling (TLS/SRTP)']
  },
  {
    id: 'ai-voice-agents-usa',
    slug: 'ai-voice-agents-usa',
    title: 'Custom AI Voice Agents & Conversational IVR for USA Enterprises',
    description: 'Replace legacy IVR menus with Conversational AI. We engineer sub-second latency voice pipelines integrating LLMs directly into your SIP trunks, providing USA enterprises with 24/7 autonomous customer service.',
    keywords: 'AI voice agents USA, conversational IVR development, LLM SIP integration, autonomous customer service AI',
    benefits: ['Sub-500ms conversational latency', 'Direct LLM-to-SIP integrations', '24/7 autonomous customer support', 'Dynamic CRM data fetching during calls']
  },
  {
    id: 'webrtc-development-usa',
    slug: 'webrtc-development-usa',
    title: 'Custom WebRTC Application Development in the USA',
    description: 'Build native, browser-based communication platforms. We engineer scalable WebRTC SFUs (Selective Forwarding Units) and MCUs to power video conferencing, telehealth, and remote collaboration tools across the USA.',
    keywords: 'WebRTC development USA, custom video conferencing engineering, SFU MCU deployment, browser based VoIP',
    benefits: ['Scalable WebRTC SFU/MCU architecture', 'Zero-install browser communication', 'Mobile and desktop cross-compatibility', 'Advanced noise suppression integration']
  }
];