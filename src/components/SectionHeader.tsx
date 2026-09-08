import React from 'react';
import { Link } from '../router';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionLink?: string;
  badge?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  actionText = 'Ver todas',
  actionLink,
  badge,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between pb-3 border-b border-slate-800 gap-2 mb-6 ${className}`}>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          {badge && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              {badge}
            </span>
          )}
          {subtitle && (
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              {subtitle}
            </span>
          )}
        </div>
        <h2 className="font-['Poppins'] text-xl sm:text-2xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>

      {actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold group transition-colors self-start sm:self-auto"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}

