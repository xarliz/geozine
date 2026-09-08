import { useEffect } from 'react';
import { articleRepository, categoryRepository } from '../data/repository';
import { publicSiteUrl } from '../lib/supabase';
import { useRouter } from '../router';

const siteName = import.meta.env.VITE_SITE_NAME || 'Geozine';
const defaultTitle = import.meta.env.VITE_DEFAULT_SEO_TITLE || 'Geozine — Notícias, inteligência e inovação geoespacial';
const defaultDescription = import.meta.env.VITE_DEFAULT_SEO_DESCRIPTION || 'O radar diário das geotecnologias: satélites, GeoAI, GIS, sensoriamento remoto, drones, cartografia e dados espaciais.';
const defaultImage = import.meta.env.VITE_DEFAULT_OG_IMAGE || '';

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

export function SeoManager() {
  const { path, params } = useRouter();

  useEffect(() => {
    const cleanPath = path.split('?')[0];
    const article = cleanPath.startsWith('/noticia/') ? articleRepository.getBySlug(params.slug || '') : undefined;
    const category = cleanPath.startsWith('/categoria/') ? categoryRepository.getBySlug(params.slug || '') : undefined;

    const title = article?.seoTitle || (category ? `${category.name} — ${siteName}` : defaultTitle);
    const description = article?.seoDescription || category?.description || defaultDescription;
    const image = article?.ogImageUrl || article?.heroImage || defaultImage;
    const canonical = `${publicSiteUrl}${cleanPath === '/' ? '' : cleanPath}`;
    const type = article ? 'article' : 'website';

    document.title = title;
    setCanonical(canonical);
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });

    if (image) {
      const absoluteImage = image.startsWith('http') ? image : `${publicSiteUrl}${image.startsWith('/') ? image : `/${image}`}`;
      setMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteImage });
      setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: absoluteImage });
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove();
      document.head.querySelector('meta[name="twitter:image"]')?.remove();
    }

    document.head.querySelector('#geozine-structured-data')?.remove();
    if (article) {
      const script = document.createElement('script');
      script.id = 'geozine-structured-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        mainEntityOfPage: canonical,
        image: image ? [image.startsWith('http') ? image : `${publicSiteUrl}${image}`] : undefined,
        author: { '@type': 'Person', name: article.author.name },
        publisher: { '@type': 'Organization', name: siteName },
        isBasedOn: article.sourceUrl,
      });
      document.head.appendChild(script);
    }
  }, [path, params.slug]);

  return null;
}

