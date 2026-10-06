import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import styles from './BlackTears.module.css';

const img = (f: string) => `/images/brands/black-tears/${f}.webp`;
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── Tattoo-flash ornaments: single-weight line drawings ─────────────── */
function Eye({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M4 30 C30 4, 90 4, 116 30 C90 56, 30 56, 4 30 Z" />
      <circle cx="60" cy="30" r="14" />
      <circle cx="60" cy="30" r="5" fill="currentColor" />
      <path d="M60 44 C58 50, 58 54, 60 58 C62 54, 62 50, 60 44 Z" fill="currentColor" />
      <path d="M20 14 L14 6 M40 8 L37 0 M60 6 V-2 M80 8 L83 0 M100 14 L106 6" />
    </svg>
  );
}
function Rose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M40 18 C28 18, 22 28, 26 38 C30 48, 50 48, 54 38 C58 28, 52 18, 40 18 Z" />
      <path d="M40 26 C34 26, 32 32, 35 36 C38 40, 46 38, 46 32 C46 28, 43 26, 40 26 Z" />
      <path d="M26 38 C18 34, 14 40, 18 48 C24 56, 40 56, 40 48" />
      <path d="M54 38 C62 34, 66 40, 62 48 C56 56, 40 56, 40 48" />
      <path d="M40 56 V96" />
      <path d="M40 72 C30 66, 22 70, 20 78 C30 80, 36 78, 40 72 Z" />
      <path d="M40 82 C50 76, 58 80, 60 88 C50 90, 44 88, 40 82 Z" />
    </svg>
  );
}
function Dagger({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 120" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M20 4 L26 70 L20 78 L14 70 Z" />
      <path d="M20 10 V70" />
      <path d="M4 78 H36" />
      <path d="M16 78 V104 H24 V78" />
      <circle cx="20" cy="110" r="6" />
    </svg>
  );
}
function Bean({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <ellipse cx="30" cy="40" rx="22" ry="34" />
      <path d="M30 6 C18 24, 42 56, 30 74" />
    </svg>
  );
}
const PILLAR_MARKS = [Rose, Bean, Eye];

/* ── Reveal helper with reduced-motion fallback ─────────────────────── */
function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* A torn photo that drifts against the scroll. */
function Drift({
  src, alt, rot, speed, className, tape = true,
}: { src: string; alt: string; rot: number; speed: number; className?: string; tape?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed, -speed]);
  return (
    <motion.div ref={ref} className={`${styles.drift} ${className ?? ''}`} style={{ y, rotate: rot }}>
      {tape && <span className={styles.tape} />}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </motion.div>
  );
}

