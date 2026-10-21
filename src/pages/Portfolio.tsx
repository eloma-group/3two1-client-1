import { useState, type CSSProperties } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { brands, portfolioPdf } from '../data/content';
import SmartImage from '../components/SmartImage';
import Hero from '../components/bento/Hero';
import Rise from '../components/bento/Rise';
import Pill from '../components/bento/Pill';
import Segmented from '../components/bento/Segmented';
import Cta from '../components/bento/Cta';
import b from '../components/bento/bento.module.css';
import { usePageSetup } from '../hooks/usePageSetup';
import styles from './Portfolio.module.css';

type Cat = 'rum' | 'tequila' | 'whiskey' | 'liqueurs' | 'south-america';

const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'rum', label: 'Rum' },
  { key: 'tequila', label: 'Tequila' },
  { key: 'whiskey', label: 'Whiskey' },
  { key: 'liqueurs', label: 'Liqueurs' },
  { key: 'south-america', label: 'Pisco & Cachaça' },
];

// Card copy from the reference portfolio page; the two South American houses
// are not on it, so theirs comes from the brand data in content.ts.
const HOUSES: { id: string; name: string; cat: Cat; meta: string; body: string; image: string }[] = [
  { id: 'giffard', name: 'Giffard', cat: 'liqueurs', meta: 'Liqueurs · France · 1885', body: "Five generations of fruit liqueurs from Angers - the bartender's choice for fresh, expressive flavour.", image: '/images/house-giffard.webp' },
  { id: 'san-matias', name: 'San Matías', cat: 'tequila', meta: 'Tequila · Jalisco · 1886', body: 'The second-oldest tequila house in Mexico. 100% highland agave, family-owned for 140 years.', image: '/images/house-san-matias.webp' },
  { id: 'black-tears', name: 'Black Tears', cat: 'rum', meta: 'Spiced rum · Cuba', body: "Cuba's first dry-spiced rum - coffee, cocoa, cinnamon. Built for Daiquiris with a darker accent.", image: '/images/house-black-tears.webp' },
  { id: 'pueblo-viejo', name: 'Pueblo Viejo', cat: 'tequila', meta: 'Tequila · Jalisco', body: 'Family-distilled tequila with award-winning añejo and extra-añejo expressions. Quietly excellent.', image: '/images/house-pueblo-viejo.webp' },
  { id: 'burnt-ends', name: 'Burnt Ends', cat: 'whiskey', meta: 'Blended whiskey', body: 'A characterful blend of bourbon and rye finished in charred oak. Smoke, vanilla, brown butter.', image: '/images/house-burnt-ends.webp' },
  { id: 'worthy-park', name: 'Worthy Park', cat: 'rum', meta: 'Jamaican rum · est. 1670', body: "One of Jamaica's last single-estate rum distilleries. Pure pot still, full funk, generationally good.", image: '/images/house-worthy-park.webp' },
  { id: 'whiskey-row', name: 'Whiskey Row', cat: 'whiskey', meta: 'American bourbon · Kentucky', body: 'Small-batch Kentucky bourbon with high-rye character. Tiny releases, generous proof.', image: '/images/house-whiskey-row.webp' },
  { id: 'demonio-de-los-andes', name: 'Demonio de los Andes', cat: 'south-america', meta: 'Pisco · Ica, Peru', body: 'Pisco made the Peruvian way - grape spirit taken to proof in one distillation, with nothing added and nothing pulled back out. Built for the Pisco Sour.', image: '/images/house-demonio-de-los-andes.webp' },
  { id: 'thoquino', name: 'Thoquino Cachaça', cat: 'south-america', meta: 'Cachaça · Brazil', body: 'Cachaça pressed from fresh-cut sugarcane rather than molasses - grassy, bright and faintly wild. The backbone of a Caipirinha worth drinking.', image: '/images/house-thoquino.webp' },
];

