import { useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Reveal, { RevealHeading, type HeadingPart } from './Reveal';
import r from '../pages/Routed.module.css';

/** Full-bleed photo hero shared by the trade, events and portfolio pages. */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  alt = '',
  stamp,
  actions,
}: {
  eyebrow: string;
  title: HeadingPart[];
  lede: string;
  image: string;
  alt?: string;
  stamp?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={r.hero}>
      <motion.img
        src={image}
        alt={alt}
        className={r.heroImg}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className={r.heroScrim} aria-hidden="true" />
      {stamp && <span className={r.heroStamp}>{stamp}</span>}
      <div className={`container ${r.heroInner}`}>
        <Reveal y={14}>
          <p className={r.heroEyebrow}><i aria-hidden="true" />{eyebrow}</p>
        </Reveal>
        <h1 className={r.heroTitle}>
          <RevealHeading parts={title} delay={0.1} />
        </h1>
        <Reveal y={18} delay={0.3}>
          <div className={r.heroMeta}>
            <p className={r.heroLede}>{lede}</p>
            {actions && <div className={r.heroActions}>{actions}</div>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Dark strip that closes a page. With `placeholder` it carries an email capture. */
export function CtaStrip({
  kicker,
  title,
  text,
  placeholder,
  actions,
}: {
  kicker: string;
  title: ReactNode;
  text: string;
  placeholder?: string;
  actions?: ReactNode;
}) {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Reveal y={28}>
      <div className={r.cta}>
        <div>
          <p className={r.ctaKicker}>{kicker}</p>
          <h2 className={r.ctaTitle}>{title}</h2>
          <p className={r.ctaText}>{text}</p>
        </div>
        {placeholder ? (
          sent ? (
            <p className={r.captured} role="status">
              <span><Check size={18} /></span>
              Thanks — the rate card is on its way.
            </p>
          ) : (
            <form className={r.capture} onSubmit={onSubmit}>
              <input type="email" required placeholder={placeholder} aria-label="Email" />
              <button type="submit">Get rate card <ArrowRight size={15} /></button>
            </form>
          )
        ) : (
          <div className={r.ctaActions}>{actions}</div>
        )}
      </div>
    </Reveal>
  );
}
