import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { recipeHouses } from '../data/cocktails';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import SmartImage from '../components/SmartImage';
import { CtaStrip } from '../components/PageBlocks';
import { usePageSetup } from '../hooks/usePageSetup';
import { scrollToHash } from '../hooks/useLenis';
import page from './Page.module.css';
import r from './Routed.module.css';
import styles from './Cocktails.module.css';

const RECIPE_COUNT = recipeHouses.reduce((n, h) => n + h.recipes.length, 0);

export default function Cocktails() {
  const navigate = useNavigate();
  usePageSetup('Cocktail Corner');

  return (
    <div className={r.page}>
      {/* ── Header ── */}
      <header className={page.header}>
        <div className={page.watermark} aria-hidden="true">{RECIPE_COUNT}</div>
        <div className={`container ${page.headerInner}`}>
          <Reveal y={16}>
            <div className={page.eyebrowRow}>
              <span className={page.dots} aria-hidden="true"><i /><i /></span>
              <p className={page.eyebrowText}>Cocktail Corner</p>
            </div>
          </Reveal>
          <Reveal y={22} delay={0.08}>
            <h1 className={page.title}>
              Recipes that <em className="gradient-text" style={{ paddingRight: '0.1em' }}>earn</em>
              <span className={page.grad}>the back-bar.</span>
            </h1>
          </Reveal>
          <Reveal y={18} delay={0.16}>
            <p className={page.lede}>
              Specs, builds and twists from across the 3Two1 portfolio — signature serves we hand to bar
              teams when they list our houses. One repository, seven brands, hundreds of pours.
            </p>
          </Reveal>
          <Reveal y={14} delay={0.24}>
            <nav className={styles.jump} aria-label="Cocktail Corner sections">
              {recipeHouses.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className={styles.jumpLink}
                  onClick={(e) => { e.preventDefault(); scrollToHash(`#${h.id}`); }}
                >
                  {h.name}
                  <span>{h.recipes.length}</span>
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </header>

      {/* ── One block per house ── */}
      {recipeHouses.map((h, hi) => (
        <section key={h.id} id={h.id} className={`${r.section} ${hi % 2 ? r.tint : ''} ${styles.house}`}>
          <div className={`container ${styles.houseGrid}`}>
            <Reveal y={24} className={styles.houseAside}>
              <div className={styles.houseSticky}>
                <p className={r.kicker}>{h.meta}</p>
                <h2 className={r.title}>{h.name}</h2>
                <div className={styles.houseImg}>
                  <SmartImage src={h.image} alt={`A ${h.name} serve`} />
                </div>
                <a
                  className={r.headLink}
                  href={`/brands/${h.id}`}
                  onClick={(e) => { e.preventDefault(); navigate(`/brands/${h.id}`); }}
                >
                  Meet the house →
                </a>
              </div>
            </Reveal>

            <div className={styles.recipes}>
              {h.recipes.map((c, i) => (
                <Reveal key={c.name} y={26} delay={(i % 2) * 0.08}>
                  <article className={styles.card}>
                    <span className={styles.tag}>{c.tag}</span>
                    <h3>{c.name}</h3>
                    <p className={styles.lede}>{c.lede}</p>
                    <ul className={styles.ingredients}>
                      {c.ingredients.map(([what, amount]) => (
                        <li key={what}>
                          <b>{what}</b>
                          <i aria-hidden="true" />
                          <span>{amount}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.method}>
                      <span>Method</span>
                      <p>{c.method}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Bar cards ── */}
      <section className={r.section}>
        <div className="container">
          <CtaStrip
            kicker="Bar cards"
            title={<>Need a <em className="gradient-text">full</em> spec list for your bar?</>}
            text="We'll build you a one-page recipe card per brand, formatted for your back-bar. Free for current accounts."
            actions={
              <MagneticButton variant="solid" cursorLabel="Request" onClick={() => navigate('/contact')}>
                Request bar cards <ArrowRight size={16} />
              </MagneticButton>
            }
          />
        </div>
      </section>
    </div>
  );
}
