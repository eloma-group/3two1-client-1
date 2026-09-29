import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { brand } from '../data/content';
import styles from './Splash.module.css';

/**
 * Cinematic splash built around the supplied animated logo.
 * Plays on every full page load / refresh.
 */
export default function Splash({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const gifWrap = useRef<HTMLDivElement>(null);
  const tagline = useRef<HTMLDivElement>(null);
  const regions = useRef<HTMLDivElement>(null);
  const taglineFill = useRef<HTMLSpanElement>(null);
  const regionsFill = useRef<HTMLSpanElement>(null);
  const ruleLeft = useRef<HTMLSpanElement>(null);
  const ruleRight = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      const t = setTimeout(() => {
        onDone();
        setShow(false);
      }, 900);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        // unmount the splash only after it has fully faded away
        onComplete: () => setShow(false),
      });
      // A slow, even wipe — the text fills in rather than sliding or fading
      const WIPE = { duration: 1.9, ease: 'power1.inOut' };

      tl.set(root.current, { autoAlpha: 1 })
        .fromTo(gifWrap.current, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1 })
        // hold while the logo plays its animation, then bring the lines up faint
        .fromTo([tagline.current, regions.current],
          { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, '+=1.2')
        // then pour the solid copy across from the left
        .fromTo(taglineFill.current, { width: '0%' }, { width: '100%', ...WIPE }, '+=0.05')
        .fromTo(regionsFill.current, { width: '0%' }, { width: '100%', ...WIPE }, '<0.25')
        // hairlines open outwards alongside it
        .fromTo([ruleLeft.current, ruleRight.current],
          { width: 0, autoAlpha: 0 }, { width: 38, autoAlpha: 0.55, ...WIPE }, '<')
        // start the hero (and its video) the instant this fade begins, so the
        // clip is already rolling as the splash crossfades away — no static gap
        .to(root.current, { autoAlpha: 0, duration: 0.8, onStart: onDone }, '+=1.2');
    }, root);

    return () => {
      ctx.revert();
    };
  }, [onDone]);

  if (!show) return null;

  return (
    <div className={styles.splash} ref={root}>
      <div className={styles.inner}>
        <div className={styles.gifWrap} ref={gifWrap}>
          {/* transparent-background animated logo (white keyed out) */}
          <video
            className={styles.gif}
            src="/images/splash-alpha.webm?v=3"
            autoPlay
            muted
            playsInline
            loop
            aria-label="3two1 drinks"
          />
        </div>
        {/* Faint ghost line with a solid copy wiping across it, left to right */}
        <div className={styles.tagline} ref={tagline} aria-label={brand.tagline}>
          <span className={styles.ghost} aria-hidden="true">{brand.tagline}</span>
          <span className={styles.wipe} ref={taglineFill} aria-hidden="true">
            <span className={styles.fill}>{brand.tagline}</span>
          </span>
        </div>
        <div className={styles.regionsRow} ref={regions} aria-label={brand.regions}>
          <span className={styles.rule} ref={ruleLeft} aria-hidden="true" />
          <span className={styles.regions}>
            <span className={styles.ghost} aria-hidden="true">{brand.regions}</span>
            <span className={styles.wipe} ref={regionsFill} aria-hidden="true">
              <span className={styles.fill}>{brand.regions}</span>
            </span>
          </span>
          <span className={styles.rule} ref={ruleRight} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
