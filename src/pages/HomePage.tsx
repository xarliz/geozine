import React from 'react';
import { articleRepository, categoryRepository, dossierRepository } from '../data/repository';
import { FeaturedHero } from '../components/FeaturedHero';
import { ArticleCard } from '../components/ArticleCard';
import { CompactArticleRow } from '../components/CompactArticleRow';
import { SectionHeader } from '../components/SectionHeader';
import { MostReadList } from '../components/MostReadList';
import { NewsletterModule } from '../components/NewsletterModule';
import { Link } from '../router';
import { 
  ArrowRight, 
  MapPin, 
  Satellite, 
  Cpu, 
  Radio, 
  BookOpen, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

export function HomePage() {
  const heroArticle = articleRepository.getHero();
  const featuredArticles = articleRepository.getFeatured().filter(a => a.id !== heroArticle.id).slice(0, 3);
  const latestArticles = articleRepository.getLatest(8);
  const mostReadArticles = articleRepository.getMostRead(5);
  const dossiers = dossierRepository.getAll().slice(0, 2);

  // Sector highlights
  const geoAiArticles = articleRepository.getByCategory('geoai', 3);
  const satelliteArticles = articleRepository.getByCategory('satelites-newspace', 3);
  const droneArticles = articleRepository.getByCategory('drones-lidar', 3);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Main Hero Story */}
      <section>
        <FeaturedHero article={heroArticle} />
      </section>

      {/* 2. Secondary Featured Grid (3 Columns) */}
      <section>
        <SectionHeader 
          title="Destaques da Redação" 
          subtitle="Análises & Investigações"
          actionText="Ver feed completo"
          actionLink="/ultimas"
          badge="Curadoria"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 3. Primary Two-Column Wire: Latest News (Left) + Intelligence Sidebar (Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 65%: Chronological News Wire */}
        <div className="lg:col-span-8 space-y-6">
          <SectionHeader 
            title="Radar Diário" 
            subtitle="Em Tempo Real" 
            actionText="Ver arquivo cronológico"
            actionLink="/ultimas"
            badge="Noticiário"
          />

          <div className="bg-[#0b101a] border border-slate-800 rounded-xl p-2 divide-y divide-slate-800/60 shadow-lg">
            {latestArticles.map(article => (
              <CompactArticleRow key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/ultimas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md"
            >
              <span>Ver todas as 18 notícias do arquivo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right 35%: Sidebar with Ranked Top 5, Map Preview CTA, & Dossier Spotlight */}
        <div className="lg:col-span-4 space-y-8">
          {/* Top 5 Most Read */}
          <MostReadList articles={mostReadArticles} />

          {/* Interactive Map Teaser Banner */}
          <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-br from-[#0c1626] to-[#070b13] p-5 shadow-xl group">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Cartografia em Tempo Real</span>
            </div>
            <h4 className="font-['Poppins'] text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              Explore as notícias plotadas no globo interativo
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
              Acompanhe focos de sensoriamento, órbitas de satélites e monitoramento ambiental através de nossa camada espacial.
            </p>
            <Link
              to="/mapa"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Abrir Mapa Geoespacial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Dossiers Spotlight */}
          <div className="bg-[#0b101a] border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <h3 className="font-['Poppins'] text-base font-bold text-white">
                  Dossiês Geozine
                </h3>
              </div>
              <Link to="/dossies" className="text-[10px] font-mono text-cyan-400 hover:underline">
                Ver todos
              </Link>
            </div>

            <div className="space-y-4">
              {dossiers.map(dossier => (
                <Link
                  key={dossier.id}
                  to={`/dossies`}
                  className="block p-3 rounded-lg bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all group"
                >
                  <span className="text-[10px] font-mono text-cyan-400 uppercase block mb-1">
                    {dossier.categoryName} • {dossier.chaptersCount} capítulos
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors leading-snug">
                    {dossier.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-sans">
                    {dossier.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Thematic Sections: GeoAI & Satélites */}
      <section className="space-y-6">
        <SectionHeader 
          title="GeoAI & Visão Computacional" 
          subtitle="Modelos Fundacionais & Sensoriamento" 
          actionText="Mais em GeoAI"
          actionLink="/categoria/geoai"
          badge="Tecnologia"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {geoAiArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 5. Satélites & NewSpace Section */}
      <section className="space-y-6">
        <SectionHeader 
          title="Satélites & NewSpace" 
          subtitle="Constelações, Órbitas & Lançamentos" 
          actionText="Mais em Satélites"
          actionLink="/categoria/satelites-newspace"
          badge="Espaço"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {satelliteArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 6. Drones, LiDAR & Sensoriamento */}
      <section className="space-y-6">
        <SectionHeader 
          title="Drones & LiDAR" 
          subtitle="Nuvem de Pontos & Laser Scanning" 
          actionText="Mais em Drones"
          actionLink="/categoria/drones-lidar"
          badge="Varredura"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {droneArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 7. Newsletter Briefing CTA Banner */}
      <section>
        <NewsletterModule />
      </section>
    </div>
  );
}

