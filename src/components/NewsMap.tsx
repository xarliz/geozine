import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Article, CategorySlug } from '../types';
import { CATEGORIES } from '../data/mockData';
import { Link, useRouter } from '../router';
import { CategoryChip } from './CategoryChip';
import { BookmarkButton } from './BookmarkButton';
import { 
  MapPin, 
  Layers, 
  Filter, 
  Clock, 
  ExternalLink, 
  Maximize2, 
  Compass, 
  Globe,
  Calendar,
  Sparkles
} from 'lucide-react';

interface NewsMapProps {
  articles: Article[];
  className?: string;
  initialHeight?: string;
}

export function NewsMap({ articles, className = '', initialHeight = 'h-[650px]' }: NewsMapProps) {
  const { navigate } = useRouter();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter articles that have coordinates
  const geocodedArticles = articles.filter(a => a.coordinates && a.coordinates.lat && a.coordinates.lng);

  const filteredArticles = geocodedArticles.filter(a => {
    if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;
    if (selectedRegion !== 'all' && a.region.toLowerCase() !== selectedRegion.toLowerCase()) return false;
    return true;
  });

  const regions = Array.from(new Set(geocodedArticles.map(a => a.region)));

  // Custom Leaflet Pulsing DivIcon
  const createMarkerIcon = (isSelected: boolean, category: string) => {
    const isEmerald = category === 'clima-ambiente' || category === 'sensoriamento-remoto';
    const primaryColor = isSelected ? '#38bdf8' : (isEmerald ? '#10b981' : '#06b6d4');
    const pulseBg = isSelected ? 'bg-sky-400/40' : (isEmerald ? 'bg-emerald-400/30' : 'bg-cyan-400/30');

    return L.divIcon({
      className: 'custom-geozine-marker',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
          <div class="absolute w-8 h-8 rounded-full ${pulseBg} animate-ping"></div>
          <div class="relative w-6 h-6 rounded-full border-2 ${isSelected ? 'border-white bg-cyan-400 scale-125' : 'border-slate-900 bg-cyan-500'} flex items-center justify-center shadow-lg shadow-cyan-950 transition-transform duration-200 group-hover:scale-125">
            <div class="w-2 h-2 rounded-full bg-slate-950"></div>
          </div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default center on South America / Atlantic vantage
    const map = L.map(mapContainerRef.current, {
      center: [-10.0, -35.0],
      zoom: 3,
      zoomControl: false,
      attributionControl: false
    });

    // Dark matter tiles from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    // Zoom controls at top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when articles or filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    (Object.values(markersRef.current) as L.Marker[]).forEach(marker => marker.remove());
    markersRef.current = {};

    filteredArticles.forEach(article => {
      if (!article.coordinates) return;

      const isSelected = article.id === selectedArticleId;
      const icon = createMarkerIcon(isSelected, article.category);

      const marker = L.marker([article.coordinates.lat, article.coordinates.lng], { icon })
        .addTo(map)
        .on('click', () => {
          setSelectedArticleId(article.id);
          map.panTo([article.coordinates!.lat, article.coordinates!.lng], { animate: true, duration: 0.6 });
        });

      // Bind simple popup
      marker.bindPopup(`
        <div class="p-1 font-sans text-xs">
          <div class="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-bold mb-1">${article.categoryName}</div>
          <div class="font-bold text-slate-100 line-clamp-2">${article.title}</div>
          <div class="text-[10px] text-slate-400 mt-1 font-mono">${article.region} • ${article.readingTime} min</div>
        </div>
      `);

      markersRef.current[article.id] = marker;
    });
  }, [filteredArticles, selectedArticleId]);

  // Handler to select article from sidebar
  const handleSelectFromList = (article: Article) => {
    setSelectedArticleId(article.id);
    const map = mapInstanceRef.current;
    if (map && article.coordinates) {
      map.setView([article.coordinates.lat, article.coordinates.lng], 6, {
        animate: true,
        duration: 0.8
      });
      markersRef.current[article.id]?.openPopup();
    }
  };

  const selectedArticle = articles.find(a => a.id === selectedArticleId);

  return (
    <div className={`relative flex flex-col lg:flex-row bg-[#080c14] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {/* Top Controls Filter Bar */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 max-w-[calc(100%-80px)] pointer-events-auto">
        {/* Category Select */}
        <div className="bg-[#0b101a]/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2 shadow-lg">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-transparent text-xs text-slate-200 focus:outline-none font-mono cursor-pointer"
          >
            <option value="all" className="bg-[#0b101a]">Todas as Categorias</option>
            {CATEGORIES.map(cat => (
              <option key={cat.slug} value={cat.slug} className="bg-[#0b101a]">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Region Select */}
        <div className="bg-[#0b101a]/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-2.5 py-1.5 flex items-center gap-2 shadow-lg">
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="bg-transparent text-xs text-slate-200 focus:outline-none font-mono cursor-pointer"
          >
            <option value="all" className="bg-[#0b101a]">Todas as Regiões</option>
            {regions.map(reg => (
              <option key={reg} value={reg} className="bg-[#0b101a]">
                {reg}
              </option>
            ))}
          </select>
        </div>

        {/* Count Pill */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#0b101a]/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{filteredArticles.length} ocorrências geoespaciais</span>
        </div>
      </div>

      {/* Map Container */}
      <div className={`flex-1 relative ${initialHeight} w-full bg-[#07090e]`}>
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Selected Article Preview Card at bottom of map on mobile */}
        {selectedArticle && !isSidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4 z-20 lg:hidden bg-[#0d131f]/95 border border-cyan-500/40 rounded-xl p-4 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-2 mb-1">
              <CategoryChip category={selectedArticle.category} name={selectedArticle.categoryName} size="xs" />
              <button 
                onClick={() => setSelectedArticleId(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <h4 className="font-bold text-sm text-white line-clamp-1">
              {selectedArticle.title}
            </h4>
            <div className="flex items-center justify-between mt-3 text-xs">
              <Link 
                to={`/noticia/${selectedArticle.slug}`}
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold font-mono"
              >
                Ler reportagem <ExternalLink className="w-3 h-3" />
              </Link>
              <BookmarkButton articleId={selectedArticle.id} size="sm" />
            </div>
          </div>
        )}
      </div>

      {/* Side Panel: Georeferenced Newsfeed */}
      <div className={`w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-[#090d16] flex flex-col max-h-[650px]`}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h3 className="font-['Poppins'] font-bold text-sm text-white">
              Radar Georreferenciado
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {filteredArticles.length} matérias
          </span>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => {
              const isSelected = article.id === selectedArticleId;
              return (
                <div
                  key={article.id}
                  onClick={() => handleSelectFromList(article)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-950'
                      : 'bg-slate-900/50 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <CategoryChip category={article.category} name={article.categoryName.split('&')[0]} size="xs" isLink={false} />
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {article.region}
                    </span>
                  </div>

                  <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {article.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-sans">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                    <span className="truncate max-w-[130px]">{article.sourceName.split('—')[0]}</span>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/noticia/${article.slug}`}
                        onClick={e => e.stopPropagation()}
                        className="text-cyan-400 hover:underline flex items-center gap-0.5"
                      >
                        Abrir <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                      <BookmarkButton articleId={article.id} size="sm" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs font-mono">
              Nenhuma notícia localizada com os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

