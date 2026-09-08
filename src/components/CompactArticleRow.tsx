import React from 'react';
import { Article } from '../types';
import { Link } from '../router';
import { CategoryChip } from './CategoryChip';
import { BookmarkButton } from './BookmarkButton';
import { Clock, Globe } from 'lucide-react';

export interface CompactArticleRowProps {
  key?: React.Key;
  article: Article;
  showCategory?: boolean;
}

export function CompactArticleRow({ article, showCategory = true }: CompactArticleRowProps) {
  // Format publication date/time
  const date = new Date(article.publishedAt);
  const timeFormatted = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="group py-3.5 px-3 rounded-lg hover:bg-slate-800/40 border-b border-slate-800/60 last:border-0 transition-colors flex items-start gap-3 sm:gap-4">
      {/* Time in Mono */}
      <div className="shrink-0 w-14 font-mono text-xs text-cyan-400 pt-0.5">
        {timeFormatted}
      </div>

      {/* Main details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {showCategory && (
            <CategoryChip category={article.category} name={article.categoryName.split('&')[0]} size="xs" />
          )}
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Globe className="w-3 h-3 text-slate-500" /> {article.region}
          </span>
          <span className="text-slate-600 text-xs hidden sm:inline">•</span>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline truncate max-w-[150px]">
            {article.sourceName.split('—')[0]}
          </span>
        </div>

        <h4 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors leading-snug">
          <Link to={`/noticia/${article.slug}`}>
            {article.title}
          </Link>
        </h4>
      </div>

      {/* Reading time & Bookmark action */}
      <div className="shrink-0 flex items-center gap-2 self-center">
        <span className="hidden md:flex items-center gap-1 text-[11px] font-mono text-slate-400">
          <Clock className="w-3 h-3 text-slate-500" /> {article.readingTime}m
        </span>
        <BookmarkButton articleId={article.id} size="sm" />
      </div>
    </div>
  );
}
