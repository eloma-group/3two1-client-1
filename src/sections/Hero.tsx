import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, Download, ArrowRight, Wine, Martini, Hotel, Coffee } from 'lucide-react';
import { hero, portfolioPdf } from '../data/content';

const channels = [
  { icon: Wine, title: 'Retail', sub: 'Bottle Shops & Chain Retailers' },
  { icon: Martini, title: 'Bars', sub: 'On-Premise Pours' },
  { icon: Hotel, title: 'Hospitality', sub: 'Hotels & Larger Venues' },
  { icon: Coffee, title: 'Coffee Shop & Cafe Wholesale', sub: 'Daytime & Zero-Proof' },
];
import { scrollToHash } from '../hooks/useLenis';
import { useMediaQuery } from '../hooks/useMediaQuery';
import MagneticButton from '../components/MagneticButton';
import styles from './Hero.module.css';

const HERO_HD = '/videos/hero-sydney-harbour.mp4';
const HERO_SD = '/videos/hero-sydney-harbour-720.mp4';

/** Low-memory devices and data-saver mode start on the 720p file. */
function pickHeroVideo() {
  if (typeof navigator === 'undefined') return HERO_HD;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) || nav.connection?.saveData ? HERO_SD : HERO_HD;
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroSrc] = useState(pickHeroVideo);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Hold the loop on its poster until the splash is done AND the whole clip has
  // buffered. Starting on 'canplay' let it run into the end of the downloaded
  // data and freeze for seconds at a time on a slow connection.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ready) return;
    const start = () => {
      try { v.currentTime = 0; } catch { /* metadata not ready yet */ }
      const p = v.play();
      if (p) p.catch(() => {});
    };
    if (v.readyState >= 4) start();
    else v.addEventListener('canplaythrough', start, { once: true });
    return () => v.removeEventListener('canplaythrough', start);
  }, [ready]);

  // 1080p60 plays smoothly on most machines, but on a low-memory laptop the
  // browser can drop it to software decoding at a loop restart and it crawls
  // at ~8fps. Watch the frames actually painted; after two slow seconds in a
  // row, swap to the 720p60 file at the same moment in the clip. Once only.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ready || !('requestVideoFrameCallback' in v) || v.currentSrc.endsWith(HERO_SD)) return;
    let frames = 0;
    let slow = 0;
    let handle = 0;
    let stopped = false;
    const onFrame = () => { frames++; if (!stopped) handle = v.requestVideoFrameCallback(onFrame); };
    handle = v.requestVideoFrameCallback(onFrame);
    const timer = window.setInterval(() => {
      if (v.paused || document.visibilityState !== 'visible') { frames = 0; return; }
      slow = frames < 40 ? slow + 1 : 0;
      frames = 0;
      if (slow < 2) return;
      stop();
      const at = v.currentTime;
      v.src = HERO_SD;
      v.addEventListener('loadedmetadata', () => {
        try { v.currentTime = at; } catch { /* keep from the start */ }
        const p = v.play();
        if (p) p.catch(() => {});
      }, { once: true });
    }, 1000);
    function stop() {
      stopped = true;
      window.clearInterval(timer);
      v!.cancelVideoFrameCallback(handle);
    }
    return stop;
  }, [ready]);

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  /* On a phone the hero stack fills the screen, so lifting and fading it out
     leaves a tall blank band under it that the network map's pour then has to
     fall through. Phones keep the copy still and let it scroll away. */
  const narrow = useMediaQuery('(max-width: 860px)');

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
      {/* Sydney Harbour at sunset, 1080p at 60fps. The tail of the clip
          dissolves into its head, so the loop has no jump. Its first frame is
          the poster, so the frame is never empty while the clip loads. */}
      <motion.div className={styles.videoWrap} style={{ scale: photoScale }}>
        {/* No entrance animation on the video itself: fading or scaling it
            while playback starts let the browser settle on a slow compositing
            path that held the clip near 8fps. The poster covers the start. */}
        <video
          ref={videoRef}
          className={styles.video}
          poster="/images/home-hero-sydney-harbour-poster.webp"
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          /* H.264 only: every device decodes it in hardware. AV1 saved under
             a tenth of the size and falls back to the CPU on most laptops. */
          src={heroSrc}
        />
      </motion.div>
      {/* Static on purpose: animating this layer's opacity on scroll (it ran
          1 → 1.15, which renders the same as 1) made the browser re-blend it
          over every video frame and the clip fell to ~8fps after a few loops. */}
      <div className={styles.overlay} />
      <div className={styles.grain} />

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
            <MagneticButton variant="light" href={portfolioPdf} cursorLabel="Download">
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
