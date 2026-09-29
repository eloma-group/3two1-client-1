import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type Lenis from 'lenis';

/**
 * Routed pages should open at the top. Lenis keeps its own scroll position, so
 * a plain window.scrollTo would be overwritten on its next frame — tell Lenis
 * instead when it is running.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
