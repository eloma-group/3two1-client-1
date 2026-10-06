import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Fragment, useLayoutEffect, useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/** Simple scroll-into-view reveal used across sections. */
export default function Reveal({ children, delay = 0, y = 40, className, once = true }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** One run of a heading. Accent runs carry the brand gradient. */
export interface HeadingPart {
  text: string;
  accent?: boolean;
}

/* Room around each word's clip box, so descenders, italic overhang and tight
   display line-heights are not shaved off. The negative margin hands the
   space straight back, so the words still sit where the text would. */
const MASK_PAD = '0.1em 0.16em 0.3em';
const MASK_PULL = '-0.1em -0.16em -0.3em';
/* Gradient words paint only inside their own box. Tight display line-heights
   leave descenders (the y in "company.") hanging below it and italics lean
   past its right edge, so the box is padded to cover the whole glyph. The
   mask's padding must stay larger than this, or the mask clips it again. */
const GLYPH_PAD = '0.06em 0.12em 0.26em';
const GLYPH_PULL = '-0.06em -0.12em -0.26em';

/**
 * Word-by-word rise for headings. Every run shares one stagger, so a heading
 * reads as one cascade instead of each part restarting its own.
 *
 * The gradient sits on each moving word rather than on a wrapper: Chrome drops
 * transformed children from a parent's `background-clip: text`, so a gradient
 * wrapper left its words invisible until they stopped moving, then they popped
 * in. To keep the accent reading as one continuous ramp, each word's gradient
 * is sized to its whole run and offset by the word's position in it.
 */
export function RevealHeading({
  parts,
  play = true,
  delay = 0,
  accentAs: Accent = 'em',
}: {
  parts: HeadingPart[];
  /** Element for accent runs: `em` sets them italic, `span` keeps the face. */
  accentAs?: 'em' | 'span';
  /** Hold the rise until this turns true (e.g. once the splash has gone). */
  play?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  /* The observer watches the heading, never the words. Each word starts a full
     line below its own clip box, and an element clipped to nothing reports an
     intersection ratio of zero — so whileInView on a word would deadlock: it
     can only rise once seen, and only be seen once risen. */
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const go = inView && play;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fit = () => {
      root.querySelectorAll<HTMLElement>('[data-run]').forEach((run) => {
        const words = run.querySelectorAll<HTMLElement>('[data-word]');
        if (!words.length) return;
        // offsetLeft ignores the in-flight translateY, so this holds mid-rise.
        const lefts = [...words].map((w) => w.offsetLeft);
        const start = Math.min(...lefts);
        const end = Math.max(...[...words].map((w, i) => lefts[i] + w.offsetWidth));
        words.forEach((w, i) => {
          w.style.backgroundSize = `${end - start}px 100%`;
          w.style.backgroundPosition = `${start - lefts[i]}px 0`;
        });
      });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(root);
    return () => ro.disconnect();
  }, [parts]);

  let index = 0;
  const word = (w: string, accent: boolean) => {
    const i = index++;
    return (
      <span
        key={i}
        style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', padding: MASK_PAD, margin: MASK_PULL }}
      >
        <motion.span
          data-word={accent ? '' : undefined}
          className={accent ? 'gradient-text' : undefined}
          style={{
            display: 'inline-block',
            willChange: go && !reduce ? 'transform' : undefined,
            ...(accent && { padding: GLYPH_PAD, margin: GLYPH_PULL }),
          }}
          initial={reduce ? false : { y: '118%' }}
          animate={go || reduce ? { y: '0%' } : undefined}
          transition={{ duration: 0.95, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          {w}
        </motion.span>
      </span>
    );
  };
  // Real spaces between the clip boxes, so spacing and wrapping match the font.
  const run = (text: string, accent: boolean) =>
    text.split(' ').flatMap((w, i) => (i ? [' ', word(w, accent)] : [word(w, accent)]));

  return (
    <span ref={ref}>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          {p.accent ? <Accent data-run="">{run(p.text, true)}</Accent> : run(p.text, false)}
        </Fragment>
      ))}
    </span>
  );
}

/** Single-run shorthand for RevealHeading. */
export function RevealText({ text, accent, play, delay }: { text: string; accent?: boolean; play?: boolean; delay?: number }) {
  return <RevealHeading parts={[{ text, accent }]} play={play} delay={delay} accentAs="span" />;
}
