import React from 'react';
import { reportRepository } from '../data/repository';
import { FileText, Download, Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function ReportsPage() {
  const reports = reportRepository.getAll();

  const handleDownload = (title: string) => {
    window.alert(`Iniciando download da publicação técnica: "${title}" (Edição PDF Geozine)`);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Inteligência de Mercado & Análises Técnicas
          </span>
        </div>
        <h1 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Relatórios & Estudos Especiais
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl font-sans">
          Publicações temáticas aprofundadas com compilação de dados de mercado, benchmarks de sensores LiDAR, panorama regulatório de drones e projeções para o setor NewSpace na América Latina.
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reports.map(report => (
          <div
            key={report.id}
            className="rounded-2xl border border-slate-800 bg-[#0c121e] overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:border-slate-700 transition-all shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 uppercase">
                  {report.categoryName}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(report.publishedAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </span>
              </div>

              <h2 className="font-['Poppins'] text-xl sm:text-2xl font-bold text-white leading-snug">
                {report.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {report.description}
              </p>

              {/* Takeaways List */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="font-mono text-[10px] uppercase text-slate-400 font-bold block">
                  Principais Descobertas:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {report.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-400">
                <span>{report.pagesCount} páginas • {report.fileSize}</span>
              </div>

              <button
                onClick={() => handleDownload(report.title)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-950/50"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Relatório (PDF)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

