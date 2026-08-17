import type { Service, Testimonial, CaseStudy, TeamMember, PricingTier, NavLink } from '@/types';

export const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'AI Receptionist', path: '/services/ai-receptionist' },
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
    link: '/services/custom-voip-development'
  },
  {
    id: 'freeswitch',
    title: 'FreeSWITCH & Kamailio',
    description: 'Enterprise-grade switch configuration, ESL module development, and load balancing.',
    image: '/images/service-social-ads.jpg',
    badge: 'Switching',
    link: '/services/freeswitch-kamailio-development'
  },
  {
    id: 'voice-ai',
    title: 'Voice AI Agents',
    description: 'Sub-second latency conversational AI using Deepgram, Cartesia, and custom LLM integration.',
    image: '/images/service-ecommerce.jpg',
    badge: 'AI/ML',
    link: '/services/ai-receptionist'
  },
  {
    id: 'webrtc',
    title: 'WebRTC Applications',
    description: 'Browser-based softphones and secure video conferencing with optimized STUN/TURN routing.',
    image: '/images/service-ai-automation.jpg',
    badge: 'Real-Time',
    link: '/services/webrtc-development-usa'
  },
  {
    id: 'infrastructure',
    title: 'Enterprise DevOps',
    description: 'Self-hosted solutions, Docker deployments, CI/CD pipelines, and SIP failover clusters.',
    image: '/images/service-devops.jpg',
    badge: 'DevOps',
    link: '/services/enterprise-voip-devops'
  },
  {
    id: 'api-middleware',
    title: 'Telecom API Middleware',
    description: 'Bridging legacy SIP networks with modern REST/GraphQL APIs and CRM platforms.',
    image: '/images/service-branding.jpg',
    badge: 'Integration',
    link: '/services/telecom-api-middleware'
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
    link: '/services/custom-voip-development'
  },
  {
    icon: 'Smartphone',
    title: 'FreeSWITCH Config',
    description: 'Advanced media server routing, custom ESL scripts, and enterprise dialplan engineering.',
    features: ['ESL Integration', 'Dialplan Logic', 'Media Transcoding', 'Recording Systems'],
    price: 'From $4,000',
    link: '/services/freeswitch-kamailio-development'
  },
  {
    icon: 'ShoppingCart',
    title: 'Kamailio Load Balancing',
    description: 'High-performance SIP proxies to distribute traffic and protect your media servers.',
    features: ['SIP Load Balancing', 'DDoS Protection', 'NAT Traversal', 'Dispatcher'],
    price: 'From $6,000',
    link: '/services/freeswitch-kamailio-development'
  },
  {
    icon: 'Megaphone',
    title: 'Voice AI Agents',
    description: 'Low-latency autonomous voice agents for customer support and lead qualification over phone lines.',
    features: ['Deepgram STT', 'Cartesia TTS', 'LLM Integration', 'Sub-second Latency'],
    price: 'From $8,000',
    link: '/services/ai-receptionist'
  },
  {
    icon: 'Bot',
    title: 'Telecom Middleware',
    description: 'Custom APIs to bridge your SIP network with modern CRMs, billing systems, and web apps.',
    features: ['CDR Processing', 'Stripe Billing', 'HubSpot/Salesforce', 'WebSocket Events'],
    price: 'From $3,500',
    link: '/services/telecom-api-middleware'
  },
  {
    icon: 'Server',
    title: 'DevOps & Infrastructure',
    description: 'Scalable cloud infrastructure tailored for real-time UDP media and high availability.',
    features: ['Docker/Kubernetes', 'Anycast IP', 'Network Optimization', 'Monitoring & Alerts'],
    price: 'From $3,000/mo',
    link: '/services/enterprise-voip-devops'
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

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface NicheService {
  id: string;
  slug: string;
  title: string;
  /* Short label shown in the hero pill and used as the H1 when the full title is long */
  heroTagline: string;
  description: string;
  keywords: string;
  benefits: string[];
  faqs: ServiceFaq[];
}

export const nicheServices: NicheService[] = [
  {
    id: 'freeswitch-kamailio-development',
    slug: 'freeswitch-kamailio-development',
    title: 'FreeSWITCH & Kamailio Development Company',
    heroTagline: 'Open-Source Telephony Engineering',
    description: 'Controva is a specialist FreeSWITCH and Kamailio development company. We build and tune production SIP infrastructure — custom ESL modules, complex dialplans, Kamailio SIP proxies, dispatcher-based load balancing, and NAT traversal — for teams that have outgrown off-the-shelf CPaaS pricing.',
    keywords: 'freeswitch development company, kamailio consulting, freeswitch developer, kamailio load balancer setup, freeswitch esl development',
    benefits: [
      'Custom ESL module development in Python, Node.js, and C',
      'High-CPS dialplan engineering and call routing logic',
      'Kamailio SIP proxy, dispatcher, and registrar configuration',
      'NAT traversal, topology hiding, and SIP security hardening'
    ],
    faqs: [
      {
        question: 'What is the difference between FreeSWITCH and Kamailio, and do I need both?',
        answer: 'FreeSWITCH is a media server — it handles the actual audio: transcoding, recording, IVR, conferencing, and voice-AI bridging. Kamailio is a SIP proxy and load balancer — it routes signalling and distributes traffic across media servers without touching the audio. Small deployments can run on FreeSWITCH alone; once you need high availability or thousands of concurrent calls, Kamailio in front of a FreeSWITCH cluster is the standard pattern. We help you decide which you actually need rather than over-building.'
      },
      {
        question: 'Can you work with our existing FreeSWITCH or Kamailio deployment, or only new builds?',
        answer: 'Both. A large share of our work is auditing, debugging, and extending existing deployments — tracking down one-way-audio and NAT issues, optimising dialplans, hardening against SIP scanning, and adding modules. We start with a review of your current configuration before proposing changes.'
      },
      {
        question: 'How do you handle high call-per-second (CPS) loads?',
        answer: 'We separate signalling from media, put Kamailio dispatcher in front of a pool of FreeSWITCH media servers, tune kernel and RTP settings, and load-test with realistic SIP traffic simulation before go-live. The exact CPS ceiling depends on your codecs and hardware, which we benchmark as part of the engagement.'
      },
      {
        question: 'Do you provide ongoing support after deployment?',
        answer: 'Yes. Beyond the initial build we offer retained support for monitoring, updates, incident response, and capacity planning. We hand over full documentation and SIP traces so your own team is never locked out of its own infrastructure.'
      }
    ]
  },
  {
    id: 'custom-voip-development',
    slug: 'custom-voip-development',
    title: 'Custom VoIP Development Services',
    heroTagline: 'Carrier-Grade SIP Architecture',
    description: 'We design and build custom VoIP systems from the carrier interconnect up: SIP trunking, RTP media routing, WebRTC, high-availability clustering, and STUN/TURN. Purpose-built infrastructure that scales with your call volume instead of billing you per minute for it.',
    keywords: 'custom voip development services, voip development company, sip trunking development company, custom sip architecture, rtp media routing',
    benefits: [
      'Carrier interconnect and SIP trunk provisioning',
      'RTPengine media proxying and codec transcoding',
      'High-availability clustering with automatic failover',
      'STUN/TURN and secure WebRTC signalling'
    ],
    faqs: [
      {
        question: 'Why build custom VoIP instead of using a CPaaS like Twilio or Vonage?',
        answer: 'CPaaS platforms are excellent for getting started, but at scale their per-minute pricing and lack of low-level control become the constraint. Custom infrastructure trades a higher up-front build cost for dramatically lower per-minute economics, full control over routing and media, and no vendor lock-in. We help you model the break-even point honestly before you commit — sometimes staying on CPaaS is the right call, and we will tell you so.'
      },
      {
        question: 'Can you integrate with our existing carriers and phone numbers?',
        answer: 'Yes. We provision and configure SIP trunks with your chosen carriers, port existing DIDs, and set up least-cost routing across multiple providers for redundancy. You keep your numbers and carrier relationships.'
      },
      {
        question: 'How do you ensure call quality and reliability?',
        answer: 'We proxy media through RTPengine, deploy geographically where it makes sense to keep latency low, run high-availability clusters so a single node failure does not drop calls, and instrument everything so quality problems are visible before customers report them.'
      },
      {
        question: 'What does a typical custom VoIP engagement look like?',
        answer: 'We start with an architecture audit of your requirements and traffic profile, deliver a design and cost model, then build and load-test in stages. You see the SIP traces and latency benchmarks at each step — nothing is a black box.'
      }
    ]
  },
  {
    id: 'telecom-api-middleware',
    slug: 'telecom-api-middleware',
    title: 'Telecom API & Middleware Development',
    heroTagline: 'CDR, CRM & Billing Integration',
    description: 'We bridge raw SIP infrastructure to the systems your business actually runs on — real-time CDR processing, billing and Stripe integration, Salesforce and HubSpot sync, and WebSocket event streaming. The middleware layer that turns call data into revenue and reporting.',
    keywords: 'telecom api integration, cdr processing, sip crm integration, voip billing integration, telecom middleware development',
    benefits: [
      'Real-time CDR (Call Detail Record) processing pipelines',
      'Usage-based billing and Stripe integration',
      'Salesforce, HubSpot, and CRM two-way sync',
      'WebSocket and webhook event streaming'
    ],
    faqs: [
      {
        question: 'What is telecom middleware and why do I need it?',
        answer: 'Middleware is the layer between your raw telephony platform and your business systems. It takes call events and CDRs from FreeSWITCH or Kamailio and turns them into the things you actually need — accurate invoices, CRM records updated during a call, real-time dashboards, and triggers into other tools. Without it, valuable call data sits trapped in log files.'
      },
      {
        question: 'Can you integrate call data with our CRM in real time?',
        answer: 'Yes. We build two-way integrations with Salesforce, HubSpot, and custom CRMs so an inbound call can pull up the caller record instantly and log the outcome automatically when the call ends. We use the CRM APIs directly rather than brittle screen-scraping.'
      },
      {
        question: 'How accurate is your CDR-based billing?',
        answer: 'We process CDRs in real time with reconciliation against the switch, so billing reflects actual connected-call duration rather than estimates. We handle rounding rules, multiple rate plans, and per-destination pricing, and we expose the raw records so your finance team can audit any invoice.'
      },
      {
        question: 'Do you build custom APIs or only connect existing ones?',
        answer: 'Both. We expose your telephony platform through clean REST and WebSocket APIs your other applications can consume, and we integrate outward into third-party services. The goal is that your telephony behaves like any other well-documented internal service.'
      }
    ]
  },
  {
    id: 'enterprise-voip-devops',
    slug: 'enterprise-voip-devops',
    title: 'Enterprise VoIP DevOps & Infrastructure',
    heroTagline: 'Real-Time Media at Scale',
    description: 'Real-time voice is one of the hardest workloads to run reliably. We bring DevOps discipline to VoIP — Docker and Kubernetes tuned for RTP media, autoscaling media pools, geo-redundant failover, and full observability — so your voice infrastructure meets an enterprise SLA instead of hoping for the best.',
    keywords: 'voip devops, sip infrastructure scaling, rtpengine kubernetes, voip high availability, real-time media devops',
    benefits: [
      'Docker and Kubernetes tuned for real-time UDP media',
      'RTP engine autoscaling and media pool management',
      'Geo-redundant failover and 99.99% uptime SLA design',
      'Monitoring, alerting, and observability for SIP and RTP'
    ],
    faqs: [
      {
        question: 'Why is VoIP harder to run on Kubernetes than a normal web app?',
        answer: 'Web apps are stateless and use TCP; real-time voice uses UDP for RTP media, is highly latency-sensitive, and holds long-lived stateful sessions. Standard Kubernetes networking and autoscaling assumptions break down for media. We configure host networking, media port ranges, session-aware scaling, and graceful draining so calls are never cut off mid-conversation during a deploy or scale event.'
      },
      {
        question: 'What uptime can you realistically deliver?',
        answer: 'With geo-redundant clustering, health-checked failover, and proper monitoring, a well-designed 99.99% uptime target is achievable — but the honest answer depends on your carrier redundancy and budget. We design to a specific SLA target we agree with you up front and are transparent about the trade-offs at each level.'
      },
      {
        question: 'Can you take over an existing deployment that keeps having outages?',
        answer: 'Yes — reliability rescue work is a common engagement. We start by instrumenting the system to find the real failure modes (often NAT, capacity limits, or missing failover), then fix root causes rather than papering over symptoms. You get the monitoring and runbooks so the fix sticks.'
      },
      {
        question: 'Do you set up monitoring and alerting?',
        answer: 'Yes. Observability is core to every engagement — we instrument SIP signalling, RTP media quality, and system health, set meaningful alerts, and give your team dashboards so problems are visible before they become outages.'
      }
    ]
  },
  {
    id: 'healthcare-voip-usa',
    slug: 'healthcare-voip-usa',
    title: 'VoIP & HIPAA-Compliant SIP Engineering for Healthcare in the USA',
    heroTagline: 'Healthcare Solution',
    description: 'We build end-to-end, HIPAA-compliant VoIP architectures for USA-based healthcare providers using highly secure FreeSWITCH and Kamailio deployments. Ensure patient data privacy while handling thousands of concurrent telemedicine calls.',
    keywords: 'healthcare VoIP USA, HIPAA compliant SIP trunking, FreeSWITCH telemedicine, Kamailio healthcare routing',
    benefits: ['End-to-end SRTP encryption', 'HIPAA-compliant data handling', 'Sub-second telemedicine latency', 'Automated appointment AI voice agents'],
    faqs: [
      {
        question: 'How do you make a VoIP system HIPAA-compliant?',
        answer: 'HIPAA compliance for voice comes down to encrypting signalling (TLS) and media (SRTP) end to end, controlling and logging access to call recordings and PHI, and being able to sign a Business Associate Agreement for the parts we operate. We architect the system so patient data is encrypted in transit and at rest, and we document the controls for your compliance team.'
      },
      {
        question: 'Can this integrate with our EHR or practice management system?',
        answer: 'Yes. We integrate the telephony layer with EHR/EMR and scheduling systems so calls can trigger appointment lookups, reminders, and record updates, using the vendor APIs where available.'
      },
      {
        question: 'Can you handle telemedicine video, not just voice?',
        answer: 'Yes — we build WebRTC-based video for telehealth with the same encryption and compliance posture as the voice side, including browser-based access with no plugins for patients.'
      }
    ]
  },
  {
    id: 'call-center-sip-usa',
    slug: 'call-center-sip-usa',
    title: 'High-Volume SIP Infrastructure for USA Call Centers',
    heroTagline: 'Call Center Infrastructure',
    description: 'Scale your USA call center to 10,000+ concurrent calls with zero dropped packets. We engineer robust load balancing with Kamailio and core media handling with FreeSWITCH to eliminate SaaS per-minute fees.',
    keywords: 'USA call center SIP trunking, high volume Kamailio load balancing, FreeSWITCH call center architecture',
    benefits: ['Zero per-minute SaaS licensing fees', '10,000+ concurrent call capacity', 'Real-time AI transcriptions', 'Predictive dialing integrations'],
    faqs: [
      {
        question: 'How much can a self-hosted call center platform save versus a SaaS dialer?',
        answer: 'Savings come from eliminating per-seat and per-minute licensing at scale. The break-even depends on your call volume and agent count — we build a cost model comparing your current SaaS spend against infrastructure plus support before you commit, so the decision is based on your real numbers.'
      },
      {
        question: 'Can you integrate predictive or power dialing?',
        answer: 'Yes. We build and integrate outbound dialing — predictive, power, and preview modes — with pacing controls and compliance safeguards, connected to your CRM and lead lists.'
      },
      {
        question: 'Will it integrate with our existing agent desktop and CRM?',
        answer: 'Yes. We integrate with your CRM and agent tooling through APIs and WebRTC softphones, so agents keep one screen and calls log automatically.'
      }
    ]
  },
  {
    id: 'financial-services-voip-usa',
    slug: 'financial-services-voip-usa',
    title: 'Ultra-Low Latency VoIP for Financial Services & Trading Floors in the USA',
    heroTagline: 'Financial Services',
    description: 'For USA trading floors and financial institutions, every millisecond counts. We deploy edge-optimized SIP networks that guarantee ultra-low latency and strict SEC compliance for voice recording.',
    keywords: 'financial services VoIP USA, low latency SIP trading, SEC compliant voice recording, FreeSWITCH finance',
    benefits: ['Ultra-low latency edge routing', 'SEC-compliant SIP recording pipelines', 'High-availability failover (99.999% uptime)', 'Encrypted signaling (TLS/SRTP)'],
    faqs: [
      {
        question: 'How do you meet SEC and FINRA voice recording requirements?',
        answer: 'We build recording pipelines that capture, timestamp, encrypt, and archive calls with tamper-evident storage and retention controls, plus the audit trails compliance requires. We document the controls so your compliance team can demonstrate them to regulators.'
      },
      {
        question: 'How low can latency realistically go?',
        answer: 'By proxying media efficiently and deploying close to your users, we minimise added latency beyond the physical network path. The achievable floor depends on geography and carrier routing, which we benchmark and report honestly rather than promising a fixed number.'
      },
      {
        question: 'Can you guarantee uptime for trading-critical voice?',
        answer: 'We design geo-redundant, health-checked failover toward very high availability targets. The exact SLA depends on your carrier and infrastructure investment, which we agree with you up front.'
      }
    ]
  },
  {
    id: 'ai-voice-agents-usa',
    slug: 'ai-voice-agents-usa',
    title: 'Custom AI Voice Agents & Conversational IVR for USA Enterprises',
    heroTagline: 'AI Voice Agents',
    description: 'Replace legacy IVR menus with Conversational AI. We engineer sub-second latency voice pipelines integrating LLMs directly into your SIP trunks, providing USA enterprises with 24/7 autonomous customer service.',
    keywords: 'AI voice agents USA, conversational IVR development, LLM SIP integration, autonomous customer service AI',
    benefits: ['Sub-500ms conversational latency', 'Direct LLM-to-SIP integrations', '24/7 autonomous customer support', 'Dynamic CRM data fetching during calls'],
    faqs: [
      {
        question: 'How is an AI voice agent different from a traditional IVR?',
        answer: 'A traditional IVR forces callers through rigid "press 1 for…" menus. An AI voice agent understands natural speech, handles interruptions, asks follow-up questions, and completes tasks conversationally — booking, qualifying, answering — then hands off to a human with full context when needed.'
      },
      {
        question: 'What is the latency, and does it feel natural?',
        answer: 'We engineer the speech-to-text, LLM, and text-to-speech pipeline for sub-second response with interruption handling, which is the threshold where conversation stops feeling like talking to a machine. Exact latency depends on the models and integrations chosen, which we benchmark during the build.'
      },
      {
        question: 'Which AI models and voices can we use?',
        answer: 'We integrate best-in-class components — for example Deepgram for transcription, Cartesia or similar for voice, and OpenAI or other LLMs for reasoning — and choose based on your latency, quality, and cost requirements rather than locking you to one vendor.'
      }
    ]
  },
  {
    id: 'webrtc-development-usa',
    slug: 'webrtc-development-usa',
    title: 'Custom WebRTC Application Development in the USA',
    heroTagline: 'WebRTC Engineering',
    description: 'Build native, browser-based communication platforms. We engineer scalable WebRTC SFUs (Selective Forwarding Units) and MCUs to power video conferencing, telehealth, and remote collaboration tools across the USA.',
    keywords: 'WebRTC development USA, custom video conferencing engineering, SFU MCU deployment, browser based VoIP',
    benefits: ['Scalable WebRTC SFU/MCU architecture', 'Zero-install browser communication', 'Mobile and desktop cross-compatibility', 'Advanced noise suppression integration'],
    faqs: [
      {
        question: 'What is the difference between an SFU and an MCU, and which do I need?',
        answer: 'An SFU (Selective Forwarding Unit) forwards each participant’s stream without mixing, which scales efficiently and is right for most video conferencing. An MCU mixes streams server-side, using more CPU but less client bandwidth — useful for large broadcasts or low-power devices. We pick based on your participant counts and device mix, and often use a hybrid.'
      },
      {
        question: 'Will it work without users installing anything?',
        answer: 'Yes — WebRTC runs natively in modern browsers, so participants join from a link with no plugins or downloads. We also build native mobile integrations where you need them.'
      },
      {
        question: 'Can you integrate WebRTC with our existing SIP/PSTN phone system?',
        answer: 'Yes. We bridge WebRTC to SIP and the PSTN so browser users and phone users are on the same call, which is core to softphones and click-to-call features.'
      }
    ]
  }
];