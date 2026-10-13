import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { contact } from '../data/content';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import SmartImage from '../components/SmartImage';
import { CtaStrip, PageHero } from '../components/PageBlocks';
import { usePageSetup } from '../hooks/usePageSetup';
import r from './Routed.module.css';
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
  { id: 'giffard', name: 'Giffard', cat: 'liqueurs', meta: 'Liqueurs · France · 1885', body: "Five generations of fruit liqueurs from Angers — the bartender's choice for fresh, expressive flavour.", image: '/images/house-giffard.webp' },
  { id: 'san-matias', name: 'San Matías', cat: 'tequila', meta: 'Tequila · Jalisco · 1886', body: 'The second-oldest tequila house in Mexico. 100% highland agave, family-owned for 140 years.', image: '/images/house-san-matias.webp' },
  { id: 'black-tears', name: 'Black Tears', cat: 'rum', meta: 'Spiced rum · Cuba', body: "Cuba's first dry-spiced rum — coffee, cocoa, cinnamon. Built for Daiquiris with a darker accent.", image: '/images/house-black-tears.webp' },
  { id: 'pueblo-viejo', name: 'Pueblo Viejo', cat: 'tequila', meta: 'Tequila · Jalisco', body: 'Family-distilled tequila with award-winning añejo and extra-añejo expressions. Quietly excellent.', image: '/images/house-pueblo-viejo.webp' },
  { id: 'burnt-ends', name: 'Burnt Ends', cat: 'whiskey', meta: 'Blended whiskey', body: 'A characterful blend of bourbon and rye finished in charred oak. Smoke, vanilla, brown butter.', image: '/images/house-burnt-ends.webp' },
  { id: 'worthy-park', name: 'Worthy Park', cat: 'rum', meta: 'Jamaican rum · est. 1670', body: "One of Jamaica's last single-estate rum distilleries. Pure pot still, full funk, generationally good.", image: '/images/house-worthy-park.webp' },
  { id: 'whiskey-row', name: 'Whiskey Row', cat: 'whiskey', meta: 'American bourbon · Kentucky', body: 'Small-batch Kentucky bourbon with high-rye character. Tiny releases, generous proof.', image: '/images/house-whiskey-row.webp' },
  { id: 'demonio-de-los-andes', name: 'Demonio de los Andes', cat: 'south-america', meta: 'Pisco · Ica, Peru', body: 'Pisco made the Peruvian way — grape spirit taken to proof in one distillation, with nothing added and nothing pulled back out. Built for the Pisco Sour.', image: '/images/house-demonio-de-los-andes.webp' },
  { id: 'thoquino', name: 'Thoquino Cachaça', cat: 'south-america', meta: 'Cachaça · Brazil', body: 'Cachaça pressed from fresh-cut sugarcane rather than molasses — grassy, bright and faintly wild. The backbone of a Caipirinha worth drinking.', image: '/images/house-thoquino.webp' },
];

const PDF_REQUEST = `mailto:${contact.email}?subject=${encodeURIComponent('2026 Portfolio PDF')}`;

export default function Portfolio() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Cat | 'all'>('all');
  usePageSetup('Portfolio');

  const shown = HOUSES.filter((h) => filter === 'all' || h.cat === filter);

  return (
    <div className={r.page}>
      <PageHero
        eyebrow="2026 Portfolio"
        title={[{ text: 'Every' }, { text: 'house.', accent: true }, { text: 'One book.' }]}
        lede="Tasting notes, RRPs, case configurations and serve specs — everything your team needs to spec a drinks list or curate a shelf."
        image="/images/pages/portfolio-banner.webp"
        alt="A curated row of premium spirits across categories"
        stamp="2026 Edition"
        actions={
          <>
            <MagneticButton variant="solid" cursorLabel="Request" href={PDF_REQUEST}>
              Request the PDF <FileText size={16} />
            </MagneticButton>
            <MagneticButton variant="outline" className={r.onDark} cursorLabel="Rates" onClick={() => navigate('/contact')}>
              Request rate card →
            </MagneticButton>
          </>
        }
      />

      <section className={r.section}>
        <div className="container">
          <Reveal y={20}>
            <div className={r.head}>
              <h2 className={r.title}>
                The <em className="gradient-text">portfolio</em>.
              </h2>
              <a
                className={r.headLink}
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
              >
                Talk to your rep →
              </a>
            </div>
          </Reveal>

          <Reveal y={14}>
            <div className={styles.filters} role="group" aria-label="Filter portfolio by category">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  className={`${styles.filter} ${filter === f.key ? styles.filterOn : ''}`}
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                >
                  {filter === f.key && <motion.span layoutId="portfolio-pill" className={styles.pill} />}
                  <span className={styles.filterLabel}>{f.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <LayoutGroup>
            <motion.div layout className={styles.grid}>
              <AnimatePresence mode="popLayout">
                {shown.map((h) => (
                  <motion.a
                    key={h.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.card}
                    href={`/brands/${h.id}`}
                    onClick={(e) => { e.preventDefault(); navigate(`/brands/${h.id}`); }}
                    data-cursor="Explore"
                  >
                    <div className={styles.cardImg}>
                      <SmartImage src={h.image} alt={h.name} />
                    </div>
                    <span className={styles.cardMeta}>{h.meta}</span>
                    <h3>{h.name}</h3>
                    <p>{h.body}</p>
                    <span className={styles.cardLink}>Explore {h.name} →</span>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>

      <section className={r.section}>
        <div className="container">
          <CtaStrip
            kicker="Become a stockist"
            title={<>Spec a list. <em className="gradient-text">Fill</em> a shelf.</>}
            text="Get the rate card and a tasting with your account rep. We'll come to you."
            actions={
              <>
                <MagneticButton variant="solid" cursorLabel="Apply" onClick={() => navigate('/contact')}>
                  Become a stockist <ArrowRight size={16} />
                </MagneticButton>
                <MagneticButton variant="outline" className={r.onDark} cursorLabel="Events" onClick={() => navigate('/events#calendar')}>
                  Trade tastings
                </MagneticButton>
              </>
            }
          />
        </div>
      </section>
    </div>
  );
}
