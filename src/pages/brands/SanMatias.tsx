import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence, motion, useReducedMotion, useScroll, useTransform,
} from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import Reveal from '../../components/Reveal';
import styles from './SanMatias.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const img = (f: string) => `/images/brands/san-matias/${f}.webp`;
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export default function SanMatias() {
  const d = brandPage('san-matias')!;
  const reduced = useReducedMotion();

  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroP, [0, 1], ['0%', reduced ? '0%' : '18%']);
  const heroScale = useTransform(heroP, [0, 1], [1, reduced ? 1 : 1.12]);
  const yearY = useTransform(heroP, [0, 1], ['0%', reduced ? '0%' : '-40%']);

  const tahona = useRef<HTMLElement>(null);
  const { scrollYProgress: tahP } = useScroll({ target: tahona, offset: ['start end', 'end start'] });
  const spin = useTransform(tahP, [0, 1], [0, reduced ? 0 : 220]);

  const [open, setOpen] = useState<number | null>(null);
  const [lead, ...rest] = d.story.paragraphs;
  const [nameA, nameB] = d.name.split(' ');

  return (
    <div className={styles.page}>
      {/* ── Hero: the agave fields through the hacienda arch ───────── */}
      <section className={styles.hero} ref={hero}>
        <div className={styles.heroWall} aria-hidden />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <motion.p
              className={styles.kicker}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <span className={styles.rule} /> {d.eyebrow}
            </motion.p>
            <h1 className={styles.title}>
              {[nameA, nameB].map((w, i) => (
                <span className={styles.lineMask} key={w}>
                  <motion.span
                    className={i === 1 ? styles.titleItalic : undefined}
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
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
              <Link to="/contact" className={styles.btnSolid}>
                Become a stockist <ArrowUpRight size={16} />
              </Link>
              <a href="#casa" className={styles.btnLine}>Enter the casa</a>
            </motion.div>
          </div>

          <motion.div
            className={styles.heroArch}
            initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 0 0)' }}
            transition={{ duration: 1.5, ease }}
          >
            <motion.img
              src={img('agave-close')}
              alt="Blue Weber agave in the Jalisco highlands"
              style={{ y: heroImgY, scale: heroScale }}
            />
            <div className={styles.archShade} />
            <motion.span className={styles.year} style={{ y: yearY }}>1886</motion.span>
          </motion.div>
        </div>

        <div className={styles.tileBand} aria-hidden />
      </section>

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
              <img src={img('agave-field')} alt="Rows of blue agave running to the horizon" loading="lazy" />
            </div>
            <span className={styles.caption}>Los Altos de Jalisco</span>
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

      {/* ── Craft: statement over the steaming ovens ─────────────── */}
      <section className={styles.craft}>
        <div className={styles.craftMedia}>
          <img src={img('oven')} alt="Steam rising from a traditional stone oven" loading="lazy" />
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
            <img src={img('tahona')} alt="The tahona stone wheel over cooked agave" loading="lazy" />
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
    </div>
  );
}
