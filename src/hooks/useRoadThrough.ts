import { useLayoutEffect, useRef, useState } from 'react';

type Point = readonly [number, number];
/** One cubic Bézier: start, two handles, end. */
export type RoadSegment = readonly [Point, Point, Point, Point];

/* The craft road as first drawn for Pueblo Viejo, and shared by every brand
   page that walks through three steps: M20 120 C 220 10, 380 190, 600 100
   S 980 10, 1180 110, with the S segment's mirrored handle written out. */
export const CRAFT_ROAD: readonly RoadSegment[] = [
  [[20, 120], [220, 10], [380, 190], [600, 100]],
  [[600, 100], [820, 10], [980, 10], [1180, 110]],
];
export const CRAFT_ROAD_BOX: Point = [1200, 200];

/**
 * A hand-drawn road that always runs through the centre of each disc.
 *
 * `road` is the curve as designed inside a `box` (width × height, its middle
 * line being where the discs sit). The discs resize with the viewport and may
 * sit at different heights, so a fixed curve stretched over the row only meets
 * them by luck. This samples the designed curve, scales it to the row, then
 * nudges it up or down so it passes dead centre through every disc. The nudge
 * eases between discs, so the swells keep the shape they were drawn with.
 *
 * Attach `ref` to the row; `discClass` picks out the discs inside it. Each
 * disc's offset parent must be a direct child of the row.
 */
export function useRoadThrough<T extends HTMLElement>(discClass: string, road: readonly RoadSegment[], box: Point) {
  const ref = useRef<T>(null);
  const [path, setPath] = useState({ w: 0, h: 0, d: '' });

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const draw = () => {
      // offsetTop/Left ignore in-flight transforms, so this holds mid-reveal.
      const pts = [...root.querySelectorAll<HTMLElement>(`.${discClass}`)].map((disc) => {
        const item = disc.offsetParent as HTMLElement;
        return [
          item.offsetLeft + disc.offsetLeft + disc.offsetWidth / 2,
          item.offsetTop + disc.offsetTop + disc.offsetHeight / 2,
        ];
      });
      if (pts.length < 2) return setPath({ w: 0, h: 0, d: '' });
      const w = root.clientWidth;
      const scale = pts[0][1] / (box[1] / 2); // a disc's radius spans half the box
      const curve = road.flatMap(([p0, p1, p2, p3], seg) =>
        Array.from({ length: 60 }, (_, j) => {
          const t = (j + (seg ? 1 : 0)) / 60;
          const u = 1 - t;
          const at = (k: 0 | 1) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k];
          return [(at(0) / box[0]) * w, at(1) * scale];
        }),
      );
      const yAt = (x: number) => {
        const i = curve.findIndex((q) => q[0] >= x);
        if (i <= 0) return curve[i === -1 ? curve.length - 1 : 0][1];
        const [[x0, y0], [x1, y1]] = [curve[i - 1], curve[i]];
        return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
      };
      const shift = pts.map(([x, y]) => [x, y - yAt(x)]);
      const shiftAt = (x: number) => {
        if (x <= shift[0][0]) return shift[0][1];
        const i = shift.findIndex((q) => q[0] >= x);
        if (i === -1) return shift[shift.length - 1][1];
        const [[x0, s0], [x1, s1]] = [shift[i - 1], shift[i]];
        const t = (x - x0) / (x1 - x0);
        return s0 + (s1 - s0) * t * t * (3 - 2 * t);
      };
      const d = curve.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${(y + shiftAt(x)).toFixed(1)}`).join(' ');
      setPath({ w, h: root.clientHeight, d });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(root);
    return () => ro.disconnect();
  }, [discClass, road, box]);

  return { ref, path };
}
