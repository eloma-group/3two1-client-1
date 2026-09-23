import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './NetworkMap.module.css';

gsap.registerPlugin(ScrollTrigger);

/* City markers: icons sit ON the map at the city; the label is offset to a
   free margin nearby. All coords are in the shared 1200×800 viewBox. */
type Anchor = 'start' | 'middle' | 'end';
type Cat = 'bar' | 'bottle' | 'cafe';
interface Pin {
  name: string;
  cx: number; cy: number;              // icon cluster centre (on the map)
  lx: number; ly: number; anchor: Anchor; // label position (off the map)
  cats: Cat[];
}
const PINS: Pin[] = [
  { name: 'BROOME',     cx: 411, cy: 250, lx: 376,  ly: 254, anchor: 'end',    cats: ['bottle', 'cafe'] },
  { name: 'PERTH',      cx: 333, cy: 471, lx: 298,  ly: 475, anchor: 'end',    cats: ['bar', 'bottle', 'cafe'] },
  { name: 'ADELAIDE',   cx: 597, cy: 524, lx: 562,  ly: 528, anchor: 'end',    cats: ['bar', 'bottle', 'cafe'] },
  { name: 'MELBOURNE',  cx: 660, cy: 599, lx: 660,  ly: 623, anchor: 'middle', cats: ['bar', 'bottle', 'cafe'] },
  { name: 'HOBART',     cx: 676, cy: 646, lx: 676,  ly: 670, anchor: 'middle', cats: ['bar', 'cafe'] },
  { name: 'DARWIN',     cx: 543, cy: 169, lx: 543,  ly: 152, anchor: 'middle', cats: ['bar', 'bottle', 'cafe'] },
  { name: 'BRISBANE',   cx: 734, cy: 402, lx: 769,  ly: 406, anchor: 'start',  cats: ['bar', 'bottle', 'cafe'] },
  { name: 'GOLD COAST', cx: 748, cy: 442, lx: 783,  ly: 446, anchor: 'start',  cats: ['bar', 'bottle', 'cafe'] },
  { name: 'NEWCASTLE',  cx: 753, cy: 483, lx: 788,  ly: 487, anchor: 'start',  cats: ['bar', 'bottle', 'cafe'] },
  { name: 'SYDNEY',     cx: 758, cy: 524, lx: 793,  ly: 528, anchor: 'start',  cats: ['bar', 'bottle', 'cafe'] },
  { name: 'WELLINGTON', cx: 1042, cy: 512, lx: 1077, ly: 516, anchor: 'start', cats: ['bar', 'bottle', 'cafe'] },
  { name: 'AUCKLAND',   cx: 989, cy: 419, lx: 1024, ly: 423, anchor: 'start',  cats: ['bar', 'bottle', 'cafe'] },
  { name: 'FIJI',       cx: 1042, cy: 140, lx: 1077, ly: 144, anchor: 'start',  cats: ['cafe'] },
  { name: 'COOK IS.',   cx: 1140, cy: 146, lx: 1175, ly: 150, anchor: 'start',  cats: ['bottle', 'cafe'] },
  { name: 'VANUATU',    cx: 1082, cy: 92,  lx: 1117, ly: 96,  anchor: 'start',  cats: ['bar', 'cafe'] },
];

/* Channel glyphs (24×24) — same shapes as the site's legend icons. */
function CatGlyph({ cat }: { cat: Cat }) {
  if (cat === 'bar') return <path d="M4 4h16l-7 7.4V18h3.5a1 1 0 1 1 0 2h-9a1 1 0 1 1 0-2H11v-6.6L4 4z" />;
  if (cat === 'bottle') return (
    <>
      <rect x="10.3" y="2" width="3.4" height="2.6" rx="0.6" />
      <path d="M11 4.6h2v3.9c0 .55.24.9.66 1.24 1.05.86 1.64 2.07 1.64 3.35V20a2 2 0 0 1-2 2h-2.6a2 2 0 0 1-2-2v-6.91c0-1.28.59-2.49 1.64-3.35.42-.34.66-.69.66-1.24V4.6z" />
      <rect x="9.4" y="13.2" width="5.2" height="3.4" rx="0.5" opacity="0.55" />
    </>
  );
  return (
    <>
      <path d="M3 7h13v5.5a5.5 5.5 0 0 1-5.5 5.5h-2A5.5 5.5 0 0 1 3 12.5V7z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16 8.5h2.3a3.2 3.2 0 0 1 0 6.4H16v-2h2.3a1.2 1.2 0 0 0 0-2.4H16v-2z" />
      <path d="M2 19.5h15v1.5H2z" />
    </>
  );
}

