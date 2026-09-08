import { useEffect, useState } from 'react';
import { Article, Category, CategorySlug, GeographicRegion, Source } from '../types';
import { replaceLiveContent } from './repository';
import { supabase } from '../lib/supabase';

const fallbackHero = 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=82';

function mapArticle(row: any): Article {
  const category = row.category || {};
  const source = row.source || {};
  const editor = row.editor || {};
  const latitude = Number(row.latitude || 0);
  const longitude = Number(row.longitude || 0);
  const hasCoordinates = row.latitude !== null && row.latitude !== undefined && row.longitude !== null && row.longitude !== undefined;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || row.excerpt || '',
    excerpt: row.excerpt || '',
    body: row.body_html || '',
    content: row.body_html || '',
    category: (category.slug || row.category_slug || 'geoai') as CategorySlug,
    categoryName: category.name || row.category_name || 'Geotecnologias',
    tags: Array.isArray(row.tags) ? row.tags : [],
    sourceName: source.name || row.source_name || 'Fonte original',
    sourceSlug: source.slug || row.source_slug || 'fonte-original',
    sourceUrl: row.source_url || source.url || '#',
    sourceType: source.source_type || 'Web',
    originalPublishedAt: row.original_published_at || row.published_at || row.created_at,
    publishedAt: row.published_at || row.created_at,
    updatedAt: row.updated_at,
    author: {
      name: editor.full_name || row.editor_name || 'Redação Geozine',
      slug: editor.id || 'redacao-geozine',
      role: editor.role === 'admin' ? 'Editor responsável' : 'Curadoria editorial',
      avatar: editor.avatar_url || 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=128&q=80',
      type: row.reviewed_by ? 'Automação editorial' : 'Redação Geozine',
    },
    heroImage: row.hero_image_url || row.og_image_url || fallbackHero,
    imageAlt: row.image_alt || row.title,
    imageCredit: row.image_credit || source.name || 'Fonte original',
    imageCaption: row.image_caption || '',
    aiGeneratedImage: Boolean(row.ai_generated_image),
    country: row.country || 'Brasil',
    region: (row.region || 'Global') as GeographicRegion,
    latitude,
    longitude,
    coordinates: hasCoordinates ? { lat: latitude, lng: longitude } : undefined,
    readingTime: Number(row.reading_time || 4),
    featured: Boolean(row.featured),
    breaking: Boolean(row.breaking),
    dossier: false,
    reviewStatus: row.reviewed_by ? 'Verificado pela redação' : 'Curadoria editorial assistida por IA',
    relatedArticleIds: [],
    keyTakeaways: Array.isArray(row.key_takeaways) ? row.key_takeaways : [],
    references: row.source_url ? [{ title: row.source_title || source.name || 'Matéria original', url: row.source_url }] : [],
    viewsCount: Number(row.views_count || 0),
    seoTitle: row.seo_title || row.title,
    seoDescription: row.seo_description || row.excerpt || '',
    ogImageUrl: row.og_image_url || row.hero_image_url || '',
  };
}

function mapCategory(row: any): Category {
  return {
    slug: row.slug as CategorySlug,
    name: row.name,
    shortName: row.short_name || row.name,
    description: row.description || '',
    color: row.color || '#06b6d4',
    articleCount: Number(row.article_count || 0),
  };
}

function mapSource(row: any): Source {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    domain: row.domain || '',
    url: row.url || '',
    country: row.country || 'Global',
    sourceType: row.source_type || 'Web',
    category: row.category_hint || 'Geral',
    description: row.description || row.search_query || '',
    status: row.active ? 'Ativa' : 'Pausada',
    active: Boolean(row.active),
    reliabilityScore: Number(row.trust_score || 90),
    ingestionProtocol: row.feed_url ? 'RSS + busca com IA' : 'Busca com IA',
    lastChecked: row.last_checked_at || 'Ainda não verificada',
    frequency: 'Conforme agenda da automação',
    articlesCount: Number(row.articles_count || 0),
  };
}

async function loadRemoteContent() {
  if (!supabase) return false;

  const [articlesResult, categoriesResult, sourcesResult] = await Promise.all([
    supabase
      .from('articles')
      .select('*, category:categories(*), source:sources(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false }),
    supabase.from('categories').select('*').eq('active', true).order('sort_order'),
    supabase.from('sources').select('*').eq('active', true).order('name'),
  ]);

  if (articlesResult.error) throw articlesResult.error;

  replaceLiveContent({
    articles: (articlesResult.data || []).map(mapArticle),
    categories: (categoriesResult.data || []).map(mapCategory),
    sources: (sourcesResult.data || []).map(mapSource),
  });

  return true;
}

export function useRemoteContent() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    const refresh = async () => {
      try {
        const changed = await loadRemoteContent();
        if (active && changed) setVersion(version => version + 1);
      } catch (error) {
        console.warn('Não foi possível carregar o conteúdo remoto. O catálogo demonstrativo será usado.', error);
      }
    };

    void refresh();
    const channel = supabase
      .channel('geozine-public-content')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, refresh)
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, []);
}
