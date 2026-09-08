import React, { useState, useEffect } from 'react';
import { bookmarkStorage } from '../data/repository';
import { ArticleCard } from '../components/ArticleCard';
import { CompactArticleRow } from '../components/CompactArticleRow';
import { Article } from '../types';
import { Link } from '../router';
import { Bookmark, Trash2, ArrowRight, Grid, List } from 'lucide-react';

export function SavedArticlesPage() {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const refreshList = () => {
    setSavedArticles(bookmarkStorage.getSavedArticles());
  };

  useEffect(() => {
    refreshList();
    const handleBookmarkChange = () => refreshList();
    window.addEventListener('geozine-bookmark-changed', handleBookmarkChange);
    return () => window.removeEventListener('geozine-bookmark-changed', handleBookmarkChange);
  }, []);

  const handleClearAll = () => {
    if (window.confirm('Tem certeza de que deseja remover todas as notícias salvas?')) {
      localStorage.removeItem('geozine_bookmarks_v1');
      refreshList();
      window.dispatchEvent(new CustomEvent('geozine-bookmark-changed'));
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Leitura Posterior
            </span>
          </div>
          <h1 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Notícias Salvas
          </h1>
          <p className="text-sm text-slate-300 mt-1 font-sans">
            Itens marcados para leitura guardados localmente no seu navegador.
          </p>
        </div>

        {savedArticles.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-cyan-950 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                aria-label="Grade"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-cyan-950 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                aria-label="Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleClearAll}
              className="px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar todos ({savedArticles.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {savedArticles.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-[#0b101a] border border-slate-800 rounded-xl p-3 divide-y divide-slate-800/60 shadow-lg">
            {savedArticles.map(article => (
              <CompactArticleRow key={article.id} article={article} />
            ))}
          </div>
        )
      ) : (
        <div className="py-20 text-center bg-[#0b101a] border border-slate-800 rounded-xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-200">Você ainda não salvou nenhuma notícia</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto font-sans">
              Ao navegar pelas reportagens, clique no ícone de marcador para guardar matérias e ler com calma mais tarde.
            </p>
          </div>
          <Link
            to="/ultimas"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span>Explorar Notícias Recentes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

