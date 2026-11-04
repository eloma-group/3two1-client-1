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

/* ---------------- Adaptive tint ----------------
   iOS glass flips between a light and a dark material depending on what is
   behind it, so its text stays readable over a black photo as well as a white
   page. This samples the page under a few points of the surface: the pixels of
   an <img>, <video> or background-image there, or else a solid background
   colour, and reports which material reads better. */
export type Tone = 'light' | 'dark';

const SAMPLE = 48;
type Pixels = { data: ImageData; w: number; h: number };
const imgCache = new Map<string, Pixels | null>();
const pending = new Set<string>();

function luma(r: number, g: number, b: number) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function parseColor(c: string): [number, number, number, number] | null {
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
  return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
}

/** Downscaled pixels of an image, loaded once per URL (same-origin only). */
function pixels(src: string): Pixels | null | undefined {
  if (imgCache.has(src)) return imgCache.get(src);
  if (!pending.has(src)) {
    pending.add(src);
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => {
      try {
        const cv = document.createElement('canvas');
        cv.width = cv.height = SAMPLE;
        const cx = cv.getContext('2d', { willReadFrequently: true })!;
        cx.drawImage(im, 0, 0, SAMPLE, SAMPLE);
        imgCache.set(src, { data: cx.getImageData(0, 0, SAMPLE, SAMPLE), w: im.naturalWidth, h: im.naturalHeight });
      } catch {
        imgCache.set(src, null);
      }
    };
    im.onerror = () => imgCache.set(src, null);
    im.src = src;
  }
  return undefined;
}

function pctPos(v: string, free: number) {
  if (v.endsWith('%')) return (parseFloat(v) / 100) * free;
  if (v === 'left' || v === 'top') return 0;
  if (v === 'right' || v === 'bottom') return free;
  if (v === 'center') return free / 2;
  return parseFloat(v) || 0;
}

/** Luminance of an image at a viewport point, honouring object-fit/position. */
function imageLumaAt(src: string, box: DOMRect, x: number, y: number, fit: string, pos: string) {
  const px = pixels(src);
  if (!px || !px.w || !px.h) return null;
  const nw = px.w;
  const nh = px.h;
  let u = (x - box.left) / box.width;
  let v = (y - box.top) / box.height;
  if (fit === 'cover' || fit === 'contain') {
    const s = fit === 'cover' ? Math.max(box.width / nw, box.height / nh) : Math.min(box.width / nw, box.height / nh);
    const dw = nw * s;
    const dh = nh * s;
    const [posX = '50%', posY = '50%'] = pos.split(' ');
    const ox = pctPos(posX, box.width - dw);
    const oy = pctPos(posY, box.height - dh);
    u = (x - box.left - ox) / dw;
    v = (y - box.top - oy) / dh;
    if (u < 0 || u > 1 || v < 0 || v > 1) return null;
  }
  const i = (Math.min(SAMPLE - 1, Math.max(0, Math.floor(v * SAMPLE))) * SAMPLE + Math.min(SAMPLE - 1, Math.max(0, Math.floor(u * SAMPLE)))) * 4;
  const d = px.data.data;
  return luma(d[i], d[i + 1], d[i + 2]);
}

const frame = typeof document !== 'undefined' ? document.createElement('canvas') : null;

function lumaAt(x: number, y: number, skip: Element): number | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (skip.contains(el) || el.closest('[data-glass-ignore]')) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.3) continue;
    const box = el.getBoundingClientRect();

    if (el instanceof HTMLImageElement && el.complete && el.currentSrc) {
      const l = imageLumaAt(el.currentSrc, box, x, y, cs.objectFit, cs.objectPosition);
      if (l !== null) return l;
      continue;
    }
    if (el instanceof HTMLVideoElement && el.readyState >= 2 && frame) {
      try {
        frame.width = frame.height = 8;
        const cx = frame.getContext('2d', { willReadFrequently: true })!;
        cx.drawImage(el, 0, 0, 8, 8);
        const d = cx.getImageData(0, 0, 8, 8).data;
        let s = 0;
        for (let i = 0; i < d.length; i += 4) s += luma(d[i], d[i + 1], d[i + 2]);
        return s / 64;
      } catch {
        continue;
      }
    }
    const url = cs.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (url) {
      const l = imageLumaAt(new URL(url[1], location.href).href, box, x, y, cs.backgroundSize === 'contain' ? 'contain' : cs.backgroundSize === 'cover' ? 'cover' : 'fill', cs.backgroundPosition);
      if (l !== null) return l;
    }
    const c = parseColor(cs.backgroundColor);
    if (c && c[3] >= 0.6) return luma(c[0], c[1], c[2]);
  }
  return null;
}

/** Which glass material reads best over what is currently behind `ref`. */
export function useBackdropTone(ref: RefObject<HTMLElement | null>): Tone | null {
  const [tone, setTone] = useState<Tone | null>(null);

  useLayoutEffect(() => {
    let raf = 0;
    const probe = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      if (!b.width) return;
      const y = b.top + b.height / 2;
      const ls: number[] = [];
      for (const f of [0.08, 0.3, 0.5, 0.7, 0.92]) {
        const l = lumaAt(b.left + b.width * f, y, el);
        if (l !== null) ls.push(l);
      }
      if (!ls.length) return;
      const avg = ls.reduce((a, c) => a + c, 0) / ls.length;
      // A little hysteresis so mid-grey backdrops don't make it flicker.
      setTone((t) => (avg < 0.42 ? 'dark' : avg > 0.55 ? 'light' : t ?? (avg < 0.5 ? 'dark' : 'light')));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(probe); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // Carousels, videos and late-loading images change without a scroll.
    const tick = setInterval(schedule, 700);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(tick);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref]);

  return tone;
}
