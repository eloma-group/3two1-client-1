import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { tradeSegments } from '../data/content';
import Reveal from '../components/Reveal';
import styles from './Trade.module.css';

export default function Trade() {
  return (
    <section className={styles.trade} id="trade">
      <div className="container">
        <div className={styles.head}>
          <div>
            <Reveal><p className="eyebrow" style={{ color: 'var(--rose-700)' }}>Trade</p></Reveal>
            <Reveal delay={0.08}>
              <h2 className={`display-lg ${styles.title}`}>
                Built for the way <span className="gradient-text">you serve.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} className={styles.headText}>
            <p>Three trade channels, one partner. Whatever the room, we bring the range, the training and the support to match.</p>
          </Reveal>
        </div>

        <div className={styles.cards}>
          {tradeSegments.map((seg, i) => (
            <motion.article
              key={seg.id}
              className={styles.card}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="Discover"
            >
              <span className={styles.num}>0{i + 1}</span>
              <span className={styles.kicker}>{seg.kicker}</span>
              <h3 className={styles.cardTitle}>{seg.title}</h3>
              <p className={styles.desc}>{seg.description}</p>
              <a href="#contact" className={styles.link}>
                {seg.cta} <ArrowUpRight size={18} />
              </a>
              <div className={styles.glow} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
