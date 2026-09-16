import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { brand } from '../data/content';
import Reveal, { RevealText } from '../components/Reveal';
import styles from './Story.module.css';

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const rot = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section className={styles.story} id="story" ref={ref}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <Reveal>
            <p className="eyebrow" style={{ color: 'var(--rose-700)' }}>Our Story</p>
          </Reveal>
          <h2 className={`display-lg ${styles.heading}`}>
            <RevealText text="A house of premium spirits," />{' '}
            <span className="gradient-text"><RevealText text="built for trade." /></span>
          </h2>

          <Reveal delay={0.1} className={styles.lede}>
            <p>{brand.mission}. Since 2018 we have curated seven of the world's most respected drinks houses into a single, tightly-run portfolio.</p>
          </Reveal>

          <Reveal delay={0.2} className={styles.intent}>
            <span className={styles.quoteMark}>“</span>
            <p>{brand.intent}.</p>
          </Reveal>

          <div className={styles.pillars}>
            {[
              { t: 'Imported with intent', d: 'Every house earns its place. No filler, no fashion — only bottles that make the drink better.' },
              { t: 'Placed where it belongs', d: 'From cocktail bars to bottle shops and cafés, we match each brand to the room it was built for.' },
            ].map((p, i) => (
              <Reveal key={p.t} delay={0.15 + i * 0.1} className={styles.pillar}>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <motion.div className={styles.imageWrap} style={{ y }}>
            <div className={styles.imageInner}>
              <div className={styles.imageGlow} />
              <motion.img
                src="/images/pineapple-flip.png"
                alt="3two1 emblem"
                className={styles.emblem}
                style={{ rotate: rot }}
              />
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeYear}>Est. 2018</span>
              <span className={styles.badgeText}>{brand.regions}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