export default function BlackTears() {
  const d = brandPage('black-tears')!;
  const reduce = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const leftX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-18%']);
  const rightX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%']);
  const bottleY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '22%']);
  const bottleR = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 6]);
  const [open, setOpen] = useState<number | null>(null);
  const [first, ...rest] = d.name.toUpperCase().split(' ');
  const product = d.range[0];

  return (
    <div className={styles.page}>
      <div className={styles.grain} aria-hidden />

      {/* ═══ HERO — split wordmark, bottle cutting through ═══ */}
      <section className={styles.hero} ref={hero}>
        <div className={styles.heroTop}>
          <span className={styles.eyebrow}>{d.eyebrow}</span>
          <span className={styles.heroNo}>Nº 001 — La Habana</span>
        </div>

        <div className={styles.wordmark} aria-label={d.name}>
          <motion.span className={styles.wordBack} style={{ x: leftX }}>{first}</motion.span>
          <motion.img
            className={styles.heroBottle}
            src={img('bottle-full')}
            alt={`${d.name} bottle`}
            style={{ y: bottleY, rotate: bottleR }}
            initial={reduce ? false : { opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease }}
          />
          <motion.span className={styles.wordFront} style={{ x: rightX }}>{rest.join(' ')}</motion.span>
        </div>

        <Eye className={styles.heroEye} />
        <Dagger className={styles.heroDagger} />

        <div className={styles.heroFoot}>
          <motion.p
            className={styles.quote}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
          >
            {d.quote}
          </motion.p>
          <span className={styles.scrollCue}>Scroll<i /></span>
        </div>
      </section>

      {/* ═══ FACTS — stamped ticker ═══ */}
      <section className={styles.ticker} aria-label="At a glance">
        <div className={styles.tickerTrack}>
          {[0, 1].map((dup) => (
            <div className={styles.tickerSet} key={dup} aria-hidden={dup === 1}>
              {d.facts.map((f) => (
                <div className={styles.stamp} key={f.label}>
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                  <i>✦</i>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ STORY — scrapbook spread ═══ */}
      <section className={styles.story}>
        <div className={styles.storyText}>
          <Rise><span className={styles.label}>I. The Story</span></Rise>
          <Rise delay={0.05}><h2 className={styles.storyHead}>{d.story.heading}</h2></Rise>
          <div className={styles.storyCols}>
            {d.story.paragraphs.map((p, i) => (
              <Rise delay={0.08 * i} key={i}>
                <p className={i === 0 ? styles.dropcap : undefined}>{p}</p>
              </Rise>
            ))}
          </div>
        </div>
        <div className={styles.collage}>
          <Drift src={img('havana-portrait')} alt="Havana street portrait" rot={-6} speed={40} className={styles.c1} />
          <Drift src={img('street')} alt="Black Tears in a Havana courtyard" rot={5} speed={90} className={styles.c2} />
          <Drift src={img('mural')} alt="Black Tears in front of a Havana mural" rot={-3} speed={60} className={styles.c3} />
          <Rose className={styles.collageRose} />
          <span className={styles.scribble}>Havana, 3pm —<br />coffee &amp; rain</span>
        </div>
      </section>

      {/* ═══ CRAFT — flash sheet ═══ */}
      <section className={styles.craft}>
        <Rise><span className={`${styles.label} ${styles.labelLight}`}>II. The Craft</span></Rise>
        <Rise delay={0.05}><p className={styles.craftStatement}>{d.craft.statement}</p></Rise>
        <div className={styles.flash}>
          {d.craft.pillars.map((p, i) => {
            const Mark = PILLAR_MARKS[i % PILLAR_MARKS.length];
            return (
              <Rise delay={0.1 * i} key={p.title} className={styles.flashCell}>
                <span className={styles.flashNo}>0{i + 1}</span>
                <Mark className={styles.flashMark} />
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Rise>
            );
          })}
        </div>
      </section>

      {/* ═══ PROVENANCE ═══ */}
      {d.values && (
        <section className={styles.prov}>
          <div className={styles.provImg}>
            <Drift src={img('sky')} alt="A bottle of Black Tears held up against the Havana sky" rot={-4} speed={50} tape={false} />
            <div className={styles.provStamp}>
              <span>Traceable</span>
              <strong>CUBA</strong>
              <span>to the field</span>
            </div>
          </div>
          <div className={styles.provText}>
            <Rise><span className={styles.label}>III. {d.values.label}</span></Rise>
            <Rise delay={0.05}><h2 className={styles.provHead}>{d.values.heading}</h2></Rise>
            {d.values.paragraphs.map((p, i) => (
              <Rise delay={0.08 * (i + 1)} key={i}><p>{p}</p></Rise>
            ))}
          </div>
        </section>
      )}

      {/* ═══ RANGE + TASTING — the café menu card ═══ */}
      <section className={styles.menu}>
        <div className={styles.menuBottle}>
          <motion.img
            src={img('bottle-flora')}
            alt={product.name}
            loading="lazy"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease }}
          />
        </div>
        <Rise className={styles.card}>
          <span className={styles.ring} aria-hidden />
          <span className={`${styles.ring} ${styles.ring2}`} aria-hidden />
          <span className={styles.cardKicker}>IV. The Lineup · Carta</span>
          {d.range.map((r) => (
            <div className={styles.cardItem} key={r.name}>
              <div className={styles.cardRow}>
                <h3>{r.name}</h3>
                <span className={styles.leader} />
                <span className={styles.spec}>{r.spec}</span>
              </div>
              <p>{r.note}</p>
            </div>
          ))}

          <div className={styles.cardRule}><span>Tasting notes — {d.tasting.of}</span></div>
          <dl className={styles.notes}>
            {([['Nose', d.tasting.nose], ['Palate', d.tasting.palate], ['Finish', d.tasting.finish]] as const).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.cardServe}><em>Serve —</em> {d.tasting.serve}</p>
        </Rise>
      </section>

      {/* ═══ SERVES — polaroids ═══ */}
      <section className={styles.serves}>
        <div className={styles.servesHead}>
          <Rise><span className={styles.label}>V. Signature serves</span></Rise>
          <Rise delay={0.05}><h2 className={styles.servesTitle}>How to pour.</h2></Rise>
        </div>
        <div className={styles.polaroids}>
          {d.serves.map((s, i) => {
            const isOpen = open === i;
            return (
              <motion.article
                className={styles.polaroid}
                key={s.name}
                style={{ ['--r' as string]: `${[-3, 2, -1.5][i % 3]}deg` }}
                initial={reduce ? false : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                <div className={styles.polaroidImg}>
                  {s.image && <img src={s.image} alt={s.name} loading="lazy" decoding="async" />}
                </div>
                <h3>{s.name}</h3>
                <p>{s.build}</p>
                <button
                  className={styles.recipeBtn}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />} {isOpen ? 'Close recipe' : 'View recipe'}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dl
                      className={styles.recipe}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <div><dt>Method</dt><dd>{s.method}</dd></div>
                      <div><dt>Glass</dt><dd>{s.glass}</dd></div>
                    </motion.dl>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ═══ AFTER DARK — full-bleed band ═══ */}
      <section className={styles.dark}>
        <div className={styles.darkPhotos}>
          <Drift src={img('party')} alt="A night out with Black Tears" rot={-5} speed={70} className={styles.d1} tape={false} />
          <Drift src={img('glitter')} alt="Black Tears served neat" rot={4} speed={110} className={styles.d2} tape={false} />
          <Drift src={img('bartender')} alt="Bartender pouring Black Tears" rot={-2} speed={40} className={styles.d3} tape={false} />
        </div>
        <div className={styles.darkText}>
          <Rise><span className={`${styles.label} ${styles.labelLight}`}>VI. After dark</span></Rise>
          <Rise delay={0.05}><h2 className={styles.darkHead}>{d.extra.heading}</h2></Rise>
          <Rise delay={0.1}><p className={styles.darkBody}>{d.extra.body}</p></Rise>
          <ol className={styles.trade}>
            {d.trade.map((t, i) => (
              <Rise delay={0.1 + i * 0.08} key={t}>
                <li><span>{String(i + 1).padStart(2, '0')}</span>{t}</li>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ STOCK CTA ═══ */}
      <section className={styles.stock}>
        <div className={styles.stockStrip}>
          {['cheers', 'toast', 'carnival', 'hand-bottle', 'serve-tiki', 'highball'].map((f, i) => (
            <img key={f} src={img(f)} alt="" loading="lazy" style={{ ['--r' as string]: `${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg` }} />
          ))}
        </div>
        <Rise><h2 className={styles.stockHead}>Stock<br />{d.name}.</h2></Rise>
        <Rise delay={0.08}><p className={styles.stockBody}>{d.stock}</p></Rise>
        <Rise delay={0.14} className={styles.ctaRow}>
          <Link to="/contact" className={styles.ctaPrimary} data-cursor="Contact">
            Become a stockist <ArrowUpRight size={18} />
          </Link>
          <a href={d.site} target="_blank" rel="noreferrer" className={styles.ctaGhost}>
            blacktears.com <ArrowUpRight size={16} />
          </a>
        </Rise>
        <Eye className={styles.stockEye} />
      </section>
    </div>
  );
}
