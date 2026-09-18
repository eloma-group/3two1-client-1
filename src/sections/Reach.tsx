import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { contact } from '../data/content';
import Reveal from '../components/Reveal';
import styles from './Reach.module.css';

/* --- inline navy icons — solid / filled --- */
const Bar = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16l-7 7.4V18h3.5a1 1 0 1 1 0 2h-9a1 1 0 1 1 0-2H11v-6.6L4 4z" />
  </svg>
);
const Bottle = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.5 2h3a.5.5 0 0 1 .5.5v2.1c0 .32.08.63.22.92l.86 1.72c.28.55.42 1.16.42 1.78V20a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V9.02c0-.62.14-1.23.42-1.78l.86-1.72c.14-.29.22-.6.22-.92V2.5a.5.5 0 0 1 .5-.5z" />
  </svg>
);
const Cafe = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 7h13v5.5a5.5 5.5 0 0 1-5.5 5.5h-2A5.5 5.5 0 0 1 3 12.5V7z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M16 8.5h2.3a3.2 3.2 0 0 1 0 6.4H16v-2h2.3a1.2 1.2 0 0 0 0-2.4H16v-2z" />
    <path d="M2 19.5h15v1.5H2z" />
  </svg>
);

type Ic = 'bar' | 'bottle' | 'cafe';
const iconFor = (t: Ic, s = 15) => (t === 'bar' ? <Bar s={s} /> : t === 'bottle' ? <Bottle s={s} /> : <Cafe s={s} />);

/* City labels — positioned in % of the section box */
const labels: { name: string; x: number; y: number; align?: 'left' | 'right' }[] = [
  { name: 'Darwin', x: 43, y: 17 },
  { name: 'Broome', x: 34, y: 28, align: 'left' },
  { name: 'Perth', x: 30, y: 50, align: 'left' },
  { name: 'Adelaide', x: 47, y: 59 },
  { name: 'Melbourne', x: 52, y: 66 },
  { name: 'Hobart', x: 53, y: 74 },
  { name: 'Brisbane', x: 60, y: 43, align: 'right' },
  { name: 'Gold Coast', x: 60, y: 47, align: 'right' },
  { name: 'Newcastle', x: 60, y: 51, align: 'right' },
  { name: 'Sydney', x: 60, y: 55, align: 'right' },
  { name: 'Auckland', x: 76, y: 40, align: 'right' },
  { name: 'Wellington', x: 73, y: 49, align: 'right' },
  { name: 'Vanuatu', x: 83, y: 8, align: 'right' },
  { name: 'Fiji', x: 76, y: 15, align: 'right' },
  { name: 'Cook Is.', x: 87, y: 19, align: 'right' },
];

/* Icon clusters placed over the map (% of section box) */
const markers: { x: number; y: number; icons: Ic[] }[] = [
  { x: 44, y: 20, icons: ['bar', 'bottle'] },       // Darwin
  { x: 35, y: 31, icons: ['cafe'] },                // Broome
  { x: 30, y: 53, icons: ['bottle', 'cafe', 'bar'] }, // Perth
  { x: 47, y: 56, icons: ['cafe', 'bottle'] },      // Adelaide
  { x: 51, y: 63, icons: ['bottle', 'bottle', 'cafe'] }, // Melbourne
  { x: 57, y: 44, icons: ['bottle', 'bar'] },       // Brisbane
  { x: 57, y: 53, icons: ['bottle', 'bottle', 'cafe', 'bar'] }, // Sydney
  { x: 71, y: 42, icons: ['bar', 'cafe', 'bottle'] }, // Auckland
  { x: 70, y: 50, icons: ['cafe'] },                // Wellington
  { x: 80, y: 10, icons: ['bar'] },                 // Vanuatu
  { x: 73, y: 17, icons: ['bottle', 'cafe'] },      // Fiji
  { x: 83, y: 19, icons: ['cafe'] },                // Cook Is
];

/* Pacific island blobs (coral + navy outline); x/y in %, w/h in px */
const isles = [
  { x: 74, y: 8, w: 26, h: 16 },
  { x: 77, y: 12, w: 18, h: 13 },
  { x: 72, y: 14, w: 15, h: 11 },
  { x: 80, y: 10, w: 30, h: 18 },
  { x: 83, y: 15, w: 20, h: 15 },
  { x: 70, y: 18, w: 16, h: 12 },
  { x: 86, y: 20, w: 24, h: 15 },
];

export default function Reach() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mapY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <section className={styles.reach} ref={ref} id="reach">
      <div className={styles.inner}>
        {/* Copy */}
        <div className={styles.copy}>
          <Reveal><p className={styles.eyebrow}>The 3two1 network</p></Reveal>
          <Reveal delay={0.06}>
            <h2 className={styles.heading}>
              <span className={styles.line1}>In every great</span>
              <span className={styles.line2}>Bar, Bottle<br />shop and café<span className={styles.period}>.</span></span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.body}>
              Seven houses placed by hand across the region — coast to coast, both sides of the
              Tasman, out to the Pacific.
            </p>
          </Reveal>
        </div>

        {/* Contact */}
        <Reveal delay={0.2} className={styles.contact}>
          <div className={styles.contactBlock}>
            <span className={styles.contactLabel}>Enquiries</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className={styles.contactBlock}>
            <span className={styles.contactLabel}>Trade</span>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
          </div>
        </Reveal>

        {/* Map */}
        <motion.div className={styles.mapZone} style={{ y: mapY }}>
          <motion.div
            className={styles.map}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <img className={styles.au} src="/images/au.svg" alt="Australia" />
            <img className={styles.nz} src="/images/nz.svg" alt="New Zealand" />

            {/* Pacific islands */}
            {isles.map((is, i) => (
              <motion.span
                key={i}
                className={styles.isle}
                style={{
                  left: `${is.x}%`,
                  top: `${is.y}%`,
                  width: is.w,
                  height: is.h,
                  borderRadius: `${45 + (i % 3) * 8}% ${55 - (i % 2) * 10}% ${50 + (i % 2) * 6}% ${48 + (i % 3) * 5}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: EASE }}
              />
            ))}

            {/* City labels */}
            {labels.map((l, i) => (
              <motion.span
                key={l.name}
                className={`${styles.label} ${l.align === 'left' ? styles.left : l.align === 'right' ? styles.right : ''}`}
                style={{ left: `${l.x}%`, top: `${l.y}%` }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ delay: 0.55 + i * 0.04, duration: 0.5, ease: EASE }}
              >
                {l.name}
              </motion.span>
            ))}

            {/* Icon clusters */}
            {markers.map((m, i) => (
              <motion.span
                key={i}
                className={styles.cluster}
                style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${(i % 6) * 0.45}s` }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.5, ease: EASE }}
              >
                {m.icons.map((t, k) => (
                  <span key={k} className={styles.ico}>{iconFor(t)}</span>
                ))}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Legend */}
        <Reveal delay={0.3} className={styles.legend}>
          <div className={styles.legendRow}><span className={styles.legendIcon}><Bar /></span> Bars</div>
          <div className={styles.legendRow}><span className={styles.legendIcon}><Bottle /></span> Bottle Shops</div>
          <div className={styles.legendRow}><span className={styles.legendIcon}><Cafe /></span> Cafés</div>
        </Reveal>
      </div>
    </section>
  );
}
