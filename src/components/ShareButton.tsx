import React, { useState } from 'react';
import { Share2, Check, Copy, Twitter, Linkedin, MessageCircle } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, url, className = '' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : '';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 2000);
    }
  };

  const handleTwitter = (e: React.MouseEvent) => {
    e.stopPropagation();
    const tweetText = encodeURIComponent(`${title} — via @geozine_br\n`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleLinkedIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`${title}\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Compartilhar matéria"
        title="Compartilhar notícia"
        className="p-1.5 rounded-lg bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-mono"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Compartilhar</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 bottom-full sm:bottom-auto sm:top-full mt-2 w-48 bg-[#0d131f] border border-slate-700/80 rounded-lg shadow-xl p-2 z-30 space-y-1 text-xs font-mono">
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link copiado!' : 'Copiar link'}</span>
            </button>
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handleTwitter}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>X (Twitter)</span>
            </button>
            <button
              onClick={handleLinkedIn}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-slate-300 hover:bg-slate-800 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
