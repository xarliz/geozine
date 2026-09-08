import React from 'react';
import { useRouter } from '../router';
import { topicRepository, articleRepository } from '../data/repository';
import { ArticleCard } from '../components/ArticleCard';
import { Link } from '../router';
import { Tag, ArrowLeft } from 'lucide-react';

export function TopicPage() {
  const { params } = useRouter();
  const slug = params.slug || 'qgis';

  const topic = topicRepository.getBySlug(slug);
  const articles = articleRepository.getByTag(topic ? topic.name : slug);

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link to="/" className="hover:text-cyan-300">Início</Link>
        <span>/</span>
        <span className="text-slate-500">Tópicos</span>
        <span>/</span>
        <span className="text-cyan-400 font-bold">#{topic?.name || slug}</span>
      </div>

      {/* Header */}
      <div className="bg-[#0b101a] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Tópico Geoespacial
          </span>
        </div>

        <h1 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          #{topic?.name || slug}
        </h1>

        {topic?.description && (
          <p className="text-sm text-slate-300 mt-2 max-w-2xl font-sans">
            {topic.description}
          </p>
        )}

        <div className="mt-4 text-xs font-mono text-slate-400">
          {articles.length} {articles.length === 1 ? 'matéria vinculada' : 'matérias vinculadas'} a este tópico
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-[#0b101a] border border-slate-800 rounded-xl">
          <p className="text-slate-300">Nenhuma matéria encontrada com esta tag no momento.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:underline mt-4 text-xs font-mono">
            <ArrowLeft className="w-4 h-4" /> Voltar para o radar
          </Link>
        </div>
      )}
    </div>
  );
}

