import { useEffect, useRef } from 'react';
import { networkStops, networkSvg } from './heroNetworkMarkup';
import { channels } from './heroChannels';
import './HeroNetwork.css';

/* Import → warehouse → venues map in the hero's free right-hand column. */
export default function HeroNetwork() {
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
    <div className="nw-wrap">
      <figure className="nw" aria-labelledby="nwCap" ref={ref}>
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
