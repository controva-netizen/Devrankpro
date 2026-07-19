import { motion } from 'framer-motion';
import { teamMembers } from '@/data/content';
import SectionHeader from '@/components/shared/SectionHeader';

export default function TeamSection() {
  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-16">
          <SectionHeader label="THE TEAM" headline="The Minds Behind the Machine" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              className="rounded-xl overflow-hidden card-hover"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full aspect-square object-contain bg-[var(--bg-tertiary)]"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {member.name}
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent-1)' }}>
                  {member.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
