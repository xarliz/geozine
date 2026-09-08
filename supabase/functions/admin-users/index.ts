import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authorization = request.headers.get('Authorization') || '';

    const callerClient = createClient(url, anonKey, { global: { headers: { Authorization: authorization } } });
    const { data: userData, error: userError } = await callerClient.auth.getUser();
    if (userError || !userData.user) throw new Error('Sessão inválida.');

    const { data: profile } = await callerClient.from('profiles').select('role,active').eq('id', userData.user.id).single();
    if (!profile?.active || profile.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Apenas administradores podem criar usuários.' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const body = await request.json();
    if (body.action !== 'invite' || !body.email || !['admin', 'editor'].includes(body.role)) {
      return new Response(JSON.stringify({ error: 'Solicitação inválida.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const adminClient = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: invited, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(body.email, {
      data: { full_name: String(body.full_name || '').trim() },
      redirectTo: `${Deno.env.get('ADMIN_SITE_URL') || ''}/admin`,
    });
    if (inviteError) throw inviteError;

    await adminClient.from('profiles').update({ full_name: body.full_name, role: body.role, active: true }).eq('id', invited.user.id);
    return new Response(JSON.stringify({ ok: true, user_id: invited.user.id }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Erro inesperado.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});

