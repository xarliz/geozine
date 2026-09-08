import React, { useState } from 'react';
import { CATEGORIES } from '../data/mockData';
import { Rss, Copy, Check, ExternalLink, Globe } from 'lucide-react';

export function RssPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyFeed = (url: string, key: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const domain = 'https://geozine.allsee.com.br';

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Rss className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            Sindicância Aberta de Conteúdo
          </span>
        </div>
        <h1 className="font-['Poppins'] text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Feeds RSS & GeoRSS da Geozine
        </h1>
        <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
          Assine nossos canais de distribuição para integrar o radar geoespacial no seu leitor de feeds (Feedly, Inoreader, NetNewsWire) ou em pipelines automatizados de inteligência territorial.
        </p>
      </div>

      {/* Main Global Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-[#0c121e] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Feed Geral Principal</span>
            <span className="text-[10px] font-mono text-slate-500">XML / RSS 2.0</span>
          </div>
          <h3 className="font-bold text-slate-200 text-sm">
            Todas as reportagens publicadas em tempo real
          </h3>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <code className="text-xs font-mono text-slate-400 truncate mr-2">
              {domain}/feed.xml
            </code>
            <button
              onClick={() => copyFeed(`${domain}/feed.xml`, 'main')}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 flex items-center gap-1 shrink-0"
            >
              {copiedKey === 'main' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'main' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#0c121e] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">GeoRSS (WGS84)</span>
            <span className="text-[10px] font-mono text-slate-500">GeoRSS / GML</span>
          </div>
          <h3 className="font-bold text-slate-200 text-sm">
            Feed com coordenadas e geometria para GIS
          </h3>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <code className="text-xs font-mono text-slate-400 truncate mr-2">
              {domain}/georss.xml
            </code>
            <button
              onClick={() => copyFeed(`${domain}/georss.xml`, 'georss')}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 flex items-center gap-1 shrink-0"
            >
              {copiedKey === 'georss' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'georss' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Feeds Directory */}
      <div className="space-y-4">
        <h2 className="font-['Poppins'] text-lg font-bold text-white">
          Feeds Filtrados por Editoria
        </h2>

        <div className="rounded-xl border border-slate-800 bg-[#0a0e17] divide-y divide-slate-800/80">
          {CATEGORIES.map(cat => (
            <div key={cat.slug} className="p-3.5 flex items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="font-bold text-slate-200 truncate">{cat.name}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <code className="text-slate-500 hidden sm:inline">
                  /rss/{cat.slug}.xml
                </code>
                <button
                  onClick={() => copyFeed(`${domain}/rss/${cat.slug}.xml`, cat.slug)}
                  className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-cyan-400"
                  title="Copiar URL do feed"
                >
                  {copiedKey === cat.slug ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

