import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, Download, ArrowRight } from 'lucide-react';
import { hero, portfolioPdf } from '../data/content';
import { channels } from './heroChannels';
import { scrollToHash } from '../hooks/useLenis';
import { useMediaQuery } from '../hooks/useMediaQuery';
import MagneticButton from '../components/MagneticButton';
import HeroNetwork, { type NetworkFit } from './HeroNetwork';
import styles from './Hero.module.css';

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  /* On a phone the hero stack fills the screen, so lifting and fading it out
     leaves a tall blank band under it that the network map's pour then has to
     fall through. Phones keep the copy still and let it scroll away. */
  const narrow = useMediaQuery('(max-width: 860px)');
  /* The network map needs the free column right of the copy, which only
     opens up on wide screens; below that it isn't mounted at all. */
  const wide = useMediaQuery('(min-width: 1320px)');

  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<NetworkFit | null>(null);

  /* Fit the network map to the copy: its caption lines up with the eyebrow and
     its venue cards end level with the buttons. The map is a narrow tree on top
     of a wide row of cards, so the tree goes right of the title and the cards
     reach in under it, beside the body copy and buttons. Positions are read
     from offsets, which ignore the scroll parallax on the copy. */
  useLayoutEffect(() => {
    const hero = ref.current;
    if (!wide || !hero) { setFit(null); return; }

    const place = () => {
      const c = contentRef.current;
      const eyebrow = eyebrowRef.current;
      const title = titleRef.current;
      const body = bodyRef.current;
      const actions = actionsRef.current;
      const fig = hero.querySelector<HTMLElement>('.nw');
      const venues = hero.querySelector<HTMLElement>('.nw-venues');
      if (!c || !eyebrow || !title || !body || !actions || !fig || !venues || !fig.offsetWidth) return;

      const ox = c.offsetLeft;
      const top = c.offsetTop + eyebrow.offsetTop;
      const bottom = c.offsetTop + actions.offsetTop + actions.offsetHeight;
      const right = ox + c.offsetWidth - parseFloat(getComputedStyle(c).paddingRight);
      /* Right edge of the text itself, not its boxes: the last title line wraps,
         so its box is as wide as the column. Only x is read from the rects. */
      const heroLeft = hero.getBoundingClientRect().left;
      const textRight = (el: Element) => {
        const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        let max = 0;
        for (let n = walk.nextNode(); n; n = walk.nextNode()) {
          range.selectNodeContents(n);
          for (const r of range.getClientRects()) max = Math.max(max, r.right);
        }
        return max - heroLeft;
      };
      const titleRight = textRight(title);
      const bodyRight = textRight(body);
      const buttonsRight = ox + Math.max(...[...actions.children].map((b) => (b as HTMLElement).offsetLeft + (b as HTMLElement).offsetWidth));
      const lowRight = Math.max(bodyRight, buttonsRight);

      /* Map geometry, as fractions of its width: the card row runs 8% past each
         side (0.58 from the centre), the hub tile is 0.07 either side of the
         centre, and the visible height ends at the bottom of the cards. */
      const ratio = (venues.offsetTop + venues.offsetHeight) / fig.offsetWidth;
      const h = bottom - top;
      const w = Math.min(h / ratio, (right - titleRight - 24) / 0.65, (right - lowRight - 32) / 1.16);
      const lo = Math.max(titleRight + 24 + 0.07 * w, lowRight + 32 + 0.58 * w);
      const hi = right - 0.58 * w;
      const centre = Math.min(Math.max((titleRight + right) / 2, lo), hi);
      /* When the column is too narrow for the map to fill the copy's height,
         the cards still end level with the buttons and the caption lifts to
         the eyebrow's line, so both edges stay aligned. */
      const lift = Math.max(0, h - ratio * w);
      const next = { x: centre - w / 2, y: top + lift, w, lift };
      setFit((prev) =>
        prev && Math.abs(prev.x - next.x) < 0.5 && Math.abs(prev.y - next.y) < 0.5 && Math.abs(prev.w - next.w) < 0.5 && Math.abs(prev.lift - next.lift) < 0.5 ? prev : next,
      );
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(hero);
    [titleRef.current, bodyRef.current, hero.querySelector('.nw-venues')].forEach((el) => el && ro.observe(el));
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [wide]);

  const EASE = [0.16, 1, 0.3, 1] as const;
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const line: Variants = {
    hidden: { y: '115%' },
    show: { y: 0, transition: { duration: 1, ease: EASE } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section className={styles.hero} ref={ref} id="top">
      {/* Copy */}
      <motion.div ref={contentRef} className={`container ${styles.content}`} style={narrow ? undefined : { y: textY, opacity: fade }}>
        <motion.div
          className={styles.inner}
          variants={container}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          <motion.p ref={eyebrowRef} className={`eyebrow ${styles.eyebrow}`} variants={fadeUp}>
            <span className={styles.dot} /> {hero.eyebrow}
          </motion.p>

          <h1 ref={titleRef} className={`display-xl ${styles.title}`}>
            {hero.titleLines.map((l, i) => (
              <span key={i} className={styles.lineMask}>
                <motion.span
                  className={i === hero.titleLines.length - 1 ? 'gradient-text' : ''}
                  variants={line}
                  style={{ display: 'inline-block' }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p ref={bodyRef} className={styles.body} variants={fadeUp}>
            {hero.body}
          </motion.p>

          <motion.div ref={actionsRef} className={styles.actions} variants={fadeUp}>
            <MagneticButton variant="outline" className={styles.download} href={portfolioPdf} cursorLabel="Download">
              {hero.ctaSecondary} <Download size={18} />
            </MagneticButton>
            <MagneticButton variant="solid" cursorLabel="Apply" onClick={() => scrollToHash('#contact')}>
              {hero.ctaPrimary} <ArrowRight size={18} />
            </MagneticButton>
          </motion.div>

          {/* On wide screens the cards sit at the end of the network map instead */}
          {!wide && <motion.div className={styles.channels} variants={fadeUp}>
            {channels.map(({ icon: Icon, title, sub }) => (
              <div className={styles.channel} key={title}>
                <span className={styles.channelIcon}><Icon size={20} /></span>
                <span className={styles.channelText}>
                  <span className={styles.channelTitle}>{title}</span>
                  <span className={styles.channelSub}>{sub}</span>
                </span>
              </div>
            ))}
          </motion.div>}
        </motion.div>
      </motion.div>

      {wide && (
        <motion.div className={styles.network} style={{ opacity: fade }}>
          <motion.div
            className={styles.networkIn}
            initial={{ opacity: 0, x: 40 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 1.2, ease: EASE }}
          >
            <HeroNetwork fit={fit} />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className={styles.scroll}
        data-scroll-cue
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span>Scroll To Explore</span>
        <ArrowDown size={16} className={styles.scrollIcon} />
      </motion.div>
    </section>
  );
}
