import React, { useState, useMemo } from 'react';
import { articleRepository, categoryRepository } from '../data/repository';
import { ArticleCard } from '../components/ArticleCard';
import { CompactArticleRow } from '../components/CompactArticleRow';
import { SectionHeader } from '../components/SectionHeader';
import { CATEGORIES } from '../data/mockData';
import { 
  Filter, 
  Grid, 
  List, 
  Clock, 
  Globe, 
  Layers, 
  Sparkles,
  ArrowUpDown,
  RefreshCw
} from 'lucide-react';

export function LatestNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<'recent' | 'popular'>('recent');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allArticles = articleRepository.getAll();

  const regions = useMemo(() => {
    return Array.from(new Set(allArticles.map(a => a.region)));
  }, [allArticles]);

  const filtered = useMemo(() => {
    let list = [...allArticles];

    if (selectedCategory !== 'all') {
      list = list.filter(a => a.category === selectedCategory);
    }

    if (selectedRegion !== 'all') {
      list = list.filter(a => a.region.toLowerCase() === selectedRegion.toLowerCase());
    }

    if (selectedSort === 'popular') {
      list.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    } else {
      list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return list;
  }, [allArticles, selectedCategory, selectedRegion, selectedSort]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedArticles = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedRegion('all');
    setSelectedSort('recent');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Feed Cronológico ao Vivo
          </span>
        </div>
        <h1 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Últimas Notícias Geoespaciais
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl font-sans leading-relaxed">
          O fluxo contínuo de atualizações sobre sensoriamento remoto, cartografia digital, geoprocessamento, observação da Terra e tecnologia de satélites no Brasil e no mundo.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#0b101a] border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        {/* Left Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
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

          {/* Region Filter */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={selectedRegion}
              onChange={e => {
                setSelectedRegion(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-slate-200 focus:outline-none font-mono cursor-pointer"
            >
              <option value="all" className="bg-[#0b101a]">Todas as Regiões</option>
              {regions.map(reg => (
                <option key={reg} value={reg} className="bg-[#0b101a]">
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSort}
              onChange={e => {
                setSelectedSort(e.target.value as any);
                setCurrentPage(1);
              }}
              className="bg-transparent text-slate-200 focus:outline-none font-mono cursor-pointer"
            >
              <option value="recent" className="bg-[#0b101a]">Mais Recentes Primeiro</option>
              <option value="popular" className="bg-[#0b101a]">Mais Lidas</option>
            </select>
          </div>

          {/* Reset Filters button if active */}
          {(selectedCategory !== 'all' || selectedRegion !== 'all' || selectedSort !== 'recent') && (
            <button
              onClick={resetFilters}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-2 py-1"
            >
              <RefreshCw className="w-3 h-3" /> Limpar filtros
            </button>
          )}
        </div>

        {/* Right View Mode & Counts */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            {filtered.length} matérias encontradas
          </span>

          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('list')}
              aria-label="Visualização em lista compacta"
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-cyan-950 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Visualização em grade de cards"
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-cyan-950 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Articles Feed */}
      {paginatedArticles.length > 0 ? (
        viewMode === 'list' ? (
          <div className="bg-[#0b101a] border border-slate-800 rounded-xl p-3 divide-y divide-slate-800/60 shadow-lg">
            {paginatedArticles.map(article => (
              <CompactArticleRow key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )
      ) : (
        <div className="py-16 text-center bg-[#0b101a] border border-slate-800 rounded-xl">
          <p className="text-slate-300 font-medium">Nenhuma notícia encontrada para esses filtros.</p>
          <p className="text-xs text-slate-400 mt-1 font-mono">Tente redefinir os parâmetros de categoria ou região.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg font-bold text-xs uppercase tracking-wider"
          >
            Redefinir Filtros
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs font-mono">
          <span className="text-slate-400">
            Página {currentPage} de {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                  currentPage === idx + 1
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

