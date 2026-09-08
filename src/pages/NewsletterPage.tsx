import React, { useState } from 'react';
import { Mail, CheckCircle2, Shield, Sparkles, Send, Calendar, Clock, Star } from 'lucide-react';

export function NewsletterPage() {
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

  const archiveIssues = [
    {
      number: '142',
      date: 'Hoje, 07:00 BRT',
      title: 'Sentinel-1C em órbita: o novo radar SAR que enxerga através das nuvens amazônicas',
      highlights: ['Transição Sentinel-1A', 'Resolução de 5 metros', 'MapBiomas Água 2024']
    },
    {
      number: '141',
      date: 'Ontem, 07:00 BRT',
      title: 'GeoAI e Foundation Models: o impacto dos modelos espaciais de 100M+ parâmetros',
      highlights: ['Visão computacional orbital', 'Previsão de cheias', 'Benchmarking LiDAR']
    },
    {
      number: '140',
      date: 'Anteontem, 07:00 BRT',
      title: 'QGIS 3.42 LTR liberado: suporte nativo a nuvens de pontos 3D e GeoTIFFs em nuvem',
      highlights: ['COG streaming', 'Desempenho de renderização', 'Integração GRASS']
    }
  ];

  return (
    <div className="space-y-12 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-mono text-cyan-400 font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curadoria Diária por Especialistas</span>
        </div>
        <h1 className="font-['Poppins'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Geozine Briefing
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          O radar matinal das geotecnologias. Tudo sobre sensoriamento remoto, satélites, dados abertos e inteligência artificial espacial em uma leitura de 5 minutos.
        </p>
      </div>

      {/* Subscription Box */}
      <div className="rounded-2xl border border-slate-800 bg-[#0c121e] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {status === 'success' ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-['Poppins'] text-2xl font-bold text-white">
              Inscrição confirmada com sucesso!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Bem-vindo ao radar. Enviamos uma confirmação para <strong className="text-cyan-400">{email}</strong>. 
              Sua primeira edição chegará pontualmente às 07:00 UTC.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setEmail('');
              }}
              className="text-xs font-mono text-cyan-400 hover:underline pt-2 inline-block"
            >
              Cadastrar outro e-mail
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu.melhor.email@instituicao.org"
                className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-xl px-5 py-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-950/60 shrink-0 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <span>Cadastrando...</span>
                ) : (
                  <>
                    <span>Inscrever-se Grátis</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Frequency options */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="radio"
                    name="freq"
                    checked={frequency === 'diario'}
                    onChange={() => setFrequency('diario')}
                    className="accent-cyan-500"
                  />
                  <span>Edição Diária (Segunda a Sexta, 07:00 BRT)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="radio"
                    name="freq"
                    checked={frequency === 'semanal'}
                    onChange={() => setFrequency('semanal')}
                    className="accent-cyan-500"
                  />
                  <span>Dossiê de Fim de Semana (Sábados, 09:00 BRT)</span>
                </label>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Zero spam • Cancelamento em 1 clique</span>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Archive Samples */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="font-['Poppins'] text-xl font-bold text-white">
            Exemplos de Edições Recentes
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Mais de 140 edições publicadas
          </span>
        </div>

        <div className="space-y-4">
          {archiveIssues.map(issue => (
            <div
              key={issue.number}
              className="p-5 rounded-xl bg-[#0a0e17] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span className="font-bold">#Edição {issue.number}</span>
                  <span>•</span>
                  <span className="text-slate-500">{issue.date}</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-200">
                  {issue.title}
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {issue.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-xs font-mono text-slate-500 shrink-0">
                Lido em 4 min
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

