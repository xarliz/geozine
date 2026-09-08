import React, { useState } from 'react';
import { Link } from '../router';
import { sourceRepository } from '../data/repository';
import { 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Send, 
  CheckCircle2, 
  Mail, 
  Compass, 
  MapPin, 
  Globe, 
  ExternalLink,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

/* ============================================================
   1. QUEM SOMOS (/sobre)
   ============================================================ */
export function AboutPage() {
  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-2">
          Sobre o Projeto
        </span>
        <h1 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Geozine: Notícias, inteligência e inovação geoespacial
        </h1>
        <p className="text-base text-slate-300 mt-2 font-sans leading-relaxed">
          O radar diário das geotecnologias.
        </p>
      </div>

      <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
        <p>
          A <strong>Geozine</strong> nasceu da necessidade de suprir a lacuna existente no jornalismo técnico e na divulgação científica voltada para a inteligência de localização, a observação da Terra e a indústria espacial. Em um mundo onde sensores orbitais, drones de alta resolução e inteligência artificial transformam diariamente a gestão pública, o agronegócio e o monitoramento ambiental, a informação precisa ser ágil, verificável e analítica.
        </p>

        <h2 className="font-['Poppins'] text-xl font-bold text-white pt-4">
          Nossa Missão
        </h2>
        <p>
          Democratizar o acesso ao conhecimento geoespacial avançado através de coberturas rigorosas, contextualização técnica acessível e auditoria independente de dados territoriais.
        </p>

        <h2 className="font-['Poppins'] text-xl font-bold text-white pt-4">
          Mantida pela Allsee
        </h2>
        <p>
          A infraestrutura técnica, engenharia de pipelines e curadoria de dados da Geozine são providas e mantidas pela <strong>Allsee</strong> — uma empresa de tecnologia focada em soluções avançadas de visão computacional, geoprocessamento e inteligência geoespacial.
        </p>

        <div className="p-5 rounded-xl bg-[#0c121e] border border-slate-800 space-y-2 mt-6">
          <h3 className="font-['Poppins'] font-bold text-white text-base">
            Compromissos Fundamentais:
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Independência e Verificação:</strong> Todos os dados de satélites e sensores passam por checagem técnica antes da publicação.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Transparência de Fontes:</strong> Nenhuma reportagem omite a origem dos metadados ou a instituição científica responsável.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Uso Ético de IA:</strong> Modelos generativos são estritamente etiquetados e supervisionados por editores humanos.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   2. METODOLOGIA EDITORIAL & USO DE IA (/metodologia-editorial)
   ============================================================ */
export function MethodologyPage() {
  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-2">
          Padrões Editoriais
        </span>
        <h1 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Metodologia Editorial & Uso de IA
        </h1>
        <p className="text-sm text-slate-300 mt-2 font-sans">
          Diretrizes de apuração, verificação de dados e política de transparência no uso de inteligência artificial.
        </p>
      </div>

      <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
        <h2 className="font-['Poppins'] text-xl font-bold text-white">
          1. Ciclo de Apuração e Ingestão de Dados
        </h2>
        <p>
          O radar da Geozine monitora automaticamente mais de 25 fontes governamentais, agências espaciais e repositórios acadêmicos. Cada evento de dados (como um boletim do INPE, alerta de desmatamento ou lançamento orbital) gera um pré-registro que é verificado e formatado de acordo com a taxonomia padronizada.
        </p>

        <h2 className="font-['Poppins'] text-xl font-bold text-white pt-2">
          2. Política Rigorosa de Inteligência Artificial
        </h2>
        <p>
          Utilizamos ferramentas de modelos de linguagem e visão computacional em nossa esteira com limites estritos:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li><strong>Textos e Reportagens:</strong> Nenhum artigo é publicado sem revisão, edição e validação por jornalistas e especialistas humanos. A IA atua na síntese preliminar e extração de metadados.</li>
          <li><strong>Imagens Ilustrativas:</strong> Quando uma imagem de satélite ou foto real não está disponível no momento do lançamento, imagens conceituais geradas por IA recebem obrigatoriamente o selo <strong>"IA Visual"</strong>.</li>
          <li><strong>Auditoria de Alucinações:</strong> Todos os números, datas de órbita e coordenadas são verificados contra a documentação primária oficial.</li>
        </ul>

        <h2 className="font-['Poppins'] text-xl font-bold text-white pt-2">
          3. Correções e Atualizações
        </h2>
        <p>
          Erros factuais são corrigidos com transparência imediata no próprio corpo da matéria, com carimbo de horário UTC e descrição do que foi retificado.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   3. FONTES E TRANSPARÊNCIA (/fontes-e-transparencia)
   ============================================================ */
export function TransparencyPage() {
  const sources = sourceRepository.getAll();

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-2">
          Diretório Aberto
        </span>
        <h1 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Fontes e Transparência
        </h1>
        <p className="text-sm text-slate-300 mt-2 font-sans">
          Conheça as instituições científicas, agências espaciais e provedores de telemetria que alimentam o ecossistema Geozine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map(source => (
          <div key={source.id} className="p-5 rounded-xl bg-[#0c121e] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{source.category}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                {source.reliabilityScore}% Confiabilidade
              </span>
            </div>

            <h3 className="font-bold text-slate-100 text-base">
              <Link to={`/fontes/${source.slug}`} className="hover:text-cyan-300">
                {source.name}
              </Link>
            </h3>

            <p className="text-xs text-slate-300 font-sans line-clamp-3">
              {source.description}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{source.country} • {source.frequency}</span>
              <Link to={`/fontes/${source.slug}`} className="text-cyan-400 hover:underline">
                Ver perfil →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   4. CONTATO & SUGESTÕES DE PAUTA (/contato)
   ============================================================ */
export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-2">
          Canal com a Redação
        </span>
        <h1 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contato & Sugestões de Pauta
        </h1>
        <p className="text-sm text-slate-300 mt-2 font-sans">
          Envie comunicados à imprensa, dados de novas constelações, lançamentos de softwares GIS ou dicas investigativas.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-xl bg-emerald-950/30 border border-emerald-800 text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Mensagem recebida com sucesso!</h3>
          <p className="text-sm text-slate-300">
            Nossa equipe editorial analisará sua mensagem em até 24 horas úteis.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-mono text-cyan-400 hover:underline pt-2"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#0c121e] border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Nome Completo</label>
              <input
                type="text"
                required
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">E-mail Profissional</label>
              <input
                type="email"
                required
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Assunto / Tipo de Contato</label>
            <select className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono">
              <option>Sugestão de Pauta / Press Release</option>
              <option>Correção de Reportagem</option>
              <option>Parceria Institucional & Anúncios</option>
              <option>Dúvida sobre Metodologia ou Dados</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Mensagem ou Detalhes da Pauta</label>
            <textarea
              rows={5}
              required
              placeholder="Descreva o lançamento, satélite, sensor ou estudo..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Enviar à Redação
          </button>
        </form>
      )}
    </div>
  );
}

/* ============================================================
   5. POLÍTICA DE PRIVACIDADE (/privacidade)
   ============================================================ */
export function PrivacyPage() {
  return (
    <div className="space-y-6 pb-16 max-w-3xl mx-auto text-slate-300 text-sm leading-relaxed font-sans">
      <h1 className="font-['Poppins'] text-3xl font-extrabold text-white tracking-tight pb-4 border-b border-slate-800">
        Política de Privacidade (LGPD)
      </h1>
      <p>
        A Geozine, mantida pela Allsee, tem como premissa basilar a privacidade e segurança dos seus leitores e assinantes, atuando em rigorosa conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 — LGPD).
      </p>
      <h2 className="font-['Poppins'] text-lg font-bold text-white pt-2">Dados Coletados</h2>
      <p>
        Coletamos apenas o endereço de e-mail fornecido voluntariamente na inscrição do boletim <em>Geozine Briefing</em> e telemetria anônima de leitura para melhoria de desempenho técnico.
      </p>
      <h2 className="font-['Poppins'] text-lg font-bold text-white pt-2">Seus Direitos</h2>
      <p>
        Você tem direito a solicitar o cancelamento imediato de sua inscrição em qualquer momento através do link contido no rodapé de cada boletim enviado, ou solicitando diretamente pelo canal oficial.
      </p>
    </div>
  );
}

/* ============================================================
   6. TERMOS DE USO (/termos)
   ============================================================ */
export function TermsPage() {
  return (
    <div className="space-y-6 pb-16 max-w-3xl mx-auto text-slate-300 text-sm leading-relaxed font-sans">
      <h1 className="font-['Poppins'] text-3xl font-extrabold text-white tracking-tight pb-4 border-b border-slate-800">
        Termos de Uso
      </h1>
      <p>
        Todo o conteúdo editorial, análises, infográficos e mapas disponibilizados no portal Geozine são protegidos pela legislação de direitos autorais e propriedade intelectual.
      </p>
      <h2 className="font-['Poppins'] text-lg font-bold text-white pt-2">Citação e Reprodução</h2>
      <p>
        A reprodução de trechos de reportagens é permitida mediante atribuição explícita com link direto e menção à fonte primária citada no texto. É vedada a raspagem automatizada para fins de comercialização desautorizada.
      </p>
    </div>
  );
}

/* ============================================================
   7. POLÍTICA DE COOKIES (/cookies)
   ============================================================ */
export function CookiesPage() {
  return (
    <div className="space-y-6 pb-16 max-w-3xl mx-auto text-slate-300 text-sm leading-relaxed font-sans">
      <h1 className="font-['Poppins'] text-3xl font-extrabold text-white tracking-tight pb-4 border-b border-slate-800">
        Política de Cookies
      </h1>
      <p>
        Utilizamos cookies essenciais e recursos de armazenamento local (localStorage) exclusivamente para:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Armazenar a lista de notícias salvas pelo usuário no dispositivo local.</li>
        <li>Registrar preferências de navegação e filtros recentes.</li>
        <li>Otimizar o carregamento de camadas de mapas em cache.</li>
      </ul>
    </div>
  );
}

/* ============================================================
   8. PÁGINA 404 (/404)
   ============================================================ */
export function NotFoundPage() {
  return (
    <div className="py-24 text-center max-w-lg mx-auto space-y-6">
      <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-400 flex items-center justify-center mx-auto">
        <Compass className="w-8 h-8 animate-spin" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
          Erro 404 // Sinal Perdido
        </span>
        <h1 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-white">
          Coordenadas Não Encontradas
        </h1>
        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          O ponto geográfico ou reportagem que você está tentando acessar saiu de órbita ou teve seus parâmetros alterados.
        </p>
      </div>

      <div className="pt-4 flex justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
        >
          Retornar ao Radar Principal
        </Link>
        <Link
          to="/busca"
          className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-all"
        >
          Buscar no Acervo
        </Link>
      </div>
    </div>
  );
}

