# Geozine

Portal público de notícias do setor geoespacial com redação automatizada e ambiente administrativo protegido. O projeto reaproveita o protótipo visual original, troca a tipografia de títulos de Syne para Poppins e acrescenta banco, login, fluxo editorial, automação e SEO técnico.

## O que está implementado

- Portal responsivo com notícias, categorias, busca, mapa, dossiês, relatórios, RSS e páginas institucionais.
- Conteúdo publicado carregado do Supabase em tempo real, com catálogo demonstrativo quando o backend ainda não foi conectado.
- ADM em `adm.[domínio].com.br`, com login por e-mail e senha.
- Perfis `admin` e `editor`, convite de usuários, bloqueio e alteração de permissões.
- Fontes configuráveis por domínio, URL, RSS e orientação de busca.
- Fila de revisão; quem aprova é gravado como editor responsável.
- Botão de publicação automática ativo/desativado.
- Provedor Gemini ou OpenAI, modelos, prompts, limite diário e horários configuráveis.
- Categorias, matérias, páginas institucionais, SEO global e imagem social administráveis.
- SEO por matéria com canonical, Open Graph, X Cards, JSON-LD `NewsArticle`, sitemap, RSS e robots.
- GitHub Actions para pesquisa automática e publicação no Cloudflare Pages.

## Arquitetura

```text
GitHub Actions (a cada 15 min)
  └─ confere os horários configurados no ADM (São Paulo)
     └─ Gemini + Google Search ou OpenAI Web Search
        └─ valida domínio, elimina duplicatas e cria síntese original
           └─ Supabase
              ├─ pendente → revisão humana → editor responsável
              └─ publicado automaticamente, se autorizado

GitHub → build Vite + páginas SEO → Cloudflare Pages
  ├─ domínio público
  └─ subdomínio adm
```

O Cloudflare Pages é usado para que o mesmo projeto aceite o domínio principal e o subdomínio `adm.`. O GitHub continua sendo a origem do código e das automações.

## Instalação local

Requer Node.js 22+ e pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Sem as variáveis do Supabase, o portal usa dados demonstrativos e o ADM entra em modo local sem persistência. Em produção, ausência dessas variáveis bloqueia o ADM.

## Criar o backend

1. Crie um projeto no Supabase.
2. Execute `supabase/migrations/20260908000000_geozine.sql` no SQL Editor ou use `supabase db push`.
3. Crie o primeiro usuário em Authentication > Users.
4. Promova-o uma única vez no SQL Editor:

```sql
update public.profiles
set role = 'admin', active = true
where email = 'seu-email@dominio.com';
```

5. Publique a função segura de convite:

```bash
supabase functions deploy admin-users
supabase secrets set ADMIN_SITE_URL=https://adm.seu-dominio.com.br
```

O `SUPABASE_SERVICE_ROLE_KEY` nunca deve receber o prefixo `VITE_` e nunca deve ser exposto no navegador.

## Configurar o GitHub

Cadastre em Settings > Secrets and variables > Actions:

Secrets:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY` (opcional)
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Variables:

- `PUBLIC_SITE_URL`
- `ADMIN_SITE_URL`
- `CLOUDFLARE_PAGES_PROJECT`

O workflow `Buscar notícias` verifica a agenda em intervalos de 15 minutos e executa, por padrão, às 08:00, 12:00, 17:00 e 22:00 no fuso `America/Sao_Paulo`. O disparo manual força uma execução imediata.

## Domínios

No projeto do Cloudflare Pages, adicione os dois domínios personalizados:

- `nome-do-dominio-a-definir.com.br`
- `adm.nome-do-dominio-a-definir.com.br`

Defina as mesmas URLs nas variáveis do GitHub e em `site_settings` pelo ADM.

## Segurança e direitos autorais

- O frontend usa somente a chave pública do Supabase e as políticas RLS controlam o acesso.
- Operações administrativas de usuários usam uma Edge Function com validação de perfil.
- Conteúdo HTML gerado é sanitizado antes de entrar no banco.
- Resultados fora dos domínios permitidos e abaixo do limiar de confiança são descartados.
- A síntese automática mantém atribuição e link para a fonte. Parafrasear não garante, sozinho, conformidade autoral; a política editorial deve considerar licenças, termos de uso e revisão factual.
- Nenhum sistema pode garantir posição em buscadores. O projeto implementa a base técnica de SEO; autoridade, qualidade, indexação e concorrência continuam influenciando o ranking.

## Comandos

```bash
pnpm dev       # desenvolvimento
pnpm lint      # validação TypeScript
pnpm build     # build + metadados SEO, sitemap, RSS e robots
pnpm ingest    # executa a automação (requer secrets de servidor)
```

