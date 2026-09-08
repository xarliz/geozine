import React from 'react';
import { RouterProvider, useRouter } from './router';
import { Header } from './components/Header';
import { RadarStrip } from './components/RadarStrip';
import { Footer } from './components/Footer';
import { SeoManager } from './components/SeoManager';
import { AdminAuthGate } from './components/AdminAuthGate';
import { useRemoteContent } from './data/remoteContent';
import { isAdminHostname } from './lib/supabase';

// Public Pages
import { HomePage } from './pages/HomePage';
import { LatestNewsPage } from './pages/LatestNewsPage';
import { CategoryPage } from './pages/CategoryPage';
import { TopicPage } from './pages/TopicPage';
import { ArticlePage } from './pages/ArticlePage';
import { SearchPage } from './pages/SearchPage';
import { MapPage } from './pages/MapPage';
import { SavedArticlesPage } from './pages/SavedArticlesPage';
import { DossiersPage } from './pages/DossiersPage';
import { ReportsPage } from './pages/ReportsPage';
import { AuthorPage } from './pages/AuthorPage';
import { SourcePage } from './pages/SourcePage';
import { NewsletterPage } from './pages/NewsletterPage';
import { RssPage } from './pages/RssPage';
import { 
  AboutPage, 
  MethodologyPage, 
  TransparencyPage, 
  ContactPage, 
  PrivacyPage, 
  TermsPage, 
  CookiesPage, 
  NotFoundPage 
} from './pages/StaticPages';

// Admin Prototype Pages
import { 
  AdminOverview, 
  AdminSources, 
  AdminQueue, 
  AdminArticles, 
  AdminAutomation, 
  AdminLogs,
  AdminUsers,
  AdminCategories,
  AdminSeoPages,
} from './pages/AdminPages';

function AppContent() {
  const { path } = useRouter();
  useRemoteContent();

  const adminHost = isAdminHostname();
  const adminPath = adminHost && path === '/' ? '/admin' : path;

  // Admin Routes (isolated layout)
  if (adminPath.startsWith('/admin')) {
    let AdminPage = AdminOverview;
    if (adminPath === '/admin/fontes') AdminPage = AdminSources;
    else if (adminPath === '/admin/fila') AdminPage = AdminQueue;
    else if (adminPath === '/admin/noticias') AdminPage = AdminArticles;
    else if (adminPath === '/admin/automacao') AdminPage = AdminAutomation;
    else if (adminPath === '/admin/usuarios') AdminPage = AdminUsers;
    else if (adminPath === '/admin/categorias') AdminPage = AdminCategories;
    else if (adminPath === '/admin/paginas-seo') AdminPage = AdminSeoPages;
    else if (adminPath === '/admin/logs') AdminPage = AdminLogs;
    return <AdminAuthGate><AdminPage /></AdminAuthGate>;
  }

  // Public Layout Routes
  let PageComponent = NotFoundPage;

  if (path === '/') {
    PageComponent = HomePage;
  } else if (path === '/ultimas') {
    PageComponent = LatestNewsPage;
  } else if (path.startsWith('/categoria/')) {
    PageComponent = CategoryPage;
  } else if (path.startsWith('/topico/')) {
    PageComponent = TopicPage;
  } else if (path.startsWith('/noticia/')) {
    PageComponent = ArticlePage;
  } else if (path.startsWith('/busca')) {
    PageComponent = SearchPage;
  } else if (path === '/mapa') {
    PageComponent = MapPage;
  } else if (path === '/salvos') {
    PageComponent = SavedArticlesPage;
  } else if (path === '/dossies' || path.startsWith('/dossies/')) {
    PageComponent = DossiersPage;
  } else if (path === '/relatorios' || path.startsWith('/relatorios/')) {
    PageComponent = ReportsPage;
  } else if (path.startsWith('/autores/')) {
    PageComponent = AuthorPage;
  } else if (path.startsWith('/fontes/')) {
    PageComponent = SourcePage;
  } else if (path === '/boletim') {
    PageComponent = NewsletterPage;
  } else if (path === '/rss') {
    PageComponent = RssPage;
  } else if (path === '/sobre') {
    PageComponent = AboutPage;
  } else if (path === '/metodologia-editorial') {
    PageComponent = MethodologyPage;
  } else if (path === '/fontes-e-transparencia') {
    PageComponent = TransparencyPage;
  } else if (path === '/contato') {
    PageComponent = ContactPage;
  } else if (path === '/privacidade') {
    PageComponent = PrivacyPage;
  } else if (path === '/termos') {
    PageComponent = TermsPage;
  } else if (path === '/cookies') {
    PageComponent = CookiesPage;
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <SeoManager />
      {/* Editorial Header */}
      <Header />

      {/* Breaking Radar Strip */}
      <RadarStrip />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8">
        <PageComponent />
      </main>

      {/* Full Brand & Institutional Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
