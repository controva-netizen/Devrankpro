import React from 'react';
import { Link } from 'react-router-dom';

const KEYWORDS = [
  { term: 'FreeSWITCH', url: '/services' },
  { term: 'Kamailio', url: '/services' },
  { term: 'SIP trunking', url: '/services' },
  { term: 'SIP', url: '/services' },
  { term: 'WebRTC', url: '/services' },
  { term: 'Voice AI', url: '/services' },
  { term: 'VoIP infrastructure', url: '/services' }
];

// Helper to escape regex special characters
const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function parseAutoLinks(text: string): React.ReactNode[] {
  if (!text) return [];

  // Sort keywords by length descending to match longest phrases first (e.g. "SIP trunking" before "SIP")
  const sortedKeywords = [...KEYWORDS].sort((a, b) => b.term.length - a.term.length);
  
  const pattern = new RegExp(`\\b(${sortedKeywords.map(k => escapeRegExp(k.term)).join('|')})\\b`, 'gi');
  
  const parts = text.split(pattern);
  
  return parts.map((part, i) => {
    // Even indices are regular text, odd indices are matched keywords
    if (i % 2 === 0) return part;
    
    // Find the matching keyword configuration
    const match = sortedKeywords.find(k => k.term.toLowerCase() === part.toLowerCase());
    
    if (match) {
      return (
        <Link 
          key={i} 
          to={match.url} 
          className="text-[var(--accent-1)] hover:underline decoration-[var(--accent-1)] underline-offset-4 font-medium transition-colors"
          title={`Learn more about ${match.term}`}
        >
          {part}
        </Link>
      );
    }
    
    return part;
  });
}

interface AutoLinkerProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AutoLinker({ text, className = '', style }: AutoLinkerProps) {
  return <span className={className} style={style}>{parseAutoLinks(text)}</span>;
}
