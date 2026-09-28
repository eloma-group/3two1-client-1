import { useEffect, useId, useRef } from 'react';
import createGlobe from 'cobe';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './NetworkMap.module.css';

gsap.registerPlugin(ScrollTrigger);

/* City markers: icons sit ON the map at the city; the label is offset to a
   free margin nearby. All coords are in the shared 1200×800 viewBox.

   Positions are derived from each landmass's real lon/lat, fitted to that
   landmass's drawn bounding box in the artwork. The map is a stylised graphic,
   not a single projection — NZ and the Pacific islands are pulled much closer
   to Australia than they really are, and drawn oversized — so mainland,
   Tasmania and NZ each get their own fit rather than one global transform.
   Brisbane/Gold Coast and Newcastle/Sydney sit ~8 and ~14 units apart at true
   scale, closer than one icon row, so each pair is nudged a few units apart to
   stay legible. */
type Anchor = 'start' | 'middle' | 'end';
type Cat = 'bar' | 'bottle' | 'cafe';
interface Pin {
  name: string;
  cx: number; cy: number;              // icon cluster centre (on the flat map)
  lat: number; lng: number;            // real coordinates (used by the globe)
  lx: number; ly: number; anchor: Anchor; // label position (off the map)
  cats: Cat[];
}
const PINS: Pin[] = [
  { name: 'BROOME',     cx: 370,  cy: 229, lx: 335,  ly: 233, lat: -17.955, lng: 122.236, anchor: 'end',    cats: ['bottle', 'cafe'] },
  { name: 'PERTH',      cx: 273,  cy: 441, lx: 238,  ly: 445, lat: -31.953, lng: 115.857, anchor: 'end',    cats: ['bar', 'bottle', 'cafe'] },
  { name: 'ADELAIDE',   cx: 620,  cy: 486, lx: 620,  ly: 510, lat: -34.929, lng: 138.6, anchor: 'middle', cats: ['bar', 'bottle', 'cafe'] },
  { name: 'MELBOURNE',  cx: 717,  cy: 530, lx: 717,  ly: 554, lat: -37.84, lng: 144.946, anchor: 'middle', cats: ['bar', 'bottle', 'cafe'] },
  { name: 'HOBART',     cx: 740,  cy: 615, lx: 740,  ly: 639, lat: -42.881, lng: 147.325, anchor: 'middle', cats: ['bar', 'cafe'] },
  { name: 'DARWIN',     cx: 502,  cy: 146, lx: 502,  ly: 129, lat: -12.463, lng: 130.845, anchor: 'middle', cats: ['bar', 'bottle', 'cafe'] },
  { name: 'BRISBANE',   cx: 841,  cy: 366, lx: 876,  ly: 370, lat: -27.47, lng: 153.025, anchor: 'start',  cats: ['bar', 'bottle', 'cafe'] },
  { name: 'GOLD COAST', cx: 847,  cy: 388, lx: 882,  ly: 392, lat: -28.017, lng: 153.43, anchor: 'start',  cats: ['bar', 'bottle', 'cafe'] },
  { name: 'NEWCASTLE',  cx: 822,  cy: 452, lx: 857,  ly: 456, lat: -32.927, lng: 151.784, anchor: 'start',  cats: ['bar', 'bottle', 'cafe'] },
  { name: 'SYDNEY',     cx: 813,  cy: 474, lx: 848,  ly: 478, lat: -33.868, lng: 151.209, anchor: 'start',  cats: ['bar', 'bottle', 'cafe'] },
  { name: 'WELLINGTON', cx: 1034, cy: 486, lx: 1034, ly: 510, lat: -41.286, lng: 174.776, anchor: 'middle', cats: ['bar', 'bottle', 'cafe'] },
  { name: 'AUCKLAND',   cx: 1034, cy: 372, lx: 1000, ly: 338, lat: -36.848, lng: 174.763, anchor: 'end',    cats: ['bar', 'bottle', 'cafe'] },
  { name: 'FIJI',       cx: 1064, cy: 200, lx: 1099, ly: 204, lat: -18.124, lng: 178.45, anchor: 'start',  cats: ['cafe'] },
  { name: 'COOK IS.',   cx: 1101, cy: 237, lx: 1101, ly: 285, lat: -21.229, lng: -159.776, anchor: 'middle', cats: ['bottle', 'cafe'] },
  { name: 'VANUATU',    cx: 1017, cy: 176, lx: 1017, ly: 157, lat: -17.741, lng: 168.315, anchor: 'middle', cats: ['bar', 'cafe'] },
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

/* ── Globe (cobe) ──────────────────────────────────────────────────────
   cobe draws its markers inside WebGL, so the category icons have to be laid
   over the canvas in DOM. That needs cobe's own projection, which was measured
   against the real renderer rather than guessed: markers were rendered one at a
   time at known coordinates and the transform fitted to where they landed
   (mean residual 0.04px). The result:
     globe radius = 0.425 x canvas size, centred in the canvas,
     theta is used as given, and the effective rotation is phi + PI/2.        */
const GLOBE_R_RATIO = 0.425;
/* Vertical offset of a point on the centre meridian is sin(lat)cos(theta) -
   cos(lat)sin(theta), i.e. zero when theta = lat. The network sits around 30S,
   so this tilt lifts it to the middle of the globe instead of the bottom. */
const GLOBE_THETA = -0.5;
/* phi that centres a longitude: -(lng) - PI/2. 134degE ~ central Australia.
   The globe is parked here rather than spun, so Australia always faces the
   viewer and every pin in the network stays on the near side. */
const GLOBE_PHI = -(134 * Math.PI) / 180 - Math.PI / 2 + 2 * Math.PI;

function projectToGlobe(lat: number, lng: number, phi: number, theta: number, size: number) {
  const a = (lat * Math.PI) / 180;
  const b = (lng * Math.PI) / 180;
  const vx = Math.cos(a) * Math.sin(b);
  const vy = Math.sin(a);
  const vz = Math.cos(a) * Math.cos(b);
  const p = phi + Math.PI / 2;
  const sp = Math.sin(p), cp = Math.cos(p), st = Math.sin(theta), ct = Math.cos(theta);
  const x = vx * cp + vz * sp;
  const y = vx * sp * st + vy * ct - vz * cp * st;
  const z = -vx * sp * ct + vy * st + vz * cp * ct; // > 0 = facing the camera
  const r = size * GLOBE_R_RATIO;
  return { x: size / 2 + x * r, y: size / 2 - y * r, z };
}

const ICON = 16; // glyph size in viewBox units
const GAP = 3;

export default function NetworkMap(
  { anchorId = 'network-map', variant = 'map' }:
  { anchorId?: string; variant?: 'map' | 'globe' } = {},
) {
  /* The section can be rendered more than once, so the anchor and the SVG
     filter id must be unique per instance - two elements sharing an id would
     make every copy resolve url(#...) to the first one. */
  const tintId = `mapTint-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  /* Spin the globe and keep each city's icon row sitting on it. Positions are
     written straight to the DOM every frame - re-rendering 15 pins at 60fps
     through React would be wasteful. GSAP owns the [data-pin] wrapper's own
     opacity/transform for the scroll reveal, so this only ever touches the
     inner element, and positions the wrapper with left/top rather than a
     transform, to avoid fighting it. */
  useEffect(() => {
    if (variant !== 'globe') return;
    const canvasEl = canvas.current;
    const rootEl = root.current;
    if (!canvasEl || !rootEl) return;

    const pinEls = Array.from(rootEl.querySelectorAll<HTMLElement>('[data-globe-pin]'));
    let size = canvasEl.offsetWidth;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let raf = 0;

    /* Drag to spin. `target` is where the drag has asked the globe to be and
       `rot` chases it, so a flick eases out instead of stopping dead. Both are
       offsets from GLOBE_PHI, so letting go leaves the globe where the reader
       put it, and a reload comes back to Australia. */
    let rot = 0;
    let target = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartRot = 0;
    const DRAG_RADIANS_PER_PX = 1 / 200; // matches cobe's own interactive demo

    const place = (p: number) => {
      for (const el of pinEls) {
        const lat = Number(el.dataset.lat), lng = Number(el.dataset.lng);
        const { x, y, z } = projectToGlobe(lat, lng, p, GLOBE_THETA, size);
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        const inner = el.firstElementChild as HTMLElement | null;
        if (inner) {
          // fade out across the limb instead of popping at the horizon
          inner.style.opacity = String(Math.max(0, Math.min(1, z * 6)));
          inner.style.visibility = z > 0.02 ? 'visible' : 'hidden';
        }
      }
    };

    const build = () => {
      globe?.destroy();
      size = canvasEl.offsetWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      globe = createGlobe(canvasEl, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi: GLOBE_PHI + rot,
        theta: GLOBE_THETA,
        dark: 0,
        diffuse: 1.1,
        mapSamples: 15000,
        mapBrightness: 5.6,
        baseColor: [1, 0.6, 0.6],        // #ff9999, matching the flat map
        markerColor: [0.72, 0.12, 0.32],
        glowColor: [1, 0.78, 0.78],
        markers: PINS.map((pin) => ({ location: [pin.lat, pin.lng], size: 0.016 })),
      });
      place(GLOBE_PHI + rot);
    };

    /* cobe 2.x renders on create and on update() only - it has no internal
       animation loop. It also uploads its world texture from an Image.onload
       without redrawing afterwards, so the one create-time draw lands before
       the texture exists and leaves the canvas blank. So the loop runs while
       there is something to show: the texture settling in after a build, a
       drag in progress, or a released drag still easing to a stop. */
    let renderUntil = 0;
    const render = () => {
      rot += (target - rot) * 0.12;
      const p = GLOBE_PHI + rot;
      globe?.update({ phi: p });
      place(p);
      const easing = Math.abs(target - rot) > 0.0002;
      if (!easing) rot = target;
      raf = dragging || easing || performance.now() < renderUntil
        ? requestAnimationFrame(render)
        : 0;
    };
    const kick = (ms = 0) => {
      renderUntil = Math.max(renderUntil, performance.now() + ms);
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragStartX = e.clientX;
      dragStartRot = target;
      canvasEl.setPointerCapture(e.pointerId);
      canvasEl.style.cursor = 'grabbing';
      kick();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      target = dragStartRot + (e.clientX - dragStartX) * DRAG_RADIANS_PER_PX;
      kick();
    };
    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      canvasEl.releasePointerCapture(e.pointerId);
      canvasEl.style.cursor = 'grab';
      kick();
    };
    canvasEl.addEventListener('pointerdown', onPointerDown);
    canvasEl.addEventListener('pointermove', onPointerMove);
    canvasEl.addEventListener('pointerup', endDrag);
    canvasEl.addEventListener('pointercancel', endDrag);

    build();
    kick(1500); // let the world texture land

    const ro = new ResizeObserver(() => { build(); kick(1500); });
    ro.observe(canvasEl);
    return () => {
      cancelAnimationFrame(raf);
      canvasEl.removeEventListener('pointerdown', onPointerDown);
      canvasEl.removeEventListener('pointermove', onPointerMove);
      canvasEl.removeEventListener('pointerup', endDrag);
      canvasEl.removeEventListener('pointercancel', endDrag);
      ro.disconnect();
      globe?.destroy();
    };
  }, [variant]);

  useEffect(() => {
    const rootEl = root.current;
    const trackEl = track.current;
    const panelEl = panel.current;
    if (!rootEl || !trackEl || !panelEl) return;

    const map = rootEl.querySelector('[data-map]'); // svg image or globe wrapper
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
    <div className={styles.wrap} id={anchorId} ref={root}>
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

          {/* Globe variant: cobe canvas, with the same places called out in DOM
              over the top, since cobe's markers live inside WebGL. */}
          {variant === 'globe' ? (
            <div className={styles.globeWrap}>
              <div className={styles.globeStage} data-map>
                <canvas ref={canvas} className={styles.globeCanvas} />
                {PINS.map((pin) => (
                  <div
                    key={pin.name}
                    data-pin
                    data-globe-pin
                    data-lat={pin.lat}
                    data-lng={pin.lng}
                    className={styles.globePin}
                  >
                    <div className={styles.globePinInner} title={pin.name}>
                      <span className={styles.globePinIcons} aria-hidden="true">
                        {pin.cats.map((c) => (
                          <svg key={c} viewBox="0 0 24 24" className={styles.globeIcon}>
                            <CatGlyph cat={c} />
                          </svg>
                        ))}
                      </span>
                      <span className={styles.globePinName}>{pin.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
          /* Shared SVG canvas — map + pins (animated on scroll) */
          <svg className={styles.svg} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* The artwork ships in the deep brand pink (#f83860). Retint it to
                  a lighter #ff9999 without flattening the 3D shading: drop to
                  luminance, then map that luminance onto the target colour, so
                  the extruded side walls stay a darker shade of the same hue.
                  feComposite clips back to the source alpha so the transparent
                  surround doesn't pick up the intercept as a halo. */}
              <filter id={tintId} colorInterpolationFilters="sRGB">
                <feColorMatrix type="saturate" values="0" result="grey" />
                <feComponentTransfer in="grey" result="tinted">
                  <feFuncR type="linear" slope="0.789" intercept="0.684" />
                  <feFuncG type="linear" slope="0.789" intercept="0.284" />
                  <feFuncB type="linear" slope="0.789" intercept="0.284" />
                </feComponentTransfer>
                <feComposite in="tinted" in2="SourceGraphic" operator="in" />
              </filter>
            </defs>
            <image
              data-map
              href="/images/au-nz-glow.webp"
              x="210" y="-90" width="960" height="960"
              preserveAspectRatio="xMidYMid meet"
              style={{ filter: `url(#${tintId})` }}
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
          )}

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
