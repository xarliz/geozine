import React from 'react';
import { Article } from '../types';
import { Link } from '../router';
import { CategoryChip } from './CategoryChip';
import { BookmarkButton } from './BookmarkButton';
import { TrendingUp, Eye } from 'lucide-react';

interface MostReadListProps {
  articles: Article[];
  className?: string;
}

export function MostReadList({ articles, className = '' }: MostReadListProps) {
  return (
    <div className={`bg-[#0c101a] border border-slate-800 rounded-xl p-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <h3 className="font-['Poppins'] text-base font-bold text-white tracking-tight">
            Mais Lidas
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          Top 5 na semana
        </span>
      </div>

      {/* List */}
      <div className="space-y-4">
        {articles.map((article, index) => {
          const rank = String(index + 1).padStart(2, '0');
          return (
            <div 
              key={article.id} 
              className="flex items-start gap-3 group pb-3.5 border-b border-slate-800/60 last:border-0 last:pb-0"
            >
              {/* Numerical Index in Mono/Poppins */}
              <span className="font-['Poppins'] font-extrabold text-2xl text-slate-700 group-hover:text-cyan-400 transition-colors shrink-0 w-7 leading-none pt-1">
                {rank}
              </span>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CategoryChip 
                    category={article.category} 
                    name={article.categoryName.split('&')[0]} 
                    size="xs" 
                  />
                  {article.viewsCount && (
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5 text-slate-500" />
                      {article.viewsCount.toLocaleString('pt-BR')}
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                  <Link to={`/noticia/${article.slug}`}>
                    {article.title}
                  </Link>
                </h4>
              </div>

              {/* Bookmark */}
              <div className="shrink-0 self-center">
                <BookmarkButton articleId={article.id} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

