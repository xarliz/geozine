import React, { useState, useEffect } from 'react';
import { articleRepository, topicRepository } from '../data/repository';
import { ArticleCard } from '../components/ArticleCard';
import { CATEGORIES } from '../data/mockData';
import { Article } from '../types';
import { Search, X, Layers, Globe, ArrowUpDown, Tag, Sparkles } from 'lucide-react';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSort, setSelectedSort] = useState<'recent' | 'popular'>('recent');
  const [results, setResults] = useState<Article[]>([]);

  // Parse initial query from URL (?q=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q) setQuery(q);
    }
  }, []);

  // Perform search query
  useEffect(() => {
    const res = articleRepository.query({
      query,
      category: selectedCategory,
      region: selectedRegion,
      sortBy: selectedSort,
      limit: 30
    });
    setResults(res.items);
  }, [query, selectedCategory, selectedRegion, selectedSort]);

  const topics = topicRepository.getAll().slice(0, 8);

  const handleClear = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setSelectedSort('recent');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Motor de Busca Geoespacial
          </span>
        </div>
        <h1 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Pesquisar Notícias e Artigos
        </h1>
        <p className="text-sm text-slate-300 mt-2 font-sans">
          Pesquise por termos técnicos, nomes de satélites, sensores, missões espaciais, autores e instituições.
        </p>
      </div>

      {/* Main Search Input Bar */}
      <div className="relative">
        <div className="flex items-center bg-[#0d121d] border border-slate-700/80 rounded-xl px-4 py-3.5 shadow-xl">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Digite sua busca (ex: Sentinel, LiDAR, Amazônia, MapBiomas, QGIS)..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0b101a] border border-slate-800 rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none font-mono cursor-pointer"
            >
              <option value="all" className="bg-[#0b101a]">Todas as Categorias</option>
              {CATEGORIES.map(cat => (
                <option key={cat.slug} value={cat.slug} className="bg-[#0b101a]">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none font-mono cursor-pointer"
            >
              <option value="all" className="bg-[#0b101a]">Todas as Regiões</option>
              <option value="Brasil" className="bg-[#0b101a]">Brasil</option>
              <option value="América do Sul" className="bg-[#0b101a]">América do Sul</option>
              <option value="Global" className="bg-[#0b101a]">Global</option>
              <option value="Europa" className="bg-[#0b101a]">Europa</option>
              <option value="América do Norte" className="bg-[#0b101a]">América do Norte</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSort}
              onChange={e => setSelectedSort(e.target.value as any)}
              className="bg-transparent text-slate-200 focus:outline-none font-mono cursor-pointer"
            >
              <option value="recent" className="bg-[#0b101a]">Mais Recentes</option>
              <option value="popular" className="bg-[#0b101a]">Mais Lidas</option>
            </select>
          </div>

          {(query || selectedCategory !== 'all' || selectedRegion !== 'all') && (
            <button
              onClick={handleClear}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              Limpar busca
            </button>
          )}
        </div>

        <span className="text-xs font-mono text-slate-400">
          {results.length} resultado{results.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Suggested Topic Tags */}
      {!query && (
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-slate-400 block">
            Sugestões populares de busca:
          </span>
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <button
                key={t.slug}
                onClick={() => setQuery(t.name)}
                className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
              >
                #{t.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#0b101a] border border-slate-800 rounded-xl space-y-3">
          <p className="text-slate-300 font-medium text-base">
            Nenhuma notícia encontrada para esses filtros.
          </p>
          <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
            Verifique se não há erros de digitação ou tente buscar por termos mais genéricos como "satélite", "dados" ou "IA".
          </p>
        </div>
      )}
    </div>
  );
}

