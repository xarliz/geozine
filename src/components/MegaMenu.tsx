import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { Link } from '../router';
import { 
  Cpu, 
  Layers, 
  Satellite, 
  Orbit, 
  Radio, 
  Navigation, 
  Box, 
  Database, 
  CloudRain, 
  Tractor, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'geoai': <Cpu className="w-4 h-4 text-cyan-400" />,
  'gis-cartografia': <Layers className="w-4 h-4 text-sky-400" />,
  'sensoriamento-remoto': <Satellite className="w-4 h-4 text-emerald-400" />,
  'satelites-newspace': <Orbit className="w-4 h-4 text-indigo-400" />,
  'drones-lidar': <Radio className="w-4 h-4 text-amber-400" />,
  'gnss-geodesia': <Navigation className="w-4 h-4 text-pink-400" />,
  'digital-twins': <Box className="w-4 h-4 text-purple-400" />,
  'dados-abertos': <Database className="w-4 h-4 text-teal-400" />,
  'clima-ambiente': <CloudRain className="w-4 h-4 text-emerald-400" />,
  'agro-infra': <Tractor className="w-4 h-4 text-yellow-400" />,
  'mercado': <TrendingUp className="w-4 h-4 text-slate-400" />,
};

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-[#0a0e17]/95 border-b border-slate-800 shadow-2xl backdrop-blur-xl z-40 animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
              Áreas Editoriais & Cobertura Geoespacial
            </span>
          </div>
          <Link 
            to="/ultimas" 
            onClick={onClose}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            Ver feed completo <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to={`/categoria/${cat.slug}`}
              onClick={onClose}
              className="p-3 rounded-lg bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all group flex items-start gap-3"
            >
              <div className="p-2 rounded-md bg-slate-800/80 group-hover:bg-slate-700/80 shrink-0 mt-0.5 transition-colors">
                {CATEGORY_ICONS[cat.slug] || <Layers className="w-4 h-4 text-cyan-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-1">
                    {cat.articleCount}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-sans leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Quick Links */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <Link to="/mapa" onClick={onClose} className="hover:text-cyan-400 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" /> Mapa de Notícias
            </Link>
            <Link to="/dossies" onClick={onClose} className="hover:text-cyan-400">
              Dossiês Investigativos
            </Link>
            <Link to="/relatorios" onClick={onClose} className="hover:text-cyan-400">
              Arquivo de Relatórios
            </Link>
          </div>
          <div className="text-[11px] text-slate-400">
            Pressione <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-[10px]">ESC</kbd> para fechar
          </div>
        </div>
      </div>
    </div>
  );
}
