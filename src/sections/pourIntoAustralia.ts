/* "Pour into Australia" - a coral stream drips from the bottom edge of the hero
   (under "Scroll To Explore"), falls onto the top coast of Australia, then floods
   the map with a dripping liquid front. Fully scroll-scrubbed, so it reverses on
   the way back up. The map artwork itself is untouched: the original image is
   left as a faint "empty vessel" and a masked copy of it is revealed on top. */
import { useEffect, type RefObject } from 'react';

const NS = 'http://www.w3.org/2000/svg';
// Top edge of the Australian mainland, in map-SVG units [x, y] (from au-nz-glow.webp alpha).
const AU_TOP: [number, number][] = [[230,379],[235,347],[240,324],[245,322],[250,326],[255,320],[260,318],[265,312],[270,306],[275,304],[280,304],[285,304],[290,301],[295,298],[300,297],[305,296],[310,291],[315,289],[320,288],[325,286],[330,283],[335,279],[340,271],[345,263],[350,242],[355,236],[360,234],[365,238],[370,226],[375,227],[380,212],[385,208],[390,204],[395,203],[400,194],[405,194],[410,188],[415,186],[420,188],[425,191],[430,194],[435,207],[440,201],[445,202],[450,199],[455,186],[460,150],[465,149],[470,147],[475,146],[480,149],[485,160],[490,139],[495,138],[500,140],[505,141],[510,144],[515,144],[520,149],[525,150],[530,151],[535,149],[540,149],[545,153],[550,151],[555,148],[560,136],[565,132],[570,132],[575,179],[580,219],[585,221],[590,222],[595,222],[600,222],[605,223],[610,227],[615,239],[620,241],[625,240],[630,238],[635,231],[640,224],[645,164],[650,154],[655,132],[660,122],[665,119],[670,121],[675,131],[680,139],[685,146],[690,166],[695,181],[700,178],[705,176],[710,179],[715,184],[720,189],[725,213],[730,216],[735,219],[740,238],[745,242],[750,261],[755,264],[760,264],[765,264],[770,268],[775,272],[780,273],[785,284],[790,292],[795,295],[800,312],[805,310],[810,311],[815,320],[820,324],[825,328],[830,340],[835,344],[840,350],[845,334],[850,334],[855,339],[860,342]];

// Drip tendrils: [angle offset across the front, length factor, phase]
export const POUR_DRIPS: [number, number, number][] = [[-.85, .9, 0], [-.6, 1.4, 1.3], [-.38, .7, 2.1], [-.15, 1.2, .6], [.05, .8, 2.8],
  [.27, 1.5, 1.9], [.48, .75, .4], [.7, 1.25, 3.3], [.9, .85, 1.1]];

/* When the flood runs, in viewport heights of scroll past the top of the map
   section. NetworkMap reveals the city pins only once the map is full. */
export const POUR_FILL_START = 0.06;
export const POUR_FILL_LENGTH = 1.15;

// Opacity of the original map while it waits to be filled, and once it is full.
const GHOST = 0.14;
const FULL = 0.95;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeIn = (t: number) => t * t;
const easeInOut = (t: number) => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const topAt = (x: number) => {
  let best = AU_TOP[0];
  for (const p of AU_TOP) if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p;
  return best[1];
};
const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, parent?: Element) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  parent?.appendChild(n);
  return n;
};

export interface PourRefs {
  root: RefObject<HTMLElement | null>;
  svg: RefObject<SVGSVGElement | null>;
  /** The original map image - dimmed to a ghost until the pour has filled it. */
  map: RefObject<SVGImageElement | null>;
  /** The masked copy of the map that the liquid reveals. */
  fill: RefObject<SVGImageElement | null>;
  maskBlob: RefObject<SVGPathElement | null>;
  maskDrips: RefObject<(SVGRectElement | null)[]>;
}

