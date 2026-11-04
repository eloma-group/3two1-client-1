import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';

/* iOS 26-style "Liquid Glass": the backdrop bends like a lens around the edges
   of a glass surface. That needs an SVG displacement filter in backdrop-filter,
   which only Chromium renders; Safari and Firefox keep the plain frosted blur
   the CSS already gives every glass surface. */
const SUPPORTED =
  typeof navigator !== 'undefined' &&
  !!(navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } })
    .userAgentData?.brands?.some((b) => /Chromium/.test(b.brand));

/** Displacement map sized to the surface: neutral grey in the middle, red/green
    ramps toward the edges, so only the rim refracts. */
function mapUri(w: number, h: number, r: number) {
  const edge = Math.min(Math.max(6, Math.min(w, h) * 0.22), 18);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>` +
    `<defs>` +
    `<linearGradient id='x' x1='0' x2='1'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#f00'/></linearGradient>` +
    `<linearGradient id='y' x1='0' x2='0' y1='0' y2='1'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#0f0'/></linearGradient>` +
    `<filter id='b'><feGaussianBlur stdDeviation='${edge / 2}'/></filter>` +
    `</defs>` +
    `<rect width='${w}' height='${h}' fill='url(#x)'/>` +
    `<rect width='${w}' height='${h}' fill='url(#y)' style='mix-blend-mode:screen'/>` +
    `<rect x='${edge}' y='${edge}' width='${Math.max(w - edge * 2, 1)}' height='${Math.max(h - edge * 2, 1)}' rx='${Math.max(r - edge, 0)}' fill='#808000' filter='url(#b)'/>` +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Attach to a glass surface: returns the ref, a style carrying `--lg` (the
    filter reference the CSS uses in place of its plain blur), and the filter
    itself. Chromium drops other functions listed beside a url() backdrop
    filter, so the blur and saturation live inside the SVG filter too. */
export function useLiquidGlass<T extends HTMLElement>(strength = 1, blur = 10) {
  const ref = useRef<T>(null) as RefObject<T>;
  const id = `lg${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [size, setSize] = useState<{ w: number; h: number; r: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!SUPPORTED || !el) return;
    const measure = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (!w || !h) return;
      const r = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2);
      setSize((s) => (s && s.w === w && s.h === h && s.r === r ? s : { w, h, r }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const style = size ? ({ '--lg': `url(#${id})` } as CSSProperties) : undefined;
  const filter = size ? (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <filter
        id={id}
        x="0"
        y="0"
        width={size.w}
        height={size.h}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
        <feColorMatrix in="blur" type="saturate" values="1.9" result="glass" />
        <feImage href={mapUri(size.w, size.h, size.r)} x="0" y="0" width={size.w} height={size.h} preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="glass" in2="map" scale={-Math.min(Math.min(size.w, size.h) * 0.35, 28) * strength} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  ) : null;

  return { ref, style, filter };
}

/** Pointer-follow highlight: sets --mx/--my on the surface for the CSS sheen. */
export function trackSheen(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
  el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
}
