import React from 'react';
import { Article } from '../types';
import { Link } from '../router';
import { CategoryChip } from './CategoryChip';
import { BookmarkButton } from './BookmarkButton';
import { Clock, Globe, Sparkles } from 'lucide-react';

export interface ArticleCardProps {
  key?: React.Key;
  article: Article;
  variant?: 'standard' | 'compact' | 'horizontal';
  className?: string;
}

export function ArticleCard({ article, variant = 'standard', className = '' }: ArticleCardProps) {
  if (variant === 'horizontal') {
    return (
      <article className={`group relative bg-[#0e131f]/70 hover:bg-[#121827] border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition-all duration-200 flex flex-col sm:flex-row gap-4 ${className}`}>
        {/* Thumbnail */}
        <div className="sm:w-48 h-32 shrink-0 rounded-lg overflow-hidden bg-slate-900 relative">
          <img
            src={article.heroImage}
            alt={article.imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {article.aiGeneratedImage && (
            <span 
              className="absolute top-2 left-2 bg-black/70 border border-slate-700 text-[9px] font-mono text-slate-300 px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1"
              title="Imagem ilustrativa gerada por IA"
            >
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> IA
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <CategoryChip category={article.category} name={article.categoryName.split('&')[0]} size="xs" />
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-slate-500" /> {article.region}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> {article.readingTime} min
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
              <Link to={`/noticia/${article.slug}`}>
                {article.title}
              </Link>
            </h3>

            <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed font-sans">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-xs">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-5 h-5 rounded-full object-cover border border-slate-700"
              />
              <Link 
                to={`/autores/${article.author.slug}`}
                className="text-slate-300 hover:text-cyan-400 text-xs font-medium truncate max-w-[120px]"
              >
                {article.author.name}
              </Link>
            </div>
            <BookmarkButton articleId={article.id} size="sm" />
          </div>
        </div>
      </article>
    );
  }

  // Standard vertical card
  return (
    <article className={`group relative bg-[#0e131f]/70 hover:bg-[#121827] border border-slate-800/80 hover:border-slate-700 rounded-xl overflow-hidden flex flex-col transition-all duration-200 ${className}`}>
      {/* Card Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={article.heroImage}
          alt={article.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e131f] via-transparent to-transparent opacity-80" />
        
        {/* Floating Top Category & Region */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <CategoryChip category={article.category} name={article.categoryName.split('&')[0]} size="xs" />
          <BookmarkButton 
            articleId={article.id} 
            size="sm" 
            className="bg-black/60 backdrop-blur-md border-slate-700/80" 
          />
        </div>

        {article.aiGeneratedImage && (
          <span 
            className="absolute bottom-2 right-2 bg-black/80 border border-slate-700 text-[9px] font-mono text-slate-300 px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1"
            title="Imagem ilustrativa gerada por IA"
          >
            <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> IA
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata bar */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-2">
            <span className="text-slate-400 truncate max-w-[140px]">
              {article.sourceName.split('—')[0]}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" /> {article.readingTime} min
            </span>
          </div>

          {/* Headline */}
          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            <Link to={`/noticia/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed font-sans">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info: Author */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-5 h-5 rounded-full object-cover border border-slate-700"
            />
            <Link
              to={`/autores/${article.author.slug}`}
              className="text-xs text-slate-300 hover:text-cyan-400 font-medium"
            >
              {article.author.name}
            </Link>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {article.region}
          </span>
        </div>
      </div>
    </article>
  );
}
