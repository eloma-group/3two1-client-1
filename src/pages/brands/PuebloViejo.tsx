import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import Reveal from '../../components/Reveal';
import styles from './PuebloViejo.module.css';

const img = (f: string) => `/images/brands/pueblo-viejo/${f}.webp`;
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* Papel picado — each flag is a cut-paper sheet. The cut-outs are a mask, so
   the paper really is pierced and the hero shows through the holes. */
const FLAG_COLOURS = ['#e2356f', '#f2a516', '#1f8a87', '#c8522d', '#7a3fa0', '#e2356f', '#f2a516', '#1f8a87', '#c8522d', '#7a3fa0', '#e2356f', '#f2a516'];

function Flag({ colour, variant, i }: { colour: string; variant: number; i: number }) {
  const id = `pv-flag-${i}`;
  return (
    <svg className={styles.flag} viewBox="0 0 100 124" style={{ animationDelay: `${(i % 5) * -0.7}s` }} aria-hidden>
      <defs>
        <mask id={id}>
          <rect width="100" height="124" fill="#fff" />
          {variant === 0 && (
            <g fill="#000">
              <circle cx="50" cy="50" r="15" />
              <circle cx="50" cy="50" r="22" fill="none" stroke="#000" strokeWidth="3" strokeDasharray="4 4" />
              {[0, 1, 2, 3].map((k) => <rect key={k} x={14 + k * 22} y="88" width="8" height="8" transform={`rotate(45 ${18 + k * 22} 92)`} />)}
              <path d="M50 18 l4 8 h-8z M50 82 l4 -8 h-8z M18 50 l8 4 v-8z M82 50 l-8 4 v-8z" />
            </g>
          )}
          {variant === 1 && (
            <g fill="#000">
              <path d="M50 30 C 40 18, 22 26, 30 44 L50 66 L70 44 C 78 26, 60 18, 50 30Z" />
              {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={14 + k * 18} cy="88" r="4" />)}
              {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={10 + k * 16} cy="14" r="2.5" />)}
            </g>
          )}
          {variant === 2 && (
            <g fill="#000">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
                <ellipse key={k} cx="50" cy="32" rx="5" ry="13" transform={`rotate(${k * 45} 50 50)`} />
              ))}
              <circle cx="50" cy="50" r="5" />
              <path d="M12 86 h76 v4 h-76z M20 96 h60 v3 h-60z" />
            </g>
          )}
        </mask>
      </defs>
      <path
        d="M0 0 H100 V108 l-8.33 12 l-8.33 -12 l-8.33 12 l-8.33 -12 l-8.33 12 l-8.33 -12 l-8.33 12 l-8.33 -12 l-8.33 12 l-8.33 -12 l-8.33 12 l-8.37 -12 Z"
        fill={colour}
        mask={`url(#${id})`}
      />
    </svg>
  );
}

function PapelPicado() {
  return (
    <div className={styles.picado} aria-hidden>
      <span className={styles.string} />
      <div className={styles.flags}>
        {FLAG_COLOURS.map((c, i) => <Flag key={i} colour={c} variant={i % 3} i={i} />)}
      </div>
    </div>
  );
}

const ROMAN = ['I', 'II', 'III', 'IV'];

