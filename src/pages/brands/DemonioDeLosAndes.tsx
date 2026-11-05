import { useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import styles from './DemonioDeLosAndes.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const img = (f: string) => `/images/brands/demonio-de-los-andes/${f}.webp`;

/* What the pisco rules forbid — the shortcuts named in the values copy. */
const FORBIDDEN = ['Sugar', 'Wood', 'Colour'];
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

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bottleY = useTransform(hp, [0, 1], reduce ? ['0%', '0%'] : ['0%', '14%']);
  const photoY = useTransform(hp, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%']);
  /* As the hero scrolls away Acholado steps forward. */
  const mainScale = useTransform(hp, [0, 0.7], reduce ? [1, 1] : [1, 1.14]);
  const mainY = useTransform(hp, [0, 0.7], reduce ? [0, 0] : [0, -30]);

  const passRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pp } = useScroll({ target: passRef, offset: ['start 80%', 'center 45%'] });
  const passDraw = useTransform(pp, [0, 1], reduce ? [1, 1] : [0, 1]);

  const bandRef = useRef<HTMLElement>(null);
  const { scrollYProgress: bp } = useScroll({ target: bandRef, offset: ['start end', 'end start'] });
  const bandY = useTransform(bp, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%']);

  const [lede, ...rest] = d.story.paragraphs;

  return (
    <article className={styles.page}>
      {/* ── Hero: Machu Picchu behind the bottle ── */}
      <header className={`${styles.hero} ${reduce ? styles.still : ''}`} ref={heroRef}>
        <div className={styles.sky} aria-hidden="true">
          {/* Machu Picchu under Huayna Picchu: it settles in on load and drifts
              slower than the page as the hero scrolls away. */}
          <motion.div className={styles.photoWrap} style={{ y: photoY }}>
            <motion.img
              className={styles.photo}
              src={img('machu-picchu')}
              alt=""
              initial={reduce ? false : { scale: 1.12, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease }}
            />
          </motion.div>
          <div className={styles.shade} />
        </div>

        <div className={styles.heroHead}>
          <motion.p
            className={styles.eyebrow}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <Chakana className={styles.eyebrowMark} />
            {d.eyebrow}
          </motion.p>
          <h1 className={styles.title} aria-label={d.name}>
            {/* One letter at a time, rising into place. */}
            <span className={styles.titleMain} aria-hidden="true">
              {'Demonio'.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className={styles.titleChar}
                  initial={reduce ? false : { opacity: 0, y: '60%', rotateX: -70 }}
                  animate={{ opacity: 1, y: '0%', rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.45 + i * 0.07, ease }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <motion.span
              className={styles.titleSub}
              aria-hidden="true"
              initial={reduce ? false : { opacity: 0, letterSpacing: '0.9em' }}
              animate={{ opacity: 1, letterSpacing: '0.42em' }}
              transition={{ duration: 1.4, delay: 1, ease }}
            >
              de los Andes
            </motion.span>
          </h1>
        </div>

        {/* Acholado alone: it rises in, then idles with a slow float. Three
            layers, so the motions never fight over one transform: the span
            floats (CSS), the middle layer follows the scroll, and the image
            itself rises in on load. */}
        <motion.div className={styles.trio} style={{ y: bottleY }}>
          <span className={`${styles.trioBottle} ${styles.trioMain}`}>
            <motion.span className={styles.trioScroll} style={{ scale: mainScale, y: mainY }}>
              <motion.img
                src={img('acholado')}
                alt={`${d.range[0].name} bottle`}
                initial={reduce ? false : { opacity: 0, y: 120 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.95, ease }}
              />
            </motion.span>
          </span>
        </motion.div>

        <motion.div
          className={styles.heroFoot}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease }}
        >
          <p className={styles.quote}>“{d.quote}”</p>
          <div className={styles.ctas}>
            <Link to="/contact" className={styles.btnRed}>
              Become a stockist <ArrowUpRight size={16} />
            </Link>
            <a href="#range" className={styles.btnLineLight}>
              Meet the Acholado
            </a>
          </div>
        </motion.div>
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

      {/* ── Range: Acholado alone (Quebranta and Italia are off the page for now) ── */}
      <section className={styles.range} id="range">
        {d.range.slice(0, 1).map((r, i) => (
          <motion.article
            key={r.name}
            className={styles.feature}
            style={{ ['--cap' as string]: CAPSULE[i % CAPSULE.length] }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.9, ease }}
          >
            <div className={styles.featureText}>
              <div className={styles.rangeHead}>
                <Label n="IV">The range</Label>
                <h2 className={styles.h2}>Meet the Acholado.</h2>
              </div>
              <div className={styles.cardTop}>
                <span className={styles.cardSpec}>{r.spec}</span>
              </div>
              <h3 className={styles.cardName}>
                <small>Demonio de los Andes</small>
                {r.name.replace('Demonio de los Andes ', '')}
              </h3>
              <p className={styles.cardNote}>{r.note}</p>
            </div>
            {/* No frame: the bottle on its own, a soft capsule-red glow behind
                it and its shadow on the ground. */}
            <div className={styles.cardStage}>
              <span className={styles.featureGlow} />
              <span className={styles.cardDisc} />
              {r.image && <img src={r.image} alt={`${r.name} bottle`} loading="lazy" className={styles.cardBottle} />}
              <Chakana className={styles.featureMark} />
            </div>
          </motion.article>
        ))}
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
            return (
              <motion.li
                key={s.name}
                className={styles.menuRow}
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
                  <Link to="/cocktails" className={styles.recipeBtn}>
                    View recipe <ArrowUpRight size={14} />
                  </Link>
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
              <img src="/images/house-demonio-de-los-andes.webp" alt="Bottle of Demonio de los Andes Acholado pisco by Tacama" loading="lazy" />
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
          {/* Acholado on its own: it rises in once, then idles with a slow float. */}
          {d.range[0].image && (
            <motion.div
              className={styles.ctaBottle}
              initial={reduce ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease }}
            >
              <img src={d.range[0].image} alt={`${d.range[0].name} bottle`} loading="lazy" />
            </motion.div>
          )}
        </div>
      </section>
    </article>
  );
}
