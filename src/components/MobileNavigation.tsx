import React, { useState } from 'react';
import { Link, useRouter } from '../router';
import { Logo } from './Logo';
import { CATEGORIES } from '../data/mockData';
import { 
  X, 
  Search, 
  Bookmark, 
  Mail, 
  MapPin, 
  Layers, 
  ChevronDown, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  Rss
} from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  savedCount: number;
  onOpenSearch: () => void;
}

export function MobileNavigation({ isOpen, onClose, savedCount, onOpenSearch }: MobileNavigationProps) {
  const { path } = useRouter();
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose} 
      />

      {/* Slide-in Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#090d16] border-l border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <Logo size="sm" isLink={false} />
          <button
            onClick={onClose}
            aria-label="Fechar menu de navegação"
            className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-800 bg-[#07090e]">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 transition-colors"
          >
            <Search className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-mono">Buscar</span>
          </button>

          <Link
            to="/salvos"
            onClick={onClose}
            className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-200 hover:text-cyan-400 transition-colors relative"
          >
            <Bookmark className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-mono">Salvos</span>
            {savedCount > 0 && (
              <span className="absolute top-1 right-2 px-1.5 py-0.2 rounded-full bg-cyan-500 text-[#07090e] font-bold text-[9px]">
                {savedCount}
              </span>
            )}
          </Link>

          <Link
            to="/mapa"
            onClick={onClose}
            className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-200 hover:text-emerald-400 transition-colors"
          >
            <MapPin className="w-4 h-4 mb-1 text-emerald-400" />
            <span className="text-[10px] font-mono">Mapa</span>
          </Link>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Editorial Nav */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-2">
              Navegação Principal
            </div>
            <nav className="space-y-1">
              <Link
                to="/"
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  path === '/' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/40' : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>Destaques</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/ultimas"
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  path === '/ultimas' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/40' : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>Últimas Notícias</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  Ao vivo
                </span>
              </Link>

              <Link
                to="/categoria/geoai"
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  path === '/categoria/geoai' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/40' : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>GeoAI & Modelos</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/categoria/satelites-newspace"
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  path === '/categoria/satelites-newspace' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/40' : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>Satélites & NewSpace</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/categoria/drones-lidar"
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  path === '/categoria/drones-lidar' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/40' : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>Drones & LiDAR</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/categoria/gis-cartografia"
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  path === '/categoria/gis-cartografia' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/40' : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>GIS & Mapas</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/dossies"
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  path === '/dossies' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/40' : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>Dossiês Geozine</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/relatorios"
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  path === '/relatorios' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-800/40' : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>Relatórios & Especiais</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </nav>
          </div>

          {/* Expandable all categories */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => setCategoriesExpanded(!categoriesExpanded)}
              className="w-full flex items-center justify-between px-2 py-2 text-xs font-mono uppercase text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Todas as 11 Áreas Temáticas
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesExpanded ? 'rotate-180' : ''}`} />
            </button>

            {categoriesExpanded && (
              <div className="space-y-1 mt-2 pl-2">
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.slug}
                    to={`/categoria/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-2 py-1.5 rounded text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  >
                    <span>{cat.shortName}</span>
                    <span className="text-[10px] font-mono text-slate-400">{cat.articleCount}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Editorial & Institutional Links */}
          <div className="pt-2 border-t border-slate-800">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-2">
              Institucional & Ética
            </div>
            <div className="space-y-1 text-xs">
              <Link to="/sobre" onClick={onClose} className="block px-3 py-1.5 text-slate-300 hover:text-cyan-400">
                Sobre a Geozine
              </Link>
              <Link to="/metodologia-editorial" onClick={onClose} className="block px-3 py-1.5 text-slate-300 hover:text-cyan-400">
                Metodologia & IA
              </Link>
              <Link to="/fontes-e-transparencia" onClick={onClose} className="block px-3 py-1.5 text-slate-300 hover:text-cyan-400">
                Fontes & Transparência
              </Link>
              <Link to="/rss" onClick={onClose} className="block px-3 py-1.5 text-slate-300 hover:text-cyan-400">
                Feeds RSS
              </Link>
              <Link to="/contato" onClick={onClose} className="block px-3 py-1.5 text-slate-300 hover:text-cyan-400">
                Contato & Pautas
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Newsletter CTA in Drawer */}
        <div className="p-4 border-t border-slate-800 bg-[#07090e]">
          <Link
            to="/boletim"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#07090e] font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-cyan-950/50"
          >
            <Mail className="w-4 h-4" />
            Geozine Briefing
          </Link>
          <div className="text-[10px] text-center text-slate-400 font-mono mt-2">
            Site mantido pela Allsee
          </div>
        </div>
      </div>
    </div>
  );
}
