import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface ServiceCategoryProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  reversed?: boolean;
}

export default function ServiceCategorySection({ title, description, features, image, reversed }: ServiceCategoryProps) {
  return (
    <ScrollReveal>
      <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
        <div className="w-full lg:w-[55%]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                <Check size={18} style={{ color: 'var(--accent-1)' }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <motion.div
          className="w-full lg:w-[45%] rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border-subtle)' }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img src={image} alt={title} className="w-full h-auto object-cover" loading="lazy" />
        </motion.div>
      </div>
    </ScrollReveal>
  );
}
