import 'dotenv/config';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const dist = path.resolve('dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const escape = (value = '') => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const xml = (value = '') => escape(value).replace(/'/g, '&apos;');

let settings = {
  site_name: process.env.VITE_SITE_NAME || 'Geozine',
  public_url: (process.env.VITE_PUBLIC_SITE_URL || 'https://nome-do-dominio-a-definir.com.br').replace(/\/$/, ''),
  default_seo_title: process.env.VITE_DEFAULT_SEO_TITLE || 'Geozine — Notícias, inteligência e inovação geoespacial',
  default_seo_description: process.env.VITE_DEFAULT_SEO_DESCRIPTION || 'O radar diário das geotecnologias.',
  default_og_image_url: process.env.VITE_DEFAULT_OG_IMAGE || '',
};
let articles = [];

if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const [settingsResult, articlesResult] = await Promise.all([
    db.from('site_settings').select('site_name,public_url,default_seo_title,default_seo_description,default_og_image_url').eq('id', 'main').maybeSingle(),
    db.from('articles').select('title,slug,excerpt,body_html,seo_title,seo_description,og_image_url,hero_image_url,source_url,editor_name,published_at,updated_at').eq('status', 'published').order('published_at', { ascending: false }),
  ]);
  if (settingsResult.data) settings = { ...settings, ...settingsResult.data, public_url: settingsResult.data.public_url.replace(/\/$/, '') };
  if (articlesResult.data) articles = articlesResult.data;
}

function metaHtml(html, { title, description, canonical, image, type = 'website', article }) {
  const tags = [
    `<link rel="canonical" href="${escape(canonical)}" />`,
    `<meta property="og:url" content="${escape(canonical)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
  ];
  if (image) tags.push(`<meta property="og:image" content="${escape(image)}" />`, `<meta name="twitter:image" content="${escape(image)}" />`);
  if (article) tags.push(`<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'NewsArticle', headline: article.title, description, datePublished: article.published_at, dateModified: article.updated_at || article.published_at, mainEntityOfPage: canonical, image: image ? [image] : undefined, author: { '@type': 'Person', name: article.editor_name || 'Redação Geozine' }, publisher: { '@type': 'Organization', name: settings.site_name }, isBasedOn: article.source_url }).replace(/</g, '\\u003c')}</script>`);
  return html.replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`).replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(description)}" />`).replace(/<meta property="og:title"[^>]*>/, '').replace(/<meta property="og:description"[^>]*>/, '').replace(/<meta property="og:type"[^>]*>/, '').replace('</head>', `  ${tags.join('\n    ')}\n  </head>`);
}

const home = metaHtml(template, { title: settings.default_seo_title, description: settings.default_seo_description, canonical: settings.public_url, image: settings.default_og_image_url });
await writeFile(path.join(dist, 'index.html'), home);
await writeFile(path.join(dist, '404.html'), home);

for (const article of articles) {
  const directory = path.join(dist, 'noticia', article.slug);
  await mkdir(directory, { recursive: true });
  const canonical = `${settings.public_url}/noticia/${article.slug}`;
  const image = article.og_image_url || article.hero_image_url || settings.default_og_image_url || '';
  let html = metaHtml(template, { title: article.seo_title || article.title, description: article.seo_description || article.excerpt, canonical, image, type: 'article', article });
  html = html.replace('<div id="root"></div>', `<div id="root"></div><noscript><article><h1>${escape(article.title)}</h1><p>${escape(article.excerpt)}</p><p><a href="${escape(article.source_url)}">Fonte original</a></p></article></noscript>`);
  await writeFile(path.join(directory, 'index.html'), html);
}

const staticRoutes = ['', '/ultimas', '/mapa', '/dossies', '/relatorios', '/sobre', '/metodologia-editorial', '/fontes-e-transparencia', '/contato', '/privacidade', '/termos'];
const sitemapUrls = [...staticRoutes.map(route => `${settings.public_url}${route}`), ...articles.map(article => `${settings.public_url}/noticia/${article.slug}`)];
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(url => `  <url><loc>${xml(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: ${settings.public_url}/sitemap.xml\n`);
await writeFile(path.join(dist, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${xml(settings.site_name)}</title><link>${xml(settings.public_url)}</link><description>${xml(settings.default_seo_description)}</description>${articles.slice(0, 50).map(article => `<item><title>${xml(article.title)}</title><link>${xml(`${settings.public_url}/noticia/${article.slug}`)}</link><guid>${xml(`${settings.public_url}/noticia/${article.slug}`)}</guid><description>${xml(article.excerpt)}</description><pubDate>${new Date(article.published_at).toUTCString()}</pubDate></item>`).join('')}</channel></rss>`);
console.log(`SEO gerado para ${articles.length} matéria(s).`);

