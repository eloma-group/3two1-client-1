import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { brand } from '../data/content';
import styles from './Experience.module.css';

const WORDS = ['Imported', 'with', 'intent.', 'Placed', 'where', 'it', 'belongs.'];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1]);

  return (
    <section className={styles.exp} ref={ref}>
      <motion.div className={styles.bg} style={{ y, scale }} />
      <div className={styles.veil} />
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow" style={{ color: 'var(--peach)' }}>{brand.tagline}</p>
        <h2 className={styles.statement}>
          {WORDS.map((w, i) => (
            <span key={i} className={styles.wordMask}>
              <motion.span
                className={styles.word}
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.p
          className={styles.foot}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {brand.regions}
        </motion.p>
      </div>
    </section>
  );
}
