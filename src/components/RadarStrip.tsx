import React, { useState, useEffect } from 'react';
import { adminRepository } from '../data/repository';
import { Link } from '../router';
import { Radio, ChevronRight, ChevronLeft } from 'lucide-react';

export function RadarStrip() {
  const updates = adminRepository.getRadarUpdates();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % updates.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, updates.length]);

  const current = updates[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % updates.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + updates.length) % updates.length);
  };

  return (
    <div 
      className="border-y border-slate-800/80 bg-[#0a0e17]/90 text-xs backdrop-blur-md sticky top-[65px] z-30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-9 gap-3">
        {/* Left Radar Label */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="absolute w-4 h-4 rounded-full bg-emerald-400/40 animate-ping"></span>
          </div>
          <span className="font-mono font-bold tracking-widest text-cyan-400 uppercase text-[11px]">
            RADAR GEOZINE
          </span>
          <span className="text-slate-600 font-mono hidden md:inline">|</span>
        </div>

        {/* Dynamic ticker content */}
        <div className="flex-1 overflow-hidden min-w-0 flex items-center">
          <Link 
            to={current.link} 
            className="flex items-center gap-2 group truncate hover:text-cyan-300 transition-colors"
          >
            <span className="font-mono text-slate-400 shrink-0 text-[11px]">
              {current.time}
            </span>
            <span className="font-mono text-emerald-400 shrink-0 font-semibold text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50 uppercase">
              {current.category}
            </span>
            <span className="text-slate-200 truncate group-hover:underline">
              {current.title}
            </span>
          </Link>
        </div>

        {/* Pagination & Arrow Controls */}
        <div className="flex items-center gap-1 shrink-0 font-mono text-[10px] text-slate-400">
          <span className="hidden sm:inline mr-1 text-slate-500">
            {currentIndex + 1}/{updates.length}
          </span>
          <button 
            onClick={handlePrev}
            aria-label="Atualização anterior"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={handleNext}
            aria-label="Próxima atualização"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
