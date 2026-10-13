import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import b from './bento.module.css';

/** Horizontal row that snaps card by card, with previous / next buttons. */
export default function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div>
      <div ref={ref} className={b.carousel} onScroll={measure} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className={b.carouselNav}>
        <button className={b.navBtn} onClick={() => page(-1)} disabled={edge.start} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button className={b.navBtn} onClick={() => page(1)} disabled={edge.end} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
