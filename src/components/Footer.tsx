import React from 'react';
import { Link } from '../router';
import { Logo } from './Logo';
import { CATEGORIES } from '../data/mockData';
import { 
  Radio, 
  Rss, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05070c] border-t border-slate-800 text-slate-400 text-sm mt-16">
      {/* Top Banner: Brand Statement & Status */}
      <div className="border-b border-slate-800/80 bg-[#070a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="md" showTagline={false} />
            <div className="hidden sm:block pl-3 border-l border-slate-800">
              <p className="text-xs text-slate-300 font-medium">
                Geozine — Notícias, inteligência e inovação geoespacial
              </p>
              <p className="text-[11px] font-mono text-cyan-400/90">
                O radar diário das geotecnologias.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">Radar Operacional</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">11 feeds ativos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: About & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Poppins'] text-white font-bold text-base tracking-tight">
              A Geozine
            </h4>
            <p className="text-xs leading-relaxed text-slate-400 pr-4 font-sans">
              A Geozine é a publicação digital de referência em geotecnologias, sensoriamento remoto, inteligência artificial geoespacial e infraestrutura espacial. Cobrimos lançamentos orbitais, inovações cartográficas, dados abertos e o ecossistema NewSpace com rigor técnico e jornalístico.
            </p>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs">
              <span className="text-slate-400 block font-mono text-[10px] uppercase">
                Curadoria & Desenvolvimento
              </span>
              <span className="text-slate-200 font-semibold block mt-0.5">
                Site mantido pela Allsee
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Especialistas em engenharia de dados, visão computacional e inteligência de localização.
              </p>
            </div>
          </div>

          {/* Col 2: Áreas de Cobertura */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
              Áreas de Cobertura
            </h4>
            <ul className="space-y-1.5 text-xs font-sans">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.slug}>
                  <Link 
                    to={`/categoria/${cat.slug}`}
                    className="hover:text-cyan-300 transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Áreas Especializadas */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
              Mais Setores
            </h4>
            <ul className="space-y-1.5 text-xs font-sans">
              {CATEGORIES.slice(6).map(cat => (
                <li key={cat.slug}>
                  <Link 
                    to={`/categoria/${cat.slug}`}
                    className="hover:text-cyan-300 transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/mapa" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold">
                  <MapPin className="w-3 h-3" /> Mapa Interativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Editorial & Transparência */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
              Editorial & Fontes
            </h4>
            <ul className="space-y-1.5 text-xs font-sans">
              <li>
                <Link to="/sobre" className="hover:text-cyan-300 transition-colors block py-0.5">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/metodologia-editorial" className="hover:text-cyan-300 transition-colors block py-0.5">
                  Metodologia & IA
                </Link>
              </li>
              <li>
                <Link to="/fontes-e-transparencia" className="hover:text-cyan-300 transition-colors block py-0.5">
                  Fontes & Transparência
                </Link>
              </li>
              <li>
                <Link to="/dossies" className="hover:text-cyan-300 transition-colors block py-0.5">
                  Dossiês Investigativos
                </Link>
              </li>
              <li>
                <Link to="/relatorios" className="hover:text-cyan-300 transition-colors block py-0.5">
                  Relatórios Geozine
                </Link>
              </li>
              <li>
                <Link to="/boletim" className="hover:text-cyan-300 transition-colors block py-0.5 text-cyan-400">
                  Geozine Briefing
                </Link>
              </li>
              <li>
                <Link to="/rss" className="hover:text-cyan-300 transition-colors flex items-center gap-1 py-0.5">
                  <Rss className="w-3 h-3 text-amber-400" /> Feeds RSS
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-cyan-300 transition-colors block py-0.5">
                  Contato & Pautas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {currentYear} Geozine. Todos os direitos reservados. Site mantido pela Allsee.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacidade" className="hover:text-slate-300 transition-colors">
              Privacidade
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/termos" className="hover:text-slate-300 transition-colors">
              Termos de Uso
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/cookies" className="hover:text-slate-300 transition-colors">
              Cookies
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/admin" className="text-slate-400 hover:text-cyan-400 transition-colors" title="Painel Interno de Redação">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

