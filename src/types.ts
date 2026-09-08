export type GeographicRegion = 
  | 'Brasil'
  | 'América Latina'
  | 'América do Norte'
  | 'Europa'
  | 'Ásia'
  | 'África'
  | 'Oceania'
  | 'Global';

export type CategorySlug = 
  | 'geoai'
  | 'gis-cartografia'
  | 'sensoriamento-remoto'
  | 'satelites-newspace'
  | 'drones-lidar'
  | 'gnss-geodesia'
  | 'digital-twins'
  | 'dados-abertos'
  | 'clima-ambiente'
  | 'agro-infra'
  | 'mercado';

export interface AuthorSummary {
  name: string;
  slug: string;
  role: string;
  avatar: string;
  bio?: string;
  type?: 'Redação Geozine' | 'Colaborador' | 'Especialista' | 'Automação editorial';
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string;
  content?: string; // alias to body
  category: CategorySlug;
  categoryName: string;
  tags: string[];
  sourceName: string;
  sourceSlug: string;
  sourceUrl: string;
  sourceType: string;
  originalPublishedAt: string;
  publishedAt: string;
  updatedAt?: string;
  author: AuthorSummary;
  heroImage: string;
  imageAlt: string;
  imageCredit: string;
  imageCaption?: string;
  aiGeneratedImage: boolean;
  country: string;
  region: GeographicRegion;
  latitude: number;
  longitude: number;
  coordinates?: Coordinates;
  readingTime: number; // minutes
  featured?: boolean;
  breaking?: boolean;
  dossier?: boolean;
  reviewStatus: 'Revisão humana' | 'Verificado pela redação' | 'Curadoria editorial assistida por IA';
  relatedArticleIds: string[];
  keyTakeaways: string[];
  references?: { title: string; url: string; note?: string }[];
  viewsCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  ogImageUrl?: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  color: string;
  articleCount: number;
}

export interface Topic {
  slug: string;
  name: string;
  description: string;
  categorySlug: CategorySlug;
  articleCount: number;
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  type: 'Redação Geozine' | 'Colaborador' | 'Especialista' | 'Automação editorial';
  bio: string;
  avatar: string;
  expertise: string[];
  articlesCount: number;
  articleCount?: number;
  email?: string;
  twitter?: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export interface Source {
  id?: string;
  slug: string;
  name: string;
  domain: string;
  url: string;
  country: string;
  sourceType: string;
  category: string;
  description: string;
  status: 'Ativa' | 'Pausada' | 'Erro';
  active?: boolean;
  reliabilityScore?: number;
  ingestionProtocol?: string;
  lastChecked: string;
  frequency: string;
  articlesCount: number;
}

export interface Report {
  id: string;
  slug: string;
  title: string;
  type: 'Relatório mensal' | 'Panorama de mercado' | 'Dossiê temático' | 'Especial técnico';
  date: string;
  publishedAt?: string;
  categoryName?: string;
  pages: number;
  pagesCount?: number;
  fileSize: string;
  description: string;
  coverImage: string;
  topics: string[];
  highlights?: string[];
}

export interface DossierChapter {
  title: string;
  summary: string;
  description?: string;
  readTime?: string;
}

export interface Dossier {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  description?: string;
  categoryName?: string;
  chaptersCount?: number;
  coverImage: string;
  publishedAt: string;
  author: string;
  readingTime: number;
  articleSlug: string;
  chapters: DossierChapter[];
}

export interface IngestionItem {
  id: string;
  title: string;
  rawTitle?: string;
  source: string;
  sourceName?: string;
  url: string;
  discoveredAt: string;
  ingestedAt?: string;
  stage: 'Descoberta' | 'Validando' | 'Duplicata' | 'Selecionada' | 'Gerando matéria' | 'Aguardando publicação' | 'Publicada' | 'Erro';
  status?: string;
  confidence: number;
  confidenceScore?: number;
  category: string;
  suggestedCategory?: string;
  summaryPreview?: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  channel: 'RSS_FETCH' | 'DEDUPLICATION' | 'SOURCE_VERIFY' | 'ARTICLE_PIPELINE' | 'GEO_LOCATOR' | 'SYSTEM';
  level: 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR';
  source?: string;
  message: string;
}

export interface AutomationConfig {
  schedule: string;
  sourceGroups: string[];
  categoriesEnabled: string[];
  minConfidence: number;
  autoPublish: boolean;
  aiImageGen: boolean;
  requireAdditionalSource: boolean;
  maxDailyPublish: number;
  geminiModel?: string;
  confidenceThreshold?: number;
}
