import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (last item) */
  path?: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.path ? { item: `https://www.controvallc.com${item.path}` } : {}),
    })),
  };
}

export default function Breadcrumbs({ items, className = '' }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={`max-w-[1280px] mx-auto px-6 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />}
            {item.path ? (
              <Link to={item.path} className="hover:underline" style={{ color: 'var(--text-muted)' }}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: 'var(--text-primary)' }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
