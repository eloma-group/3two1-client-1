import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import styles from './WorthyPark.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const img = (f: string) => `/images/brands/worthy-park/${f}.webp`;

/* The one-estate journey — stages only, no invented dates. */
const JOURNEY = ['Cane', 'Molasses', 'Ferment', 'Pot still', 'Tropical ageing', 'Bottle'];
const NOTHING_ADDED = ['Sugar', 'Glycerol', 'Colouring', 'Flavouring'];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const parseSpec = (spec: string) => {
  const [abv, size] = spec.split('·').map((part) => part.trim());
  return { abv: abv.replace(' ABV', ''), size };
};

/* The estate register beside the bottle. Every line is from the brand copy. */
const LEDGER = (abv: string, size: string) => [
  ['Estate', 'Lluidas Vale, Jamaica'],
  ['Still', '100% pot still'],
  ['Ageing', 'Tropical, 5+ years'],
  ['Strength', `${abv} ABV · ${size}`],
  ['Added', 'Nothing. Ever.'],
];

const SEAL_TEXT = 'Single Estate · Lluidas Vale · Est. 1670 · ';

function Folio({ n, label }: { n: string; label: string }) {
  return (
    <p className={styles.folio}>
      <span>Folio {n}</span>
      <i />
      <span>{label}</span>
    </p>
  );
}

