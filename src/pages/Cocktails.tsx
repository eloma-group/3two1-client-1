import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { recipeHouses } from '../data/cocktails';
import Hero from '../components/bento/Hero';
import Rise from '../components/bento/Rise';
import Pill from '../components/bento/Pill';
import Carousel from '../components/bento/Carousel';
import Cta from '../components/bento/Cta';
import b from '../components/bento/bento.module.css';
import { scrollToHash } from '../hooks/useLenis';
import { usePageSetup } from '../hooks/usePageSetup';
import styles from './Cocktails.module.css';

const RECIPE_COUNT = recipeHouses.reduce((n, h) => n + h.recipes.length, 0);

/** Which house section is in the middle of the screen. */
function useActiveHouse() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    recipeHouses.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Cocktails() {
  const navigate = useNavigate();
  usePageSetup('Cocktail Corner');
  const active = useActiveHouse();

  return (
    <div className={b.page}>
      <Hero
        eyebrow="Cocktail Corner"
        title={<>Recipes that <em className="gradient-text">earn</em> the back-bar.</>}
        lede="Specs, builds and twists from across the 3Two1 Drinks portfolio - the signature serves we hand to bar teams when they list our brands."
        actions={
          <>
            <Pill onClick={() => scrollToHash(`#${recipeHouses[0].id}`)}>Browse the recipes</Pill>
            <Pill to="/contact" variant="more">Request bar cards</Pill>
          </>
        }
      />

      {/* ── At a glance ── */}
      <div className="container">
        <div className={`${b.grid} ${styles.glance}`}>
          <Rise className={b.span2}>
            <div className={`${b.tile} ${styles.stat}`}>
              <span className={b.big}>{RECIPE_COUNT}</span>
              <p className={b.tileText}>Signature serves, every one bar-tested.</p>
            </div>
          </Rise>
          <Rise className={b.span2} delay={0.06}>
            <div className={`${b.tile} ${b.tileDark} ${styles.stat}`}>
              <span className={b.big}>{recipeHouses.length}</span>
              <p className={b.tileText}>Brands, from Angers to Jalisco.</p>
            </div>
          </Rise>
          <Rise className={b.span2} delay={0.12}>
            <div className={`${b.tile} ${b.tileBrand} ${styles.stat}`}>
              <span className={b.big}>ml</span>
              <p className={b.tileText}>Every spec in measures your team pours by.</p>
            </div>
          </Rise>
        </div>
      </div>

      {/* ── Local nav: sticky, follows the section in view ── */}
      <nav className={styles.local} aria-label="Cocktail Corner sections">
        <div className={styles.localInner}>
          <span className={styles.localTitle}>Recipes</span>
          <div className={styles.localLinks}>
            {recipeHouses.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={`${styles.localLink} ${active === h.id ? styles.localOn : ''}`}
                aria-current={active === h.id ? 'true' : undefined}
                onClick={(e) => { e.preventDefault(); scrollToHash(`#${h.id}`); }}
              >
                {active === h.id && <motion.span layoutId="local-dot" className={styles.localDot} />}
                {h.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── One row per house ── */}
      {recipeHouses.map((h, hi) => (
        <section key={h.id} id={h.id} className={`${styles.house} ${hi % 2 ? b.sectionTint : ''}`}>
          <div className="container">
            <Rise>
              <div className={`${b.head} ${b.headLeft} ${styles.houseHead}`}>
                <div>
                  <p className={b.kicker}>{h.meta}</p>
                  <h2 className={b.title}>{h.name}.</h2>
                </div>
                <div className={styles.houseLinks}>
                  {h.id === 'black-tears' && (
                    <Pill to="/brands/black-tears/cuba-libre" variant="more">The Cuba Libre, in full</Pill>
                  )}
                  <Pill to={`/brands/${h.id}`} variant="more">About Brand</Pill>
                </div>
              </div>
            </Rise>
          </div>

          <Carousel label={`${h.name} recipes`}>
            <div className={`${b.tile} ${b.tileOnImg} ${styles.cover}`}>
              <div className={b.tileImg} aria-hidden="true">
                <img src={h.image} alt="" loading="lazy" />
              </div>
              <p className={b.tileLabel}>{h.recipes.length} recipes</p>
              <p className={b.tileTitle}>{h.name}, poured right.</p>
            </div>
            {h.recipes.map((c) => (
              <article key={c.name} className={`${b.tile} ${styles.card}`}>
                <p className={b.tileLabel}>{c.tag}</p>
                <h3 className={styles.cardName}>{c.name}</h3>
                <p className={b.tileText}>{c.lede}</p>
                <ul className={styles.ingredients}>
                  {c.ingredients.map(([what, amount]) => (
                    <li key={what}>
                      <span>{what}</span>
                      <b>{amount}</b>
                    </li>
                  ))}
                </ul>
                <p className={styles.method}><b>Method.</b> {c.method}</p>
              </article>
            ))}
          </Carousel>
        </section>
      ))}

      {/* ── Bar cards ── */}
      <section className={b.section}>
        <div className="container">
          <Cta
            title="Need a full spec list for your bar?"
            text="We'll build you a one-page recipe card per brand, formatted for your back-bar. Free for current accounts."
            actions={
              <>
                <Pill to="/contact" variant="light">Request bar cards</Pill>
                <Pill onClick={() => navigate('/portfolio')} variant="more" onDark>See the portfolio</Pill>
              </>
            }
          />
        </div>
      </section>
    </div>
  );
}