const HUE = Object.fromEntries(brands.map((x) => [x.id, x.hue]));

/* Tile widths on the six-column grid: the first house is featured wide, the
   rest go three to a row, and any odd ones out stretch so no row is left
   half empty. */
function layoutFor(n: number) {
  if (n === 1) return ['wide'];
  const spans = ['feature', 'small', ...Array(n - 2).fill('small')];
  const rem = (n - 2) % 3;
  if (rem === 1) spans[n - 1] = 'wide';
  if (rem === 2) { spans[n - 1] = 'half'; spans[n - 2] = 'half'; }
  return spans as ('feature' | 'small' | 'wide' | 'half')[];
}


export default function Portfolio() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Cat | 'all'>('all');
  usePageSetup('Portfolio');

  const shown = HOUSES.filter((h) => filter === 'all' || h.cat === filter);

  return (
    <div className={b.page}>
      <Hero
        eyebrow="2027 Portfolio"
        title={<>Every house. <em className="gradient-text">One book.</em></>}
        lede="Tasting notes, RRPs, case configurations and serve specs - everything your team needs to spec a drinks list or curate a shelf."
        image="/images/pages/portfolio-banner.webp"
        alt="A curated row of premium spirits across categories"
        tag="2027 Edition"
        actions={
          <>
            <Pill href={portfolioPdf}>Download the PDF</Pill>
            <Pill to="/contact" variant="more">Request rate card</Pill>
          </>
        }
      />

      <section className={b.section}>
        <div className="container">
          <Rise>
            <div className={b.head}>
              <p className={b.kicker}>The houses</p>
              <h2 className={b.title}>Which will you <em className="gradient-text">pour</em>?</h2>
              <p className={b.sub}>
                {shown.length} {shown.length === 1 ? 'house' : 'houses'} · tap one to step inside.
              </p>
              <div className={styles.filters}>
                <Segmented id="portfolio" label="Filter portfolio by category" options={FILTERS} value={filter} onChange={setFilter} />
              </div>
            </div>
          </Rise>

          <LayoutGroup>
            <motion.div layout className={b.grid}>
              <AnimatePresence mode="popLayout">
                {shown.map((h, i) => {
                  const kind = layoutFor(shown.length)[i];
                  const featured = kind === 'feature' || kind === 'wide';
                  const span = { feature: b.span4, wide: b.span6, half: b.span3, small: b.span2 }[kind];
                  return (
                    <motion.a
                      key={h.id}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                      className={`${b.tile} ${styles.card} ${span} ${featured ? styles.featured : ''}`}
                      style={{ '--hue': HUE[h.id] ?? '#e8446f' } as CSSProperties}
                      href={`/brands/${h.id}`}
                      onClick={(e) => { e.preventDefault(); navigate(`/brands/${h.id}`); }}
                    >
                      <div className={styles.copy}>
                        <p className={styles.meta}>{h.meta}</p>
                        <h3 className={styles.name}>{h.name}</h3>
                        {featured && <p className={b.tileText}>{h.body}</p>}
                        <span className={`${b.btn} ${b.more} ${styles.go}`}>Explore ›</span>
                      </div>
                      <div className={styles.bottle}>
                        <span className={styles.glow} aria-hidden="true" />
                        <SmartImage src={h.image} alt={h.name} />
                      </div>
                      {!featured && <p className={`${b.tileText} ${styles.under}`}>{h.body}</p>}
                    </motion.a>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>

      <section className={b.section} style={{ paddingTop: 0 }}>
        <div className="container">
          <Cta
            title="Spec a list. Fill a shelf."
            text="Get the rate card and a tasting with your account rep. We'll come to you."
            actions={
              <>
                <Pill to="/contact" variant="light">Become a stockist</Pill>
                <Pill to="/events#calendar" variant="more" onDark>Trade tastings</Pill>
              </>
            }
          />
        </div>
      </section>
    </div>
  );
}
