import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import styles from './Thoquino.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── Hand-drawn pieces. No official site means no photo library, so the page
   draws its own cane, fruit and sun. ─────────────────────────────────── */

function Cane({ className, height = 420 }: { className?: string; height?: number }) {
  const nodes = Math.round(height / 52);
  return (
    <svg className={className} viewBox={`0 0 120 ${height}`} aria-hidden="true">
      <rect x="54" y="20" width="12" height={height - 20} rx="6" fill="currentColor" />
      {Array.from({ length: nodes }).map((_, i) => (
        <rect key={i} x="51" y={40 + i * 52} width="18" height="5" rx="2.5" fill="rgba(0,0,0,0.22)" />
      ))}
      <path d={`M60 ${height * 0.42} C 20 ${height * 0.36}, 6 ${height * 0.3}, 0 ${height * 0.22} C 22 ${height * 0.3}, 40 ${height * 0.33}, 60 ${height * 0.38}Z`} fill="currentColor" opacity="0.85" />
      <path d={`M60 ${height * 0.3} C 96 ${height * 0.24}, 112 ${height * 0.18}, 120 ${height * 0.08} C 100 ${height * 0.17}, 82 ${height * 0.22}, 60 ${height * 0.26}Z`} fill="currentColor" opacity="0.9" />
      <path d="M60 24 C 40 10, 30 4, 18 0 C 34 12, 46 20, 58 30Z" fill="currentColor" />
      <path d="M60 24 C 78 8, 92 2, 106 2 C 90 12, 76 20, 62 30Z" fill="currentColor" />
    </svg>
  );
}

function Lime({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="#5f9e2f" />
      <circle cx="50" cy="50" r="42" fill="#e9f5b8" />
      <circle cx="50" cy="50" r="38" fill="#c3e05a" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="50" y1="50" x2={50 + 38 * Math.cos((i * Math.PI) / 4)} y2={50 + 38 * Math.sin((i * Math.PI) / 4)} stroke="#e9f5b8" strokeWidth="3" />
      ))}
      <circle cx="50" cy="50" r="5" fill="#e9f5b8" />
    </svg>
  );
}

function Coconut({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#6b4226" />
      <circle cx="50" cy="50" r="38" fill="#fbf6ea" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#efe4cc" strokeWidth="6" />
      <path d="M8 40 Q 20 36 30 42 M70 30 Q 82 26 92 34 M14 70 Q 24 66 32 72" stroke="#4a2c18" strokeWidth="2" fill="none" />
    </svg>
  );
}

