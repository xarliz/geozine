import React, { useState, useEffect } from 'react';
import { bookmarkStorage } from '../data/repository';
import { Bookmark } from 'lucide-react';

interface BookmarkButtonProps {
  articleId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function BookmarkButton({ articleId, className = '', size = 'md', showLabel = false }: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(bookmarkStorage.isSaved(articleId));

    const handleSync = (e: any) => {
      if (e.detail && e.detail.id === articleId) {
        setIsSaved(e.detail.isNowSaved);
      } else {
        setIsSaved(bookmarkStorage.isSaved(articleId));
      }
    };

    window.addEventListener('geozine-bookmark-changed', handleSync);
    return () => window.removeEventListener('geozine-bookmark-changed', handleSync);
  }, [articleId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = bookmarkStorage.toggle(articleId);
    setIsSaved(newState);
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size];

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isSaved ? 'Remover notícia dos salvos' : 'Salvar notícia para ler depois'}
      title={isSaved ? 'Remover dos salvos' : 'Salvar notícia'}
      className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
        isSaved 
          ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 shadow-sm shadow-cyan-950' 
          : 'bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 border border-slate-800'
      } ${className}`}
    >
      <Bookmark className={`${iconSizes} ${isSaved ? 'fill-cyan-400' : ''}`} />
      {showLabel && (
        <span className="text-xs font-mono">
          {isSaved ? 'Salva' : 'Salvar'}
        </span>
      )}
    </button>
  );
}
