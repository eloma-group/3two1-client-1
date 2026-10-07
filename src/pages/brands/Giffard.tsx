import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { brandPage } from '../../data/brandPages';
import { giffardGallery } from '../../data/giffardRange';
import Reveal from '../../components/Reveal';
import styles from './Giffard.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const img = (f: string) => `/images/brands/giffard/${f}.webp`;

const HERO_BOTTLES = [
  { src: img('cassis'), alt: 'Giffard Crème de Cassis bottle', slot: 'left', fromX: '40%', tilt: -5, float: 5.6 },
  { src: '/images/house-giffard.webp', alt: 'Giffard Coconut syrup bottle', slot: 'right', fromX: '-40%', tilt: 5, float: 6.2 },
  { src: img('menthe'), alt: 'Giffard Menthe-Pastille bottle', slot: 'centre', fromX: '0%', tilt: 0, float: 5 },
] as const;

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg className={`${styles.ornament} ${className}`} viewBox="0 0 120 12" aria-hidden="true">
      <path d="M0 6h48M72 6h48" stroke="currentColor" strokeWidth="0.8" />
      <path d="M60 1l5 5-5 5-5-5z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="50" cy="6" r="1.2" fill="currentColor" />
      <circle cx="70" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function Giffard() {
  const d = brandPage('giffard')!;
  const reduce = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const liftY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-8%']);
  const fanLeft = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-22%']);
  const fanRight = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%']);
  const sealRot = useTransform(scrollYProgress, [0, 1], [-8, reduce ? -8 : 40]);
  const [openServe, setOpenServe] = useState<number | null>(null);
  const [shelfTab, setShelfTab] = useState(0);
  const shelf = giffardGallery[shelfTab];

  const [firstPara, ...restParas] = d.story.paragraphs;

  return (
    <div className={styles.page}>
      {/* ── Hero: the label ─────────────────────────────────────── */}
      <section className={styles.hero} ref={hero}>
        <div className={styles.heroGrid}>
          <motion.div
            className={styles.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease }}
          >
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />
            <p className={styles.maison}>Maison fondée en 1885 · Angers</p>
            <Ornament />
            <p className={styles.eyebrow}>{d.eyebrow}</p>
            <h1 className={styles.name}>
              {d.name.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: '0.4em' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.05, ease }}
                >
                  {ch}
                </motion.span>
              ))}
              <span className={styles.dot}>.</span>
            </h1>
            <p className={styles.quote}>“{d.quote}”</p>
            <Ornament />
            <div className={styles.heroCtas}>
              <Link to="/contact" className={styles.btnPrimary}>
                Become a stockist <ArrowUpRight size={16} />
              </Link>
              <a href={d.site} target="_blank" rel="noreferrer" className={styles.btnGhost}>
                giffard.com <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Three Giffard bottles in place of a photo: they rise in, fan out,
              bob gently, and spread further as the page scrolls. */}
          <div className={styles.heroStage}>
            <motion.span
              className={styles.heroGlow}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.1, ease }}
              aria-hidden="true"
            />
            {HERO_BOTTLES.map((b, i) => (
              <motion.div
                key={b.src}
                className={`${styles.heroBottle} ${styles[b.slot]}`}
                initial={reduce ? false : { opacity: 0, y: 90, x: b.fromX, rotate: 0 }}
                animate={{ opacity: 1, y: 0, x: 0, rotate: b.tilt }}
                transition={{ duration: 1.3, delay: 0.35 + i * 0.15, ease }}
              >
                <motion.div style={{ x: b.slot === 'left' ? fanLeft : b.slot === 'right' ? fanRight : 0, y: b.slot === 'centre' ? liftY : 0 }}>
                  <motion.img
                    src={b.src}
                    alt={b.alt}
                    animate={reduce ? undefined : { y: [0, -12, 0] }}
                    transition={{ duration: b.float, repeat: Infinity, ease: 'easeInOut', delay: 1.6 + i * 0.4 }}
                  />
                </motion.div>
              </motion.div>
            ))}
            <span className={styles.heroFloor} aria-hidden="true" />
          </div>

          <motion.div className={styles.seal} style={{ rotate: sealRot }} aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="gfSealPath" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text>
                <textPath href="#gfSealPath">· E. GIFFARD · PHARMACIEN · ANGERS · DEPUIS</textPath>
              </text>
            </svg>
            <span>1885</span>
          </motion.div>
        </div>

        {/* Facts as a gold-ruled ledger */}
        <dl className={styles.ledger}>
          {d.facts.map((f, i) => (
            <motion.div
              key={f.label}
              className={styles.ledgerItem}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + i * 0.08, ease }}
            >
              <dt>{f.value}</dt>
              <dd>{f.label}</dd>
            </motion.div>
          ))}
        </dl>
      </section>

      {/* ── Story: French editorial ─────────────────────────────── */}
      <section className={styles.story}>
        <div className={styles.chapter}>
          <span>Chapitre I</span>
          <i />
          <span>L’histoire</span>
        </div>
        <div className={styles.storyGrid}>
          <div className={styles.storyText}>
            <Reveal>
              <h2 className={styles.h2}>{d.story.heading}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className={styles.dropcap}>{firstPara}</p>
            </Reveal>
            <div className={styles.cols}>
              {restParas.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className={styles.storyFigures}>
            <Reveal>
              <figure className={styles.framed}>
                <img src={img('family')} alt="The Giffard family beneath the portrait of the founder" loading="lazy" />
                <figcaption>
                  <span>Pl. 1</span> La famille, sous le portrait du fondateur
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.12}>
              <figure className={`${styles.framed} ${styles.small}`}>
                <img src={img('museum')} alt="Menthe-Pastille posters in the Giffard museum, Angers" loading="lazy" />
                <figcaption>
                  <span>Pl. 2</span> Les affiches Menthe-Pastille
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Craft: apothecary drawers ───────────────────────────── */}
      <section className={styles.craft}>
        <div className={styles.craftHead}>
          <p className={styles.kicker}>Chapitre II · Le savoir-faire</p>
          <Reveal>
            <p className={styles.statement}>{d.craft.statement}</p>
          </Reveal>
        </div>
        <div className={styles.drawers}>
          {d.craft.pillars.map((p, i) => (
            <motion.article
              key={p.title}
              className={styles.drawer}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
              whileHover={reduce ? undefined : { y: 10 }}
            >
              <div className={styles.drawerFace}>
                <span className={styles.drawerNo}>Tiroir No. 0{i + 1}</span>
                <span className={styles.knob} aria-hidden="true" />
              </div>
              <div className={styles.drawerBody}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Values: cassis room ─────────────────────────────────── */}
      {d.values && (
        <section className={styles.values}>
          <div className={styles.valuesPhoto}>
            <img src={img('maison')} alt="Inside the Maison Giffard, Angers" loading="lazy" />
          </div>
          <div className={styles.valuesText}>
            <p className={styles.kickerLight}>{d.values.label}</p>
            <Reveal>
              <h2 className={styles.valuesH}>{d.values.heading}</h2>
            </Reveal>
            {d.values.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 + i * 0.06}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Range: the apothecary shelf ─────────────────────────── */}
      <section className={styles.range}>
        <div className={styles.rangeHead}>
          <p className={styles.kicker}>Chapitre III · L’étagère</p>
          <Reveal>
            <h2 className={styles.h2}>
              Four shelves, <em>one house.</em>
            </h2>
          </Reveal>
          <p className={styles.rangeLede}>
            Liqueurs, purées and syrups chosen by sommeliers and head bartenders because they make the cocktail better.
          </p>
          <div className={styles.shelfTabs} role="tablist" aria-label="Giffard range">
            {giffardGallery.map((cat, i) => (
              <button
                key={cat.label}
                role="tab"
                aria-selected={shelfTab === i}
                className={styles.shelfTab}
                onClick={() => setShelfTab(i)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={shelf.label}
            role="tabpanel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className={styles.shelf}>
              {shelf.items.map((item, i) => (
                <motion.article
                  key={item.imageUrl}
                  className={styles.bottleCard}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease }}
                >
                  <figure className={styles.bottleStage}>
                    <img src={item.imageUrl} alt={item.imageAlt} loading="lazy" />
                  </figure>
                  <div className={styles.bottleInfo}>
                    <span className={styles.roman}>{ROMAN[i]}</span>
                    <p className={styles.spec}>Giffard · {shelf.label}</p>
                    <h3>{item.label}</h3>
                  </div>
                </motion.article>
              ))}
            </div>
            {shelf.note && <p className={styles.shelfNote}>+ {shelf.note} in the range</p>}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Tasting: the prescription ───────────────────────────── */}
      <section className={styles.tastingWrap}>
        <Reveal className={styles.rx}>
          <div className={styles.rxHead}>
            <div>
              <p className={styles.rxHouse}>E. Giffard · Pharmacien</p>
              <p className={styles.rxAddr}>Place du Ralliement · Angers</p>
            </div>
            <span className={styles.rxSymbol}>℞</span>
          </div>
          <p className={styles.rxFor}>
            Ordonnance — <em>{d.tasting.of}</em>
          </p>
          <dl className={styles.rxList}>
            <div>
              <dt>Nez</dt>
              <dd>{d.tasting.nose}</dd>
            </div>
            <div>
              <dt>Bouche</dt>
              <dd>{d.tasting.palate}</dd>
            </div>
            <div>
              <dt>Finale</dt>
              <dd>{d.tasting.finish}</dd>
            </div>
          </dl>
          <p className={styles.rxDose}>
            <span>Posologie</span>
            {d.tasting.serve}
          </p>
          <p className={styles.rxSign}>— E.G.</p>
        </Reveal>
        <motion.img
          className={styles.rxBottle}
          src={img('cassis')}
          alt="Giffard Crème de Cassis"
          loading="lazy"
          initial={{ opacity: 0, rotate: 6, y: 40 }}
          whileInView={{ opacity: 1, rotate: -4, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.1, ease }}
        />
      </section>

      {/* ── Serves: menu cards ──────────────────────────────────── */}
      <section className={styles.serves}>
        <div className={styles.rangeHead}>
          <p className={styles.kicker}>Chapitre IV · La carte</p>
          <Reveal>
            <h2 className={styles.h2}>
              How to <em>pour.</em>
            </h2>
          </Reveal>
        </div>
        <div className={styles.menu}>
          {d.serves.map((s, i) => {
            const open = openServe === i;
            return (
              <motion.article
                key={s.name}
                className={styles.menuCard}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.85, delay: i * 0.1, ease }}
              >
                <div className={styles.menuImg}>
                  {s.image && <img src={s.image} alt={s.name} loading="lazy" />}
                  <span className={styles.menuNo}>No. {i + 1}</span>
                </div>
                <div className={styles.menuBody}>
                  <h3>{s.name}</h3>
                  <Ornament className={styles.menuOrn} />
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
                        <div>
                          <dt>Méthode</dt>
                          <dd>{s.method}</dd>
                        </div>
                        <div>
                          <dt>Verre</dt>
                          <dd>{s.glass}</dd>
                        </div>
                      </motion.dl>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── West Cup invitation + trade ─────────────────────────── */}
      <section className={styles.invite}>
        <div className={styles.inviteBg}>
          <img src={img('backbar')} alt="" loading="lazy" aria-hidden="true" />
        </div>
        <div className={styles.inviteGrid}>
          <Reveal className={styles.card}>
            <p className={styles.cardTop}>Vous êtes cordialement invités</p>
            <Ornament />
            <h2 className={styles.cardH}>{d.extra.heading}</h2>
            <p className={styles.cardBody}>{d.extra.body}</p>
            <Ornament />
            <p className={styles.cardFoot}>R.S.V.P. · Trade team</p>
          </Reveal>
          <div className={styles.trade}>
            <p className={styles.kickerLight}>For the trade</p>
            <ol>
              {d.trade.map((t, i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <li>
                    <span>{ROMAN[i]}</span>
                    {t}
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Stock CTA ───────────────────────────────────────────── */}
      <section className={styles.stock}>
        <div className={styles.stockInner}>
          <img className={styles.stockBottle} src={img('menthe')} alt="Giffard Menthe-Pastille" loading="lazy" />
          <div>
            <p className={styles.kicker}>Chapitre V · La commande</p>
            <Reveal>
              <h2 className={styles.stockH}>
                Stock <em>{d.name}.</em>
              </h2>
            </Reveal>
            <p className={styles.stockText}>{d.stock}</p>
            <div className={styles.heroCtas}>
              <Link to="/contact" className={styles.btnPrimary}>
                Become a stockist <ArrowUpRight size={16} />
              </Link>
              <Link to="/contact" className={styles.btnGhost}>
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
