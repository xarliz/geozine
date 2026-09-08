import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../router';
import { Logo } from './Logo';
import { MegaMenu } from './MegaMenu';
import { SearchCommand } from './SearchCommand';
import { MobileNavigation } from './MobileNavigation';
import { bookmarkStorage } from '../data/repository';
import { 
  Search, 
  Bookmark, 
  Mail, 
  Menu, 
  ChevronDown, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';

export function Header() {
  const { path } = useRouter();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  // Sync saved count
  useEffect(() => {
    const updateCount = () => {
      setSavedCount(bookmarkStorage.getSavedIds().length);
    };
    updateCount();

    const handleBookmarkChange = () => updateCount();
    const handleOpenSearch = () => setIsSearchOpen(true);

    window.addEventListener('geozine-bookmark-changed', handleBookmarkChange);
    window.addEventListener('geozine-open-search', handleOpenSearch);

    return () => {
      window.removeEventListener('geozine-bookmark-changed', handleBookmarkChange);
      window.removeEventListener('geozine-open-search', handleOpenSearch);
    };
  }, []);

  // Close mega menu on route change or ESC
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileNavOpen(false);
  }, [path]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Destaques', to: '/' },
    { label: 'Últimas', to: '/ultimas' },
    { label: 'GeoAI', to: '/categoria/geoai' },
    { label: 'Satélites', to: '/categoria/satelites-newspace' },
    { label: 'Drones & LiDAR', to: '/categoria/drones-lidar' },
    { label: 'GIS & Mapas', to: '/categoria/gis-cartografia' },
    { label: 'Mapa', to: '/mapa', isHighlight: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#07090e]/95 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Logo size="md" showTagline={true} />

            {/* Desktop Primary Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = path === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60'
                        : link.isHighlight
                        ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 flex items-center gap-1.5'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {link.isHighlight && <MapPin className="w-3.5 h-3.5" />}
                    {link.label}
                  </Link>
                );
              })}

              {/* Áreas MegaMenu trigger */}
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  isMegaMenuOpen
                    ? 'bg-slate-800 text-cyan-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
                aria-expanded={isMegaMenuOpen}
              >
                <span>Áreas</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMegaMenuOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
            </nav>

            {/* Utility Actions */}
            <div className="flex items-center gap-2">
              {/* Search button with Cmd+K hint */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-all text-xs"
                title="Buscar notícias (Ctrl+K ou Cmd+K)"
                aria-label="Abrir busca"
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span className="hidden md:inline font-sans">Buscar...</span>
                <kbd className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 border border-slate-700 rounded text-slate-400">
                  ⌘K
                </kbd>
              </button>

              {/* Bookmarks */}
              <Link
                to="/salvos"
                className={`relative p-2 rounded-lg transition-colors border ${
                  path === '/salvos'
                    ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60'
                    : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-cyan-400'
                }`}
                title="Notícias Salvas"
                aria-label="Notícias salvas"
              >
                <Bookmark className="w-4 h-4" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-mono font-bold leading-tight">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Newsletter CTA Button */}
              <Link
                to="/boletim"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-950/40"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Boletim</span>
              </Link>

              {/* Mobile Hamburger Menu */}
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* MegaMenu Dropdown */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </header>

      {/* Global Search Command Modal */}
      <SearchCommand isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        savedCount={savedCount}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
