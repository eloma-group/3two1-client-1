import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { contact } from '../data/content';
import styles from './NetworkEditorial.module.css';

/* ── category icons ── */
const Bar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16l-7 7.4V18h3.5a1 1 0 1 1 0 2h-9a1 1 0 1 1 0-2H11v-6.6L4 4z" /></svg>
);
const Bottle = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5 2h3a.5.5 0 0 1 .5.5v2.1c0 .32.08.63.22.92l.86 1.72c.28.55.42 1.16.42 1.78V20a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V9.02c0-.62.14-1.23.42-1.78l.86-1.72c.14-.29.22-.6.22-.92V2.5a.5.5 0 0 1 .5-.5z" /></svg>
);
const Cafe = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h13v5.5a5.5 5.5 0 0 1-5.5 5.5h-2A5.5 5.5 0 0 1 3 12.5V7z" /><path fillRule="evenodd" clipRule="evenodd" d="M16 8.5h2.3a3.2 3.2 0 0 1 0 6.4H16v-2h2.3a1.2 1.2 0 0 0 0-2.4H16v-2z" /><path d="M2 19.5h15v1.5H2z" /></svg>
);

type Cat = 'bar' | 'bottle' | 'cafe';
const ICON: Record<Cat, () => ReactElement> = { bar: Bar, bottle: Bottle, cafe: Cafe };
const CAT_LABEL: Record<Cat, string> = { bar: 'Bars', bottle: 'Bottle Shops', cafe: 'Cafés' };

interface Place { name: string; cats: Cat[] }
interface Region { title: string; places: Place[] }

const regions: Region[] = [
  {
    title: 'Australia',
    places: [
      { name: 'Darwin', cats: ['bar', 'bottle', 'cafe'] },
      { name: 'Broome', cats: ['bottle', 'cafe'] },
      { name: 'Perth', cats: ['bar', 'bottle', 'cafe'] },
      { name: 'Adelaide', cats: ['bar', 'bottle', 'cafe'] },
      { name: 'Brisbane', cats: ['bar', 'bottle', 'cafe'] },
      { name: 'Gold Coast', cats: ['bar', 'bottle', 'cafe'] },
      { name: 'Newcastle', cats: ['bar', 'bottle', 'cafe'] },
      { name: 'Sydney', cats: ['bar', 'bottle', 'cafe'] },
      { name: 'Melbourne', cats: ['bar', 'bottle', 'cafe'] },
      { name: 'Hobart', cats: ['bar', 'cafe'] },
    ],
  },
  {
    title: 'New Zealand',
    places: [
      { name: 'Auckland', cats: ['bar', 'bottle', 'cafe'] },
      { name: 'Wellington', cats: ['bar', 'bottle', 'cafe'] },
    ],
  },
  {
    title: 'Pacific',
    places: [
      { name: 'Vanuatu', cats: ['bar', 'cafe'] },
      { name: 'Fiji', cats: ['cafe'] },
      { name: 'Cook Is.', cats: ['bottle', 'cafe'] },
    ],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const lineReveal = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.8, ease: EASE } },
};

export default function NetworkEditorial() {
  return (
    <section id="network" className={styles.section}>
      <div className={styles.inner}>
        {/* ── Left copy ── */}
        <motion.div
          className={styles.left}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.09 } } }}
        >
          <motion.p className={styles.eyebrow} variants={rise}>The 3two1 Network</motion.p>
          <h2 className={styles.heading}>
            <span className={styles.lineClip}><motion.span className={styles.lineNavy} variants={lineReveal}>In every great</motion.span></span>
            <span className={styles.lineClip}><motion.span className={styles.lineCoral} variants={lineReveal}>Bar, Bottle</motion.span></span>
            <span className={styles.lineClip}><motion.span className={styles.lineCoral} variants={lineReveal}>shop and café.</motion.span></span>
          </h2>
          <motion.span className={styles.divider} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: EASE } } }} style={{ transformOrigin: 'left' }} />
          <motion.p className={styles.para} variants={rise}>
            Seven houses placed by hand across the region — coast to coast, both sides of the
            Tasman, out to the Pacific.
          </motion.p>

          <motion.p className={styles.good} variants={rise}>Good places.<br />Great company.</motion.p>

          <motion.div className={styles.contact} variants={rise}>
            <div className={styles.contactBlock}>
              <span className={styles.contactLabel}>Enquiries</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
            <div className={styles.contactBlock}>
              <span className={styles.contactLabel}>Trade</span>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: places + what's there ── */}
        <div className={styles.right}>
          {regions.map((region) => (
            <div key={region.title} className={styles.group}>
              <motion.p
                className={styles.groupTitle}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {region.title}
              </motion.p>
              <div className={styles.places}>
                {region.places.map((p, i) => (
                  <motion.div
                    key={p.name}
                    className={styles.place}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.03, ease: EASE }}
                  >
                    <span className={styles.placeName}>{p.name}</span>
                    <span className={styles.cats}>
                      {(['bar', 'bottle', 'cafe'] as Cat[]).map((c) => {
                        const on = p.cats.includes(c);
                        const Icon = ICON[c];
                        return (
                          <span
                            key={c}
                            className={`${styles.cat} ${on ? styles.catOn : styles.catOff}`}
                            title={CAT_LABEL[c]}
                            aria-label={on ? CAT_LABEL[c] : undefined}
                          >
                            <Icon />
                          </span>
                        );
                      })}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className={styles.legend}>
            <span className={styles.legendRow}><span className={styles.legendIcon}><Bar /></span> Bars</span>
            <span className={styles.legendRow}><span className={styles.legendIcon}><Bottle /></span> Bottle Shops</span>
            <span className={styles.legendRow}><span className={styles.legendIcon}><Cafe /></span> Cafés</span>
          </div>
        </div>
      </div>
    </section>
  );
}
