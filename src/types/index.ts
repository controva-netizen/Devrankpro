export type ThemeMode = 'dark' | 'light';

export interface Palette {
  name: string;
  accent1: string;
  accent2: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  features?: string[];
}

export interface DetailedService {
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
  badge: string;
}

export interface CaseStudy {
  title: string;
  category: string;
  description: string;
  image: string;
  result?: string;
  metrics?: string[];
  link?: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

export interface NavLink {
  label: string;
  path: string;
}
