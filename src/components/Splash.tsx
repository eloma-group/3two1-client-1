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

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const finish = () => {
      setShow(false);
      onDone();
    };

    if (reduced) {
      const t = setTimeout(finish, 900);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const chars = tagline.current?.querySelectorAll('span') ?? [];
      const words = regions.current?.querySelectorAll('span') ?? [];

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish });
      tl.set(root.current, { autoAlpha: 1 })
        .fromTo(gifWrap.current, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 1 })
        // hold while the logo plays its animation, then reveal the text
        .fromTo(chars,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, stagger: 0.03, duration: 0.7 }, '+=1.2')
        .fromTo(words,
          { autoAlpha: 0, y: 16, filter: 'blur(6px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.08, duration: 0.6 }, '-=0.2')
        // hold the finished frame, then fade into the hero
        .to(root.current, { autoAlpha: 0, duration: 0.8 }, '+=1.4');
    }, root);

    return () => {
      ctx.revert();
    };
  }, [onDone]);

  if (!show) return null;

  const taglineChars = brand.tagline.split('');
  const regionWords = brand.regions.split(' ');

  return (
    <div className={styles.splash} ref={root}>
      <div className={styles.inner}>
        <div className={styles.gifWrap} ref={gifWrap}>
          {/* transparent-background animated logo (white keyed out) */}
          <video
            className={styles.gif}
            src="/images/splash-alpha.webm?v=2"
            autoPlay
            muted
            playsInline
            loop
            aria-label="3two1 drinks"
          />
        </div>
        <div className={styles.tagline} ref={tagline} aria-label={brand.tagline}>
          {taglineChars.map((c, i) => (
            <span key={i}>{c === ' ' ? ' ' : c}</span>
          ))}
        </div>
        <div className={styles.regions} ref={regions} aria-label={brand.regions}>
          {regionWords.map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
