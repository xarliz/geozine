import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const publicSiteUrl = (
  import.meta.env.VITE_PUBLIC_SITE_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'https://nome-do-dominio-a-definir.com.br')
).replace(/\/$/, '');

export const adminSiteUrl = (
  import.meta.env.VITE_ADMIN_SITE_URL ||
  `${publicSiteUrl.replace(/^https:\/\//, 'https://adm.')}`
).replace(/\/$/, '');

export const isAdminHostname = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.toLowerCase().startsWith('adm.');
};

