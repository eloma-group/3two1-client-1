import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type Lenis from 'lenis';
import { scrollToHash } from './useLenis';

/** Sets the tab title, and lands on `#section` links once the page has mounted. */
export function usePageSetup(title: string) {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = `${title} - 3two1 drinks`;
  }, [title]);

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
