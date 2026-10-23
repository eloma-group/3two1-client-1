import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Search } from 'lucide-react';
import { bottleImage, giffardShelf, giffardShelves, productGroup, shelfProducts } from '../../data/giffardShelves';
import styles from './GiffardRange.module.css';

/* ── A Giffard shelf ─────────────────────────────────────────────────────
   Every bottle 3Two1 carries on one shelf (liqueurs, syrups, purées or
   alcohol-free), filterable by sub-shelf and name. Each card opens the
   product page. */

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function GiffardRange() {
  const { shelf } = useParams();
  // Keyed by shelf, so switching shelves starts with fresh filters.
  return <Shelf key={shelf} slug={shelf} />;
}

function Shelf({ slug }: { slug: string | undefined }) {
  const shelf = giffardShelf(slug);
  const reduce = useReducedMotion();
  const [group, setGroup] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (shelf) document.title = `Giffard ${shelf.label} · 3Two1 drinks`;
  }, [shelf]);

  const products = useMemo(() => (shelf ? shelfProducts(shelf) : []), [shelf]);
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (group === 'All' || productGroup(p) === group) &&
        (!q || `${p.label} ${p.fullName} ${p.tagline}`.toLowerCase().includes(q)),
    );
  }, [products, group, query]);

  if (!shelf) return <Navigate to="/brands/giffard" replace />;

  const count = (n: number) => `${n} ${shelf.noun[n === 1 ? 0 : 1]}`;
  const groups = shelf.groups.filter((g) => products.some((p) => productGroup(p) === g));

  return (
    <div className={styles.page}>
      {/* ═══ Header ═══ */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.crumbs}>
            <Link to="/brands/giffard">← Giffard</Link>
            <span>The range</span>
          </div>
          <p className={styles.kicker}>Giffard · Angers · 1885</p>
          <h1 className={styles.title}>
            {shelf.label}
            <span className={styles.count}>{count(products.length)}</span>
          </h1>
          <p className={styles.lede}>{shelf.lede}</p>

          <nav className={styles.shelves} aria-label="Giffard shelves">
            {giffardShelves.map((s) => (
              <Link
                key={s.slug}
                to={`/brands/giffard/range/${s.slug}`}
                className={s.slug === shelf.slug ? styles.shelfOn : styles.shelf}
                aria-current={s.slug === shelf.slug ? 'page' : undefined}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ═══ Filters + grid ═══ */}
      <section className={styles.body}>
        <div className={styles.wrap}>
          <div className={styles.tools}>
            {groups.length > 1 && (
              <div className={styles.chips} role="group" aria-label="Filter by range">
                {['All', ...groups].map((g) => {
                  const n = g === 'All' ? products.length : products.filter((p) => productGroup(p) === g).length;
                  return (
                    <button
                      key={g}
                      type="button"
                      className={group === g ? styles.chipOn : styles.chip}
                      aria-pressed={group === g}
                      onClick={() => setGroup(g)}
                    >
                      {g} <small>{n}</small>
                    </button>
                  );
                })}
              </div>
            )}
            <label className={styles.search}>
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${shelf.noun[1]}`}
                aria-label={`Search ${shelf.noun[1]}`}
              />
            </label>
          </div>

          <p className={styles.showing} aria-live="polite">
            Showing {count(shown.length)}
          </p>

          <div className={styles.grid}>
            {shown.map((p, i) => {
              const abv = p.facts.find((f) => f.label === 'ABV')?.value;
              const bottle = p.facts.find((f) => f.label === 'Bottle')?.value;
              return (
                <motion.div
                  key={p.slug}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-6% 0px' }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease }}
                >
                  <Link to={`/brands/giffard/${p.slug}`} className={styles.card} data-cursor="Explore">
                    <figure className={styles.tile}>
                      <img src={bottleImage(p)} alt={p.imageAlt} loading="lazy" />
                    </figure>
                    <div className={styles.cardText}>
                      <span className={styles.group}>{productGroup(p)}</span>
                      <h2 className={styles.name}>
                        {p.label} <ArrowUpRight size={16} aria-hidden="true" />
                      </h2>
                      <span className={styles.spec}>{[abv, bottle].filter(Boolean).join(' · ')}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {shown.length === 0 && (
            <p className={styles.empty}>
              Nothing on this shelf matches “{query}”.{' '}
              <button type="button" onClick={() => { setQuery(''); setGroup('All'); }}>Show everything</button>
            </p>
          )}
        </div>
      </section>

      {/* ═══ Trade ═══ */}
      <section className={styles.trade}>
        <div className={`${styles.wrap} ${styles.tradeInner}`}>
          <p className={styles.kickerLight}>For the trade</p>
          <h2 className={styles.tradeHead}>Stock the whole shelf.</h2>
          <p className={styles.tradeBody}>
            3Two1 drinks brings the Giffard range to bars, bottle shops and cafés across Australia, with
            wholesale supply, staff training and menu support.
          </p>
          <div className={styles.actions}>
            <Link to="/contact" className={styles.btn}>Become a stockist <ArrowUpRight size={18} /></Link>
            <Link to="/brands/giffard" className={styles.btnGhost}>Meet Giffard</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
