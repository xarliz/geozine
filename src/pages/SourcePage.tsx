import React from 'react';
import { useRouter } from '../router';
import { sourceRepository, articleRepository } from '../data/repository';
import { ArticleCard } from '../components/ArticleCard';
import { Link } from '../router';
import { ShieldCheck, Globe, ExternalLink, ArrowLeft, CheckCircle2, Database } from 'lucide-react';

export function SourcePage() {
  const { params } = useRouter();
  const slug = params.slug || 'inpe';

  const source = sourceRepository.getBySlug(slug);
  const articles = articleRepository.getBySource(slug);

  if (!source) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-['Poppins'] font-bold text-white">Fonte não encontrada</h2>
        <p className="text-slate-400">O registro da fonte solicitada não está catalogado em nosso diretório de transparência.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Voltar ao radar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link to="/" className="hover:text-cyan-300">Início</Link>
        <span>/</span>
        <Link to="/fontes-e-transparencia" className="hover:text-cyan-300">Diretório de Fontes</Link>
        <span>/</span>
        <span className="text-cyan-400">{source.name}</span>
      </div>

      {/* Source Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-[#0c121e] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Fonte Primária Auditada
              </span>
            </div>
            <h1 className="font-['Poppins'] text-2xl sm:text-3xl font-extrabold text-white">
              {source.name}
            </h1>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider mt-1 block">
              {source.category} • {source.country}
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 text-center">
            <span className="text-2xl font-extrabold text-cyan-400 font-['Poppins'] block">
              {source.reliabilityScore}%
            </span>
            <span className="text-[10px] font-mono uppercase text-slate-400">
              Confiabilidade Editorial
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
          {source.description}
        </p>

        {/* Technical protocol details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Protocolo de Coleta</span>
            <span className="text-slate-200 font-bold mt-1 block">{source.ingestionProtocol}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Frequência de Ingestão</span>
            <span className="text-slate-200 font-bold mt-1 block">{source.frequency}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Repositório Oficial</span>
            <a 
              href={source.url} 
              target="_blank" 
              rel="noreferrer"
              className="text-cyan-400 hover:underline font-bold mt-1 flex items-center gap-1 truncate"
            >
              <span>{source.url.replace('https://', '')}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Articles from this source */}
      <section className="space-y-6">
        <h2 className="font-['Poppins'] text-xl font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          Reportagens que citam {source.name}
        </h2>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-[#0b101a] border border-slate-800 rounded-xl text-slate-400 text-sm">
            Nenhuma reportagem indexada atualmente com esta fonte primária.
          </div>
        )}
      </section>
    </div>
  );
}

