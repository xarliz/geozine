import React from 'react';
import { Link } from '../router';
import { CategorySlug } from '../types';

interface CategoryChipProps {
  category: CategorySlug | string;
  name: string;
  isLink?: boolean;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export function CategoryChip({ category, name, isLink = true, className = '', size = 'sm' }: CategoryChipProps) {
  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.2',
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  }[size];

  const content = (
    <span className={`inline-flex items-center gap-1 font-mono uppercase tracking-wider font-semibold rounded bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 transition-colors hover:border-cyan-400 hover:text-cyan-200 ${sizeClasses} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      <span>{name}</span>
    </span>
  );

  if (isLink) {
    return (
      <Link 
        to={`/categoria/${category}`} 
        className="inline-block focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
      >
        {content}
      </Link>
    );
  }

  return content;
}
