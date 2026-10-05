import { useEffect, useState, type FormEvent } from 'react';
import { Mail, Phone, Check } from 'lucide-react';
import { contact } from '../data/content';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import page from './Page.module.css';
import styles from './ContactPage.module.css';

const SEGMENTS = ['Bar / Venue', 'Bottle Shop', 'Café', 'Restaurant / Hotel', 'Other'] as const;

/** Right-hand column: everything an existing stockist needs, no form. */
const EXISTING = [
  { label: 'Orders & admin', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Trade phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
  { label: 'Hours', value: contact.hours },
  { label: 'Warehouses', value: contact.warehouses },
  { label: 'Order portal', value: 'portal.3two1.com.au', href: 'https://portal.3two1.com.au' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Contact — 3two1 drinks';
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className={page.page}>
      {/* ── Header ── */}
      <header className={page.header}>
        <div className={page.watermark} aria-hidden="true">01</div>
        <div className={`container ${page.headerInner}`}>
          <Reveal y={16}>
            <div className={page.eyebrowRow}>
              <span className={page.dots} aria-hidden="true"><i /><i /></span>
              <p className={page.eyebrowText}>Contact</p>
            </div>
          </Reveal>
          <Reveal y={22} delay={0.08}>
            <h1 className={page.title}>
              Open a trade account —
              <span className={`${page.grad} gradient-text`}>or just say hi.</span>
            </h1>
          </Reveal>
          <Reveal y={18} delay={0.16}>
            <p className={page.lede}>
              Two doors. Apply for a new trade account on the left. Existing customers — orders,
              support and queries on the right.
            </p>
          </Reveal>
          <Reveal y={14} delay={0.24}>
            <div className={page.headerLinks}>
              <a href={`mailto:${contact.email}`} className={page.headerLink} data-cursor="Email">
                <Mail size={17} /> {contact.email}
              </a>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={page.headerLink} data-cursor="Call">
                <Phone size={17} /> {contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Two doors ── */}
      <section className={page.body}>
        <div className={`container ${styles.doors}`}>
          {/* Left — apply */}
          <Reveal y={26}>
            <div className={styles.card}>
              {sent ? (
                <div className={styles.success}>
                  <span className={styles.check}><Check size={30} /></span>
                  <h3>Application received.</h3>
                  <p>
                    We'll come back to you — usually inside 24 hours — with the rate card and your
                    dedicated rep.
                  </p>
                </div>
              ) : (
                <>
                  <p className={page.kicker}>New trade account</p>
                  <h2 className={styles.cardTitle}>Become a stockist.</h2>
                  <p className={styles.cardNote}>
                    Approval typically inside 24 hours. We'll send the rate card, organise a tasting
                    and assign your dedicated rep.
                  </p>

                  <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.row}>
                      <label className={styles.field}>
                        <span>Business name</span>
                        <input type="text" name="business" required placeholder="The Rooftop" />
                      </label>
                      <label className={styles.field}>
                        <span>Contact name</span>
                        <input type="text" name="name" required placeholder="Jamie Rivera" />
                      </label>
                    </div>
                    <div className={styles.row}>
                      <label className={styles.field}>
                        <span>Phone</span>
                        <input type="tel" name="phone" required placeholder="0400 000 000" />
                      </label>
                      <label className={styles.field}>
                        <span>Email</span>
                        <input type="email" name="email" required placeholder="you@venue.com.au" />
                      </label>
                    </div>
                    <label className={styles.field}>
                      <span>Trade segment</span>
                      <select name="segment" defaultValue={SEGMENTS[0]}>
                        {SEGMENTS.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </label>
                    <label className={styles.field}>
                      <span>Message (optional)</span>
                      <textarea name="message" rows={4} placeholder="What are you pouring, and what are you looking for?" />
                    </label>
                    <p className={styles.consent}>
                      By submitting, you confirm you hold a current liquor licence.
                    </p>
                    <div className={styles.submit}>
                      <MagneticButton variant="solid" cursorLabel="Send">Apply for an account</MagneticButton>
                    </div>
                  </form>
                </>
              )}
            </div>
          </Reveal>

          {/* Right — already trading */}
          <Reveal y={26} delay={0.1}>
            <div className={styles.dark}>
              <p className={styles.kickerLight}>Existing customer</p>
              <h2 className={styles.cardTitle}>Already trading with us.</h2>
              <p className={styles.cardNote}>
                Orders, stock, credits and anything else — the trade desk picks up on both.
              </p>

              <div className={styles.rows}>
                {EXISTING.map((r) => (
                  <div key={r.label} className={styles.rowItem}>
                    <span className={styles.rowLabel}>{r.label}</span>
                    {r.href ? (
                      <a
                        className={styles.rowValue}
                        href={r.href}
                        {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {r.value}
                      </a>
                    ) : (
                      <span className={styles.rowValue}>{r.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
