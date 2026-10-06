import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import styles from './DemonioDeLosAndes.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const img = (f: string) => `/images/brands/demonio-de-los-andes/${f}.webp`;

/* What the pisco rules forbid — the four shortcuts named in the values copy. */
const FORBIDDEN = ['Water', 'Sugar', 'Wood', 'Colour'];
/* Capsule colours, in range order: red Acholado, blue Quebranta, green Italia. */
const CAPSULE = ['#b3202a', '#1f3f8f', '#2f7a3d'];
const STATIONS = ['Grape', 'Still', 'Bottle'];

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

/** Stepped Andean cross. */
function Chakana({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 1h6v4h4v4h4v6h-4v4h-4v4H9v-4H5v-4H1V9h4V5h4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  );
}

/** A woven manta band — zig-zags, diamonds and steps, tiled horizontally. */
function Weave({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const id = useId().replace(/:/g, '');
  return (
    <div className={`${styles.weave} ${tone === 'dark' ? styles.weaveDark : ''}`} aria-hidden="true">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <pattern id={`w${id}`} width="48" height="40" patternUnits="userSpaceOnUse">
            <rect width="48" height="40" fill="var(--wv-bg)" />
            <rect y="0" width="48" height="4" fill="var(--wv-a)" />
            <rect y="36" width="48" height="4" fill="var(--wv-a)" />
            <path d="M0 14 L6 8 L12 14 L18 8 L24 14 L30 8 L36 14 L42 8 L48 14" fill="none" stroke="var(--wv-b)" strokeWidth="2" />
            <path d="M0 26 L6 32 L12 26 L18 32 L24 26 L30 32 L36 26 L42 32 L48 26" fill="none" stroke="var(--wv-b)" strokeWidth="2" />
            <path d="M24 13 L31 20 L24 27 L17 20 Z" fill="var(--wv-a)" />
            <path d="M24 17 L27 20 L24 23 L21 20 Z" fill="var(--wv-c)" />
            <rect x="2" y="18" width="4" height="4" fill="var(--wv-c)" />
            <rect x="42" y="18" width="4" height="4" fill="var(--wv-c)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#w${id})`} />
      </svg>
    </div>
  );
}

function Label({ n, children }: { n: string; children: string }) {
  return (
    <p className={styles.label}>
      <Chakana className={styles.labelMark} />
      <span className={styles.labelN}>{n}</span>
      <span>{children}</span>
    </p>
  );
}

export default function DemonioDeLosAndes() {
  const d = brandPage('demonio-de-los-andes')!;
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const wordX = useTransform(hp, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-18%']);
  const bottleY = useTransform(hp, [0, 1], reduce ? ['0%', '0%'] : ['0%', '14%']);
  const stageY = useTransform(hp, [0, 1], reduce ? ['0%', '0%'] : ['0%', '8%']);

  const passRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pp } = useScroll({ target: passRef, offset: ['start 80%', 'center 45%'] });
  const passDraw = useTransform(pp, [0, 1], reduce ? [1, 1] : [0, 1]);

  const bandRef = useRef<HTMLElement>(null);
  const { scrollYProgress: bp } = useScroll({ target: bandRef, offset: ['start end', 'end start'] });
  const bandY = useTransform(bp, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%']);

  const [lede, ...rest] = d.story.paragraphs;

  return (
    <article className={styles.page}>
      {/* ── Hero: the horseman on a sunlit wall ─────────────────── */}
      <header className={styles.hero} ref={heroRef}>
        <motion.div className={styles.bigWord} style={{ x: wordX }} aria-hidden="true">
          DEMONIO
        </motion.div>

        <div className={styles.heroGrid}>
          <motion.div
            className={styles.heroText}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          >
            <motion.p variants={rise} className={styles.eyebrow}>
              <Chakana className={styles.eyebrowMark} />
              {d.eyebrow}
            </motion.p>
            <motion.h1 variants={rise} className={styles.title}>
              {d.name}
            </motion.h1>
            <motion.p variants={rise} className={styles.quote}>
              “{d.quote}”
            </motion.p>
            <motion.div variants={rise} className={styles.ctas}>
              <Link to="/contact" className={styles.btnRed}>
                Become a stockist <ArrowUpRight size={16} />
              </Link>
              <a href="#range" className={styles.btnLine}>
                Meet the three
              </a>
            </motion.div>
          </motion.div>

          <div className={styles.stage}>
            <motion.img
              src={img('backdrop')}
              alt=""
              className={styles.stageBg}
              style={{ y: stageY }}
              fetchPriority="high"
            />
            <div className={styles.stageArch} />
            <motion.img
              src={img('acholado')}
              alt={`${d.range[0].name} bottle`}
              className={styles.stageBottle}
              style={{ y: bottleY }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease }}
            />
            <span className={styles.stageTag}>Acholado · Ica</span>
          </div>
        </div>
        <Weave />
      </header>

      {/* ── Facts as a woven register ───────────────────────────── */}
      <section className={styles.facts} aria-label="At a glance">
        {d.facts.map((f, i) => (
          <motion.div
            key={f.label}
            className={styles.fact}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
          >
            <span className={styles.factValue}>{f.value}</span>
            <span className={styles.factLabel}>{f.label}</span>
          </motion.div>
        ))}
      </section>

      {/* ── Story ───────────────────────────────────────────────── */}
      <section className={styles.story}>
        <div className={styles.storyHead}>
          <Label n="I">The story</Label>
          <motion.h2
            className={styles.h2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            variants={rise}
          >
            {d.story.heading}
          </motion.h2>
          <motion.figure
            className={styles.storyFig}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.1, ease }}
          >
            <img src="/images/demonio-de-los-andes-pisco-peru.webp" alt="Demonio de los Andes pisco with grapes and a Pisco Sour" loading="lazy" />
          </motion.figure>
        </div>
        <div className={styles.storyBody}>
          <motion.p
            className={styles.lede}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            variants={rise}
          >
            {lede}
          </motion.p>
          {rest.map((p, i) => (
            <motion.p
              key={i}
              className={styles.para}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10%' }}
              variants={rise}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── Craft: one pass, drawn once ─────────────────────────── */}
      <section className={styles.pass} ref={passRef}>
        <div className={styles.passInner}>
          <Label n="II">The craft</Label>
          <motion.p
            className={styles.statement}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            variants={rise}
          >
            {d.craft.statement}
          </motion.p>

          <div className={styles.route}>
            <svg className={styles.routeSvg} viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
              {/* The second distillation pisco never gets — a loop that is struck out. */}
              <path className={styles.ghostLoop} d="M500 80 C 560 -10, 680 -10, 640 70 C 610 130, 520 120, 500 80" />
              <line className={styles.ghostStrike} x1="560" y1="10" x2="640" y2="110" />
              <path className={styles.routeBase} d="M60 80 H940" />
              <motion.path className={styles.routeLine} d="M60 80 H940" style={{ pathLength: passDraw }} />
            </svg>
            <span className={styles.ghostNote}>No second pass</span>
            <ol className={styles.stations}>
              {STATIONS.map((s, i) => (
                <li key={s} className={styles.station}>
                  <span className={styles.stationDot}>
                    <Chakana />
                  </span>
                  <span className={styles.stationName}>{s}</span>
                  <span className={styles.stationNum}>0{i + 1}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.pillars}>
            {d.craft.pillars.map((p, i) => (
              <motion.div
                key={p.title}
                className={styles.pillar}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.85, delay: i * 0.1, ease }}
              >
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values: what the law forbids ────────────────────────── */}
      {d.values && (
        <section className={styles.rules}>
          <Weave tone="dark" />
          <div className={styles.rulesInner}>
            <div>
              <Label n="III">{d.values.label}</Label>
              <motion.h2
                className={styles.rulesTitle}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10%' }}
                variants={rise}
              >
                {d.values.heading}
              </motion.h2>
              <ul className={styles.seals}>
                {FORBIDDEN.map((f, i) => (
                  <motion.li
                    key={f}
                    className={styles.seal}
                    initial={{ opacity: 0, scale: 1.4, rotate: -14 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 6 : -6 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.3, 1.4, 0.5, 1] }}
                  >
                    <span className={styles.sealNo}>No</span>
                    <span className={styles.sealWord}>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className={styles.rulesText}>
              {d.values.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-10%' }}
                  variants={rise}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Range: three capsules ───────────────────────────────── */}
      <section className={styles.range} id="range">
        <div className={styles.rangeHead}>
          <Label n="IV">The range</Label>
          <h2 className={styles.h2}>Three bottles. One pass each.</h2>
        </div>
        <div className={styles.cards}>
          {d.range.map((r, i) => (
            <motion.article
              key={r.name}
              className={styles.card}
              style={{ ['--cap' as string]: CAPSULE[i % CAPSULE.length] }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease }}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardNum}>0{i + 1}</span>
                <span className={styles.cardSpec}>{r.spec}</span>
              </div>
              <div className={styles.cardStage}>
                <span className={styles.cardDisc} />
                {r.image && <img src={r.image} alt={`${r.name} bottle`} loading="lazy" className={styles.cardBottle} />}
              </div>
              <h3 className={styles.cardName}>
                <small>Demonio de los Andes</small>
                {r.name.replace('Demonio de los Andes ', '')}
              </h3>
              <p className={styles.cardNote}>{r.note}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Tasting over the Ica vineyard ───────────────────────── */}
      <section className={styles.band} ref={bandRef}>
        <motion.img src={img('vineyard')} alt="Sunset over the Tacama vineyard, Ica" className={styles.bandImg} style={{ y: bandY }} loading="lazy" />
        <div className={styles.bandShade} />
        <motion.div
          className={styles.tasting}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease }}
        >
          <p className={styles.tastingKicker}>Tasting notes</p>
          <h2 className={styles.tastingTitle}>{d.tasting.of}</h2>
          <dl className={styles.notes}>
            {([['Nose', d.tasting.nose], ['Palate', d.tasting.palate], ['Finish', d.tasting.finish]] as const).map(([k, v]) => (
              <div key={k} className={styles.note}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.tastingServe}>{d.tasting.serve}</p>
        </motion.div>
      </section>

      {/* ── Serves: the bar menu ────────────────────────────────── */}
      <section className={styles.serves}>
        <div className={styles.servesHead}>
          <Label n="V">Signature serves</Label>
          <h2 className={styles.h2}>From the barra.</h2>
        </div>
        <ul className={styles.menu}>
          {d.serves.map((s, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={s.name}
                className={`${styles.menuRow} ${isOpen ? styles.menuOpen : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
              >
                {s.image && (
                  <div className={styles.menuImg}>
                    <img src={s.image} alt={s.name} loading="lazy" />
                  </div>
                )}
                <div className={styles.menuBody}>
                  <div className={styles.menuLine}>
                    <h3>{s.name}</h3>
                    <i className={styles.dots} />
                    <span className={styles.menuGlass}>{s.glass}</span>
                  </div>
                  <p className={styles.menuBuild}>{s.build}</p>
                  <button
                    type="button"
                    className={styles.recipeBtn}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />} {isOpen ? 'Hide recipe' : 'View recipe'}
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
                </div>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* ── Legend + trade ──────────────────────────────────────── */}
      <section className={styles.legend}>
        <motion.div
          className={styles.poster}
          initial={{ opacity: 0, rotate: -4, y: 30 }}
          whileInView={{ opacity: 1, rotate: -1.5, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease }}
        >
          <div className={styles.posterFrame}>
            <p className={styles.posterKicker}>Leyenda · Siglo XVI</p>
            <div className={styles.posterRider}>
              <img src="/images/house-demonio-de-los-andes.webp" alt="" loading="lazy" />
            </div>
            <h2 className={styles.posterTitle}>{d.extra.heading}</h2>
            <p className={styles.posterBody}>{d.extra.body}</p>
            <div className={styles.posterFoot}>
              <Chakana /> <span>Ica · Perú</span> <Chakana />
            </div>
          </div>
        </motion.div>

        <div className={styles.tradeCol}>
          <div className={styles.estate}>
            <img src={img('estate')} alt="The tree-lined road through the Tacama estate" loading="lazy" />
          </div>
          <Label n="VI">Where it works</Label>
          <ol className={styles.trade}>
            {d.trade.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
              >
                <span>0{i + 1}</span>
                {t}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Stock CTA ───────────────────────────────────────────── */}
      <section className={styles.cta}>
        <Weave tone="dark" />
        <div className={styles.ctaInner}>
          <div className={styles.ctaText}>
            <p className={styles.ctaKicker}>Trade enquiries</p>
            <h2 className={styles.ctaTitle}>
              Stock <em>{d.name}.</em>
            </h2>
            <p className={styles.ctaBody}>{d.stock}</p>
            <div className={styles.ctas}>
              <Link to="/contact" className={styles.btnRed}>
                Become a stockist <ArrowUpRight size={16} />
              </Link>
              {d.site && (
                <a href={d.site} target="_blank" rel="noreferrer" className={styles.btnLineLight}>
                  Visit Tacama <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
          <motion.img
            src={img('lineup')}
            alt="The Demonio de los Andes family of piscos"
            className={styles.ctaImg}
            loading="lazy"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease }}
          />
        </div>
      </section>
    </article>
  );
}
