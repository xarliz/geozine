import React, { useState } from 'react';
import { dossierRepository, articleRepository } from '../data/repository';
import { ArticleCard } from '../components/ArticleCard';
import { Link } from '../router';
import { BookOpen, Layers, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export function DossiersPage() {
  const dossiers = dossierRepository.getAll();
  const [selectedDossierSlug, setSelectedDossierSlug] = useState(dossiers[0]?.slug || '');

  const activeDossier = dossierRepository.getBySlug(selectedDossierSlug) || dossiers[0];
  const relatedArticles = articleRepository.getAll().slice(0, 3);

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Jornalismo Investigativo por Dados Orbitais
          </span>
        </div>
        <h1 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Dossiês Geozine
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl font-sans">
          Investigações aprofundadas sobre transformações territoriais, biomas sob pressão e a geopolítica do sensoriamento remoto, apoiadas por séries temporais de satélites e validação em campo.
        </p>
      </div>

      {/* Dossiers Selection Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {dossiers.map(dossier => (
          <button
            key={dossier.id}
            onClick={() => setSelectedDossierSlug(dossier.slug)}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all text-left ${
              activeDossier.slug === dossier.slug
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span className="block font-bold">{dossier.title}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">{dossier.categoryName} • {dossier.chaptersCount} capítulos</span>
          </button>
        ))}
      </div>

      {/* Active Dossier Feature Box */}
      {activeDossier && (
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0c121e] p-6 sm:p-10 space-y-8">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Dossiê em Destaque
              </span>

              <h2 className="font-['Poppins'] text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeDossier.title}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                {activeDossier.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                <span>Publicado em: {new Date(activeDossier.publishedAt).toLocaleDateString('pt-BR')}</span>
                <span>•</span>
                <span>{activeDossier.chaptersCount} capítulos detalhados</span>
              </div>
            </div>

            {/* Right Cover Image */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl">
                <img
                  src={activeDossier.coverImage}
                  alt={activeDossier.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Methodology & Chapters Grid */}
          <div className="pt-6 border-t border-slate-800 space-y-6">
            <h3 className="font-['Poppins'] text-lg font-bold text-white">
              Capítulos e Conteúdo da Investigação
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeDossier.chapters.map((chapter, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-cyan-800/40">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-200">
                      {chapter.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      {chapter.description}
                    </p>
                    <span className="text-[10px] font-mono text-cyan-400/90 block mt-2">
                      {chapter.readTime} de leitura
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Related News Wire */}
      <section className="space-y-6">
        <h3 className="font-['Poppins'] text-xl font-bold text-white">
          Notícias Vinculadas ao Tema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

