import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, MessageSquare, Phone, User } from 'lucide-react';

interface QuickRepliesProps {
  replies: { label: string; value: string; action: string; url?: string }[];
  onSelect: (reply: { label: string; value: string; action: string; url?: string }) => void;
}

const actionIcons: Record<string, typeof ArrowRight> = {
  message: MessageSquare,
  navigate: ArrowRight,
  external: ExternalLink,
  lead_capture: Phone,
  human_handoff: User,
};

export default function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.25 }}
      className="flex flex-wrap gap-1.5 mt-2.5"
    >
      {replies.map((reply, index) => {
        const Icon = actionIcons[reply.action] || MessageSquare;
        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={() => onSelect(reply)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--accent-1)',
              border: '1px solid var(--accent-border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-1)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
              e.currentTarget.style.color = 'var(--accent-1)';
            }}
          >
            <Icon size={11} />
            {reply.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
