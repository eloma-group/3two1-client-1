import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { brands } from '../data/content';
import { useMediaQuery } from '../hooks/useMediaQuery';
import SmartImage from '../components/SmartImage';
import Reveal from '../components/Reveal';
import styles from './Brands.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Brands() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (!isDesktop || !section.current || !track.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const el = track.current!;
      const getScroll = () => el.scrollWidth - window.innerWidth;

      gsap.to(el, {
        x: () => -getScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current!,
          start: 'top top',
          end: () => `+=${getScroll()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section className={styles.brands} id="brands" ref={section}>
      <div className={styles.head}>
        <div className="container">
          <Reveal><p className="eyebrow" style={{ color: 'var(--rose-700)' }}>The Seven Houses</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className={`display-lg ${styles.title}`}>
              Seven houses. <span className="gradient-text">One portfolio.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={styles.sub}>Every bottle imported with intent, placed where it belongs.</p>
          </Reveal>
        </div>
        {isDesktop && <span className={styles.dragHint}>Scroll to explore →</span>}
      </div>

      <div className={styles.viewport}>
        <div className={styles.track} ref={track}>
          {brands.map((b, i) => (
            <article className={styles.panel} key={b.id}>
              <span className={styles.index}>0{i + 1}</span>
              <div className={styles.figure}>
                <div className={styles.figureGlow} style={{ background: `radial-gradient(circle, ${b.hue}66, transparent 65%)` }} />
                <SmartImage src={b.image} alt={b.name} hue={b.hue} bottle className={styles.img} />
              </div>
              <div className={styles.info}>
                <span className={styles.cat}>{b.category}{b.since ? ` · since ${b.since}` : ''}</span>
                <h3 className={styles.name}>{b.name}</h3>
                <p className={styles.tag}>{b.tagline}</p>
                <p className={styles.desc}>{b.description}</p>
                {b.accolade && <span className={styles.accolade}>★ {b.accolade}</span>}
                <div className={styles.meta}>
                  <span>{b.country}</span>
                  <a className={styles.explore} href="#contact" data-cursor="Explore">
                    {b.cta} <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