export function usePourIntoAustralia(enabled: boolean, refs: PourRefs) {
  useEffect(() => {
    const rootEl = refs.root.current;
    const svgEl = refs.svg.current;
    const mapEl = refs.map.current;
    const fillEl = refs.fill.current;
    const blob = refs.maskBlob.current;
    const dripEls = refs.maskDrips.current;
    if (!enabled || !rootEl || !svgEl || !mapEl || !fillEl || !blob) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ---------- fixed overlay for the falling stream ---------- */
    const gid = Math.random().toString(36).slice(2, 7);
    const overlay = el('svg', { 'aria-hidden': 'true' });
    overlay.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:850;overflow:visible';
    const odefs = el('defs', {}, overlay);
    const grad = el('linearGradient', { id: 'pourGrad' + gid, x1: '0', y1: '0', x2: '0', y2: '1' }, odefs);
    [['0', '#b41f52'], ['.45', '#e8446f'], ['1', '#f2797f']].forEach(([o, c]) =>
      el('stop', { offset: o, 'stop-color': c }, grad));
    const gloss = el('linearGradient', { id: 'pourGloss' + gid, x1: '0', y1: '0', x2: '1', y2: '0' }, odefs);
    [['0', '#fff', '0'], ['.28', '#fff', '.55'], ['.5', '#fff', '0']].forEach(([o, c, a]) =>
      el('stop', { offset: o, 'stop-color': c, 'stop-opacity': a }, gloss));
    const streamG = el('g', {}, overlay);
    const ripples = [0, 1, 2].map(() => el('ellipse', { fill: 'none', stroke: '#e8446f', 'stroke-width': '1.6' }, overlay));
    const body = el('path', { fill: `url(#pourGrad${gid})` }, streamG);
    const shine = el('path', { fill: `url(#pourGloss${gid})` }, streamG);
    const bulb = el('circle', { fill: '#ee5f7c' }, streamG);
    const bulbHi = el('circle', { fill: '#fff', 'fill-opacity': '.55' }, streamG);
    const drops = [0, 1, 2, 3].map(() => el('circle', { fill: '#e8446f' }, overlay));
    document.body.appendChild(overlay);

    const setMap = (ghost: number, filling: boolean) => {
      mapEl.style.opacity = String(ghost);
      fillEl.style.display = filling ? '' : 'none';
    };
    setMap(GHOST, true);

    const sm = { drop: 0, fill: 0, end: 0 }; // smoothed (scrub-like) values
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const t = now / 1000;
      const hero = document.getElementById('top');
      const cue = hero?.querySelector('[data-scroll-cue]');
      const H = innerHeight, s = scrollY;
      const M = rootEl.getBoundingClientRect().top + s; // page Y of the map section

      // Target scroll positions (drip only starts once the first screen is scrolling away)
      const drop = clamp((s - .3 * H) / (M + POUR_FILL_START * H - .3 * H));
      const fill = clamp((s - (M + POUR_FILL_START * H)) / (POUR_FILL_LENGTH * H));
      const end = clamp((s - (M + 1.05 * H)) / (.4 * H));
      sm.drop = lerp(sm.drop, drop, .14); sm.fill = lerp(sm.fill, fill, .12); sm.end = lerp(sm.end, end, .14);
      if (Math.abs(sm.drop - drop) < 1e-4) sm.drop = drop;
      if (Math.abs(sm.fill - fill) < 1e-4) sm.fill = fill;
      if (Math.abs(sm.end - end) < 1e-3) sm.end = end;

      /* ---- liquid flooding the map (mask in map units) ---- */
      const f = sm.fill;
      // Once full, hand back to the original image so nothing outside the blob is lost.
      if (f >= .999) setMap(FULL, false);
      else setMap(GHOST, true);

      if (!hero || s > M + 2.2 * H) { overlay.style.display = 'none'; return; }
      overlay.style.display = '';

      // Start point: the bottom edge of the first screen, below "Scroll To Explore"
      const mobile = innerWidth <= 860;
      const hr = hero.getBoundingClientRect();
      const cr = cue ? cue.getBoundingClientRect() : null;
      const cueX = cr && cr.width > 0 && !mobile ? cr.left + cr.width / 2 : null;
      const y0 = Math.max(hr.bottom, -40);

      // Impact point: top coast of Australia directly below the cue
      const ctm = svgEl.getScreenCTM();
      if (!ctm) return;
      const inv = ctm.inverse();
      let ix = new DOMPoint(cueX == null ? innerWidth / 2 : cueX, 0).matrixTransform(inv).x;
      ix = clamp(ix, 470, 690);
      const iy = topAt(ix) + 8;
      const ip = new DOMPoint(ix, iy).matrixTransform(ctm);
      const x1 = ip.x, y1 = ip.y, unit = ctm.a; // px per map unit
      // straight vertical pour on mobile, or once the hero edge scrolls off the top
      const x0 = cueX == null ? x1 : lerp(x1, cueX, clamp(hr.bottom / (.35 * H)));

      /* ---- stream ---- */
      const dist = Math.max(1, y1 - y0);
      const bez = (u: number) => {
        const c1y = y0 + dist * .55, c2y = y1 - dist * .45, k = 1 - u;
        return {
          x: k * k * k * x0 + 3 * k * k * u * x0 + 3 * k * u * u * x1 + u * u * u * x1,
          y: k * k * k * y0 + 3 * k * k * u * c1y + 3 * k * u * u * c2y + u * u * u * y1,
        };
      };
      const minLen = clamp(18 / dist, 0, 1);
      const hang = 1 + .25 * Math.sin(t * 2.2);
      const uHead = Math.max(minLen * hang, easeIn(sm.drop));     // tip travels down
      const uTail = easeInOut(sm.end);                           // tail lets go once map is full
      const landed = sm.drop > .995;
      const W = clamp(unit * 9, 6, 11);                          // stream thickness
      const visible = hr.bottom < H + 30 && uHead - uTail > .002 && sm.end < .999;
      streamG.style.display = visible ? '' : 'none';
      if (visible) {
        const N = 48, L: number[][] = [], R: number[][] = [], S: number[][] = [];
        for (let i = 0; i <= N; i++) {
          const u = lerp(uTail, uHead, i / N);
          const p = bez(u), q = bez(Math.min(1, u + .01)), r = bez(Math.max(0, u - .01));
          let dx = q.x - r.x, dy = q.y - r.y; const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
          const along = i / N;
          const taper = uTail > 0 ? clamp(along * 6) : (.35 + .65 * clamp(along * 3));
          const wob = 1 + .12 * Math.sin(u * dist * .045 - t * 9) + .06 * Math.sin(u * dist * .11 + t * 5);
          const w = W * .5 * taper * wob * (landed ? 1 : lerp(1, .8, along));
          L.push([p.x - dy * w, p.y + dx * w]); R.push([p.x + dy * w, p.y - dx * w]);
          S.push([p.x - dy * w * .55, p.y + dx * w * .55, p.x - dy * w * .1, p.y + dx * w * .1]);
        }
        const pts = (a: number[][]) => a.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
        body.setAttribute('d', 'M' + pts(L) + ' L' + pts(R.reverse()) + 'Z');
        shine.setAttribute('d', 'M' + S.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + ' L' +
          S.reverse().map((p) => p[2].toFixed(1) + ',' + p[3].toFixed(1)).join(' L') + 'Z');
        const tip = bez(uHead);
        const br = landed ? 0 : W * .62 * (sm.drop < .02 ? hang : 1.1);
        bulb.setAttribute('cx', String(tip.x)); bulb.setAttribute('cy', String(tip.y)); bulb.setAttribute('r', String(br));
        bulbHi.setAttribute('cx', String(tip.x - br * .35)); bulbHi.setAttribute('cy', String(tip.y - br * .3)); bulbHi.setAttribute('r', String(br * .28));
      }

      /* ---- splash ripples + spray at the impact point ---- */
      const splashing = landed && visible && sm.end < .98;
      ripples.forEach((rp, i) => {
        if (!splashing) { rp.style.opacity = '0'; return; }
        const ph = (t * .9 + i / 3) % 1;
        rp.setAttribute('cx', String(x1)); rp.setAttribute('cy', String(y1 + 2));
        rp.setAttribute('rx', String(W * (1 + ph * 4.5))); rp.setAttribute('ry', String(W * (.35 + ph * 1.4)));
        rp.style.opacity = String((1 - ph) * .7 * (1 - sm.end));
      });
      drops.forEach((d, i) => {
        if (!splashing) { d.style.opacity = '0'; return; }
        const ph = (t * 1.3 + i * .27) % 1, dir = i % 2 ? 1 : -1, spread = (8 + i * 5) * dir;
        d.setAttribute('cx', String(x1 + spread * ph * unit * 2.2));
        d.setAttribute('cy', String(y1 - (Math.sin(ph * Math.PI) * (14 + i * 4)) * unit * 1.4));
        d.setAttribute('r', String(W * .18 * (1 - ph * .5)));
        d.style.opacity = String((1 - ph) * (1 - sm.end));
      });

      if (f <= 0 || f >= .999) { blob.setAttribute('d', ''); dripEls.forEach((r) => r?.setAttribute('height', '0')); return; }
      const Rr = lerp(0, 980, Math.pow(f, 1.25));        // grows from the impact point
      const cx = ix, cy = iy - 6 + Rr * .62;             // centre sinks as it spreads -> "fills down"
      const rx = Rr * 1.15, ry = Rr * .68 + 6;
      let d = '';
      const K = 96;
      for (let k = 0; k <= K; k++) {
        const a = (k / K) * Math.PI * 2;
        const wave = 1 + .045 * Math.sin(a * 5 + t * 1.6) + .03 * Math.sin(a * 9 - t * 2.3) + .02 * Math.sin(a * 14 + t * 3.1);
        const ca = Math.cos(a), sa = Math.sin(a);
        const sx = Math.sign(ca) * Math.pow(Math.abs(ca), .8), sy = Math.sign(sa) * Math.pow(Math.abs(sa), .8);
        d += (k ? 'L' : 'M') + (cx + sx * rx * wave).toFixed(1) + ',' + (cy + sy * ry * wave).toFixed(1);
      }
      blob.setAttribute('d', d + 'Z');
      POUR_DRIPS.forEach(([off, lenF, ph], i) => {
        const r = dripEls[i];
        if (!r) return;
        const a = Math.PI / 2 + off * 1.25;
        const ex = cx + Math.cos(a) * rx * .97, ey = cy + Math.sin(a) * ry * .97;
        const wR = clamp(Rr * .05, 3, 13);
        const len = clamp(Rr * .32, 0, 130) * lenF * (.85 + .15 * Math.sin(t * 1.4 + ph));
        r.setAttribute('x', (ex - wR).toFixed(1)); r.setAttribute('y', (ey - wR * 2).toFixed(1));
        r.setAttribute('width', (wR * 2).toFixed(1)); r.setAttribute('height', Math.max(0, len + wR * 2).toFixed(1));
        r.setAttribute('rx', wR.toFixed(1));
      });
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      overlay.remove();
      mapEl.style.opacity = '';
      fillEl.style.display = 'none';
    };
  }, [enabled, refs]);
}
