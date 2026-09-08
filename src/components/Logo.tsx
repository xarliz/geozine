import React from 'react';
import { Link } from '../router';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  isLink?: boolean;
}

export function Logo({ size = 'md', showTagline = false, className = '', isLink = true }: LogoProps) {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }[size];

  const textDimensions = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }[size];

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Precision Geospatial Orbital G Mark */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconDimensions}`}>
        {/* Orbital ellipse track */}
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Faint background reticle */}
          <circle cx="18" cy="18" r="16" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="11" stroke="#334155" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
          
          {/* Orbital path arc forming upper curve */}
          <path
            d="M29 18C29 11.925 24.075 7 18 7C11.925 7 7 11.925 7 18C7 24.075 11.925 29 18 29C22.5 29 26.3 26.3 28 22.5H18"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Target geolocation coordinate point on the orbital path */}
          <circle cx="28" cy="22.5" r="3.2" fill="#10b981" />
          <circle cx="28" cy="22.5" r="5" stroke="#10b981" strokeWidth="1" opacity="0.5" className="animate-ping origin-center" />

          {/* Central nadir focal point */}
          <circle cx="18" cy="18" r="1.5" fill="#38bdf8" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span 
            className={`font-['Poppins'] font-extrabold tracking-tight text-white uppercase group-hover:text-cyan-400 transition-colors ${textDimensions}`}
          >
            GEO<span className="text-cyan-400">ZINE</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Radar operacional" />
        </div>
        
        {showTagline && (
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 -mt-1 hidden sm:block">
            Radar Geoespacial
          </span>
        )}
      </div>
    </div>
  );

  if (isLink) {
    return (
      <Link to="/" className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md">
        {content}
      </Link>
    );
  }

  return content;
}