function Orange({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="#e2701c" />
      <circle cx="50" cy="50" r="42" fill="#ffe1b3" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i * Math.PI) / 5;
        const b = ((i + 1) * Math.PI) / 5;
        return (
          <path
            key={i}
            d={`M50 50 L ${50 + 37 * Math.cos(a + 0.06)} ${50 + 37 * Math.sin(a + 0.06)} A 37 37 0 0 1 ${50 + 37 * Math.cos(b - 0.06)} ${50 + 37 * Math.sin(b - 0.06)} Z`}
            fill="#f59a2c"
          />
        );
      })}
    </svg>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x="97" y="0" width="6" height="34" rx="3" fill="currentColor" transform={`rotate(${i * 22.5} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="58" fill="currentColor" />
    </svg>
  );
}

/* Step icons for the field → press → still journey. */
function StepIcon({ i }: { i: number }) {
  if (i === 0)
    return (
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <rect x="18" y="10" width="7" height="62" rx="3.5" fill="currentColor" />
        <rect x="36" y="18" width="7" height="54" rx="3.5" fill="currentColor" />
        <rect x="54" y="6" width="7" height="66" rx="3.5" fill="currentColor" />
        <path d="M8 46 L72 30" stroke="#ffc93c" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  if (i === 1)
    return (
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="28" cy="34" r="16" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="52" cy="34" r="16" fill="none" stroke="currentColor" strokeWidth="6" />
        <path d="M40 54 C 36 62, 36 66, 40 72 C 44 66, 44 62, 40 54Z" fill="#b6d636" />
      </svg>
    );
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <path d="M22 72 V40 C22 26 58 26 58 40 V72Z" fill="currentColor" />
      <path d="M40 28 V12 H66 V26" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M66 32 C 63 38, 63 41, 66 44 C 69 41, 69 38, 66 32Z" fill="#ffc93c" />
    </svg>
  );
}

const SERVE_ART = [null, Coconut, Orange] as const;

export default function Thoquino() {
  const d = brandPage('thoquino')!;
  const reduce = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const wordX = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%']);
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const sunR = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  const [side, setSide] = useState<'cane' | 'molasses'>('cane');
  const [open, setOpen] = useState<number | null>(null);

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10% 0px' },
    transition: { duration: 0.9, delay, ease },
  });

  const [first, ...rest] = d.name.split(' ');

  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero} ref={hero}>
        <motion.div className={styles.bigWord} style={{ x: wordX }} aria-hidden="true">
          Cachaça Cachaça
        </motion.div>

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <motion.p className={styles.eyebrow} {...rise(0.1)}>
              <span className={styles.dot} /> {d.eyebrow}
            </motion.p>
            <motion.h1 className={styles.title} {...rise(0.18)}>
              {first}
              <span>{rest.join(' ')}</span>
            </motion.h1>
            <motion.p className={styles.quote} {...rise(0.28)}>
              “{d.quote}”
            </motion.p>
            <motion.div className={styles.ctas} {...rise(0.36)}>
              <Link to="/contact" className={styles.btnSolid}>
                Become a stockist <ArrowUpRight size={18} />
              </Link>
              <a href="#cachaca-not-rum" className={styles.btnLine}>
                Cane vs molasses
              </a>
            </motion.div>
          </div>

          <div className={styles.heroArt}>
            <motion.div className={styles.sunWrap} style={{ rotate: sunR }}>
              <Sun className={styles.sun} />
            </motion.div>
            <div className={styles.canes}>
              {[340, 460, 390, 520, 300, 480, 410, 540, 360].map((h, i) => (
                <Cane key={i} height={h} className={styles.cane} />
              ))}
            </div>
            <motion.img
              src="/images/house-thoquino.webp"
              alt={`${d.name} bottle`}
              className={styles.heroBottle}
              style={{ y: bottleY }}
              initial={{ opacity: 0, y: reduce ? 0 : 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease }}
            />
            <Lime className={styles.heroLime} />
          </div>
        </div>
        <div className={styles.waveBand} aria-hidden="true" />
      </section>

      {/* ── Facts ───────────────────────────────────────── */}
      <section className={styles.facts}>
        {d.facts.map((f, i) => (
          <motion.div className={styles.fact} key={f.label} {...rise(i * 0.08)}>
            <span className={styles.factValue}>{f.value}</span>
            <span className={styles.factLabel}>{f.label}</span>
          </motion.div>
        ))}
      </section>

      {/* ── Story ───────────────────────────────────────── */}
      <section className={styles.story}>
        <div className={styles.storyHead}>
          <motion.p className={styles.kicker} {...rise()}>01 · A história</motion.p>
          <motion.h2 className={styles.h2} {...rise(0.08)}>{d.story.heading}</motion.h2>
        </div>
        <div className={styles.storyGrid}>
          <motion.figure className={styles.storyFig} {...rise(0.1)}>
            <img src="/images/thoquino-cachaca-brazil.webp" alt={`${d.name} with a lime and mint cocktail`} loading="lazy" />
            <figcaption>Campos · Rio de Janeiro</figcaption>
          </motion.figure>
          <div className={styles.storyText}>
            {d.story.paragraphs.map((p, i) => (
              <motion.p key={i} {...rise(0.06 * i)} className={i === 0 ? styles.lead : undefined}>
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Craft: field → press → still ───────────────── */}
      <section className={styles.craft}>
        <div className={styles.curveTop} aria-hidden="true" />
        <div className={styles.craftInner}>
          <motion.p className={`${styles.kicker} ${styles.kickerLight}`} {...rise()}>02 · O ofício</motion.p>
          <motion.p className={styles.statement} {...rise(0.08)}>{d.craft.statement}</motion.p>
          <ol className={styles.journey}>
            <svg className={styles.journeyLine} viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
              <motion.path
                d="M20 60 C 180 -10, 320 130, 500 60 S 820 -10, 980 60"
                fill="none"
                stroke="#ffc93c"
                strokeWidth="3"
                strokeDasharray="8 10"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease }}
              />
            </svg>
            {d.craft.pillars.map((p, i) => (
              <motion.li key={p.title} className={styles.step} {...rise(0.15 + i * 0.12)}>
                <span className={styles.stepIcon}><StepIcon i={i} /></span>
                <span className={styles.stepNo}>{['Campo', 'Moenda', 'Alambique'][i]}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Cachaça is not rum ─────────────────────────── */}
      <section className={styles.versus} id="cachaca-not-rum">
        <div className={styles.versusHead}>
          <motion.p className={styles.kicker} {...rise()}>03 · A diferença</motion.p>
          <motion.h2 className={styles.h2} {...rise(0.06)}>{d.extra.heading}</motion.h2>
          <motion.p className={styles.versusBody} {...rise(0.12)}>{d.extra.body}</motion.p>
          <div className={styles.toggle} role="tablist" aria-label="Compare the base">
            <button role="tab" aria-selected={side === 'cane'} className={side === 'cane' ? styles.on : ''} onClick={() => setSide('cane')}>
              Fresh cane juice
            </button>
            <button role="tab" aria-selected={side === 'molasses'} className={side === 'molasses' ? styles.on : ''} onClick={() => setSide('molasses')}>
              Molasses
            </button>
          </div>
        </div>
        <div className={styles.split} data-side={side}>
          <div className={styles.half + ' ' + styles.caneHalf}>
            <Cane height={360} className={styles.splitCane} />
            <span className={styles.halfTag}>Cachaça</span>
            <strong>Fresh-pressed cane juice</strong>
            <em>Green · bright · wild</em>
          </div>
          <div className={styles.half + ' ' + styles.molHalf}>
            <svg className={styles.drip} viewBox="0 0 100 140" aria-hidden="true">
              <path d="M50 4 C 30 50, 14 72, 14 94 a36 36 0 0 0 72 0 C 86 72, 70 50, 50 4Z" fill="#5a2f12" />
              <ellipse cx="38" cy="92" rx="8" ry="14" fill="#8a4f22" />
            </svg>
            <span className={styles.halfTag}>Most rum</span>
            <strong>Molasses, after sugar is made</strong>
            <em>Dark · round · sweet</em>
          </div>
        </div>
      </section>

      {/* ── Range ───────────────────────────────────────── */}
      <section className={styles.range}>
        <motion.p className={styles.kicker} {...rise()}>04 · A linha</motion.p>
        <motion.h2 className={styles.h2} {...rise(0.06)}>Two bottles, one field.</motion.h2>
        <div className={styles.panels}>
          {d.range.map((r, i) => (
            <motion.article key={r.name} className={`${styles.panel} ${i === 0 ? styles.panelWhite : styles.panelGold}`} {...rise(0.1 + i * 0.12)}>
              <div className={styles.panelArt}>
                {r.image ? (
                  <img src={r.image} alt={r.name} loading="lazy" />
                ) : (
                  <svg viewBox="0 0 120 400" className={styles.drawnBottle} aria-label={r.name} role="img">
                    <defs>
                      <linearGradient id="thoAged" x1="0" x2="1">
                        <stop offset="0" stopColor="#a8641c" />
                        <stop offset="0.5" stopColor="#e2a548" />
                        <stop offset="1" stopColor="#9a5816" />
                      </linearGradient>
                    </defs>
                    <rect x="48" y="4" width="24" height="40" rx="4" fill="#1d3b2a" />
                    <path d="M50 44 h20 v40 c0 18 30 26 30 56 v236 c0 10 -8 16 -18 16 h-44 c-10 0 -18 -6 -18 -16 v-236 c0 -30 30 -38 30 -56z" fill="url(#thoAged)" />
                    <rect x="22" y="200" width="76" height="110" rx="6" fill="#fbf6ea" />
                    <rect x="22" y="200" width="76" height="22" rx="6" fill="#1f6b3a" />
                    <text x="60" y="262" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1f6b3a" fontFamily="Unbounded, sans-serif" textLength="62" lengthAdjust="spacingAndGlyphs">THOQUINO</text>
                    <text x="60" y="282" textAnchor="middle" fontSize="10" fill="#a8641c" fontFamily="Figtree, sans-serif" letterSpacing="2">AGED</text>
                    <path d="M30 70 c 6 -10 14 -14 20 -16" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <div className={styles.panelCopy}>
                <span className={styles.panelNo}>0{i + 1}</span>
                <h3>{r.name}</h3>
                <span className={styles.spec}>{r.spec}</span>
                <p>{r.note}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Tasting ─────────────────────────────────────── */}
      <section className={styles.tasting}>
        <div className={styles.tastingInner}>
          <div className={styles.tastingHead}>
            <motion.p className={`${styles.kicker} ${styles.kickerLight}`} {...rise()}>05 · Prova — {d.tasting.of}</motion.p>
            <motion.h2 className={`${styles.h2} ${styles.h2Light}`} {...rise(0.06)}>The pour.</motion.h2>
          </div>
          <div className={styles.notes}>
            {([
              ['Nose', d.tasting.nose],
              ['Palate', d.tasting.palate],
              ['Finish', d.tasting.finish],
            ] as const).map(([k, v], i) => (
              <motion.div key={k} className={styles.note} {...rise(0.1 + i * 0.1)}>
                <span className={styles.noteRing}>{k}</span>
                <p>{v}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className={styles.serveLine} {...rise(0.2)}>
            <Lime className={styles.serveLime} />
            <p>{d.tasting.serve}</p>
          </motion.div>
        </div>
        <div className={styles.waveBandBlue} aria-hidden="true" />
      </section>

      {/* ── Serves: coasters ───────────────────────────── */}
      <section className={styles.serves}>
        <motion.p className={styles.kicker} {...rise()}>06 · Receitas</motion.p>
        <motion.h2 className={styles.h2} {...rise(0.06)}>Pour it Brazilian.</motion.h2>
        <div className={styles.coasters}>
          {d.serves.map((s, i) => {
            const Art = SERVE_ART[i] ?? Lime;
            const isOpen = open === i;
            return (
              <motion.article key={s.name} className={styles.coaster} {...rise(0.1 + i * 0.1)}>
                <div className={`${styles.disc} ${styles[`disc${i}`]}`}>
                  {s.image ? <img src={s.image} alt={s.name} loading="lazy" /> : <Art className={styles.discArt} />}
                </div>
                <h3>{s.name}</h3>
                <p>{s.build}</p>
                <button className={styles.recipeBtn} onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
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

      {/* ── Trade + stock ──────────────────────────────── */}
      <section className={styles.stock}>
        <div className={styles.curveTopGreen} aria-hidden="true" />
        <div className={styles.stockInner}>
          <div>
            <motion.p className={`${styles.kicker} ${styles.kickerSun}`} {...rise()}>Para o comércio</motion.p>
            <motion.h2 className={styles.stockTitle} {...rise(0.06)}>
              Stock <span>{d.name}.</span>
            </motion.h2>
            <motion.p className={styles.stockBody} {...rise(0.12)}>{d.stock}</motion.p>
            <motion.div className={styles.ctas} {...rise(0.18)}>
              <Link to="/contact" className={styles.btnSun}>
                Become a stockist <ArrowUpRight size={18} />
              </Link>
              <Link to="/contact" className={styles.btnLineLight}>
                Contact us
              </Link>
            </motion.div>
          </div>
          <ul className={styles.tradeList}>
            {d.trade.map((t, i) => (
              <motion.li key={t} {...rise(0.12 + i * 0.08)}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
        <Cane height={460} className={styles.stockCane} />
      </section>
    </div>
  );
}