const ICON = 16; // glyph size in viewBox units
const GAP = 3;

export default function NetworkMap() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    const trackEl = track.current;
    const panelEl = panel.current;
    if (!rootEl || !trackEl || !panelEl) return;

    const map = rootEl.querySelector('[data-map]');
    const pins = Array.from(rootEl.querySelectorAll('[data-pin]')) as SVGGElement[];

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set([map, ...pins], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(map, { opacity: 0, scale: 0.94, transformOrigin: '60% 55%' });
      gsap.set(pins, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: trackEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: panelEl,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      tl.to(map, { opacity: 0.95, scale: 1, duration: 1.4 }, 0)
        .to(pins, { opacity: 1, y: 0, stagger: 0.14, duration: 0.6 }, 0.8);
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrap} id="network-map" ref={root}>
      <div className={styles.track} ref={track}>
        <div className={styles.panel} ref={panel}>
          <div className={styles.pulse} aria-hidden="true" />

          {/* Left text — static, visible for the whole scroll.
              Styling/format mirrors the NetworkEditorial left copy. */}
          <div className={styles.text}>
            <p className={styles.eyebrow}>The 3two1 Network</p>
            <h2 className={styles.heading}>
              <span className={styles.lineClip}><span className={styles.lineNavy}>In every great</span></span>
              <span className={styles.lineClip}><span className={styles.lineCoral}>Bar, Bottle</span></span>
              <span className={styles.lineClip}><span className={styles.lineCoral}>shop and café.</span></span>
            </h2>
            <span className={styles.divider} />
            <p className={styles.para}>
              Seven houses placed by hand across the region — coast to coast, both sides of the
              Tasman, out to the Pacific.
            </p>
            <p className={styles.good}>Good places.<br />Great company.</p>
            <div className={styles.contact}>
              <div className={styles.contactBlock}>
                <span className={styles.contactLabel}>Enquiries</span>
                <a href="mailto:orders@3two1.com.au">orders@3two1.com.au</a>
              </div>
              <div className={styles.contactBlock}>
                <span className={styles.contactLabel}>Trade</span>
                <a href="tel:0420222313">0420 222 313</a>
              </div>
            </div>
          </div>

          {/* Shared SVG canvas — map + pins (animated on scroll) */}
          <svg className={styles.svg} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
            <image
              data-map
              className={styles.mapImg}
              href="/images/au-nz-glow.webp"
              x="210" y="-90" width="960" height="960"
              preserveAspectRatio="xMidYMid meet"
            />
            <g>
              {PINS.map((p) => {
                const n = p.cats.length;
                const rowW = n * ICON + (n - 1) * GAP;
                const startX = p.cx - rowW / 2;
                const iconY = p.cy - ICON / 2;
                return (
                  <g key={p.name} data-pin>
                    {/* channel icons sitting on the map at the city */}
                    <g className={styles.pinIcons}>
                      {p.cats.map((c, i) => (
                        <g key={c} transform={`translate(${startX + i * (ICON + GAP)}, ${iconY}) scale(${ICON / 24})`}>
                          <CatGlyph cat={c} />
                        </g>
                      ))}
                    </g>
                    {/* label in a free margin nearby */}
                    <text className={styles.pinLabel} x={p.lx} y={p.ly} textAnchor={p.anchor}>
                      {p.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          <div className={styles.scroll} aria-hidden="true">
            Scroll to explore <span>↓</span>
          </div>

          {/* Legend card — what the map icons mean */}
          <div className={styles.legend}>
            <span><svg className={styles.legIcon} viewBox="0 0 24 24"><CatGlyph cat="bar" /></svg> Bars</span>
            <span><svg className={styles.legIcon} viewBox="0 0 24 24"><CatGlyph cat="bottle" /></svg> Bottle Shops</span>
            <span><svg className={styles.legIcon} viewBox="0 0 24 24"><CatGlyph cat="cafe" /></svg> Cafés</span>
          </div>
        </div>
      </div>
    </div>
  );
}
