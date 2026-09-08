import React from 'react';
import { useRouter } from '../router';
import { authorRepository, articleRepository } from '../data/repository';
import { ArticleCard } from '../components/ArticleCard';
import { Link } from '../router';
import { User, Mail, Twitter, Linkedin, ArrowLeft, BookOpen } from 'lucide-react';

export function AuthorPage() {
  const { params } = useRouter();
  const slug = params.slug || 'dra-helena-vasconcelos';

  const author = authorRepository.getBySlug(slug);
  const articles = articleRepository.getByAuthor(slug);

  if (!author) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-['Poppins'] font-bold text-white">Autor não encontrado</h2>
        <p className="text-slate-400">O perfil solicitado não foi localizado em nossa equipe editorial.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link to="/" className="hover:text-cyan-300">Início</Link>
        <span>/</span>
        <span className="text-slate-500">Redação & Especialistas</span>
        <span>/</span>
        <span className="text-cyan-400">{author.name}</span>
      </div>

      {/* Author Card Header */}
      <div className="rounded-2xl border border-slate-800 bg-[#0c121e] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-cyan-500/50 shadow-xl shrink-0"
        />

        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-['Poppins'] text-2xl sm:text-3xl font-extrabold text-white">
              {author.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-mono text-cyan-300 uppercase">
              {author.role}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
            {author.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
            <span>{author.articleCount} publicações assinadas</span>
            {author.email && (
              <span className="flex items-center gap-1 hover:text-cyan-300">
                <Mail className="w-3.5 h-3.5" /> {author.email}
              </span>
            )}
            {author.twitter && (
              <a 
                href={`https://twitter.com/${author.twitter}`} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 hover:text-cyan-300"
              >
                <Twitter className="w-3.5 h-3.5" /> @{author.twitter}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Articles Grid by Author */}
      <section className="space-y-6">
        <h2 className="font-['Poppins'] text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          Reportagens e Artigos por {author.name}
        </h2>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-[#0b101a] border border-slate-800 rounded-xl text-slate-400 text-sm">
            Nenhuma matéria listada para este autor no momento.
          </div>
        )}
      </section>
    </div>
  );
}

