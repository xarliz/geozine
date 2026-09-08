import React from 'react';
import { articleRepository } from '../data/repository';
import { NewsMap } from '../components/NewsMap';
import { MapPin, Globe, Compass, Radio } from 'lucide-react';

export function MapPage() {
  const articles = articleRepository.getAll();

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Cartografia Editorial ao Vivo
            </span>
          </div>
          <h1 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Mapa Geoespacial de Notícias
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl font-sans">
            Explore a cobertura jornalística da Geozine georreferenciada. Clique nos pontos para inspecionar reportagens, sensores orbitais e ocorrências territoriais.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="bg-[#0b101a] border border-slate-800 rounded-lg p-3 text-center">
            <span className="text-lg font-bold text-cyan-400 block font-['Poppins']">
              {articles.filter(a => a.coordinates).length}
            </span>
            <span className="text-[10px] uppercase text-slate-400">Pontos Mapeados</span>
          </div>
          <div className="bg-[#0b101a] border border-slate-800 rounded-lg p-3 text-center">
            <span className="text-lg font-bold text-emerald-400 block font-['Poppins']">100%</span>
            <span className="text-[10px] uppercase text-slate-400">Precisão WGS84</span>
          </div>
        </div>
      </div>

      {/* Main Full-Size Map Component */}
      <section>
        <NewsMap articles={articles} initialHeight="h-[750px]" />
      </section>

      {/* Methodological notice */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-3">
        <Compass className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-mono text-cyan-400 font-semibold uppercase text-[11px] block">
            Nota de Geocodificação Editorial
          </span>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
            As coordenadas representam o epicentro temático de cada reportagem (ex: bases de lançamento, estações receptoras, biomas sob monitoramento ou sedes institucionais) em projeção EPSG:4326 (WGS 84).
          </p>
        </div>
      </div>
    </div>
  );
}

