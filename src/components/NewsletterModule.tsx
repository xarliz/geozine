import React, { useState } from 'react';
import { Mail, CheckCircle2, Shield, Sparkles, Send } from 'lucide-react';

interface NewsletterModuleProps {
  variant?: 'card' | 'inline' | 'page';
  className?: string;
}

export function NewsletterModule({ variant = 'card', className = '' }: NewsletterModuleProps) {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'diario' | 'semanal'>('diario');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  if (status === 'success') {
    return (
      <div className={`rounded-xl border border-emerald-800/80 bg-emerald-950/30 p-6 sm:p-8 text-center backdrop-blur-sm ${className}`}>
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-['Poppins'] text-xl font-bold text-white mb-2">
          Inscrição confirmada no Geozine Briefing!
        </h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto mb-4 leading-relaxed font-sans">
          Enviamos uma mensagem de verificação para <strong className="text-cyan-400">{email}</strong>. 
          Você receberá a próxima edição ({frequency === 'diario' ? 'edição diária às 07:00 BRT' : 'edição semanal aos sábados'}).
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setEmail('');
          }}
          className="text-xs font-mono text-cyan-400 hover:underline"
        >
          Cadastrar outro endereço de e-mail
        </button>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0c111c] p-6 sm:p-8 shadow-xl ${className}`}>
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Copy */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              <Mail className="w-4 h-4" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
              Boletim Informativo
            </span>
          </div>

          <h3 className="font-['Poppins'] text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            Geozine Briefing: O radar diário das geotecnologias
          </h3>

          <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
            Receba a curadoria essencial de inteligência geoespacial, sensoriamento remoto, constelações de satélites e cartografia digital diretamente na sua caixa de entrada.
          </p>

          <div className="flex items-center gap-4 mt-4 text-xs font-mono text-slate-400">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-200">
              <input
                type="radio"
                name="briefing-freq"
                checked={frequency === 'diario'}
                onChange={() => setFrequency('diario')}
                className="accent-cyan-500"
              />
              <span>Radar Diário (Seg-Sex)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-200">
              <input
                type="radio"
                name="briefing-freq"
                checked={frequency === 'semanal'}
                onChange={() => setFrequency('semanal')}
                className="accent-cyan-500"
              />
              <span>Dossiê Semanal (Sábados)</span>
            </label>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full lg:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu.email@empresa.com.br"
                className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-cyan-950/60 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Cadastrando...</span>
                ) : (
                  <>
                    <span>Assinar Grátis</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" /> Sem spam • LGPD compliant
              </span>
              <span>12.400+ profissionais inscritos</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

