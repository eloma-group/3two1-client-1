import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ALCOHOL_FREE, houseProduct } from '../../data/houseProducts';
import { productGroup, shelfForCategory } from '../../data/giffardShelves';
import styles from './ProductPage.module.css';

/* ── Single product ──────────────────────────────────────────────────────
   One template for every bottle and serve in a house's homepage panel. Each
   house sets its own palette and type through a theme class (see the CSS),
   and each product adds an accent drawn from its fruit or spirit. Content
   lives in data/houseProducts.ts and the per-house data files. */

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const found = houseProduct(params.house, params.product);
  const hero = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const bottleY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);

  useEffect(() => {
    if (found) document.title = `${found.product.fullName} · ${found.house.name} · 3Two1 Drinks`;
  }, [found?.product.fullName, found?.house.name]);

  if (!found) return <Navigate to={`/brands/${params.house ?? ''}`} replace />;

  const { house, product: p } = found;
  const isServe = p.category === 'Cocktail';
  const sameShelf = house.products.filter(
    (o) => o.slug !== p.slug && (!house.shelfByCategory || o.category === p.category),
  );
  // Big shelves (40-odd Giffard syrups) show a handful, nearest sub-shelf first.
  const group = productGroup(p);
  const siblings = [
    ...sameShelf.filter((o) => productGroup(o) === group),
    ...sameShelf.filter((o) => productGroup(o) !== group),
  ].slice(0, 8);
  const shelf = house.slug === 'giffard' ? shelfForCategory(p.category) : undefined;
  const hasTasting = Object.values(p.tasting).some(Boolean) || p.profile.length > 0;
  const sections: string[] = [];
  const num = (title: string) => {
    sections.push(title);
    return `${ROMAN[sections.length - 1]}. ${title}`;
  };

  return (
    <div className={`${styles.page} ${styles[house.theme]}`} style={{ '--accent': p.accent } as CSSProperties}>
      {/* ═══ Hero ═══ */}
      <section className={styles.hero} ref={hero}>
        <div className={styles.heroTop}>
          <Link to="/" className={styles.crumb}>← Home</Link>
          {shelf ? (
            <Link to={`/brands/giffard/range/${shelf.slug}`} className={styles.crumb}>
              {house.kicker} · {shelf.label}{group ? ` · ${group}` : ''}
            </Link>
          ) : (
            <span>{house.kicker} · {house.categoryLabel?.[p.category] ?? p.category}</span>
          )}
        </div>

        <div className={styles.heroGrid}>
          <motion.div className={styles.heroCopy} style={reduce ? undefined : { y: copyY }}>
            <span className={styles.kicker}>{p.fullName}</span>
            <h1 className={styles.heroTitle}>{p.label}</h1>
            <p className={styles.tagline}>{p.tagline}</p>
            <p className={styles.heroLede}>{p.lede}</p>
            <dl className={styles.heroFacts}>
              {p.facts.map((f) => (
                <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
              ))}
            </dl>
          </motion.div>

          <motion.figure className={styles.heroImg} style={reduce ? undefined : { y: bottleY }}>
            <img src={p.image} alt={p.imageAlt} />
          </motion.figure>
        </div>
      </section>

      {/* ═══ The bottle ═══ */}
      <section className={styles.paper}>
        <div className={`${styles.wrap} ${styles.aboutGrid}`}>
          <div>
            <Rise><span className={styles.label}>{num(isServe ? 'The drink' : 'The bottle')}</span></Rise>
            <Rise delay={0.05}><h2 className={styles.head}>{isServe ? 'What it is.' : 'What’s inside.'}</h2></Rise>
          </div>
          <div>
            {p.about.map((para, i) => (
              <Rise key={i} delay={0.08 + i * 0.04}><p className={styles.body}>{para}</p></Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ The fruit ═══ */}
      {p.fruit.paras.length > 0 && (
      <section className={styles.dark}>
        <div className={`${styles.wrap} ${p.fruit.image ? styles.fruitGrid : ''}`}>
          {p.fruit.image && (
            <Rise className={styles.fruitImg}>
              <figure>
                <img src={p.fruit.image.src} alt={p.fruit.image.alt} loading="lazy" />
                <figcaption>{p.fruit.image.caption}</figcaption>
              </figure>
            </Rise>
          )}
          <div>
            <Rise><span className={`${styles.label} ${styles.labelLight}`}>{num(isServe ? 'The story' : p.category === 'Non-Alcoholic' ? 'The idea' : house.storyLabel)}</span></Rise>
            <Rise delay={0.05}><h2 className={styles.headLight}>{p.fruit.heading}</h2></Rise>
            {p.fruit.paras.map((para, i) => (
              <Rise key={i} delay={0.1 + i * 0.04}><p className={`${styles.body} ${styles.bodyLight}`}>{para}</p></Rise>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══ Tasting ═══ */}
      {hasTasting && (
      <section className={styles.paper2}>
        <div className={styles.wrap}>
          <Rise><span className={styles.label}>{num('In the glass')}</span></Rise>
          <Rise delay={0.05}><h2 className={styles.head}>How it tastes.</h2></Rise>
          <div className={p.profile.length > 0 ? styles.tasteGrid : undefined}>
            <Rise className={styles.notes}>
              {(['appearance', 'nose', 'palate', 'finish'] as const).map((k) => p.tasting[k] && (
                <div key={k}><span>{k}</span><p>{p.tasting[k]}</p></div>
              ))}
            </Rise>
            {p.profile.length > 0 && <div className={styles.bars}>
              {p.profile.map((row, i) => (
                <Rise key={row.label} delay={0.05 * i}>
                  <div className={styles.bar}>
                    <div className={styles.barHead}>
                      <b>{row.label}</b>
                      <span>{row.value} / 5</span>
                    </div>
                    <div className={styles.dots} aria-label={`${row.label}: ${row.value} out of 5`}>
                      {Array.from({ length: 5 }, (_, k) => (
                        <i key={k} className={k < row.value ? styles.dotOn : undefined} />
                      ))}
                    </div>
                    <p>{row.note}</p>
                  </div>
                </Rise>
              ))}
            </div>}
          </div>
        </div>
      </section>
      )}

      {/* ═══ Serves ═══ */}
      {p.cocktails.length > 0 && (
        <section className={styles.paper}>
          <div className={styles.wrap}>
            <Rise><span className={styles.label}>{num(isServe ? 'The recipe' : 'Signature serves')}</span></Rise>
            <Rise delay={0.05}><h2 className={styles.head}>Pour it like this.</h2></Rise>
            <div className={styles.serveGrid}>
              {p.cocktails.map((c, ci) => (
                <Rise key={c.name} delay={0.06 * ci} className={styles.card}>
                  {c.image && (
                    <figure className={styles.serveImg}>
                      <img src={c.image} alt={`${c.name}, made with ${p.fullName}`} loading="lazy" />
                    </figure>
                  )}
                  <div className={styles.cardTop}>
                    <span>No. {String(ci + 1).padStart(2, '0')}</span>
                    <span>{c.glass}</span>
                  </div>
                  <h3 className={styles.serveName}>{c.name}</h3>
                  <ul className={styles.spec}>
                    {c.spec.map((s) => (
                      <li key={s.what}>
                        <span className={styles.specAmt}>{s.amount}<small>{s.unit}</small></span>
                        <span>{s.what}</span>
                      </li>
                    ))}
                  </ul>
                  <ol className={styles.method}>
                    {c.method.map((m, i) => <li key={i}>{m}</li>)}
                  </ol>
                  {c.note && <p className={styles.serveNote}>{c.note}</p>}
                  <div className={styles.cardFoot}>
                    {c.ice && <span>Ice · {c.ice}</span>}
                    {c.garnish && <span>Garnish · {c.garnish}</span>}
                  </div>
                </Rise>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ Gallery ═══ */}
      {p.gallery.length > 0 && (
        <section className={styles.galleryBand}>
          <div className={`${styles.wrap} ${styles.gallery}`}>
            {p.gallery.map((g, i) => (
              <Rise key={g.src} delay={0.06 * i}>
                <figure>
                  <img src={g.src} alt={g.alt} loading="lazy" />
                  <figcaption>{g.caption}</figcaption>
                </figure>
              </Rise>
            ))}
          </div>
        </section>
      )}

      {/* ═══ Uses ═══ */}
      {p.uses.length > 0 && (
      <section className={styles.dark}>
        <div className={styles.wrap}>
          <Rise><span className={`${styles.label} ${styles.labelLight}`}>{num('Behind the bar')}</span></Rise>
          <Rise delay={0.05}><h2 className={styles.headLight}>Ways to use it.</h2></Rise>
          <div className={styles.tipGrid} data-count={Math.min(p.uses.length, 4)}>
            {p.uses.map((t, i) => (
              <Rise key={t.title} delay={0.06 * i} className={styles.tip}>
                <span className={styles.tipNo}>{ROMAN[i]}</span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══ FAQ ═══ */}
      {p.faq.length > 0 && (
      <section className={styles.paper}>
        <div className={`${styles.wrap} ${styles.faqGrid}`}>
          <div>
            <Rise><span className={styles.label}>{num('Questions')}</span></Rise>
            <Rise delay={0.05}><h2 className={styles.head}>Good to know.</h2></Rise>
          </div>
          <div className={styles.faqList}>
            {p.faq.map((f) => (
              <details key={f.q} className={styles.qa}>
                <summary>
                  {f.q}
                  <Plus size={20} aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ═══ More from the shelf ═══ */}
      {siblings.length > 0 && (
        <section className={styles.paper2}>
          <div className={styles.wrap}>
            <Rise><span className={styles.label}>{house.shelfByCategory ? 'From the same shelf' : `More from ${house.name}`}</span></Rise>
            <div className={styles.more}>
              {siblings.map((o, i) => (
                <Rise key={o.slug} delay={0.05 * i}>
                  <Link to={`/brands/${house.slug}/${o.slug}`} className={styles.moreCard}>
                    <img src={o.image} alt={o.imageAlt} loading="lazy" />
                    <span>{o.label} <ArrowUpRight size={16} /></span>
                  </Link>
                </Rise>
              ))}
            </div>
            {shelf && (
              <Rise>
                <Link to={`/brands/giffard/range/${shelf.slug}`} className={styles.shelfLink}>
                  See all {sameShelf.length + 1} Giffard {shelf.noun[1]} <ArrowUpRight size={18} />
                </Link>
              </Rise>
            )}
          </div>
        </section>
      )}

      {/* ═══ Trade ═══ */}
      <section className={styles.trade}>
        <div className={`${styles.wrap} ${styles.tradeInner}`}>
          <Rise><span className={`${styles.label} ${styles.labelLight}`}>For the trade</span></Rise>
          <Rise delay={0.05}><h2 className={styles.headLight}>Put it on the back bar.</h2></Rise>
          <Rise delay={0.1}>
            <p className={`${styles.body} ${styles.bodyLight}`}>
              3Two1 drinks brings {house.name} to venues across Australia, with wholesale supply,
              staff training and menu support. Ask us about {isServe ? `the ${p.label}` : p.fullName} and
              the rest of the range.
            </p>
          </Rise>
          <Rise delay={0.14}>
            <div className={styles.actions}>
              <Link to="/contact" className={styles.btn}>Become a stockist <ArrowUpRight size={18} /></Link>
              <Link to={`/brands/${house.slug}`} className={styles.btnGhost}>Meet {house.name}</Link>
            </div>
          </Rise>
        </div>
      </section>

      {/* ═══ Credits ═══ */}
      <footer className={styles.credits}>
        <div className={styles.wrap}>
          {p.credits.length > 0 && (
            <p>
              Photographs:{' '}
              {p.credits.map((c, i) => (
                <span key={c.file}>
                  {i > 0 && ' · '}
                  <a href={c.url} target="_blank" rel="noreferrer">{c.author}</a>, {c.licence}
                </span>
              ))}
              {' '} - via Wikimedia Commons. Bottle and serve photography: {house.name}.
            </p>
          )}
          {p.credits.length === 0 && p.gallery.length > 0 && (
            <p>Bottle and cocktail photography: {house.name}.</p>
          )}
          {p.sources.length > 0 && (
            <p>
              Sources:{' '}
              {p.sources.map((s, i) => (
                <span key={s}>
                  {i > 0 && ' · '}
                  <a href={s} target="_blank" rel="noreferrer">{new URL(s).hostname.replace(/^www\./, '')}</a>
                </span>
              ))}
            </p>
          )}
          <p>
            {!ALCOHOL_FREE.includes(p.category)
              ? `Enjoy ${house.name} responsibly. Not for sale to persons under 18.`
              : 'Specs are starting points; taste and adjust for your fruit, ice and glassware.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
