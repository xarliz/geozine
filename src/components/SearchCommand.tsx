import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../router';
import { articleRepository, topicRepository } from '../data/repository';
import { Search, X, Clock, ArrowRight, CornerDownLeft, Sparkles, Tag } from 'lucide-react';
import { Article } from '../types';

interface SearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Sentinel-1C', 'LiDAR estado sólido', 'MapBiomas Água', 'QGIS 3.42']);
  const inputRef = useRef<HTMLInputElement>(null);
  const topics = topicRepository.getAll().slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or parent
          window.dispatchEvent(new CustomEvent('geozine-open-search'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live filter results
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const res = articleRepository.query({ query, limit: 6 });
    setResults(res.items);
  }, [query]);

  const handleSelectArticle = (slug: string) => {
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches(prev => [query.trim(), ...prev.slice(0, 4)]);
    }
    onClose();
    navigate(`/noticia/${slug}`);
  };

  const handleSelectTopic = (topicSlug: string) => {
    onClose();
    navigate(`/topico/${topicSlug}`);
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (!recentSearches.includes(query.trim())) {
        setRecentSearches(prev => [query.trim(), ...prev.slice(0, 4)]);
      }
      onClose();
      navigate(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0d121d] border border-slate-700/80 rounded-xl shadow-2xl shadow-cyan-950/40 overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearch} className="flex items-center px-4 py-3 border-b border-slate-800 gap-3 bg-[#0a0e17]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar notícias, tecnologias, sensores, satélites ou tópicos..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700 rounded">
            ESC
          </kbd>
        </form>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Active Search Results */}
          {query.trim() !== '' ? (
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-slate-400 mb-2">
                <span>Resultados encontrados ({results.length})</span>
                <button 
                  onClick={handleFullSearch}
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Ver página completa de busca <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {results.length > 0 ? (
                <div className="space-y-1.5">
                  {results.map(article => (
                    <button
                      key={article.id}
                      onClick={() => handleSelectArticle(article.slug)}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors flex items-start gap-3 group border border-transparent hover:border-slate-700"
                    >
                      <div className="shrink-0 mt-0.5">
                        <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 uppercase">
                          {article.categoryName.split('&')[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 font-sans">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="shrink-0 text-slate-500 group-hover:text-cyan-400 flex items-center">
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-slate-400 text-sm">
                    Nenhuma notícia encontrada para esses filtros.
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Tente termos mais amplos como "satélite", "radar", "IA" ou "cartografia".
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Default Suggested & Recent Searches State */
            <div className="space-y-4">
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Buscas Recentes
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(term)}
                        className="px-2.5 py-1 rounded-md text-xs bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Topics Suggestions */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  Tópicos em Destaque
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {topics.map(topic => (
                    <button
                      key={topic.slug}
                      onClick={() => handleSelectTopic(topic.slug)}
                      className="text-left p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400">
                        #{topic.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {topic.articleCount} matérias
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-[#090c14] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navegue com Enter para abrir</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400">
            <Sparkles className="w-3 h-3" />
            <span>Radar Geozine v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
