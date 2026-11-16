import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, Download, ArrowRight } from 'lucide-react';
import { hero, portfolioPdf } from '../data/content';
import { channels } from './heroChannels';
import { scrollToHash } from '../hooks/useLenis';
import { useMediaQuery } from '../hooks/useMediaQuery';
import MagneticButton from '../components/MagneticButton';
import styles from './Hero.module.css';

const bottle = (f: string) => `/images/home-hero/${f}.webp`;
/* Seven bottles from the portfolio, fanned around a peach halo with a gold
   ring, after the Giffard page hero. Listed back to front so the centre
   bottle rises in last. */
const BOTTLES = [
  { src: bottle('giffard-mango-puree'), alt: 'Giffard Mango Fruit for Mix purée bottle', slot: 'farFarLeft', fromX: '120%', tilt: -12, float: 6.8 },
  { src: bottle('burnt-ends-whiskey'), alt: 'Burnt Ends Blended Whiskey bottle', slot: 'farFarRight', fromX: '-120%', tilt: 12, float: 6.4 },
  { src: bottle('giffard-lychee-liqueur'), alt: 'Giffard Lichi-Li lychee liqueur bottle', slot: 'farLeft', fromX: '80%', tilt: -8, float: 6.6 },
  { src: bottle('worthy-park-rum'), alt: 'Worthy Park Single Estate Reserve Jamaica rum bottle', slot: 'farRight', fromX: '-80%', tilt: 8, float: 5.9 },
  { src: bottle('black-tears-spiced-rum'), alt: 'Black Tears Dry Spiced rum bottle', slot: 'left', fromX: '40%', tilt: -4, float: 5.6 },
  { src: bottle('demonio-acholado'), alt: 'Demonio de los Andes Acholado pisco bottle', slot: 'right', fromX: '-40%', tilt: 4, float: 6.2 },
  { src: bottle('giffard-popcorn-syrup'), alt: 'Giffard Popcorn syrup bottle', slot: 'centre', fromX: '0%', tilt: 0, float: 5 },
] as const;

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  /* On a phone the hero stack fills the screen, so lifting and fading it out
     leaves a tall blank band under it that the network map's pour then has to
     fall through. Phones keep the copy still and let it scroll away. */
  const narrow = useMediaQuery('(max-width: 860px)');
  /* The bottle stage takes the column right of the copy, which only opens
     up on wide screens; below that it isn't mounted at all. */
  const wide = useMediaQuery('(min-width: 1280px)');
  const reduce = useReducedMotion();
  const fanLeft = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-22%']);
  const fanRight = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%']);
  const fanFarLeft = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-36%']);
  const fanFarRight = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '36%']);
  const fanFarFarLeft = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-50%']);
  const fanFarFarRight = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '50%']);
  const fanX = {
    farFarLeft: fanFarFarLeft, farLeft: fanFarLeft, left: fanLeft, centre: 0,
    right: fanRight, farRight: fanFarRight, farFarRight: fanFarFarRight,
  };
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
      {/* Background: a drifting dot grid with glowing rose and coral dots,
          as on the EG Eloma client portal, in the logo's colours */}
      <div className={styles.dots} aria-hidden="true">
        <div className={styles.dotGrid} />
        <div className={`${styles.dotGlow} ${styles.dotRose}`} />
        <div className={`${styles.dotGlow} ${styles.dotCoral}`} />
        <div className={styles.dotWave} />
      </div>

      {/* Copy */}
      <motion.div className={`container ${styles.content}`} style={narrow ? undefined : { y: textY, opacity: fade }}>
        <motion.div
          className={styles.inner}
          variants={container}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          <motion.p className={`eyebrow ${styles.eyebrow}`} variants={fadeUp}>
            <span className={styles.dot} /> {hero.eyebrow}
          </motion.p>

          <h1 className={`display-xl ${styles.title}`}>
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

          <motion.p className={styles.body} variants={fadeUp}>
            {hero.body}
          </motion.p>

          <motion.div className={styles.actions} variants={fadeUp}>
            <MagneticButton variant="outline" className={styles.download} href={portfolioPdf} cursorLabel="Download">
              {hero.ctaSecondary} <Download size={18} />
            </MagneticButton>
            <MagneticButton variant="solid" cursorLabel="Apply" onClick={() => scrollToHash('#contact')}>
              {hero.ctaPrimary} <ArrowRight size={18} />
            </MagneticButton>
          </motion.div>

          <motion.div className={styles.channels} variants={fadeUp}>
            {channels.map(({ icon: Icon, title, sub }) => (
              <div className={styles.channel} key={title}>
                <span className={styles.channelIcon}><Icon size={20} /></span>
                <span className={styles.channelText}>
                  <span className={styles.channelTitle}>{title}</span>
                  <span className={styles.channelSub}>{sub}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {wide && (
          <div className={styles.stage}>
            <motion.span
              className={styles.stageGlow}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.1, ease: EASE }}
              aria-hidden="true"
            />
            {BOTTLES.map((b, i) => (
              <motion.div
                key={b.src}
                className={`${styles.bottle} ${styles[b.slot]}`}
                initial={reduce ? false : { opacity: 0, y: 90, x: b.fromX, rotate: 0 }}
                animate={ready ? { opacity: 1, y: 0, x: 0, rotate: b.tilt } : {}}
                transition={{ duration: 1.3, delay: 0.35 + i * 0.15, ease: EASE }}
              >
                <motion.div style={{ x: fanX[b.slot] }}>
                  <motion.img
                    src={b.src}
                    alt={b.alt}
                    animate={reduce ? undefined : { y: [0, -12, 0] }}
                    transition={{ duration: b.float, repeat: Infinity, ease: 'easeInOut', delay: 1.6 + i * 0.4 }}
                  />
                </motion.div>
              </motion.div>
            ))}
            <span className={styles.stageFloor} aria-hidden="true" />
          </div>
        )}
      </motion.div>

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
