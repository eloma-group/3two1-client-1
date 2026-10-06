import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import Reveal from '../../components/Reveal';
import styles from './WhiskeyRow.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const IMG = (f: string) => `/images/brands/whiskey-row/${f}.webp`;
const ROMAN = ['I', 'II', 'III', 'IV'];
const BLOCKS = ['Warehouses', 'Blenders', 'Offices', 'Bottlers'];
const MASH = [
  { label: 'Corn', share: 58, tone: 'corn' },
  { label: 'Rye', share: 34, tone: 'rye' },
  { label: 'Malted barley', share: 8, tone: 'barley' },
];

export default function WhiskeyRow() {
  const d = brandPage('whiskey-row')!;
  const reduce = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const lineupY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-22%']);
  const [open, setOpen] = useState<number | null>(null);
  const bottle = d.range[0];
  const words = d.name.split(' ');

  const ribbon = `${d.name} ✦ Louisville, KY ✦ High-Rye Bourbon ✦ Main Street ✦ Small Batch ✦ `;

  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero} ref={hero}>
        <div className={styles.heroText}>
          <motion.div
            className={styles.sign}
            initial={{ opacity: 0, rotate: -6, y: -20 }}
            animate={{ opacity: 1, rotate: -2, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <span className={styles.signBolt} />
            <span className={styles.signMain}>{d.name}</span>
            <span className={styles.signSub}>Main St · Louisville</span>
            <span className={styles.signBolt} />
          </motion.div>

          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {d.eyebrow}
          </motion.p>

          <h1 className={styles.title}>
            {words.map((w, i) => (
              <span key={w} className={styles.titleLine}>
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className={styles.quote}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease }}
          >
            “{d.quote}”
          </motion.p>

          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease }}
          >
            <Link to="/contact" className={styles.btnPrimary}>
              Become a stockist <ArrowUpRight size={16} />
            </Link>
            <a href={d.site} target="_blank" rel="noreferrer" className={styles.btnGhost}>
              Official site <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.arch}>
            <motion.img
              src={IMG('street')}
              alt="Historic Whiskey Row buildings on Main Street, Louisville"
              style={{ y: photoY }}
              className={styles.archImg}
            />
            <span className={styles.archRays} aria-hidden />
          </div>
          <motion.div className={styles.lineupCard} style={{ y: lineupY }}>
            <img src={IMG('lineup')} alt="Whiskey Row bourbon lineup against a brick wall" />
            <span className={styles.lineupTag}>Est. on Main Street</span>
          </motion.div>
        </div>
      </section>

      {/* ── Ribbon ───────────────────────────────────────── */}
      <div className={styles.ribbonWrap} aria-hidden>
        <div className={styles.ribbon}>
          <div className={styles.ribbonTrack}>
            <span>{ribbon.repeat(3)}</span>
            <span>{ribbon.repeat(3)}</span>
          </div>
        </div>
      </div>

      {/* ── Story + four blocks ──────────────────────────── */}
      <section className={styles.story}>
        <div className={styles.storyHead}>
          <Reveal>
            <p className={styles.kicker}><span>No. 01</span> The Story</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className={styles.h2}>{d.story.heading}</h2>
          </Reveal>
        </div>

        <div className={styles.blocks}>
          {BLOCKS.map((b, i) => (
            <motion.div
              key={b}
              className={styles.block}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
            >
              <span className={styles.blockNum}>{ROMAN[i]}</span>
              <span className={styles.blockRoof} aria-hidden />
              <span className={styles.blockWindows} aria-hidden>
                {Array.from({ length: 6 }).map((_, k) => <i key={k} />)}
              </span>
              <span className={styles.blockLabel}>Block {i + 1} · {b}</span>
            </motion.div>
          ))}
          <div className={styles.street}><span>Main Street</span></div>
        </div>

        <div className={styles.storyBody}>
          {d.story.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className={i === 0 ? styles.dropcap : undefined}>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Facts ────────────────────────────────────────── */}
      <section className={styles.facts}>
        {d.facts.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.08} className={styles.fact}>
            <span className={styles.factValue}>{f.value}</span>
            <span className={styles.factLabel}>{f.label}</span>
          </Reveal>
        ))}
      </section>

      {/* ── Craft ────────────────────────────────────────── */}
      <section className={styles.craft}>
        <Reveal>
          <p className={`${styles.kicker} ${styles.kickerLight}`}><span>No. 02</span> The Craft</p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className={styles.statement}>{d.craft.statement}</p>
        </Reveal>

        <div className={styles.craftGrid}>
          {/* Pillar 1 — mash bill */}
          <Reveal className={styles.panel}>
            <span className={styles.panelNo}>01</span>
            <h3 className={styles.panelTitle}>{d.craft.pillars[0].title}</h3>
            <p className={styles.panelBody}>{d.craft.pillars[0].body}</p>
            <div className={styles.mash}>
              {MASH.map((m, i) => (
                <motion.span
                  key={m.label}
                  className={`${styles.mashSeg} ${styles[m.tone]}`}
                  initial={{ flexGrow: 0.001 }}
                  whileInView={{ flexGrow: m.share }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.2 + i * 0.15, ease }}
                >
                  <em>{m.label}</em>
                </motion.span>
              ))}
            </div>
            <p className={styles.mashNote}>Illustrative · high-rye profile</p>
          </Reveal>

          {/* Pillar 2 — char scale */}
          <Reveal className={styles.panel} delay={0.08}>
            <span className={styles.panelNo}>02</span>
            <h3 className={styles.panelTitle}>{d.craft.pillars[1].title}</h3>
            <p className={styles.panelBody}>{d.craft.pillars[1].body}</p>
            <div className={styles.char}>
              {[1, 2, 3, 4].map((n, i) => (
                <motion.span
                  key={n}
                  className={`${styles.charStep} ${n === 4 ? styles.charActive : ''}`}
                  style={{ ['--c' as string]: i }}
                  initial={{ scaleY: 0.2, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease }}
                >
                  #{n}
                </motion.span>
              ))}
            </div>
          </Reveal>

          {/* Pillar 3 — small batch */}
          <Reveal className={styles.panel} delay={0.16}>
            <span className={styles.panelNo}>03</span>
            <h3 className={styles.panelTitle}>{d.craft.pillars[2].title}</h3>
            <p className={styles.panelBody}>{d.craft.pillars[2].body}</p>
            <motion.div
              className={styles.stamp}
              initial={{ scale: 1.6, opacity: 0, rotate: -30 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -12 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span>Small</span>
              <strong>Batch</strong>
              <span>Kentucky</span>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── Range ────────────────────────────────────────── */}
      <section className={styles.range}>
        <div className={styles.rangeFrame}>
          <Reveal className={styles.rangeImg}>
            <span className={styles.decoCorner} aria-hidden />
            <img src={bottle.image ?? IMG('bottle')} alt={bottle.name} loading="lazy" />
          </Reveal>
          <div className={styles.rangeInfo}>
            <Reveal>
              <p className={styles.kicker}><span>No. 03</span> The Bottle</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className={styles.h2}>{bottle.name}</h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className={styles.spec}>{bottle.spec}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className={styles.rangeNote}>{bottle.note}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className={styles.extra}>
                <h3>{d.extra.heading}</h3>
                <p>{d.extra.body}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Tasting receipt ──────────────────────────────── */}
      <section className={styles.tasting}>
        <div className={styles.tastingIntro}>
          <Reveal>
            <p className={styles.kicker}><span>No. 04</span> Tasting Notes</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className={styles.h2}>The pour.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <img className={styles.tastingImg} src={IMG('cask-serve')} alt="Whiskey Row bourbon with a glass on the rocks" loading="lazy" />
          </Reveal>
        </div>

        <motion.div
          className={styles.receipt}
          initial={{ opacity: 0, y: 60, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.2 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease }}
        >
          <div className={styles.receiptHead}>
            <strong>{d.name.toUpperCase()} BAR</strong>
            <span>Main St · Louisville KY</span>
            <span>Tasting ticket — {d.tasting.of}</span>
          </div>
          <dl className={styles.receiptList}>
            {([
              ['Nose', d.tasting.nose],
              ['Palate', d.tasting.palate],
              ['Finish', d.tasting.finish],
            ] as const).map(([k, v]) => (
              <div key={k} className={styles.receiptRow}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.receiptServe}>
            <span>Bartender’s serve</span>
            <p>{d.tasting.serve}</p>
          </div>
          <div className={styles.receiptFoot}>
            <span>{bottle.spec}</span>
            <span>*** THANK YOU ***</span>
          </div>
        </motion.div>
      </section>

      {/* ── Serves ───────────────────────────────────────── */}
      <section className={styles.serves}>
        <div className={styles.servesHead}>
          <Reveal>
            <p className={`${styles.kicker} ${styles.kickerLight}`}><span>No. 05</span> Signature Serves</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className={`${styles.h2} ${styles.h2Light}`}>How to pour.</h2>
          </Reveal>
        </div>
        <div className={styles.tickets}>
          {d.serves.map((s, i) => {
            const isOpen = open === i;
            return (
              <motion.article
                key={s.name}
                className={styles.ticket}
                initial={{ opacity: 0, y: 50, rotate: (i - 1) * 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: (i - 1) * 1.5 }}
                whileHover={reduce ? undefined : { rotate: 0, y: -8 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              >
                <div className={styles.ticketImg}>
                  {s.image && <img src={s.image} alt={s.name} loading="lazy" />}
                  <span className={styles.ticketNo}>Admit one · No. {String(i + 1).padStart(3, '0')}</span>
                </div>
                <div className={styles.ticketBody}>
                  <h3>{s.name}</h3>
                  <p>{s.build}</p>
                  <button
                    className={styles.recipeBtn}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />} View recipe
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
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Trade menu board ─────────────────────────────── */}
      <section className={styles.trade}>
        <Reveal className={styles.board}>
          <p className={styles.boardTitle}>On the menu at your venue</p>
          <ul>
            {d.trade.map((t, i) => (
              <li key={t}>
                <span className={styles.boardNo}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.boardText}>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className={styles.tradeImg} delay={0.1}>
          <img src={IMG('triple-serve')} alt="Whiskey Row bourbon bottle with a glass" loading="lazy" />
        </Reveal>
      </section>

      {/* ── Stock CTA enamel sign ────────────────────────── */}
      <section className={styles.stock}>
        <motion.div
          className={styles.enamel}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease }}
        >
          <span className={styles.enamelBolt} data-pos="tl" />
          <span className={styles.enamelBolt} data-pos="tr" />
          <span className={styles.enamelBolt} data-pos="bl" />
          <span className={styles.enamelBolt} data-pos="br" />
          <p className={styles.enamelKicker}>Now pouring across Australia</p>
          <h2 className={styles.enamelTitle}>Stock {d.name}.</h2>
          <p className={styles.enamelBody}>{d.stock}</p>
          <div className={styles.ctaRow}>
            <Link to="/contact" className={styles.btnPrimary}>
              Become a stockist <ArrowUpRight size={16} />
            </Link>
            <Link to="/contact" className={styles.btnGhostLight}>
              Contact us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
