import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  params: {}
});

export function useRouter() {
  return useContext(RouterContext);
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  // Support both clean pathname and hash-based fallback if running inside tricky iframe
  const getInitialPath = () => {
    if (typeof window === 'undefined') return '/';
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname || '/';
  };

  const [path, setPath] = useState<string>(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        setPath(window.location.hash.slice(1));
      } else {
        setPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (to: string) => {
    if (to === path) return;
    
    // Update browser history
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      window.location.hash = `#${to}`;
    } else {
      window.history.pushState({}, '', to);
    }
    
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Extract params for common routes
  const params: Record<string, string> = {};
  if (path.startsWith('/categoria/')) {
    params.slug = path.replace('/categoria/', '').split('?')[0].split('/')[0];
  } else if (path.startsWith('/topico/')) {
    params.slug = path.replace('/topico/', '').split('?')[0].split('/')[0];
  } else if (path.startsWith('/noticia/')) {
    params.slug = path.replace('/noticia/', '').split('?')[0].split('/')[0];
  } else if (path.startsWith('/autores/')) {
    params.slug = path.replace('/autores/', '').split('?')[0].split('/')[0];
  } else if (path.startsWith('/fontes/')) {
    params.slug = path.replace('/fontes/', '').split('?')[0].split('/')[0];
  } else if (path.startsWith('/relatorios/')) {
    params.slug = path.replace('/relatorios/', '').split('?')[0].split('/')[0];
  } else if (path.startsWith('/dossies/')) {
    params.slug = path.replace('/dossies/', '').split('?')[0].split('/')[0];
  }

  return (
    <RouterContext.Provider value={{ path, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  children: React.ReactNode;
  key?: React.Key;
  title?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Link({ to, className = '', children, onClick, ...props }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
