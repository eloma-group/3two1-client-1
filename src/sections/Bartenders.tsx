import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cocktails } from '../data/content';
import Reveal from '../components/Reveal';
import styles from './Bartenders.module.css';

export default function Bartenders() {
  return (
    <section className={styles.section} id="bartenders">
      <div className={styles.grain} />
      <div className="container">
        <div className={styles.head}>
          <Reveal><p className="eyebrow" style={{ color: 'var(--rose-300)' }}>Bartenders Corner</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className={`display-lg ${styles.title}`}>
              Six serves, <span className="gradient-text">straight from the portfolio.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={styles.sub}>Signature builds our houses were made for — get the spec, then get pouring.</p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {cocktails.map((c, i) => (
            <motion.article
              key={c.name}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="Recipe"
            >
              <div className={styles.cardTop}>
                <span className={styles.brandTag}>{c.brand}</span>
                <span className={styles.no}>0{i + 1}</span>
              </div>
              <h3 className={styles.name}>{c.name}</h3>
              <p className={styles.ing}>{c.ingredients}</p>
              <a href="#contact" className={styles.recipe}>Get the recipe <ArrowUpRight size={16} /></a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