function LoteriaCard({ n, name, spec, note, image }: { n: number; name: string; spec: string; note: string; image?: string }) {
  const [flipped, setFlipped] = useState(false);
  const short = name.replace('Pueblo Viejo ', '');
  return (
    <motion.button
      type="button"
      className={`${styles.card} ${flipped ? styles.cardFlipped : ''}`}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${name} — ${flipped ? 'show card' : 'show tasting note'}`}
      initial={{ opacity: 0, y: 60, rotate: n % 2 ? -4 : 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: n === 2 ? 0 : n === 1 ? -3 : 3 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1, delay: n * 0.12, ease }}
    >
      <span className={styles.cardInner}>
        <span className={styles.cardFront}>
          <span className={styles.cardTop}>
            <span>No. {n}</span>
            <span>{spec.split(' · ')[0]}</span>
          </span>
          <span className={styles.cardArt}>
            <span className={styles.cardSun} />
            {image && <img src={image} alt={name} loading="lazy" />}
          </span>
          <span className={styles.cardName}>El {short}</span>
        </span>
        <span className={styles.cardBack}>
          <span className={styles.cardTop}><span>No. {n}</span><span>Pueblo Viejo</span></span>
          <span className={styles.backName}>{short}</span>
          <span className={styles.backNote}>{note}</span>
          <span className={styles.backSpec}>{spec}</span>
          <img className={styles.backHeart} src={img('heart')} alt="" loading="lazy" />
        </span>
      </span>
    </motion.button>
  );
}

function ServeTile({ s, i }: { s: { name: string; build: string; method: string; glass: string; image?: string }; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.1}>
      <article className={styles.serve}>
      <div className={styles.serveImg}>
        {s.image && <img src={s.image} alt={s.name} loading="lazy" />}
        <span className={styles.stamp}>Receta<br /><b>Nº {String(i + 1).padStart(2, '0')}</b></span>
      </div>
      <div className={styles.serveBody}>
        <h3>{s.name}</h3>
        <p>{s.build}</p>
        <button type="button" className={styles.serveToggle} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Hide recipe' : 'View recipe'} {open ? <Minus size={14} /> : <Plus size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.dl
              className={styles.serveMeta}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <div><dt>Method</dt><dd>{s.method}</dd></div>
              <div><dt>Glass</dt><dd>{s.glass}</dd></div>
            </motion.dl>
          )}
        </AnimatePresence>
      </div>
      </article>
    </Reveal>
  );
}

export default function PuebloViejo() {
  const d = brandPage('pueblo-viejo')!;
  const reduce = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const yCard = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const yMask = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);
  const yPlant = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const rCard = useTransform(scrollYProgress, [0, 1], [4, reduce ? 4 : 10]);

  const [firstWord, ...rest] = d.name.split(' ');
  const marquee = ['100% Agave', 'Lagos de Moreno', 'Jalisco', 'Stone-oven cooked', 'Copper pot', 'Salud'];

  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero} ref={hero}>
        <PapelPicado />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <motion.p className={styles.eyebrow} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }}>
              <span className={styles.dot} /> {d.eyebrow}
            </motion.p>
            <h1 className={styles.title}>
              {[firstWord, rest.join(' ') + '.'].map((w, i) => (
                <span key={w} className={styles.titleLine}>
                  <motion.span
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p className={styles.quote} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.75 }}>
              “{d.quote}”
            </motion.p>
            <motion.div className={styles.heroCtas} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease }}>
              <Link to="/contact" className={styles.btnPink}>Become a stockist <ArrowUpRight size={18} /></Link>
              <a href="#pv-range" className={styles.btnGhost}>Deal the cards</a>
            </motion.div>
          </div>

          <div className={styles.heroArt}>
            <motion.div className={styles.heroCard} style={{ y: yCard, rotate: rCard }}>
              <div className={styles.heroCardTop}><span>No. 1</span><span>Jalisco</span></div>
              <div className={styles.heroCardArt}>
                <span className={styles.heroSun} />
                <img src="/images/house-pueblo-viejo.webp" alt="Pueblo Viejo Blanco tequila bottle" />
              </div>
              <div className={styles.heroCardName}>El Pueblo</div>
            </motion.div>
            <motion.img src={img('mask')} alt="" className={styles.stickerMask} style={{ y: yMask }} />
            <motion.img src={img('plant')} alt="" className={styles.stickerPlant} style={{ y: yPlant }} />
            <img src={img('heart')} alt="" className={styles.stickerHeart} />
          </div>
        </div>

        <div className={styles.ribbon} aria-hidden>
          <div className={styles.ribbonTrack}>
            {[0, 1].map((k) => (
              <span key={k}>
                {marquee.map((m) => <span key={m}>{m}<i>✦</i></span>)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Painted numbers ───────────────────────────────── */}
      <section className={styles.facts}>
        {d.facts.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.08} className={styles.fact}>
            <span className={styles.factValue}>{f.value}</span>
            <span className={styles.factLabel}>{f.label}</span>
          </Reveal>
        ))}
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className={styles.story}>
        <div className={styles.storyAside}>
          <Reveal><p className={styles.chapter}>Capítulo I · The Story</p></Reveal>
          <Reveal delay={0.08}><h2 className={styles.h2}>{d.story.heading}</h2></Reveal>
          <Reveal delay={0.16} className={styles.arch}>
            <img src={img('agave-field')} alt="Blue Weber agave rows in the Jalisco highlands" loading="lazy" />
            <span className={styles.archTag}>Los Altos de Jalisco</span>
          </Reveal>
        </div>
        <div className={styles.storyBody}>
          {d.story.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}><p className={i === 0 ? styles.dropCap : undefined}>{p}</p></Reveal>
          ))}
          <img src={img('bottle-roses')} alt="" className={styles.storyRoses} loading="lazy" />
        </div>
      </section>

      {/* ── Craft — the road from field to still ──────────── */}
      <section className={styles.craft}>
        <div className={styles.craftHead}>
          <Reveal><p className={styles.chapterLight}>Capítulo II · The Craft</p></Reveal>
          <Reveal delay={0.08}><p className={styles.statement}>{d.craft.statement}</p></Reveal>
        </div>
        <div className={styles.path}>
          <svg className={styles.pathLine} viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden>
            <motion.path
              d="M20 120 C 220 10, 380 190, 600 100 S 980 10, 1180 110"
              fill="none"
              stroke="#f2a516"
              strokeWidth="3"
              strokeDasharray="10 12"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease }}
            />
          </svg>
          {d.craft.pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.2 + i * 0.18} className={styles.station}>
              <div className={styles.stationDisc}>
                {i === 0 && <img src={img('agave-field')} alt="" loading="lazy" />}
                {i === 1 && <img src={img('oven')} alt="" loading="lazy" />}
                {i === 2 && <span className={styles.stationStill}>2×</span>}
                <span className={styles.stationNum}>{ROMAN[i]}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Range — the lotería deck ──────────────────────── */}
      <section className={styles.range} id="pv-range">
        <div className={styles.rangeHead}>
          <Reveal><p className={styles.chapter}>Capítulo III · La Baraja</p></Reveal>
          <Reveal delay={0.08}><h2 className={styles.h2}>Three cards. One house.</h2></Reveal>
          <Reveal delay={0.14}><p className={styles.hint}>Tap a card to turn it over.</p></Reveal>
        </div>
        <div className={styles.deck}>
          {d.range.map((r, i) => <LoteriaCard key={r.name} n={i + 1} {...r} />)}
        </div>
      </section>

      {/* ── Tasting — the cantina chalkboard ──────────────── */}
      <section className={styles.tastingWrap}>
        <Reveal className={styles.board}>
          <div className={styles.boardHead}>
            <span>Hoy servimos</span>
            <h2>{d.tasting.of}</h2>
          </div>
          <dl className={styles.boardList}>
            {([['Nose', d.tasting.nose], ['Palate', d.tasting.palate], ['Finish', d.tasting.finish]] as const).map(([k, v]) => (
              <div key={k} className={styles.boardRow}>
                <dt>{k}</dt>
                <span className={styles.leader} />
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.boardServe}><span>La casa recomienda —</span> {d.tasting.serve}</p>
          <img src={img('bottle-roses')} alt="" className={styles.boardBottle} loading="lazy" />
        </Reveal>
      </section>

      {/* ── Serves ────────────────────────────────────────── */}
      <section className={styles.serves}>
        <div className={styles.rangeHead}>
          <Reveal><p className={styles.chapter}>Capítulo IV · Recetas</p></Reveal>
          <Reveal delay={0.08}><h2 className={styles.h2}>How to pour.</h2></Reveal>
        </div>
        <div className={styles.serveGrid}>
          {d.serves.map((s, i) => <ServeTile key={s.name} s={s} i={i} />)}
        </div>
      </section>

      {/* ── For the trade ─────────────────────────────────── */}
      <section className={styles.cantina}>
        <Reveal className={styles.cantinaText}>
          <img src={img('mask')} alt="" className={styles.cantinaMask} loading="lazy" />
          <h2>{d.extra.heading}</h2>
          <p>{d.extra.body}</p>
        </Reveal>
        <ol className={styles.tickets}>
          {d.trade.map((t, i) => (
            <Reveal key={t} delay={i * 0.1}>
              <li className={styles.ticket}>
                <span>0{i + 1}</span>
                <p>{t}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── Stock — the festive sign ──────────────────────── */}
      <section className={styles.signWrap}>
        <Reveal className={styles.sign}>
          <span className={styles.bulbs} aria-hidden>
            {Array.from({ length: 22 }).map((_, i) => <i key={i} style={{ animationDelay: `${(i % 4) * 0.35}s` }} />)}
          </span>
          <p className={styles.signKicker}>¡Abierto para el trade!</p>
          <h2 className={styles.signTitle}>Stock {d.name}.</h2>
          <p className={styles.signBody}>{d.stock}</p>
          <div className={styles.signCtas}>
            <Link to="/contact" className={styles.btnInk}>Become a stockist <ArrowUpRight size={18} /></Link>
            <a href={d.site} target="_blank" rel="noreferrer" className={styles.btnLine}>Visit the casa <ArrowUpRight size={16} /></a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
