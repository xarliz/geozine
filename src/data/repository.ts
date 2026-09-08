import { 
  Article, 
  Category, 
  Topic, 
  Author, 
  Source, 
  Report, 
  Dossier, 
  IngestionItem, 
  TelemetryLog,
  AutomationConfig,
  GeographicRegion,
  CategorySlug 
} from '../types';

import { 
  ARTICLES, 
  CATEGORIES, 
  TOPICS, 
  AUTHORS, 
  SOURCES, 
  DOSSIERS, 
  REPORTS, 
  INGESTION_ITEMS, 
  TELEMETRY_LOGS,
  AUTOMATION_SETTINGS,
  RADAR_UPDATES 
} from './mockData';

export interface ArticleFilterOptions {
  query?: string;
  category?: string;
  tag?: string;
  region?: string;
  sourceSlug?: string;
  dateRange?: 'all' | 'today' | '24h' | '7d' | '30d';
  sortBy?: 'recent' | 'popular';
  page?: number;
  limit?: number;
}

// Normalize articles with convenience aliases and coordinate objects
let normalizedArticles: Article[] = ARTICLES.map(a => ({
  ...a,
  content: a.body,
  imageCaption: a.imageCredit,
  coordinates: { lat: a.latitude, lng: a.longitude }
}));

let liveCategories: Category[] = CATEGORIES;
let liveSources: Source[] | null = null;

export function replaceLiveContent(payload: {
  articles?: Article[];
  categories?: Category[];
  sources?: Source[];
}) {
  if (payload.articles?.length) normalizedArticles = payload.articles;
  if (payload.categories?.length) liveCategories = payload.categories;
  if (payload.sources?.length) liveSources = payload.sources;
}

