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

/* Hero sky: three Andes ridges on a 1440x420 canvas, far to near, drawn once
   (midpoint displacement with a few raised peaks) and kept as plain paths. */
const RIDGES = [
  'M0 420L0 223L11 222L22 224L34 223L45 220L56 218L68 213L79 209L90 207L101 208L112 205L124 199L135 192L146 186L158 182L169 172L180 163L191 158L202 150L214 146L225 139L236 128L248 119L259 111L270 125L281 133L292 145L304 157L315 166L326 175L338 185L349 192L360 195L371 199L382 200L394 201L405 202L416 207L428 206L439 205L450 204L461 201L472 201L484 201L495 200L506 196L518 195L529 191L540 190L551 191L562 193L574 196L585 198L596 197L608 199L619 200L630 203L641 204L652 202L664 200L675 199L686 202L698 201L709 201L720 196L731 192L742 189L754 180L765 172L776 168L788 162L799 156L810 147L821 141L832 134L844 124L855 112L866 101L878 89L889 76L900 87L911 102L922 117L934 127L945 137L956 150L968 161L979 169L990 179L1001 185L1012 193L1024 203L1035 209L1046 214L1058 218L1069 219L1080 217L1091 217L1102 220L1114 217L1125 213L1136 208L1148 201L1159 188L1170 178L1181 171L1192 162L1204 153L1215 142L1226 129L1238 118L1249 130L1260 141L1271 153L1282 165L1294 178L1305 190L1316 197L1328 205L1339 210L1350 212L1361 214L1372 214L1384 211L1395 213L1406 211L1418 212L1429 214L1440 215L1440 420Z',
  'M0 420L0 290L11 292L22 296L34 297L45 301L56 300L68 301L79 302L90 302L101 301L112 302L124 303L135 304L146 305L158 307L169 304L180 303L191 305L202 306L214 303L225 303L236 303L248 303L259 300L270 300L281 300L292 302L304 301L315 302L326 303L338 304L349 306L360 304L371 298L382 291L394 284L405 278L416 273L428 265L439 259L450 253L461 244L472 235L484 229L495 221L506 232L518 242L529 249L540 258L551 266L562 271L574 277L585 284L596 291L608 300L619 306L630 310L641 314L652 318L664 320L675 323L686 326L698 332L709 332L720 336L731 336L742 336L754 334L765 333L776 333L788 331L799 333L810 336L821 332L832 329L844 328L855 325L866 326L878 327L889 326L900 324L911 325L922 323L934 322L945 323L956 323L968 325L979 324L990 320L1001 317L1012 311L1024 305L1035 299L1046 290L1058 282L1069 276L1080 268L1091 261L1102 251L1114 239L1125 248L1136 257L1148 262L1159 268L1170 270L1181 277L1192 282L1204 289L1215 295L1226 296L1238 300L1249 301L1260 304L1271 306L1282 304L1294 304L1305 306L1316 308L1328 308L1339 306L1350 305L1361 304L1372 302L1384 299L1395 296L1406 292L1418 290L1429 288L1440 288L1440 420Z',
  'M0 420L0 351L11 350L22 350L34 348L45 346L56 343L68 340L79 336L90 331L101 328L112 325L124 321L135 317L146 323L158 328L169 333L180 338L191 343L202 346L214 350L225 354L236 357L248 359L259 361L270 361L281 361L292 361L304 361L315 361L326 360L338 360L349 357L360 356L371 356L382 356L394 356L405 357L416 358L428 360L439 360L450 361L461 362L472 362L484 364L495 366L506 366L518 366L529 365L540 365L551 365L562 364L574 364L585 363L596 362L608 361L619 360L630 358L641 357L652 357L664 356L675 355L686 355L698 354L709 353L720 353L731 354L742 356L754 358L765 360L776 361L788 363L799 365L810 365L821 364L832 364L844 365L855 364L866 364L878 364L889 363L900 363L911 363L922 364L934 363L945 362L956 361L968 360L979 359L990 359L1001 358L1012 357L1024 356L1035 356L1046 355L1058 353L1069 352L1080 351L1091 351L1102 351L1114 351L1125 351L1136 350L1148 350L1159 350L1170 350L1181 350L1192 351L1204 352L1215 350L1226 349L1238 347L1249 345L1260 341L1271 336L1282 330L1294 324L1305 318L1316 311L1328 318L1339 324L1350 331L1361 335L1372 338L1384 343L1395 346L1406 348L1418 350L1429 350L1440 350L1440 420Z',
];
/* Fixed, not random, so the sky is the same on every render. */
const STARS = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 23 + 7) % 42,
  d: (i % 5) * 0.7,
  s: i % 3 === 0 ? 3 : 2,
}));
const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  x: 8 + ((i * 53) % 84),
  d: (i * 0.83) % 7,
  t: 7 + (i % 4) * 1.6,
}));

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
  const bottleY = useTransform(hp, [0, 1], reduce ? ['0%', '0%'] : ['0%', '14%']);
  const sunY = useTransform(hp, [0, 1], reduce ? ['0%', '0%'] : ['0%', '40%']);
  const farY = useTransform(hp, [0, 1], reduce ? ['0%', '0%'] : ['0%', '22%']);
  const midY = useTransform(hp, [0, 1], reduce ? ['0%', '0%'] : ['0%', '12%']);
  const ridgeY = [farY, midY, undefined];
  /* As the hero scrolls away the side bottles fan out and tip, and Acholado
     steps forward. */
  const still = (v: number) => (reduce ? [v, v] : null);
  const sideX = useTransform(hp, [0, 0.7], still(0) ?? [0, 70]);
  const sideR = useTransform(hp, [0, 0.7], still(0) ?? [0, 14]);
  const sideY = useTransform(hp, [0, 0.7], still(0) ?? [0, -20]);
  const leftX = useTransform(sideX, (v) => `${-v}%`);
  const rightX = useTransform(sideX, (v) => `${v}%`);
  const leftR = useTransform(sideR, (v) => -v);
  const mainScale = useTransform(hp, [0, 0.7], still(1) ?? [1, 1.14]);
  const mainY = useTransform(hp, [0, 0.7], still(0) ?? [0, -30]);
  const bottleScroll = {
    quebranta: { x: leftX, rotate: leftR, y: sideY },
    'italia-plain': { x: rightX, rotate: sideR, y: sideY },
    acholado: { scale: mainScale, y: mainY },
  };

  const passRef = useRef<HTMLElement>(null);
  const { scrollYProgress: pp } = useScroll({ target: passRef, offset: ['start 80%', 'center 45%'] });
  const passDraw = useTransform(pp, [0, 1], reduce ? [1, 1] : [0, 1]);

  const bandRef = useRef<HTMLElement>(null);
  const { scrollYProgress: bp } = useScroll({ target: bandRef, offset: ['start end', 'end start'] });
  const bandY = useTransform(bp, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%']);

  const [lede, ...rest] = d.story.paragraphs;

  return (
    <article className={styles.page}>
      {/* ── Hero: dusk over the Andes — the sun comes up behind the bottles ── */}
      <header className={`${styles.hero} ${reduce ? styles.still : ''}`} ref={heroRef}>
        <div className={styles.sky} aria-hidden="true">
          {STARS.map((st, i) => (
            <i
              key={i}
              className={styles.star}
              style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDelay: `${st.d}s` }}
            />
          ))}
          <motion.div className={styles.sunWrap} style={{ y: sunY }}>
            <motion.div
              className={styles.sun}
              initial={reduce ? false : { y: '55%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 2.2, delay: 0.1, ease }}
            />
          </motion.div>
          {RIDGES.map((path, i) => (
            /* Outer layer drifts with the scroll, inner one rises in on load. */
            <motion.div key={i} className={`${styles.ridge} ${styles[`ridge${i}`]}`} style={{ y: ridgeY[i] }}>
              <motion.svg
                viewBox="0 0 1440 420"
                preserveAspectRatio="xMidYMax slice"
                initial={reduce ? false : { opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, delay: 0.3 + i * 0.18, ease }}
              >
                <path d={path} />
              </motion.svg>
            </motion.div>
          ))}
          {EMBERS.map((e, i) => (
            <i
              key={i}
              className={styles.ember}
              style={{ left: `${e.x}%`, animationDelay: `${e.d}s`, animationDuration: `${e.t}s` }}
            />
          ))}
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
            {/* One letter at a time, rising out of the ridge line. */}
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

        {/* Acholado leads; Quebranta and Italia stand behind it, one each side.
            Each rises in, then idles with a slow float. */}
        <motion.div className={styles.trio} style={{ y: bottleY }}>
          {[
            { f: 'quebranta', cls: styles.trioLeft, i: 1, delay: 1.15 },
            { f: 'italia-plain', cls: styles.trioRight, i: 2, delay: 1.3 },
            { f: 'acholado', cls: styles.trioMain, i: 0, delay: 0.95 },
          ].map(({ f, cls, i, delay }) => (
            /* Three layers, so the motions never fight over one transform:
               the span floats (CSS), the middle layer follows the scroll, and
               the image itself rises in on load. */
            <span key={f} className={`${styles.trioBottle} ${cls}`}>
              <motion.span className={styles.trioScroll} style={bottleScroll[f as keyof typeof bottleScroll]}>
                <motion.img
                  src={img(f)}
                  alt={`${d.range[i].name} bottle`}
                  initial={reduce ? false : { opacity: 0, y: 120 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay, ease }}
                />
              </motion.span>
            </span>
          ))}
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
              Meet the three
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
