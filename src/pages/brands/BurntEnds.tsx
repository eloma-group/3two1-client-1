import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence, motion, useReducedMotion, useScroll, useTransform,
} from 'framer-motion';
import { ArrowUpRight, Flame, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import styles from './BurntEnds.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* Rising sparks behind the hero. A plain canvas — a few dozen points do not
   need a library — and it stops drawing whenever the hero is off screen. */
function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    type P = { x: number; y: number; r: number; vy: number; vx: number; life: number; max: number };
    const spawn = (anywhere = false): P => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() * 1.8 + 0.4,
      vy: Math.random() * 0.9 + 0.35,
      vx: (Math.random() - 0.5) * 0.4,
      life: 0,
      max: Math.random() * 260 + 160,
    });
    const count = w < 640 ? 34 : 70;
    const ps: P[] = Array.from({ length: count }, () => spawn(true));

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(canvas);

    function tick(t: number) {
      raf = 0;
      if (!visible || !ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.life++;
        p.y -= p.vy;
        p.x += p.vx + Math.sin((t / 900) + i) * 0.25;
        const k = 1 - p.life / p.max;
        if (k <= 0 || p.y < -10) { ps[i] = spawn(); continue; }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, `rgba(255,190,90,${0.95 * k})`);
        g.addColorStop(0.35, `rgba(255,90,31,${0.5 * k})`);
        g.addColorStop(1, 'rgba(255,60,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return <canvas ref={ref} className={styles.embers} aria-hidden />;
}

function Sear({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, filter: 'brightness(2.4) saturate(0)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'brightness(1) saturate(1)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function BurntEnds() {
  const d = brandPage('burnt-ends')!;
  const reduced = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const bottleY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '18%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-30%']);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const [open, setOpen] = useState<number | null>(null);

  const words = d.quote.replace(/\.$/, '').split(/,\s*/);
  const [first, ...rest] = d.name.split(' ');
  const range = d.range[0];
  const gauges = [
    { k: 'Nose', v: d.tasting.nose, heat: 58 },
    { k: 'Palate', v: d.tasting.palate, heat: 76 },
    { k: 'Finish', v: d.tasting.finish, heat: 92 },
  ];

  return (
    <div className={styles.page}>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className={styles.hero} ref={hero}>
        <div className={styles.smoke} aria-hidden>
          <span /><span /><span />
        </div>
        <Embers />
        <motion.div className={styles.heroGlow} style={{ opacity: glow }} aria-hidden />

        <div className={styles.heroGrid}>
          <motion.div className={styles.heroCopy} style={{ y: titleY }}>
            <motion.p
              className={styles.mono}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Flame size={14} /> {d.eyebrow}
            </motion.p>
            <h1 className={styles.title}>
              {[first, rest.join(' ')].map((w, i) => (
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
            <motion.p
              className={styles.quote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease }}
            >
              “{d.quote}”
            </motion.p>
            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease }}
            >
              <Link to="/contact" className={styles.btnFire}>
                Become a stockist <ArrowUpRight size={16} />
              </Link>
              <a href="#the-pour" className={styles.btnGhost}>The pour ↓</a>
            </motion.div>
          </motion.div>

          <motion.div className={styles.heroBottle} style={{ y: bottleY }}>
            <motion.img
              src={range.image}
              alt={range.name}
              initial={{ opacity: 0, y: 140, filter: 'brightness(0)' }}
              animate={{ opacity: 1, y: 0, filter: 'brightness(1)' }}
              transition={{ duration: 1.6, delay: 0.2, ease }}
            />
            <span className={styles.heroSpec}>{range.spec}</span>
          </motion.div>
        </div>

        <div className={styles.heroFoot}>
          <span>Est. in the fire</span>
          <span>Blended · Peated · Charred</span>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── HEAT MARQUEE ─────────────────────────────────── */}
      <div className={styles.marquee} aria-hidden>
        <div className={styles.marqueeTrack}>
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className={styles.marqueeSet}>
              {Array.from({ length: 3 }).flatMap((__, j) =>
                words.map((w, i) => (
                  <span key={`${j}-${i}`}>
                    {w}<i>✦</i>
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── STORY: the kitchen docket ───────────────────── */}
      <section className={styles.story}>
        <div className={styles.storyMedia}>
          <Sear>
            <p className={styles.label}>01 — The story</p>
            <h2 className={styles.h2}>{d.story.heading}</h2>
          </Sear>
          <Sear delay={0.1} className={styles.charFrame}>
            <img src="/images/burnt-ends-blended-whiskey-tennessee.webp" alt={`${d.name} on the pass`} loading="lazy" />
          </Sear>
        </div>

        <motion.article
          className={styles.docket}
          initial={{ opacity: 0, y: 60, rotate: 2.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0.8 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease }}
        >
          <header className={styles.docketHead}>
            <span>Order Nº 001</span>
            <span>Table: The bar</span>
          </header>
          <div className={styles.docketRule} />
          {d.story.paragraphs.map((p, i) => (
            <p key={i} className={styles.docketLine}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span>{p}</span>
            </p>
          ))}
          <div className={styles.docketRule} />
          <footer className={styles.docketFoot}>
            <span>Fire: ON</span>
            <span>★ Chef’s pick</span>
          </footer>
        </motion.article>
      </section>

      {/* ── CRAFT: branded stamps ───────────────────────── */}
      <section className={styles.craft}>
        <Sear className={styles.craftHead}>
          <p className={styles.label}>02 — The craft</p>
          <p className={styles.statement}>{d.craft.statement}</p>
        </Sear>
        <div className={styles.stamps}>
          {d.craft.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.stamp}
              initial={{ opacity: 0, scale: 1.35, rotate: -8 + i * 6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3 + i * 3 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: [0.7, 0, 0.3, 1] }}
            >
              <div className={styles.stampRing}>
                <span className={styles.stampNo}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
              </div>
              <p>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── THE POUR: bottle + heat gauge ──────────────── */}
      <section className={styles.pour} id="the-pour">
        <div className={styles.pourBottle}>
          <div className={styles.pourHalo} aria-hidden />
          <Sear>
            <img src={range.image} alt={range.name} loading="lazy" />
          </Sear>
        </div>
        <div className={styles.pourCopy}>
          <Sear>
            <p className={styles.label}>03 — The lineup</p>
            <h2 className={styles.h2}>{range.name}</h2>
            <p className={styles.specRow}>
              {range.spec.split(' · ').map((s) => <span key={s}>{s}</span>)}
            </p>
            <p className={styles.lede}>{range.note}</p>
          </Sear>

          <div className={styles.gauge}>
            <p className={styles.mono}>Tasting — {d.tasting.of} · heat read</p>
            {gauges.map((g, i) => (
              <div key={g.k} className={styles.gaugeRow}>
                <div className={styles.gaugeTop}>
                  <span>{g.k}</span>
                  <span className={styles.mono}>{g.heat}°</span>
                </div>
                <div className={styles.gaugeBar}>
                  <motion.i
                    initial={{ width: 0 }}
                    whileInView={{ width: `${g.heat}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.18, ease }}
                  />
                </div>
                <p>{g.v}</p>
              </div>
            ))}
            <p className={styles.serveTip}><Flame size={16} /> {d.tasting.serve}</p>
          </div>
        </div>
      </section>

      {/* ── FACTS: steel plate ─────────────────────────── */}
      <section className={styles.plateWrap}>
        <div className={styles.plate}>
          {['tl', 'tr', 'bl', 'br'].map((r) => <i key={r} className={`${styles.rivet} ${styles[r]}`} />)}
          {d.facts.map((f, i) => (
            <Sear key={f.label} delay={i * 0.08} className={styles.fact}>
              <span className={styles.factValue}>{f.value}</span>
              <span className={styles.factLabel}>{f.label}</span>
            </Sear>
          ))}
        </div>
      </section>

      {/* ── SERVES ─────────────────────────────────────── */}
      <section className={styles.serves}>
        <Sear className={styles.servesHead}>
          <p className={styles.label}>04 — Signature serves</p>
          <h2 className={styles.h2}>Off the pass.</h2>
        </Sear>
        <div className={styles.serveGrid}>
          {d.serves.map((s, i) => {
            const isOpen = open === i;
            return (
              <motion.article
                key={s.name}
                className={styles.serve}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.9, delay: i * 0.1, ease }}
              >
                <div className={styles.serveImg}>
                  <img src={s.image} alt={s.name} loading="lazy" />
                  <span className={styles.serveNo}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className={styles.serveBody}>
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

      {/* ── MENU BOARD: pairing + trade ────────────────── */}
      <section className={styles.boardWrap}>
        <motion.div
          className={styles.board}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease }}
        >
          <div className={styles.boardPair}>
            <p className={styles.boardKicker}>Today off the grill</p>
            <h2 className={styles.boardTitle}>{d.extra.heading}</h2>
            <p className={styles.boardBody}>{d.extra.body}</p>
          </div>
          <div className={styles.boardTrade}>
            <p className={styles.boardKicker}>Where it works</p>
            <ul>
              {d.trade.map((t, i) => (
                <li key={t}>
                  <span>{t}</span>
                  <i />
                  <b>{String(i + 1).padStart(2, '0')}</b>
                </li>
              ))}
            </ul>
            <img className={styles.boardMark} src="/images/brandstrip-burnt-ends.webp" alt="" loading="lazy" />
          </div>
        </motion.div>
      </section>

      {/* ── STOCK CTA ──────────────────────────────────── */}
      <section className={styles.stock}>
        <img className={styles.stockBg} src="/images/brand-burnt-ends-cocktail.webp" alt="" loading="lazy" />
        <div className={styles.stockShade} />
        <Sear className={styles.stockInner}>
          <p className={styles.mono}><Flame size={14} /> Trade</p>
          <h2 className={styles.stockTitle}>Stock {d.name}.</h2>
          <p className={styles.lede}>{d.stock}</p>
          <div className={styles.heroCtas}>
            <Link to="/contact" className={styles.btnFire}>
              Become a stockist <ArrowUpRight size={16} />
            </Link>
            <a href={d.site} target="_blank" rel="noreferrer" className={styles.btnGhost}>
              Official site <ArrowUpRight size={16} />
            </a>
          </div>
        </Sear>
      </section>
    </div>
  );
}
