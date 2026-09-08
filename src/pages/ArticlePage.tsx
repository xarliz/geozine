import React, { useEffect, useRef } from 'react';
import { useRouter } from '../router';
import { articleRepository, sourceRepository } from '../data/repository';
import { CategoryChip } from '../components/CategoryChip';
import { BookmarkButton } from '../components/BookmarkButton';
import { ShareButton } from '../components/ShareButton';
import { ArticleCard } from '../components/ArticleCard';
import { SectionHeader } from '../components/SectionHeader';
import { Link } from '../router';
import L from 'leaflet';
import { 
  Clock, 
  Calendar, 
  Globe, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  ArrowLeft, 
  Sparkles,
  Layers,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export function ArticlePage() {
  const { params } = useRouter();
  const slug = params.slug || 'satelite-sentinel-1c-sar-amazonia';
  const miniMapRef = useRef<HTMLDivElement>(null);
  const miniMapInstance = useRef<L.Map | null>(null);

  const article = articleRepository.getBySlug(slug);

  useEffect(() => {
    // Scroll top on article change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Mini map initialization if article has coordinates
  useEffect(() => {
    if (!article || !article.coordinates || !miniMapRef.current) return;

    if (miniMapInstance.current) {
      miniMapInstance.current.remove();
      miniMapInstance.current = null;
    }

    const { lat, lng } = article.coordinates;
    const map = L.map(miniMapRef.current, {
      center: [lat, lng],
      zoom: 6,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    const markerIcon = L.divIcon({
      className: 'custom-pin',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div class="absolute w-6 h-6 rounded-full bg-cyan-400/40 animate-ping"></div>
          <div class="relative w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-900 shadow-lg shadow-cyan-950"></div>
        </div>
      `,
      iconSize: [20, 20]
    });

    L.marker([lat, lng], { icon: markerIcon }).addTo(map);
    miniMapInstance.current = map;

    return () => {
      map.remove();
      miniMapInstance.current = null;
    };
  }, [article]);

  if (!article) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-['Poppins'] font-bold text-white">Notícia não encontrada</h2>
        <p className="text-slate-400">O conteúdo que você tentou acessar não existe ou foi removido do radar.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Voltar para o radar principal
        </Link>
      </div>
    );
  }

  const relatedArticles = articleRepository.getRelated(article.id, 3);
  const source = sourceRepository.getBySlug(article.sourceSlug);

  const dateFormatted = new Date(article.publishedAt).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2 truncate">
          <Link to="/" className="hover:text-cyan-300">Início</Link>
          <span>/</span>
          <Link to={`/categoria/${article.category}`} className="hover:text-cyan-300 uppercase">
            {article.categoryName}
          </Link>
          <span>/</span>
          <span className="text-slate-500 truncate hidden sm:inline">{article.title}</span>
        </div>
        <Link to="/ultimas" className="inline-flex items-center gap-1 hover:text-cyan-300 shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" /> Últimas
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryChip category={article.category} name={article.categoryName} size="md" />
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            {article.region}
          </span>
          {article.coordinates && (
            <span className="text-xs font-mono text-cyan-400/90 flex items-center gap-1 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
              <MapPin className="w-3 h-3" />
              {article.coordinates.lat.toFixed(4)}°, {article.coordinates.lng.toFixed(4)}°
            </span>
          )}
        </div>

        {/* Title in Poppins */}
        <h1 className="font-['Poppins'] text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
          {article.title}
        </h1>

        {/* Subtitle in Inter */}
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal border-l-2 border-cyan-500/80 pl-4 py-1">
          {article.subtitle || article.excerpt}
        </p>

        {/* Metadata & Actions Bar */}
        <div className="pt-4 border-y border-slate-800 flex flex-wrap items-center justify-between gap-4">
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border border-cyan-500/50"
            />
            <div>
              <Link 
                to={`/autores/${article.author.slug}`}
                className="text-sm font-bold text-slate-200 hover:text-cyan-400 font-sans block"
              >
                {article.author.name}
              </Link>
              <span className="text-[11px] font-mono text-slate-400 block">
                {article.author.role}
              </span>
            </div>
          </div>

          {/* Time & reading info */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span className="capitalize">{dateFormatted}</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{article.readingTime} min</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <BookmarkButton articleId={article.id} showLabel={true} />
            <ShareButton title={article.title} />
          </div>
        </div>
      </header>

      {/* Hero Visual Cover */}
      <div className="space-y-2">
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-[16/9] shadow-2xl">
          <img
            src={article.heroImage}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
          />
          {article.aiGeneratedImage && (
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700 font-mono text-[10px] text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Ilustração editorial gerada por IA</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span className="truncate mr-4">{article.imageCaption}</span>
          <span className="shrink-0 text-slate-400">Foto/Crédito: {article.sourceName}</span>
        </div>
      </div>

      {/* Main Editorial Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Article Body (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div 
            className="prose prose-invert prose-cyan max-w-none text-slate-300 font-sans text-base sm:text-[17px] leading-[1.8] space-y-5"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags List */}
          <div className="pt-6 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Tópicos & Palavras-chave
            </h4>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/topico/${tag.toLowerCase().replace(/[\s.]+/g, '-')}`}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="p-6 rounded-xl bg-[#0a0e17] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/40 shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-['Poppins'] font-bold text-white text-base">
                  {article.author.name}
                </h4>
                <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                  {article.author.role}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {article.author.bio}
              </p>
              <Link 
                to={`/autores/${article.author.slug}`}
                className="text-xs font-mono text-cyan-400 hover:underline inline-block pt-1"
              >
                Ver todas as matérias de {article.author.name} →
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Info (4 cols): Mini Map & Source Transparency */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mini-Map Preview if coordinates available */}
          {article.coordinates && (
            <div className="bg-[#0b101a] border border-slate-800 rounded-xl overflow-hidden p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-['Poppins'] font-bold text-xs text-white uppercase">
                    Localização Georreferenciada
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {article.region}
                </span>
              </div>

              <div ref={miniMapRef} className="h-44 rounded-lg overflow-hidden border border-slate-800 bg-slate-900" />

              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Lat: {article.coordinates.lat.toFixed(4)}°</span>
                <span>Lng: {article.coordinates.lng.toFixed(4)}°</span>
                <Link to="/mapa" className="text-cyan-400 hover:underline">
                  Abrir no Mapa →
                </Link>
              </div>
            </div>
          )}

          {/* Source Transparency Card */}
          <div className="bg-[#0b101a] border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <h4 className="font-['Poppins'] font-bold text-sm text-white">
                Transparência de Fontes
              </h4>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Fonte Primária Citada
              </span>
              <h5 className="font-bold text-slate-200 text-sm">
                {article.sourceName}
              </h5>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verificação de dados confirmada</span>
              </div>
            </div>

            {source && (
              <div className="space-y-2 pt-3 border-t border-slate-800/80 text-xs">
                <p className="text-slate-300 line-clamp-3">
                  {source.description}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[11px] text-slate-400">
                    Índice de Confiabilidade: <strong className="text-cyan-400">{source.reliabilityScore}%</strong>
                  </span>
                  <Link to={`/fontes/${source.slug}`} className="text-cyan-400 hover:underline font-mono text-xs">
                    Detalhes →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Editorial Guidelines Quick Link */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-2">
            <span className="font-mono text-[10px] uppercase text-cyan-400 font-bold block">
              Auditoria Editorial
            </span>
            <p className="text-[11px] leading-relaxed">
              Reportagens da Geozine passam por checagem técnica de telemetria, metadados orbitais e dados abertos antes de publicação.
            </p>
            <Link to="/metodologia-editorial" className="text-cyan-400 hover:underline block pt-1 font-mono text-[11px]">
              Leia nossa Metodologia Editorial & Uso de IA →
            </Link>
          </div>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="pt-12 border-t border-slate-800 space-y-6">
          <SectionHeader 
            title="Reportagens Relacionadas" 
            subtitle="Radar de Continuidade" 
            actionText="Mais nesta editoria"
            actionLink={`/categoria/${article.category}`}
            badge="Contexto"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(rel => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

