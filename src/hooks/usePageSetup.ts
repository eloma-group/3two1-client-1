import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type Lenis from 'lenis';
import { scrollToHash } from './useLenis';
import { useSeo, type Seo } from './useSeo';

/** Sets the page's head tags, and lands on `#section` links once the page has mounted. */
export function usePageSetup(seo: Seo) {
  const { hash } = useLocation();
  useSeo(seo);

  useEffect(() => {
    if (!hash) return;
    // ScrollToTop resets to the top on arrival, so scroll once that has run.
    // Lenis caches the page height and clamps to it, so let it re-measure the
    // freshly mounted page first, or deep sections fall short.
    const t = setTimeout(() => {
      (window as unknown as { lenis?: Lenis }).lenis?.resize();
      scrollToHash(hash);
    }, 160);
    return () => clearTimeout(t);
  }, [hash]);
}