export default function WorthyPark() {
  const b = brandPage('worthy-park')!;
  const reduce = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bottleY = useTransform(heroP, [0, 1], reduce ? ['0%', '0%'] : ['0%', '14%']);
  const sealR = useTransform(heroP, [0, 1], reduce ? [0, 0] : [0, 120]);
  const [first, ...rest] = b.name.split(' ');
  const reserve = b.range[0];
  const { abv, size } = parseSpec(reserve.spec);

  const journeyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: jP } = useScroll({ target: journeyRef, offset: ['start end', 'end start'] });
  const lineScale = useTransform(jP, [0.15, 0.7], [0, 1]);

  const stillRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sP } = useScroll({ target: stillRef, offset: ['start end', 'end start'] });
  const stillY = useTransform(sP, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);

  const [openServe, setOpenServe] = useState<number | null>(null);

  return (
    <article className={styles.page}>
      {/* ── Hero — the estate ledger: name and pitch on the left, the bottle in
             a gilt arch under a turning estate seal, the register on the right. */}
      <header className={styles.hero} ref={heroRef}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <motion.p className={styles.heroEyebrow} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease }}>
              <span className={styles.seal}>WP</span>
              {b.eyebrow}
            </motion.p>
            <h1 className={styles.heroTitle}>
              {[first, rest.join(' ')].map((word, i) => (
                <span key={word} className={styles.heroTitleLine}>
                  <motion.span
                    className={i ? styles.heroTitleItalic : undefined}
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p className={styles.heroQuote} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease }}>
              “{b.quote}”
            </motion.p>
            <motion.div className={styles.heroCtas} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease }}>
              <Link to="/contact" className={styles.btnGold}>
                Become a stockist <ArrowUpRight size={16} />
              </Link>
              <a href="#wp-register" className={styles.btnGhost}>
                Open the register
              </a>
            </motion.div>
          </div>

          <motion.div
            className={styles.heroArch}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
          >
            <motion.svg className={styles.heroSeal} viewBox="0 0 200 200" style={{ rotate: sealR }} aria-hidden>
              <defs>
                <path id="wp-seal-ring" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
              </defs>
              <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="1" />
              <text>
                <textPath href="#wp-seal-ring" textLength="490">{SEAL_TEXT.repeat(2)}</textPath>
              </text>
              <text x="100" y="112" textAnchor="middle" className={styles.heroSealMark}>WP</text>
            </motion.svg>
            <motion.img
              className={styles.heroBottle}
              src={reserve.image}
              alt={`${b.name} ${reserve.name} bottle`}
              style={{ y: bottleY }}
            />
            <span className={styles.heroArchFoot}>{reserve.name}</span>
          </motion.div>

          <motion.dl className={styles.heroLedger} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7, ease }}>
            <p className={styles.heroLedgerHead}>Estate register</p>
            {LEDGER(abv, size).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className={styles.heroFoot}>
          <span>Est. Lluidas Vale</span>
          <span>Cane to bottle, one estate</span>
          <span>Scroll</span>
        </div>
      </header>

      {/* ── Facts as a ledger line ─────────────────────── */}
      <section className={styles.facts}>
        {b.facts.map((f, i) => (
          <motion.div
            key={f.label}
            className={styles.fact}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
          >
            <span className={styles.factNo}>No. {String(i + 1).padStart(2, '0')}</span>
            <strong>{f.value}</strong>
            <span>{f.label}</span>
          </motion.div>
        ))}
      </section>

      {/* ── Story ──────────────────────────────────────── */}
      <section className={`${styles.parchment} ${styles.story}`}>
        <div className={styles.storyAside}>
          <Folio n="I" label="The Story" />
          <motion.h2
            className={styles.storyTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            {b.story.heading}
          </motion.h2>
          <div className={styles.storyStamp} aria-hidden>
            <span>Lluidas</span>
            <b>Vale</b>
            <span>Jamaica</span>
          </div>
        </div>
        <div className={styles.storyBody}>
          {b.story.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className={i === 0 ? styles.dropcap : undefined}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: i * 0.05, ease }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── One-estate journey ─────────────────────────── */}
      <section className={styles.journey} ref={journeyRef}>
        <div className={styles.journeyHead}>
          <Folio n="II" label="Within sight of one valley" />
          <h2 className={styles.journeyTitle}>
            Six stages. <em>One estate.</em>
          </h2>
        </div>
        <div className={styles.journeyTrack}>
          <div className={styles.journeyRail}>
            <motion.i style={{ scaleX: lineScale }} className={styles.railFillX} />
            <motion.i style={{ scaleY: lineScale }} className={styles.railFillY} />
          </div>
          <ol className={styles.journeyList}>
            {JOURNEY.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: 0.7, delay: i * 0.09, ease }}
              >
                <span className={styles.node} />
                <span className={styles.stageNo}>{ROMAN[i]}</span>
                <span className={styles.stageName}>{s}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Craft: pot still + ledger entries ──────────── */}
      <section className={styles.craft}>
        <div className={styles.craftMedia} ref={stillRef}>
          <motion.img
            style={{ y: stillY }}
            src={img('pot-still')}
            alt="Copper double-retort pot still at Worthy Park"
            loading="lazy"
          />
          <span className={styles.craftCaption}>The double-retort pot still · Lluidas Vale</span>
        </div>
        <div className={styles.craftText}>
          <Folio n="III" label="The Craft" />
          <motion.p
            className={styles.craftStatement}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            {b.craft.statement}
          </motion.p>
          <ul className={styles.entries}>
            {b.craft.pillars.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              >
                <span className={styles.entryNo}>{String(i + 1).padStart(3, '0')}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Values: nothing added ──────────────────────── */}
      {b.values && (
        <section className={`${styles.parchment} ${styles.values}`}>
          <div className={styles.valuesStrike}>
            <p className={styles.smallcaps}>Never in the bottle</p>
            <ul>
              {NOTHING_ADDED.map((w, i) => (
                <li key={w}>
                  <span>{w}</span>
                  <motion.i
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-15%' }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.18, ease }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.valuesText}>
            <Folio n="IV" label={b.values.label} />
            <h2>{b.values.heading}</h2>
            {b.values.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* ── Range: the estate register ─────────────────── */}
      <section className={styles.range} id="wp-register">
        <div className={styles.rangeHead}>
          <Folio n="V" label="The Range" />
          <h2>The estate register.</h2>
        </div>
        <div className={styles.rangeGrid}>
          <motion.figure
            className={styles.rangeFigure}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            <img src={img('range')} alt="The Worthy Park and Rum-Bar lineup" loading="lazy" />
            <figcaption>The family of bottles — Worthy Park &amp; Rum-Bar</figcaption>
          </motion.figure>
          <div className={styles.register} role="table" aria-label="Worthy Park range">
            <div className={`${styles.row} ${styles.rowHead}`} role="row">
              <span role="columnheader">No.</span>
              <span role="columnheader">Expression</span>
              <span role="columnheader">ABV</span>
              <span role="columnheader">Size</span>
            </div>
            {b.range.map((r, i) => {
              const { abv, size } = parseSpec(r.spec);
              return (
                <motion.div
                  key={r.name}
                  className={styles.row}
                  role="row"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease }}
                >
                  <span role="cell" className={styles.rowNo}>{ROMAN[i]}</span>
                  <span role="cell" className={styles.rowName}>
                    <b>{r.name}</b>
                    <em>{r.note}</em>
                  </span>
                  <span role="cell" className={styles.rowAbv}>{abv}</span>
                  <span role="cell" className={styles.rowSize}>{size}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tasting ────────────────────────────────────── */}
      <section className={styles.tasting}>
        <div className={styles.tastingBottle}>
          <motion.img
            src={b.range[0].image}
            alt={b.tasting.of}
            loading="lazy"
            initial={{ opacity: 0, y: 50, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease }}
          />
        </div>
        <div className={styles.tastingText}>
          <Folio n="VI" label={`Tasting notes — ${b.tasting.of}`} />
          <h2>The pour.</h2>
          <dl className={styles.notes}>
            {([
              ['Nose', b.tasting.nose],
              ['Palate', b.tasting.palate],
              ['Finish', b.tasting.finish],
            ] as const).map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              >
                <dt>{k}</dt>
                <dd>{v}</dd>
              </motion.div>
            ))}
          </dl>
          <p className={styles.serveNote}>{b.tasting.serve}</p>
        </div>
      </section>

      {/* ── Serves as framed plates ────────────────────── */}
      <section className={`${styles.parchment} ${styles.serves}`}>
        <div className={styles.servesHead}>
          <Folio n="VII" label="Signature serves" />
          <h2>How to pour.</h2>
        </div>
        <div className={styles.plates}>
          {b.serves.map((s, i) => {
            const open = openServe === i;
            return (
              <motion.article
                key={s.name}
                className={styles.plate}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, delay: i * 0.1, ease }}
              >
                <div className={styles.plateFrame}>
                  <img src={s.image} alt={s.name} loading="lazy" />
                  <span className={styles.plateNo}>Plate {ROMAN[i]}</span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.build}</p>
                <button
                  className={styles.recipeBtn}
                  onClick={() => setOpenServe(open ? null : i)}
                  aria-expanded={open}
                >
                  {open ? <Minus size={14} /> : <Plus size={14} />} View recipe
                </button>
                <AnimatePresence initial={false}>
                  {open && (
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

      {/* ── Extra + trade ──────────────────────────────── */}
      <section className={styles.honours}>
        <motion.img
          className={styles.badge}
          src={img('iwsc')}
          alt="IWSC 2025 Rum Producer Trophy"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
        />
        <div className={styles.honoursText}>
          <Folio n="VIII" label="Honours" />
          <h2>{b.extra.heading}</h2>
          <p>{b.extra.body}</p>
        </div>
        <div className={styles.trade}>
          <p className={styles.smallcaps}>Where it works</p>
          <ul>
            {b.trade.map((t, i) => (
              <li key={t}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Stock CTA ──────────────────────────────────── */}
      <section className={styles.stock}>
        <img className={styles.stockBg} src={img('estate-editions')} alt="" aria-hidden loading="lazy" />
        <div className={styles.stockInner}>
          <p className={styles.smallcaps}>Trade enquiries</p>
          <h2>
            Stock <em>{b.name}.</em>
          </h2>
          <p>{b.stock}</p>
          <div className={styles.heroCtas}>
            <Link to="/contact" className={styles.btnGold}>
              Become a stockist <ArrowUpRight size={16} />
            </Link>
            <a href={b.site} target="_blank" rel="noreferrer" className={styles.btnGhost}>
              Visit the estate <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
