import { useRef, useEffect } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Hold the video buffered but paused during the splash, then play it from the
  // very first frame once the loading screen is done — no mid-clip jump, no lag.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ready) return;
    const start = () => {
      try { v.currentTime = 0; } catch { /* metadata not ready yet */ }
      const p = v.play();
      if (p) p.catch(() => {});
    };
    if (v.readyState >= 2) start();
    else v.addEventListener('canplay', start, { once: true });
    return () => v.removeEventListener('canplay', start);
  }, [ready]);

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
          ref={videoRef}
          className={styles.video}
          src="/videos/hero-bg.mp4"
          muted
          loop
          playsInline
          preload="auto"
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
