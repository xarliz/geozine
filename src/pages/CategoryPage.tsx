import React from 'react';
import { useRouter } from '../router';
import { categoryRepository, articleRepository } from '../data/repository';
import { ArticleCard } from '../components/ArticleCard';
import { FeaturedHero } from '../components/FeaturedHero';
import { SectionHeader } from '../components/SectionHeader';
import { Link } from '../router';
import { Layers, ArrowLeft, Tag, Globe, BookOpen } from 'lucide-react';

export function CategoryPage() {
  const { params } = useRouter();
  const slug = params.slug || 'geoai';

  const category = categoryRepository.getBySlug(slug);
  const articles = articleRepository.getByCategory(slug);

  if (!category) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-['Poppins'] font-bold text-white">Categoria não encontrada</h2>
        <p className="text-slate-400">A editoria solicitada não existe ou foi renomeada.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Voltar para a página inicial
        </Link>
      </div>
    );
  }

  const heroArticle = articles.find(a => a.featured) || articles[0];
  const remainingArticles = articles.filter(a => a.id !== heroArticle?.id);

  return (
    <div className="space-y-10 pb-16">
      {/* Breadcrumb & Return */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link to="/" className="hover:text-cyan-300">Início</Link>
        <span>/</span>
        <Link to="/ultimas" className="hover:text-cyan-300">Editorias</Link>
        <span>/</span>
        <span className="text-cyan-400 uppercase">{category.name}</span>
      </div>

      {/* Category Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0c121e] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Editoria Especializada
              </span>
            </div>

            <h1 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {category.name}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {category.description}
            </p>
          </div>

          {/* Stats badge */}
          <div className="shrink-0 bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 flex md:flex-col items-center justify-center gap-2 text-center">
            <span className="font-['Poppins'] text-3xl font-extrabold text-cyan-400">
              {articles.length}
            </span>
            <span className="text-xs font-mono uppercase text-slate-400">
              Matérias no arquivo
            </span>
          </div>
        </div>
      </div>

      {/* Featured story in category */}
      {heroArticle && (
        <section>
          <FeaturedHero article={heroArticle} />
        </section>
      )}

      {/* Grid of articles */}
      {remainingArticles.length > 0 && (
        <section className="space-y-6">
          <SectionHeader 
            title={`Todas as reportagens em ${category.shortName}`} 
            subtitle="Cobertura Técnica"
            badge="Arquivo"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {articles.length === 0 && (
        <div className="py-16 text-center bg-[#0b101a] border border-slate-800 rounded-xl">
          <p className="text-slate-300">Nenhuma matéria publicada nesta editoria no momento.</p>
        </div>
      )}
    </div>
  );
}

