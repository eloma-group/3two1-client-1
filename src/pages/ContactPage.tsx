import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Mail, Phone, Check } from 'lucide-react';
import { contact, team, initials } from '../data/content';
import Reveal, { RevealHeading } from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import page from './Page.module.css';
/* The spine and team cards are shared with Our Story, so the two pages scroll
   and read the same way. */
import story from './Investors.module.css';
import styles from './ContactPage.module.css';

const SEGMENTS = ['Bar / Venue', 'Bottle Shop', 'Café', 'Restaurant / Hotel', 'Other'] as const;

const STEPS = ['Contact', 'Trade account', 'Team'];

/** Right-hand column: everything an existing stockist needs, no form. */
const EXISTING = [
  { label: 'Orders & admin', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Trade phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
  { label: 'Hours', value: contact.hours },
  { label: 'Warehouses', value: contact.warehouses },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();
  const spine = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    document.title = 'Contact - 3Two1 drinks';
  }, []);

  /* Same spine as Our Story: the fill tracks scroll through the sections and
     each marker lights up as the fill passes it. */
  const { scrollYProgress } = useScroll({ target: spine, offset: ['start 40%', 'end 70%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    return fill.on('change', (v) => {
      const i = Math.min(STEPS.length - 1, Math.max(0, Math.round(v * (STEPS.length - 1))));
      setStepIndex((prev) => (prev === i ? prev : i));
    });
  }, [fill]);

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
              Open a trade account -
              <span className={`${page.grad} gradient-text`}>or just say hi.</span>
            </h1>
          </Reveal>
          <Reveal y={18} delay={0.16}>
            <p className={page.lede}>
              Existing customers - orders, support and queries go straight to the trade desk.
              New venues can apply for a trade account below.
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

      {/* ── Contact, trade account, team — hung off the spine ── */}
      <section className={page.body}>
        <div className={`container ${story.spineGrid}`} ref={spine}>
          <div className={story.spineCol} aria-hidden="true">
            <span className={story.spineLineBase} />
            <motion.span
              className={story.spineLineFill}
              style={reduced ? { transform: 'scaleY(1)' } : { scaleY: fill }}
            />
            <div className={story.years}>
              {STEPS.map((s, i) => (
                <div key={s} className={`${story.year} ${i <= stepIndex ? story.yearOn : ''}`}>
                  <span className={story.yearDot} />
                  <span className={story.yearLabel}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.steps}>
            {/* 1 — already trading */}
            <Reveal y={26}>
              <div className={styles.dark} id="contact-desk">
                  <p className={styles.kickerLight}>Existing customer</p>
                  <h2 className={styles.cardTitle}>Already trading with us.</h2>
                  <p className={styles.cardNote}>
                    Orders, stock, credits and anything else - the trade desk picks up on both.
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

            {/* 2 — apply */}
            <Reveal y={26}>
              <div className={styles.card} id="trade-account">
                  {sent ? (
                    <div className={styles.success}>
                      <span className={styles.check}><Check size={30} /></span>
                      <h3>Application received.</h3>
                      <p>
                        We'll come back to you - usually inside 24 hours - with the rate card and your
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

            {/* 3 — the people who pick up */}
            <div id="team">
              <div className={story.teamHead}>
                <div>
                  <Reveal y={16}><p className={story.kicker}>People</p></Reveal>
                  <h2 className={story.title}>
                    <RevealHeading parts={[{ text: 'The' }, { text: 'team.', accent: true }]} />
                  </h2>
                </div>
                <Reveal y={16} delay={0.12}>
                  <p className={story.teamLede}>
                    Small on purpose. Between them the team has spent the better part of two decades on
                    the other side of the bar - which is more or less the only thing we screen for.
                  </p>
                </Reveal>
              </div>
              <div className={story.team}>
                {team.map((m, i) => (
                  <Reveal key={m.name} y={28} delay={0.08 + i * 0.1}>
                    <article className={story.member}>
                      <div className={story.memberTop}>
                        <span className={story.memberN}>{String(i + 1).padStart(2, '0')}</span>
                        <span className={story.memberRole}>{m.role}</span>
                      </div>
                      <span className={story.monogram} aria-hidden="true">{initials(m.name)}</span>
                      <h3 className={story.memberName}>{m.name}</h3>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