export const articleRepository = {
  getAll: (): Article[] => {
    return [...normalizedArticles];
  },

  getBySlug: (slug: string): Article | undefined => {
    return normalizedArticles.find(a => a.slug === slug);
  },

  getById: (id: string): Article | undefined => {
    return normalizedArticles.find(a => a.id === id);
  },

  getFeatured: (): Article[] => {
    return normalizedArticles.filter(a => a.featured);
  },

  getHero: (): Article => {
    return normalizedArticles.find(a => a.featured) || normalizedArticles[0];
  },

  getLatest: (limit = 10): Article[] => {
    return [...normalizedArticles]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  },

  getMostRead: (limit = 5): Article[] => {
    return [...normalizedArticles]
      .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
      .slice(0, limit);
  },

  getByCategory: (categorySlug: string, limit?: number): Article[] => {
    const list = normalizedArticles.filter(a => a.category === categorySlug);
    return limit ? list.slice(0, limit) : list;
  },

  getByTag: (tag: string, limit?: number): Article[] => {
    const normalizedTag = tag.toLowerCase();
    const list = normalizedArticles.filter(a => a.tags.some(t => t.toLowerCase() === normalizedTag));
    return limit ? list.slice(0, limit) : list;
  },

  getByRegion: (region: string, limit?: number): Article[] => {
    const list = normalizedArticles.filter(a => a.region.toLowerCase() === region.toLowerCase());
    return limit ? list.slice(0, limit) : list;
  },

  getByAuthor: (authorSlug: string): Article[] => {
    return normalizedArticles.filter(a => a.author.slug === authorSlug);
  },

  getBySource: (sourceSlug: string): Article[] => {
    return normalizedArticles.filter(a => a.sourceSlug === sourceSlug);
  },

  getRelated: (articleId: string, limit = 3): Article[] => {
    const article = normalizedArticles.find(a => a.id === articleId);
    if (!article) return normalizedArticles.slice(0, limit);

    if (article.relatedArticleIds && article.relatedArticleIds.length > 0) {
      const explicit = normalizedArticles.filter(a => article.relatedArticleIds.includes(a.id));
      if (explicit.length > 0) return explicit.slice(0, limit);
    }

    return normalizedArticles
      .filter(a => a.id !== articleId && a.category === article.category)
      .slice(0, limit);
  },

  query: (options: ArticleFilterOptions = {}) => {
    let result = [...normalizedArticles];

    if (options.query && options.query.trim() !== '') {
      const q = options.query.toLowerCase().trim();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.sourceName.toLowerCase().includes(q)
      );
    }

    if (options.category && options.category !== 'all' && options.category !== 'Todas') {
      result = result.filter(a => a.category === options.category || a.categoryName.toLowerCase() === options.category?.toLowerCase());
    }

    if (options.tag) {
      const tagLower = options.tag.toLowerCase();
      result = result.filter(a => a.tags.some(t => t.toLowerCase() === tagLower));
    }

    if (options.region && options.region !== 'all' && options.region !== 'Global' && options.region !== 'Todas') {
      result = result.filter(a => a.region.toLowerCase() === options.region?.toLowerCase());
    }

    if (options.sourceSlug) {
      result = result.filter(a => a.sourceSlug === options.sourceSlug);
    }

    if (options.sortBy === 'popular') {
      result.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    } else {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    const page = options.page || 1;
    const limit = options.limit || 10;
    const total = result.length;
    const paginated = result.slice((page - 1) * limit, page * limit);

    return {
      items: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }
};

export const categoryRepository = {
  getAll: (): Category[] => liveCategories,
  getBySlug: (slug: string): Category | undefined => liveCategories.find(c => c.slug === slug)
};

export const topicRepository = {
  getAll: (): Topic[] => TOPICS,
  getBySlug: (slug: string): Topic | undefined => TOPICS.find(t => t.slug === slug.toLowerCase())
};

export const authorRepository = {
  getAll: (): Author[] => AUTHORS.map(a => ({
    ...a,
    articleCount: a.articlesCount,
    email: `${a.slug.replace('dra-', '').replace('dr-', '')}@geozine.allsee.com.br`,
    twitter: a.socials.twitter || `${a.slug}`
  })),
  getBySlug: (slug: string): Author | undefined => {
    const a = AUTHORS.find(auth => auth.slug === slug);
    if (!a) return undefined;
    return {
      ...a,
      articleCount: a.articlesCount,
      email: `${a.slug.replace('dra-', '').replace('dr-', '')}@geozine.allsee.com.br`,
      twitter: a.socials.twitter || `${a.slug}`
    };
  }
};

export const sourceRepository = {
  getAll: (): Source[] => liveSources || SOURCES.map(s => ({
    ...s,
    id: s.slug,
    active: s.status === 'Ativa',
    reliabilityScore: s.slug === 'inpe' ? 99 : s.slug === 'esa' ? 99 : s.slug === 'mapbiomas' ? 98 : 96,
    ingestionProtocol: s.slug.includes('esa') || s.slug.includes('copernicus') ? 'OGC API & Sentinel Hub' : 'REST API & RSS Feeds'
  })),
  getBySlug: (slug: string): Source | undefined => {
    if (liveSources) return liveSources.find(source => source.slug === slug);
    const s = SOURCES.find(src => src.slug === slug);
    if (!s) return undefined;
    return {
      ...s,
      id: s.slug,
      active: s.status === 'Ativa',
      reliabilityScore: s.slug === 'inpe' ? 99 : s.slug === 'esa' ? 99 : s.slug === 'mapbiomas' ? 98 : 96,
      ingestionProtocol: s.slug.includes('esa') || s.slug.includes('copernicus') ? 'OGC API & Sentinel Hub' : 'REST API & RSS Feeds'
    };
  }
};

export const dossierRepository = {
  getAll: (): Dossier[] => DOSSIERS.map(d => ({
    ...d,
    categoryName: 'Sensoriamento Remoto & Território',
    chaptersCount: d.chapters?.length || 4,
    description: d.excerpt,
    chapters: d.chapters.map(c => ({
      ...c,
      description: c.summary,
      readTime: '6 min'
    }))
  })),
  getBySlug: (slug: string): Dossier | undefined => {
    const d = DOSSIERS.find(dos => dos.slug === slug);
    if (!d) return undefined;
    return {
      ...d,
      categoryName: 'Sensoriamento Remoto & Território',
      chaptersCount: d.chapters?.length || 4,
      description: d.excerpt,
      chapters: d.chapters.map(c => ({
        ...c,
        description: c.summary,
        readTime: '6 min'
      }))
    };
  }
};

export const reportRepository = {
  getAll: (): Report[] => REPORTS.map(r => ({
    ...r,
    categoryName: r.type,
    publishedAt: r.date,
    highlights: r.topics,
    pagesCount: r.pages
  })),
  getBySlug: (slug: string): Report | undefined => {
    const r = REPORTS.find(rep => rep.slug === slug);
    if (!r) return undefined;
    return {
      ...r,
      categoryName: r.type,
      publishedAt: r.date,
      highlights: r.topics,
      pagesCount: r.pages
    };
  }
};

export const adminRepository = {
  getIngestionQueue: (): IngestionItem[] => INGESTION_ITEMS.map(item => ({
    ...item,
    rawTitle: item.title,
    sourceName: item.source,
    ingestedAt: item.discoveredAt,
    status: item.stage,
    confidenceScore: item.confidence,
    suggestedCategory: item.category,
    summaryPreview: `Descoberto via pipeline automatizado: ${item.title}. Validação taxonômica preliminar concluída.`
  })),
  getTelemetryLogs: (): TelemetryLog[] => TELEMETRY_LOGS.map(log => ({
    ...log,
    source: log.channel
  })),
  getAutomationConfig: (): AutomationConfig => ({
    ...AUTOMATION_SETTINGS,
    geminiModel: 'gemini-2.5-flash',
    confidenceThreshold: AUTOMATION_SETTINGS.minConfidence || 0.85
  }),
  getRadarUpdates: () => RADAR_UPDATES
};

// Bookmarks local storage handling
const BOOKMARKS_KEY = 'geozine_bookmarks_v1';

export const bookmarkStorage = {
  getSavedIds: (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(BOOKMARKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isSaved: (id: string): boolean => {
    const ids = bookmarkStorage.getSavedIds();
    return ids.includes(id);
  },

  toggle: (id: string): boolean => {
    const ids = bookmarkStorage.getSavedIds();
    let updated: string[];
    let isNowSaved = false;

    if (ids.includes(id)) {
      updated = ids.filter(item => item !== id);
      isNowSaved = false;
    } else {
      updated = [id, ...ids];
      isNowSaved = true;
    }

    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('geozine-bookmark-changed', { detail: { id, isNowSaved } }));
    } catch (e) {
      console.error('Error saving bookmark to localStorage', e);
    }

    return isNowSaved;
  },

  getSavedArticles: (): Article[] => {
    const ids = bookmarkStorage.getSavedIds();
    return normalizedArticles.filter(a => ids.includes(a.id));
  }
};
