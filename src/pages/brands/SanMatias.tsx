import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform,
} from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import Reveal from '../../components/Reveal';
import styles from './SanMatias.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const img = (f: string) => `/images/brands/san-matias/${f}.webp`;

/* Creative Commons photos on this page need their authors credited. */
const PHOTO_CREDITS = [
  { what: 'Agave fields at dusk', who: 'Juan Carlos Fonseca Mata', license: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Paisaje_agavero_(Tequila,_Jalisco)_2.jpg' },
  { what: 'tahona', who: 'mickou', license: 'CC BY 2.0', href: 'https://www.flickr.com/photos/93376778@N00/4829878332' },
  { what: 'margarita', who: 'Ralf Roletschek', license: 'CC BY-SA 3.0', href: 'https://commons.wikimedia.org/wiki/File:15-09-26-RalfR-WLC-0247.jpg' },
  { what: 'old fashioned', who: 'Qwertzu111111', license: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Images_of_drinks_with_neutral_Background;_Old_Fashioned_(cocktail),_Whisky.jpg' },
  { what: 'paloma', who: 'Erich Wagner', license: 'CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Paloma_Cocktail2.jpg' },
];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export default function SanMatias() {
  const d = brandPage('san-matias')!;
  const reduced = useReducedMotion();

  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const lineAX = useTransform(heroP, [0, 1], ['0%', reduced ? '0%' : '-18%']);
  const lineBX = useTransform(heroP, [0, 1], ['0%', reduced ? '0%' : '18%']);
  const bottleScale = useTransform(heroP, [0, 1], [1, reduced ? 1 : 1.1]);
  const bottleY = useTransform(heroP, [0, 1], ['0%', reduced ? '0%' : '10%']);
  const lightOpacity = useTransform(heroP, [0, 0.8], [1, reduced ? 1 : 0.35]);

  // Pointer tilt: the bottle turns a few degrees toward the cursor.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const lightX = useSpring(useTransform(px, [-0.5, 0.5], ['-4%', '4%']), { stiffness: 80, damping: 20 });
  const onHeroMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onHeroLeave = () => { px.set(0); py.set(0); };
  const gran = d.range.find((r) => r.name.includes('Gran Reserva'))!;

  const tahona = useRef<HTMLElement>(null);
  const craft = useRef<HTMLElement>(null);
  const { scrollYProgress: craftP } = useScroll({ target: craft, offset: ['start end', 'end start'] });
  const craftSpin = useTransform(craftP, [0, 1], [0, reduced ? 0 : 160]);
  const craftY = useTransform(craftP, [0, 1], ['8%', reduced ? '8%' : '-8%']);
  const { scrollYProgress: tahP } = useScroll({ target: tahona, offset: ['start end', 'end start'] });
  const spin = useTransform(tahP, [0, 1], [0, reduced ? 0 : 220]);

  const [open, setOpen] = useState<number | null>(null);
  const [lead, ...rest] = d.story.paragraphs;
  const [nameA, nameB] = d.name.split(' ');

  return (
    <div className={styles.page}>
      {/* ── Hero: a gallery at night. One spotlight on the black Gran Reserva,
             SAN / MATÍAS set huge behind it, a gilt frame drawn round the room. ── */}
      <section className={styles.hero} ref={hero} onPointerMove={onHeroMove} onPointerLeave={onHeroLeave}>
        <div className={styles.heroFrame} aria-hidden>
          {(['top', 'bottom'] as const).map((side) => (
            <motion.span
              key={side}
              className={`${styles.frameH} ${styles[side]}`}
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, delay: 0.1, ease }}
            />
          ))}
          {(['left', 'right'] as const).map((side) => (
            <motion.span
              key={side}
              className={`${styles.frameV} ${styles[side]}`}
              initial={reduced ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.6, delay: 0.3, ease }}
            />
          ))}
        </div>

        <motion.div className={styles.spot} style={{ opacity: lightOpacity, x: lightX }} aria-hidden>
          <motion.span
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.2, 1] }}
            transition={{ duration: 1.4, delay: 0.5, times: [0, 0.3, 0.45, 1] }}
          />
        </motion.div>

        <motion.p
          className={styles.heroMeta}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
        >
          <span>Casa San Matías</span>
          <span>{d.eyebrow}</span>
        </motion.p>

        <h1 className={styles.giant} aria-label={d.name}>
          {[nameA, nameB].map((word, li) => (
            <motion.span
              key={word}
              className={`${styles.giantLine} ${li ? styles.giantB : styles.giantA}`}
              style={{ x: li ? lineBX : lineAX }}
              aria-hidden
            >
              {word.split('').map((ch, i) => (
                <span className={styles.charMask} key={i}>
                  <motion.span
                    initial={reduced ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.35 + li * 0.2 + i * 0.05, ease }}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          ))}
        </h1>

        <div className={styles.heroStage}>
          <motion.div
            className={styles.heroBottle}
            initial={reduced ? false : { opacity: 0, filter: 'blur(14px)', y: 70 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.8, delay: 0.8, ease }}
          >
            <motion.div className={styles.bottleTilt} style={{ scale: bottleScale, y: bottleY, rotateX: tiltX, rotateY: tiltY }}>
              <img src={img('bottle-gran-reserva')} alt="San Matías Gran Reserva Extra Añejo bottle" />
              <img className={styles.reflection} src={img('bottle-gran-reserva')} alt="" aria-hidden />
            </motion.div>
          </motion.div>
          <span className={styles.floor} aria-hidden />
        </div>

        <div className={styles.heroFoot}>
          <div className={styles.heroCopy}>
            <motion.p
              className={styles.quote}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55 }}
            >
              “{d.quote}”
            </motion.p>
            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease }}
            >
              <Link to="/contact" className={styles.btnGold}>
                Become a stockist <ArrowUpRight size={16} />
              </Link>
              <a href="#casa" className={styles.btnLineLight}>Enter the casa</a>
            </motion.div>
          </div>

          <motion.dl
            className={styles.spec}
            initial="hide"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.4 } } }}
          >
            {[
              ['Expresión', 'Gran Reserva'],
              ['Clase', 'Extra Añejo'],
              ['Barrica', 'Three years in oak'],
              ['Graduación', gran.spec],
            ].map(([k, v]) => (
              <motion.div
                key={k}
                variants={{ hide: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } }}
              >
                <dt>{k}</dt>
                <dd>{v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <motion.span
          className={styles.scrollCue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          aria-hidden
        >
          Desliza
        </motion.span>
      </section>

      <div className={styles.tileBand} aria-hidden />

      {/* ── Facts as engraved ledger ─────────────────────────────── */}
      <section className={styles.ledger}>
        {d.facts.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.08} className={styles.ledgerItem}>
            <span className={styles.ledgerNum}>{f.value}</span>
            <span className={styles.ledgerLabel}>{f.label}</span>
          </Reveal>
        ))}
      </section>

      {/* ── Story: editorial with the matriarch pull-quote ───────── */}
      <section className={styles.story} id="casa">
        <div className={styles.storyHead}>
          <Reveal><p className={styles.label}>La Historia</p></Reveal>
          <Reveal delay={0.08}><h2 className={styles.h2}>{d.story.heading}</h2></Reveal>
        </div>

        <div className={styles.storyBody}>
          <Reveal className={styles.storyFigure}>
            <div className={styles.archSmall}>
              <img src={img('agave-valley')} alt="Blue agave fields at dusk below the Tequila volcano" loading="lazy" />
            </div>
            <span className={styles.caption}>Paisaje agavero · Tequila, Jalisco</span>
          </Reveal>

          <div className={styles.storyText}>
            <Reveal><p className={styles.dropcap}>{lead}</p></Reveal>
            {rest[0] && (
              <Reveal>
                <blockquote className={styles.pull}>
                  <span className={styles.pullMark}>“</span>
                  {rest[0].split('. ')[0]}.
                </blockquote>
              </Reveal>
            )}
            {rest.map((p) => (
              <Reveal key={p.slice(0, 24)}><p>{p}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Craft: the Tahona bottle beside the statement. A text ring turns
             with the scroll, oven steam drifts up, and the bottle floats. ── */}
      <section className={styles.craft} ref={craft}>
        <div className={styles.craftMedia}>
          <span className={styles.craftGlow} aria-hidden="true" />
          <motion.svg className={styles.craftRing} viewBox="0 0 200 200" style={{ rotate: craftSpin }} aria-hidden="true">
            <defs>
              <path id="smCraftRing" d="M100 100 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0" />
            </defs>
            <circle cx="100" cy="100" r="96" />
            <circle cx="100" cy="100" r="76" />
            <text>
              <textPath href="#smCraftRing" textLength="535">
                HORNO DE PIEDRA · TAHONA · 100% AGAVE AZUL · DESDE 1886 ·
              </textPath>
            </text>
          </motion.svg>
          {!reduced && (
            <div className={styles.steam} aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((n) => <span key={n} />)}
            </div>
          )}
          <motion.div
            className={styles.craftBottleWrap}
            initial={{ opacity: 0, y: 80, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.3, ease }}
          >
            <motion.div style={{ y: craftY }}>
              <motion.img
                className={styles.craftBottle}
                src={img('bottle-tahona')}
                alt="San Matías Tahona Blanco bottle"
                loading="lazy"
                animate={reduced ? undefined : { y: [0, -14, 0], rotate: [0, 1.2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
        <div className={styles.craftInner}>
          <Reveal><p className={`${styles.label} ${styles.labelLight}`}>El Oficio</p></Reveal>
          <Reveal delay={0.06}><p className={styles.statement}>{d.craft.statement}</p></Reveal>
          <ol className={styles.pillars}>
            {d.craft.pillars.map((p, i) => (
              <motion.li
                key={p.title}
                className={styles.pillar}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease }}
              >
                <span className={styles.pillarNum}>{ROMAN[i]}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Tahona: rotating stone for the extra block ───────────── */}
      <section className={styles.tahona} ref={tahona}>
        <div className={styles.stoneWrap}>
          <motion.div className={styles.stone} style={{ rotate: spin }} aria-hidden>
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="sm-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className={styles.ringText}>
                <textPath href="#sm-ring">
                  TAHONA · PIEDRA VOLCÁNICA · CASA SAN MATÍAS · NOM 1247 ·
                </textPath>
              </text>
            </svg>
          </motion.div>
          <div className={styles.stoneCore}>
            <img src={img('tahona-wheel')} alt="A tahona stone wheel in its milling pit" loading="lazy" />
          </div>
        </div>
        <div className={styles.tahonaText}>
          <Reveal><p className={styles.label}>La Tahona</p></Reveal>
          <Reveal delay={0.06}><h2 className={styles.h2}>{d.extra.heading}</h2></Reveal>
          <Reveal delay={0.12}><p className={styles.body}>{d.extra.body}</p></Reveal>
        </div>
      </section>

      {/* ── Values: three wax seals ──────────────────────────────── */}
      {d.values && (
        <section className={styles.values}>
          <div className={styles.valuesHead}>
            <Reveal><p className={styles.label}>{d.values.label}</p></Reveal>
            <div className={styles.seals}>
              {d.values.heading.split('. ').map((s, i) => (
                <motion.div
                  key={s}
                  className={styles.seal}
                  initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, delay: i * 0.14, ease }}
                >
                  <span className={styles.sealRing} />
                  <span className={styles.sealText}>{s.replace(/\.$/, '')}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className={styles.valuesText}>
            {d.values.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}><p>{p}</p></Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Range: arched niches in the courtyard wall ───────────── */}
      <section className={styles.range}>
        <div className={styles.rangeHead}>
          <Reveal><p className={styles.label}>La Colección</p></Reveal>
          <Reveal delay={0.06}><h2 className={styles.h2}>Four niches, one family.</h2></Reveal>
        </div>
        <div className={styles.niches}>
          {d.range.map((r, i) => {
            const sister = r.name.toLowerCase().includes('pueblo viejo');
            const inner = (
              <>
                <div className={styles.niche}>
                  <span className={styles.nicheGlow} />
                  {r.image && <img src={r.image} alt={r.name} loading="lazy" />}
                </div>
                <span className={styles.nicheNum}>{ROMAN[i]}</span>
                <h3 className={styles.nicheName}>{r.name}</h3>
                <span className={styles.nicheSpec}>{r.spec}</span>
                <p className={styles.nicheNote}>{r.note}</p>
                {sister && <span className={styles.nicheLink}>Visit Pueblo Viejo <ArrowUpRight size={14} /></span>}
              </>
            );
            return (
              <motion.div
                key={r.name}
                className={styles.nicheCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.9, delay: i * 0.1, ease }}
                whileHover={reduced ? undefined : { y: -8 }}
              >
                {sister ? <Link to="/brands/pueblo-viejo" className={styles.nicheAnchor}>{inner}</Link> : inner}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Tasting: hand-lettered card on terracotta ────────────── */}
      <section className={styles.tasting}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, rotate: -4, y: 60 }}
          whileInView={{ opacity: 1, rotate: -1.5, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.1, ease }}
        >
          <div className={styles.cardTop}>
            <span>Nota de cata</span>
            <span>Nº 1247</span>
          </div>
          <h2 className={styles.cardTitle}>{d.tasting.of}</h2>
          <dl className={styles.notes}>
            {([['Nose', d.tasting.nose], ['Palate', d.tasting.palate], ['Finish', d.tasting.finish]] as const).map(([k, v]) => (
              <div key={k} className={styles.note}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.cardServe}><em>Serve —</em> {d.tasting.serve}</p>
          <span className={styles.signature}>Casa San Matías</span>
        </motion.div>
      </section>

      {/* ── Serves in arched frames ──────────────────────────────── */}
      <section className={styles.serves}>
        <div className={styles.rangeHead}>
          <Reveal><p className={styles.label}>Cómo servir</p></Reveal>
          <Reveal delay={0.06}><h2 className={styles.h2}>Three pours from the courtyard.</h2></Reveal>
        </div>
        <div className={styles.serveRow}>
          {d.serves.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1} className={styles.serve}>
              <div className={styles.serveArch}>
                {s.image && <img src={s.image} alt={s.name} loading="lazy" />}
              </div>
              <h3 className={styles.serveName}>{s.name}</h3>
              <p className={styles.serveBuild}>{s.build}</p>
              <button
                className={styles.recipeBtn}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {open === i ? <Minus size={14} /> : <Plus size={14} />} View recipe
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.dl
                    className={styles.recipe}
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Stock: trade list + CTA under the arch ───────────────── */}
      <section className={styles.stock}>
        <div className={styles.tileBand} aria-hidden />
        <div className={styles.stockInner}>
          <div className={styles.stockMain}>
            <Reveal><p className={`${styles.label} ${styles.labelLight}`}>Para el comercio</p></Reveal>
            <Reveal delay={0.06}><h2 className={styles.stockTitle}>Stock {d.name}.</h2></Reveal>
            <Reveal delay={0.12}><p className={styles.stockText}>{d.stock}</p></Reveal>
            <Reveal delay={0.18}>
              <div className={styles.heroCtas}>
                <Link to="/contact" className={styles.btnGold}>
                  Become a stockist <ArrowUpRight size={16} />
                </Link>
                <a href={d.site} target="_blank" rel="noreferrer" className={styles.btnLineLight}>
                  sanmatias.com <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          </div>
          <ul className={styles.trade}>
            {d.trade.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
              >
                <span>{ROMAN[i]}</span>{t}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <p className={styles.credits}>
        Photos:{' '}
        {PHOTO_CREDITS.map((c, i) => (
          <span key={c.what}>
            {i > 0 && ' · '}
            {c.what} by <a href={c.href} target="_blank" rel="noreferrer">{c.who}</a>, {c.license}
          </span>
        ))}
        . Bottle images © Casa San Matías.
      </p>
    </div>
  );
}
