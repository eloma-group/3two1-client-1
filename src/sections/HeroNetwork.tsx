import { useEffect, useRef, type CSSProperties } from 'react';
import { networkStops, networkSvg } from './heroNetworkMarkup';
import { channels } from './heroChannels';
import './HeroNetwork.css';

/** Where the hero places the map: left/top in hero pixels, its width, and how
    far the caption lifts above the map to meet the eyebrow. */
export interface NetworkFit { x: number; y: number; w: number; lift: number }

/* Import → warehouse → venues map in the hero's free right-hand column. Until
   the hero has measured its copy (`fit`), the map centres in the column. */
export default function HeroNetwork({ fit }: { fit?: NetworkFit | null }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const svg = ref.current?.querySelector<SVGSVGElement>('.nw-art svg');
    if (!svg) return;
    /* Reduced motion: hold a frame with the vans mid-route */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      svg.pauseAnimations();
      svg.setCurrentTime(3.3);
      return;
    }
    /* Off-screen: stop the SMIL clock */
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`nw-wrap${fit ? ' nw-fit' : ''}`}>
      <figure
        className="nw"
        aria-labelledby="nwCap"
        ref={ref}
        style={fit ? ({ position: 'absolute', left: fit.x, top: fit.y, width: fit.w, maxWidth: 'none', '--nw-cap-lift': `${fit.lift}px` } as CSSProperties) : undefined}
      >
        <div className="nw-art" dangerouslySetInnerHTML={{ __html: networkSvg }} />
        <figcaption id="nwCap">From import to every venue</figcaption>
        <div dangerouslySetInnerHTML={{ __html: networkStops }} />
        {/* The four van routes end on these cards (route ends at x 36.3/212.1/387.9/563.7 of 600) */}
        <ul className="nw-venues">
          {channels.map(({ icon: Icon, title, sub }) => (
            <li key={title}>
              <span className="nw-venue-icon"><Icon /></span>
              <span className="nw-venue-text">
                <strong>{title}</strong>
                <span>{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
