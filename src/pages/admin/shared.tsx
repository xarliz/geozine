import React, { useState } from 'react';
import { Database, ExternalLink, FileText, FolderTree, KeyRound, LayoutDashboard, ListChecks, LogOut, Search, Settings, ShieldCheck, Terminal, Users } from 'lucide-react';
import { adminSiteUrl, isSupabaseConfigured, publicSiteUrl, supabase } from '../../lib/supabase';
import { Link } from '../../router';

export type Row = Record<string, any>;
export const inputClass = 'w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20';
export const labelClass = 'mb-1.5 block text-xs font-semibold text-slate-300';
export const panelClass = 'rounded-xl border border-slate-800 bg-[#0c121e] p-5 shadow-xl';
export const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50';

export function slugify(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function AdminHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-['Poppins'] text-2xl font-bold text-white">{title}</h2><p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">{description}</p></div>{action}</div>;
}

export function StatusMessage({ message, error }: { message?: string; error?: string }) {
  if (!message && !error) return null;
  return <div className={`rounded-lg border px-3 py-2 text-sm ${error ? 'border-red-900 bg-red-950/50 text-red-300' : 'border-emerald-900 bg-emerald-950/50 text-emerald-300'}`}>{error || message}</div>;
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-sm text-slate-400">{children}</div>;
}

export function AdminLayout({ activeTab, children }: { activeTab: string; children: React.ReactNode }) {
  const navItems = [
    ['overview', 'Visão geral', LayoutDashboard, '/admin'], ['queue', 'Revisão', ListChecks, '/admin/fila'], ['articles', 'Matérias', FileText, '/admin/noticias'], ['sources', 'Fontes', Database, '/admin/fontes'], ['automation', 'Automação & IA', Settings, '/admin/automacao'], ['categories', 'Categorias', FolderTree, '/admin/categorias'], ['seo', 'Páginas & SEO', Search, '/admin/paginas-seo'], ['users', 'Usuários ADM', Users, '/admin/usuarios'], ['logs', 'Execuções', Terminal, '/admin/logs'],
  ] as const;
  return <div className="min-h-screen bg-[#07090e] text-slate-200">
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#080c14]/95 px-4 py-3 backdrop-blur sm:px-6"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-500/40 bg-cyan-950 font-mono text-xs font-bold text-cyan-300">GZ</div><div><h1 className="font-['Poppins'] text-sm font-bold text-white">Geozine ADM</h1><p className="text-[11px] text-slate-500">Redação, automação e SEO</p></div></div><div className="flex items-center gap-2"><a href={publicSiteUrl} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-cyan-300 hover:border-cyan-700">Portal <ExternalLink className="h-3.5 w-3.5" /></a>{isSupabaseConfigured && <button onClick={() => supabase?.auth.signOut()} className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:text-white" aria-label="Sair"><LogOut className="h-4 w-4" /></button>}</div></div></header>
    <nav className="border-b border-slate-800 bg-[#090d16] px-4 sm:px-6"><div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto py-2">{navItems.map(([id, label, Icon, path]) => <Link key={id} to={path} className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${activeTab === id ? 'border border-cyan-800 bg-cyan-950 text-cyan-200' : 'border border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-white'}`}><Icon className="h-4 w-4" />{label}</Link>)}</div></nav>
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
  </div>;
}

export function AdminLogin() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [message, setMessage] = useState('');
  const login = async (event: React.FormEvent) => { event.preventDefault(); if (!supabase) return; setBusy(true); setError(''); const result = await supabase.auth.signInWithPassword({ email, password }); if (result.error) setError('Não foi possível entrar. Confira e-mail, senha e se o usuário está ativo.'); setBusy(false); };
  const reset = async () => { if (!supabase || !email) return setError('Informe seu e-mail para solicitar a redefinição.'); const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${adminSiteUrl}/admin` }); if (resetError) setError(resetError.message); else setMessage('Se o usuário existir, enviaremos as instruções de redefinição.'); };
  return <div className="min-h-screen bg-[#07090e] bg-grid-pattern px-6 text-slate-100 grid place-items-center"><form onSubmit={login} className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0c121e] p-7 shadow-2xl"><div className="mb-6 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-950 text-cyan-300"><KeyRound className="h-5 w-5" /></div><div><h1 className="font-['Poppins'] text-xl font-bold">Acesso à redação</h1><p className="text-xs text-slate-400">Ambiente restrito a administradores e editores.</p></div></div><StatusMessage message={message} error={error} /><div className="mt-4 space-y-4"><label><span className={labelClass}>E-mail</span><input className={inputClass} type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required /></label><label><span className={labelClass}>Senha</span><input className={inputClass} type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required /></label><button className={`${buttonClass} w-full`} disabled={busy}><ShieldCheck className="h-4 w-4" />{busy ? 'Entrando…' : 'Entrar'}</button><button type="button" onClick={reset} className="w-full text-center text-xs text-slate-400 hover:text-cyan-300">Esqueci minha senha</button></div></form></div>;
}

