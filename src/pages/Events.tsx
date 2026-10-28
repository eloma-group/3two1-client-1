import { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { contact } from '../data/content';
import { eventMail, eventsEmail, tradeEvents, westCup } from '../data/events';
import Hero from '../components/bento/Hero';
import Rise from '../components/bento/Rise';
import Pill from '../components/bento/Pill';
import Cta from '../components/bento/Cta';
import b from '../components/bento/bento.module.css';
import { scrollToHash } from '../hooks/useLenis';
import { usePageSetup } from '../hooks/usePageSetup';
import styles from './Events.module.css';

const day = (iso: string) => new Date(`${iso}T23:59:59`);

/** Ticks once a second. */
function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export default function Events() {
  usePageSetup('Events');
  const now = useNow();

  return (
    <div className={b.page}>
      <Hero
        eyebrow="2026 Trade calendar"
        title={<>Tasted, <em className="gradient-text">not</em> told.</>}
        lede="Competitions, portfolio walk-throughs, distillery dinners and trade tastings. The fastest way to know our brands is to drink them, with us, in the room."
        image="/images/pages/events-giffard-west-cup-2024.webp"
        alt="The 2024 Giffard West Cup finalists at the bar under the West Cup sign"
        tag="Giffard West Cup · est. 2018"
        actions={
          <>
            <Pill onClick={() => scrollToHash('#calendar')}>See the calendar</Pill>
            <Pill href={eventMail()} variant="more">Host with us</Pill>
          </>
        }
      />

      {/* ── Giffard West Cup ── */}
      <section className={b.section} id="giffard-west-cup">
        <div className="container">
          <Rise>
            <div className={b.head}>
              <p className={b.kicker}>Flagship competition</p>
              <h2 className={b.title}>The Giffard <em className="gradient-text">West Cup</em>, 2028.</h2>
              <p className={b.sub}>{westCup.when}</p>
            </div>
          </Rise>

          <div className={b.grid}>
            <Rise className={b.span4}>
              <article className={`${b.tile} ${b.tileOnImg} ${styles.fill}`}>
                <div className={b.tileImg} aria-hidden="true">
                  <img src="/images/pages/events-giffard-west-cup.webp" alt="" loading="lazy" />
                </div>
                <p className={b.tileLabel}>Australia's classic-cocktail benchmark</p>
                <p className={`${b.tileText} ${styles.lead}`}>{westCup.body[0]}</p>
              </article>
            </Rise>
            <Rise className={b.span2} delay={0.08}>
              <article className={`${b.tile} ${b.tileDark} ${styles.fill} ${styles.countTile}`}>
                <p className={b.tileLabel}>Giffard West Cup International</p>
                <p className={styles.countDone}>That’s a wrap for 2026.</p>
                <p className={b.tileText}>16th September in Angers, France</p>
              </article>
            </Rise>
            <Rise className={b.span2}>
              <article className={`${b.tile} ${styles.fill} ${styles.register}`}>
                <p className={b.tileLabel}>Who can enter</p>
                <h3 className={b.tileTitle}>{westCup.body[1]}</h3>
                <div className={styles.registerAction}>
                  <Pill href={eventMail(westCup.subject)}>Register interest</Pill>
                </div>
              </article>
            </Rise>
            <Rise className={b.span4} delay={0.08}>
              <article className={`${b.tile} ${b.tileBrand} ${styles.fill} ${styles.split}`}>
                <div>
                  <p className={b.tileLabel}>Returning to Australia for the</p>
                  <span className={`${b.big} ${styles.bigger}`}>8th year</span>
                </div>
                <p className={b.tileText}>
                  State heats in June. The winner heads to Angers, France in September for the Giffard West Cup International.
                </p>
              </article>
            </Rise>
          </div>
        </div>
      </section>

      {/* ── Calendar ── */}
      <span id="tastings" aria-hidden="true" />
      <section className={`${b.section} ${b.sectionTint}`} id="calendar">
        <div className="container">
          <Rise>
            <div className={`${b.head} ${b.headLeft}`}>
              <div>
                <p className={b.kicker}>On the calendar</p>
                <h2 className={b.title}>Upcoming tastings.</h2>
              </div>
              <Pill href={eventMail('Invite list')} variant="more">Get on the invite list</Pill>
            </div>
          </Rise>

          <Rise>
            <div className={`${b.tile} ${styles.list}`}>
              {tradeEvents.map((e) => {
                const d = day(e.date);
                const past = d.getTime() < now;
                return (
                  <article key={e.title} className={`${styles.row} ${past ? styles.past : ''}`}>
                    {/* A calendar-app date badge */}
                    <div className={styles.badge} aria-label={d.toDateString()}>
                      <span className={styles.badgeMon}>{d.toLocaleString('en-AU', { month: 'short' })}</span>
                      <span className={styles.badgeDay}>{e.dayTbc ? 'TBC' : d.getDate()}</span>
                    </div>
                    <div className={styles.meta}>
                      <h3>{e.title}</h3>
                      <p className={styles.where}>{e.city} · {d.getFullYear()}</p>
                      {e.body && <p className={styles.body}>{e.body}</p>}
                    </div>
                    {past ? (
                      <span className={styles.wrapped}>Wrapped</span>
                    ) : (
                      <Pill href={eventMail(e.subject)} variant="dark">{e.action}</Pill>
                    )}
                  </article>
                );
              })}
            </div>
          </Rise>
        </div>
      </section>

      {/* ── Trade shows ── */}
      <section className={b.section} id="trade-shows">
        <div className="container">
          <div className={b.grid}>
            <Rise className={b.span6}>
              <article className={`${b.tile} ${styles.fill} ${styles.showCopy}`}>
                <p className={b.kicker}>Trade shows</p>
                <h2 className={`${b.title} ${styles.showTitle}`}>Find us at the <em className="gradient-text">trade shows</em>.</h2>
                <p className={b.tileText}>
                  We bring the full portfolio to the calendar's key industry shows - a fast way to taste nine brands
                  in one room and talk listings with our team. Stand details and pour lists go out to the trade list
                  ahead of each event.
                </p>
                <p className={b.tileText}>Working trade welcome. Drop us a line to book a slot at our stand.</p>
                <div className={styles.registerAction}>
                  <Pill href={eventMail('Trade show stand')} variant="more">Book a slot</Pill>
                </div>
              </article>
            </Rise>
          </div>
        </div>
      </section>

      {/* ── Host with us ── */}
      <section className={b.section} id="enquiries" style={{ paddingTop: 0 }}>
        <div className="container">
          <Cta
            title="Run a Tasting. Throw a Dinner."
            text="Want a brand activation, take-over, or paired dinner at your venue? Our team will build it with you, end to end."
            actions={
              <>
                <Pill href={eventMail()} variant="light"><Mail size={17} /> {eventsEmail}</Pill>
                <Pill href={`tel:${contact.phone.replace(/\s/g, '')}`} variant="more" onDark>
                  <Phone size={16} /> {contact.phone}
                </Pill>
              </>
            }
          />
        </div>
      </section>
    </div>
  );
}
