import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cocktails } from '../data/content';
import Reveal from '../components/Reveal';
import styles from './Bartenders.module.css';

/** Real cocktail photo per house. */
const MEDIA: Record<string, string> = {
  'Giffard':      '/images/brand-giffard-cocktail.webp',
  'Black Tears':  '/images/brand-black-tears-cocktail.webp',
  'Pueblo Viejo': '/images/brand-pueblo-viejo-cocktail.webp',
  'Worthy Park':  '/images/brand-worthy-park-cocktail.webp',
  'Burnt Ends':   '/images/brand-burnt-ends-cocktail.webp',
  'San Matías':   '/images/brand-san-matias-cocktail.webp',
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Bartenders() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % cocktails.length), 4200);
    return () => clearInterval(id);
  }, [paused]);

  const c = cocktails[active];
  const total = String(cocktails.length).padStart(2, '0');

  return (
    <section className={styles.section} id="bartenders">
      <div className={styles.grain} />
      <div className="container">
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <Reveal><p className="eyebrow" style={{ color: 'var(--rose-700)' }}>Bartenders Corner</p></Reveal>
            <Reveal delay={0.08}>
              <h2 className={styles.title}>
                Cocktails made <br />
                <span className="gradient-text" style={{ display: 'inline-block', paddingBottom: '0.12em' }}>
                  <span style={{ fontStyle: 'italic' }}>with</span> our products.
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} className={styles.headRight}>
            <a href="#contact" className={styles.seeAll}>See all cocktails <ArrowUpRight size={16} /></a>
          </Reveal>
        </div>

        <div
          className={styles.showcase}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Image showcase ── */}
          <div className={styles.panel}>
            <div className={styles.panelInner}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={c.name}
                  src={MEDIA[c.brand]}
                  alt={c.name}
                  className={styles.panelImg}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </AnimatePresence>
              <div className={styles.panelFade} />
              <div className={styles.counter}>
                {String(active + 1).padStart(2, '0')} <span>/ {total}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={c.name + '-cap'}
                  className={styles.caption}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <span className={styles.capBrand}>{c.brand}</span>
                  <h3 className={styles.capName}>{c.name}</h3>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Selectable list ── */}
          <ul className={styles.list}>
            {cocktails.map((ck, i) => {
              const on = i === active;
              return (
                <li key={ck.name} className={`${styles.item} ${on ? styles.itemActive : ''}`}>
                  <button
                    className={styles.rowBtn}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <span className={styles.rowNo}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.rowName}>{ck.name}</span>
                    <span className={styles.rowBrand}>{ck.brand}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        className={styles.detail}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: EASE }}
                      >
                        <div className={styles.detailInner}>
                          <p className={styles.spec}>{ck.ingredients}</p>
                          <p className={styles.desc}>{ck.desc}</p>
                          <a href="#contact" className={styles.recipe}>Get the recipe <ArrowUpRight size={16} /></a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
