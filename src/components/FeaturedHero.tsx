import React from 'react';
import { Article } from '../types';
import { Link } from '../router';
import { CategoryChip } from './CategoryChip';
import { BookmarkButton } from './BookmarkButton';
import { ShareButton } from './ShareButton';
import { Clock, Calendar, Globe, ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedHeroProps {
  article: Article;
}

export function FeaturedHero({ article }: FeaturedHeroProps) {
  const dateFormatted = new Date(article.publishedAt).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0b101a] p-5 sm:p-8 lg:p-10 shadow-2xl">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          {/* Category, Badge & Region */}
          <div className="flex flex-wrap items-center gap-3">
            <CategoryChip category={article.category} name={article.categoryName} size="md" />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Destaque Principal
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              {article.region}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.18] hover:text-cyan-300 transition-colors">
            <Link to={`/noticia/${article.slug}`}>
              {article.title}
            </Link>
          </h1>

          {/* Editorial Subtitle / Deck */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
            {article.subtitle || article.excerpt}
          </p>

          {/* Author & Publication Metadata */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full object-cover border border-cyan-500/40"
              />
              <div>
                <Link 
                  to={`/autores/${article.author.slug}`}
                  className="text-slate-200 hover:text-cyan-400 font-semibold font-sans block"
                >
                  {article.author.name}
                </Link>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {article.author.role}
                </span>
              </div>
            </div>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateFormatted}</span>
            </div>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{article.readingTime} min de leitura</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to={`/noticia/${article.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-950/60 group"
            >
              <span>Ler reportagem completa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <BookmarkButton articleId={article.id} showLabel={true} />
            <ShareButton title={article.title} />
          </div>
        </div>

        {/* Right Cover Image with Reticle Overlay */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-700/80 group bg-slate-900 shadow-2xl">
            <img
              src={article.heroImage}
              alt={article.imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/80 via-transparent to-black/20" />

            {/* Geospatial Coordinate Overlay */}
            {article.coordinates && (
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700 font-mono text-[10px] text-cyan-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{article.coordinates.lat.toFixed(4)}° N, {article.coordinates.lng.toFixed(4)}° E</span>
              </div>
            )}

            {article.aiGeneratedImage && (
              <div 
                className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-slate-700 font-mono text-[10px] text-slate-300 flex items-center gap-1"
                title="Imagem editorial conceitual"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>IA Visual</span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-mono text-right mt-2">
            Fonte: {article.sourceName}
          </div>
        </div>
      </div>
    </section>
  );
}

