import { useEffect } from 'react';

/** When the splash starts fading out (see the #splash styles in index.html). */
const OUT_AT = 6000;

/**
 * The splash itself is plain HTML and CSS in index.html, so it is on screen at
 * the first paint and plays on every full page load / refresh. This hands over
 * to the page: `onDone` fires the instant the fade out begins, so the hero is
 * already rising as the splash crossfades away, and the splash is removed once
 * it has fully faded.
 */
export default function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const el = document.getElementById('splash');
    const finish = () => {
      el?.remove();
      delete document.documentElement.dataset.splash;
    };

    // Reduced motion: no splash (index.html hides it), just the same short hold
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => { onDone(); finish(); }, 900);
      return () => clearTimeout(t);
    }

    const out = el?.getAnimations().find((a) => (a as CSSAnimation).animationName === 'sp-out');
    if (!out) {
      onDone();
      finish();
      return;
    }
    // The script can arrive late on a slow phone: start the page from wherever
    // the splash has got to rather than from the top of its timeline.
    const t = setTimeout(onDone, Math.max(0, OUT_AT - Number(out.currentTime ?? 0)));
    out.finished.then(finish, () => {});
    return () => clearTimeout(t);
  }, [onDone]);

  return null;
}
