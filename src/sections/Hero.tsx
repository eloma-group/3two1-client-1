import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, Download, ArrowRight } from 'lucide-react';
import { hero, portfolioPdf } from '../data/content';
import { channels } from './heroChannels';
import { scrollToHash } from '../hooks/useLenis';
import { useMediaQuery } from '../hooks/useMediaQuery';
import MagneticButton from '../components/MagneticButton';
import HeroNetwork from './HeroNetwork';
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
            <HeroNetwork />
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
