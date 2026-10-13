import { ArrowRight, Mail, Phone } from 'lucide-react';
import { contact } from '../data/content';
import { eventMail, eventsEmail, tradeEvents, westCup } from '../data/events';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import { CtaStrip, PageHero } from '../components/PageBlocks';
import { usePageSetup } from '../hooks/usePageSetup';
import { scrollToHash } from '../hooks/useLenis';
import r from './Routed.module.css';
import styles from './Events.module.css';

const day = (iso: string) => new Date(`${iso}T23:59:59`);
const fmt = (iso: string) => {
  const d = day(iso);
  return {
    dd: String(d.getDate()).padStart(2, '0'),
    mon: d.toLocaleString('en-AU', { month: 'short' }),
    year: d.getFullYear(),
  };
};

export default function Events() {
  usePageSetup('Events');
  const now = new Date();

  return (
    <div className={r.page}>
      <PageHero
        eyebrow="2026 Trade calendar"
        title={[{ text: 'Tasted,' }, { text: 'not', accent: true }, { text: 'told.' }]}
        lede="Competitions, portfolio walk-throughs, distillery dinners and trade tastings. The fastest way to know our houses is to drink them, with us, in the room."
        image="/images/pages/events-hero.webp"
        alt="A bartender pouring an orange-garnished cocktail at a Giffard West Cup heat"
        stamp="est. 2018"
        actions={
          <>
            <MagneticButton variant="solid" cursorLabel="Calendar" onClick={() => scrollToHash('#calendar')}>
              See the calendar <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton variant="outline" className={r.onDark} cursorLabel="Email" href={eventMail()}>
              Host with us →
            </MagneticButton>
          </>
        }
      />

      {/* ── Giffard West Cup ── */}
      <section className={r.section} id="giffard-west-cup">
        <div className={`container ${r.spot}`}>
          <Reveal y={26} className={r.spotMedia}>
            <img
              src="/images/pages/events-giffard-west-cup.webp"
              alt="The Giffard West Cup trophy on stage in front of a crowd"
              loading="lazy"
            />
          </Reveal>
          <Reveal y={26} delay={0.1}>
            <p className={r.kicker}>Flagship competition</p>
            <span className={r.spotMeta}>{westCup.when}</span>
            <h2 className={r.title}>
              The Giffard <em className="gradient-text">West Cup</em>, 2026.
            </h2>
            {westCup.body.map((p) => <p key={p} className={r.text}>{p}</p>)}
            <div className={r.spotActions}>
              <MagneticButton variant="solid" cursorLabel="Register" href={eventMail(westCup.subject)}>
                Register interest <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Calendar ── */}
      <span id="tastings" aria-hidden="true" />
      <section className={`${r.section} ${r.tint}`} id="calendar">
        <div className="container">
          <Reveal y={20}>
            <div className={r.head}>
              <h2 className={r.title}>
                Upcoming <em className="gradient-text">tastings</em>.
              </h2>
              <a className={r.headLink} href={eventMail('Invite list')}>Get on the invite list →</a>
            </div>
          </Reveal>

          <div className={styles.list}>
            {tradeEvents.map((e, i) => {
              const d = fmt(e.date);
              const past = day(e.date) < now;
              return (
                <Reveal key={e.title} y={20} delay={(i % 3) * 0.06}>
                  <article className={`${styles.row} ${past ? styles.past : ''}`}>
                    <div className={styles.date}>
                      <span className={styles.dd}>{d.dd}</span>
                      <span className={styles.mon}>{d.mon}</span>
                      <small>{d.year} · {e.city}</small>
                    </div>
                    <div className={styles.meta}>
                      <h3>{e.title}</h3>
                      <p>{e.body}</p>
                    </div>
                    {past ? (
                      <span className={styles.done}>Wrapped</span>
                    ) : (
                      <a className={styles.rsvp} href={eventMail(e.subject)} data-cursor={e.action}>
                        {e.action} →
                      </a>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trade shows ── */}
      <section className={r.section} id="trade-shows">
        <div className={`container ${r.spot} ${r.spotFlip}`}>
          <Reveal y={26} className={r.spotMedia}>
            <img
              src="/images/pages/events-trade-shows.webp"
              alt="Trade guests tasting along a bar lined with bottles at a 3Two1 stand"
              loading="lazy"
            />
          </Reveal>
          <Reveal y={26} delay={0.1}>
            <p className={r.kicker}>On the floor</p>
            <h2 className={r.title}>
              Find us at the <em className="gradient-text">trade shows</em>.
            </h2>
            <p className={r.text}>
              We bring the full portfolio to the calendar's key industry shows — a fast way to taste seven
              houses in one room and talk listings with our team. Stand details and pour lists go out to the
              trade list ahead of each event.
            </p>
            <p className={r.text}>Working trade welcome. Drop us a line to book a slot at our stand.</p>
          </Reveal>
        </div>
      </section>

      {/* ── Host with us ── */}
      <section className={r.section} id="enquiries">
        <div className="container">
          <CtaStrip
            kicker="Host with us"
            title={<>Run a tasting. <em className="gradient-text">Throw</em> a dinner.</>}
            text="Want a brand activation, take-over, or paired dinner at your venue? Our team will build it with you, end to end."
            actions={
              <>
                <MagneticButton variant="solid" cursorLabel="Email" href={eventMail()}>
                  <Mail size={16} /> <span className={r.asTyped}>{eventsEmail}</span>
                </MagneticButton>
                <MagneticButton
                  variant="outline"
                  className={r.onDark}
                  cursorLabel="Call"
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                >
                  <Phone size={16} /> {contact.phone}
                </MagneticButton>
              </>
            }
          />
        </div>
      </section>
    </div>
  );
}
