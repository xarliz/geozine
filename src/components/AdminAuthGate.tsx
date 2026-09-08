import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { LoaderCircle, ShieldCheck, Wrench } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { AdminLogin } from '../pages/AdminPages';

export function AdminAuthGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    if (import.meta.env.DEV || import.meta.env.VITE_ALLOW_DEMO_ADMIN === 'true') {
      return (
        <div>
          <div className="bg-amber-400 px-4 py-2 text-center text-xs font-semibold text-slate-950">
            <Wrench className="mr-1.5 inline h-3.5 w-3.5" /> Modo de demonstração local — conecte o Supabase para gravar dados e exigir login.
          </div>
          {children}
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#07090e] text-slate-100 grid place-items-center px-6">
        <div className="max-w-lg rounded-2xl border border-slate-800 bg-[#0c121e] p-8 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-cyan-400" />
          <h1 className="mt-4 font-['Poppins'] text-2xl font-bold">ADM aguardando configuração</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no ambiente de publicação. Nenhuma chave administrativa deve ser colocada no navegador.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-[#07090e] grid place-items-center"><LoaderCircle className="h-8 w-8 animate-spin text-cyan-400" /></div>;
  }

  if (!session) return <AdminLogin />;
  return <>{children}</>;
}
