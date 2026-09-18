import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, Download, ArrowRight, Wine, Martini, Hotel, Coffee } from 'lucide-react';
import { hero } from '../data/content';

const channels = [
  { icon: Wine, title: 'Bottle Shop', sub: 'Retail & Wholesale' },
  { icon: Martini, title: 'Bars', sub: 'On-Premise Pours' },
  { icon: Hotel, title: 'Hospitality', sub: 'Hotels & Large Venues' },
  { icon: Coffee, title: 'Coffee Shop & Wholesale', sub: 'Daytime & Zero-Proof' },
];
import { scrollToHash } from '../hooks/useLenis';
import MagneticButton from '../components/MagneticButton';
import styles from './Hero.module.css';

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

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
      {/* Video background */}
      <motion.div className={styles.videoWrap} style={{ scale: videoScale }}>
        <video
          className={styles.video}
          src="/videos/hero-clean.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/logo.png"
        />
      </motion.div>
      <motion.div className={styles.overlay} style={{ opacity: overlayOpacity }} />
      <div className={styles.grain} />

      {/* Copy */}
      <motion.div className={`container ${styles.content}`} style={{ y: textY, opacity: fade }}>
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
            <MagneticButton variant="light" onClick={() => scrollToHash('#brands')}>
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
      </motion.div>

      <motion.div
        className={styles.scroll}
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
