import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion, useInView, useReducedMotion, useScroll, useSpring, useTransform,
} from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { contact } from '../data/content';
import Reveal, { RevealText } from '../components/Reveal';
import Marquee from '../components/Marquee';
import MagneticButton from '../components/MagneticButton';
import styles from './Investors.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const FIGURES = [
  { to: 450, suffix: '+',    label: 'active trade accounts nationally' },
  { to: 9,   suffix: '',     label: 'brand houses, full national exclusivity' },
  { to: 8,   suffix: ' yrs', label: 'independent and family-held' },
];

const YEARS = ['2018 · Founded', 'Our story', 'Founders', 'Investors', 'Today'];

const PLACES = [
  { name: 'Perth', hq: true },
  { name: 'Sydney' },
  { name: 'Melbourne' },
  { name: 'Brisbane' },
  { name: 'Adelaide' },
];

/* The same brand strip the home page runs, rather than the names set in type —
   on a page about the portfolio the marks carry more than the words do.
   Demonio de los Andes and Thoquino sit out until their marks exist — the
   houses grid below still runs the full nine. */
const HOUSE_LOGOS = [
  { src: '/images/brandstrip-black-tears.webp',  alt: 'Black Tears' },
  { src: '/images/brandstrip-worthy-park.webp',  alt: 'Worthy Park' },
  { src: '/images/brandstrip-giffard.webp',      alt: 'Giffard' },
  { src: '/images/brandstrip-pueblo-viejo.webp', alt: 'Pueblo Viejo' },
  { src: '/images/brandstrip-burnt-ends.webp',   alt: 'Burnt Ends' },
  { src: '/images/brandstrip-san-matias.webp',   alt: 'San Matías' },
  { src: '/images/brandstrip-whiskey-row.webp',  alt: 'Whiskey Row' },
];

/* The portfolio is the proof, so the houses get their own grid —
   reusing the scene shots the services section already ships. */
const HOUSES = [
  { name: 'Black Tears',  img: '/images/black-tears-dry-spiced-rum-cuba.webp' },
  { name: 'Worthy Park',  img: '/images/worthy-park-single-estate-jamaica-rum.webp' },
  { name: 'Giffard',      img: '/images/giffard-abricot-du-roussillon-apricot-liqueur.webp' },
  { name: 'Pueblo Viejo', img: '/images/pueblo-viejo-blanco-tequila-jalisco-mexico.webp' },
  { name: 'Burnt Ends',   img: '/images/burnt-ends-blended-whiskey-tennessee.webp' },
  { name: 'San Matías',   img: '/images/san-matias-gran-reserva-extra-anejo-tequila.webp' },
  { name: 'Whiskey Row',  img: '/images/whiskey-row-straight-bourbon-kentucky.webp' },
  { name: 'Demonio de los Andes', img: '/images/demonio-de-los-andes-pisco-peru.webp' },
  { name: 'Thoquino Cachaça',     img: '/images/thoquino-cachaca-brazil.webp' },
];

const TEAM = [
  { name: 'Sam Mitchell', role: 'Founder & Managing Director' },
  { name: 'Jess Kearney', role: 'National Sales · On-Trade' },
  { name: 'Rohan Chen',   role: 'Brand Ambassador · Giffard' },
];

/* How the business actually runs — the part investors and buyers both ask
   about, and the part the chapters above only gesture at. */
const PILLARS = [
  {
    n: '01',
    title: 'We buy narrow, not wide',
    body: 'Nine houses, not ninety. Every listing has to earn its place on the truck and behind the bar, which is why anyone here can talk through the whole range from memory.',
  },
  {
    n: '02',
    title: 'One team, start to finish',
    body: 'The person who pitched you the range trains your floor staff and picks up the phone when a delivery goes sideways. No account handovers, no call centre.',
  },
  {
    n: '03',
    title: 'Placed, not dumped',
    body: 'We would rather a bottle sat in forty venues that pour it well than four hundred that never open it. Volume follows placement — it does not lead it.',
  },
  {
    n: '04',
    title: 'Built for the long pour',
    body: 'Exclusive national rights and direct producer relationships. The houses we take on are ones we intend to still be carrying in a decade.',
  },
];

const NEXT_STEPS = [
  'Tell us the venue and the kind of list you run.',
  'We send the range, trade pricing and a sample plan.',
  'A rep walks it through with you — in person wherever we can get there.',
];

const initials = (name: string) => name.split(' ').map((w) => w[0]).join('');

/** Counts up once, when the figure first scrolls into view. */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-18% 0px' });
  const reduced = useReducedMotion();
  const [n, setN] = useState(() => (reduced ? to : 0));

  useEffect(() => {
    if (!inView || n === to) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // `n` is the animation's own output; re-running on it would restart the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);

  return <span ref={ref}>{n}{suffix}</span>;
}

/** Image whose mask wipes open from the bottom as it enters the viewport. */
function Plate({ src, alt }: { src: string; alt: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  /* The observer watches the figure, never the image. The image starts clipped
     to zero height, and an element clipped to nothing reports an intersection
     ratio of 0 forever — so whileInView on the image itself deadlocks: it can
     only open once it is seen, and it can only be seen once it has opened. */
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const open = reduced || inView;
  return (
    <figure className={styles.figure} ref={ref}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={reduced ? false : { clipPath: 'inset(100% 0 0 0)', scale: 1.14 }}
        animate={open ? { clipPath: 'inset(0% 0 0 0)', scale: 1 } : undefined}
        transition={{ duration: 1.1, ease }}
      />
    </figure>
  );
}

interface Chapter {
  id: string;
  kicker: string;
  heading: string;
  gradientFrom?: number; // word index where the gradient half of the heading starts
  flip?: boolean;
  img: string;
  alt: string;
  body: ReactNode;
}

export default function Investors() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const hero = useRef<HTMLElement>(null);
  const spine = useRef<HTMLDivElement>(null);
  const [yearIndex, setYearIndex] = useState(0);

  useEffect(() => {
    document.title = 'About & Investors — 3two1 drinks';
  }, []);

  /* Hero parallax — the photograph drifts at roughly a third of scroll speed. */
  const { scrollYProgress: heroProgress } = useScroll({
    target: hero,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '18%']);

  /* The spine: fill tracks scroll through the chapters, and the year markers
     light up as the fill passes them. */
  const { scrollYProgress: spineProgress } = useScroll({
    target: spine,
    offset: ['start 40%', 'end 70%'],
  });
  const fill = useSpring(spineProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    return fill.on('change', (v) => {
      const i = Math.min(YEARS.length - 1, Math.max(0, Math.round(v * (YEARS.length - 1))));
      setYearIndex((prev) => (prev === i ? prev : i));
    });
  }, [fill]);

  const CHAPTERS: Chapter[] = [
    {
      id: 'story',
      kicker: 'Our story',
      heading: 'Built in Australia, poured everywhere.',
      gradientFrom: 2,
      img: '/images/about-story-toast.webp',
      alt: 'Friends raising whisky over a barrel table as the sun sets behind the city',
      body: (
        <>
          <p className={styles.body}>
            3two1 Drinks was founded in 2018 with a single idea — that Australia's best venues and
            bottle shops deserved a distributor that genuinely cared which bottle ended up where.
          </p>
          <p className={styles.body}>
            Eight years on, we represent nine world-class spirit houses across rum, tequila,
            whiskey, bourbon, pisco, cachaça and liqueur — working directly with bars, bottle shops and cafés across
            Australia, New Zealand and the Pacific Islands.
          </p>
          <p className={styles.body}>
            Day to day that means a warehouse in Perth, a delivery run we drive ourselves, and a
            phone answered by someone who has worked a Friday service. The range gets chosen the
            way a good back bar gets chosen — by people who have had to stand behind it.
          </p>
          <p className={`${styles.pull} gradient-text`}>
            Independent. Family-held. Intentionally small.
          </p>
        </>
      ),
    },
    {
      id: 'founders',
      kicker: 'Founders',
      heading: 'Hospitality people, building for hospitality people.',
      gradientFrom: 3,
      flip: true,
      img: '/images/about-founders-stir.webp',
      alt: "A bartender's hands stirring a drink down in a mixing glass",
      body: (
        <>
          <p className={styles.body}>
            3two1 was started by ex-bartenders, ex-buyers and ex-rep types who got tired of seeing
            great bottles end up in the wrong places. Our buying philosophy is simple: distinctive
            houses, thoughtful range, no fluff.
          </p>
          <p className={styles.body}>
            That background shows up in the unglamorous parts. Stock that lands when we said it
            would. Training that is a real shift behind the bar, not a slide deck. Pricing that
            does not move the week after you have printed your list.
          </p>
          <p className={styles.quote}>
            “We answer our phones, we deliver on time, and we taste through the portfolio with you
            whenever you'd like.”
          </p>
        </>
      ),
    },
    {
      id: 'investors',
      kicker: 'Investors',
      heading: "Building Australia's premier independent spirits portfolio.",
      gradientFrom: 3,
      img: '/images/pueblo-viejo-blanco-tequila-jalisco-mexico.webp',
      alt: 'Blue agave fields in the highlands of Jalisco at sunset',
      body: (
        <>
          <p className={styles.body}>
            We're growing — carefully — and we partner with a small group of aligned investors who
            believe in doing this for the long run. Premium agave, heritage liqueur, and rum done
            properly is a category that rewards patience, distribution discipline, and good taste.
          </p>
          <ul className={styles.points}>
            <li>
              <strong>Exclusive national rights</strong> across every house we carry — an owned
              book, not a shared agency shelf.
            </li>
            <li>
              <strong>Owner-operated since 2018</strong>, with the portfolio held outright and
              decisions made by the people who service the accounts.
            </li>
            <li>
              <strong>Premium-led categories</strong> — agave, aged rum and heritage liqueur —
              where value compounds with age, scarcity and placement.
            </li>
          </ul>
          <p className={styles.quote}>Investor enquiries welcome. We'll send the deck under NDA.</p>
          <div className={styles.ctaRow}>
            <MagneticButton variant="solid" onClick={() => navigate('/contact')} cursorLabel="Enquire">
              Contact us for the deck
            </MagneticButton>
            <MagneticButton variant="outline" href={`mailto:${contact.email}`} cursorLabel="Email">
              General enquiries <Mail size={16} />
            </MagneticButton>
          </div>
        </>
      ),
    },
    {
      id: 'footprint',
      kicker: 'Distribution footprint',
      heading: 'From WA — to wherever it pours.',
      gradientFrom: 1,
      flip: true,
      img: '/images/au-outback-road.webp',
      alt: 'A highway running through red earth in regional Western Australia',
      body: (
        <>
          <p className={styles.body}>
            Direct delivery across Perth metro and regional WA, weekly. National freight for SA, NT,
            VIC, NSW, QLD and ACT. National exclusive distribution rights across the portfolio.
          </p>
          <p className={styles.body}>
            Perth metro orders placed before midday go out on the same run. Everywhere else moves
            on a weekly national cycle, and we hold buffer stock on the core range so a listing
            never goes dark waiting on a container.
          </p>
          <div className={styles.places}>
            {PLACES.map((p) => (
              <span key={p.name} className={`${styles.place} ${p.hq ? styles.hq : ''}`}>
                <i aria-hidden="true" />
                {p.name}
                {p.hq && <span className={styles.hqTag}>HQ</span>}
              </span>
            ))}
          </div>
        </>
      ),
    },
  ];

  /* Split a heading so the tail can carry the brand gradient. */
  const splitHeading = (heading: string, from = 0) => {
    const words = heading.split(' ');
    return [words.slice(0, from).join(' '), words.slice(from).join(' ')];
  };

  return (
    <div className={styles.page}>
      {/* ══ Hero ══ */}
      <header className={styles.hero} ref={hero}>
        <motion.div className={styles.heroImgWrap} style={reduced ? undefined : { y: heroY }}>
          <img
            className={styles.heroImg}
            src="/images/about-hero-bar.webp"
            alt="A back bar lined with spirits in a venue, lit warm at night"
          />
        </motion.div>
        <div className={styles.heroScrim} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <Reveal y={14}>
            <p className={styles.heroEyebrow}><i aria-hidden="true" /> About 3two1</p>
          </Reveal>
          <h1 className={styles.heroTitle}>
            <RevealText text="In good" />{' '}
            <span className="gradient-text"><RevealText text="company." /></span>
          </h1>
          <Reveal y={18} delay={0.25}>
            <div className={styles.heroMeta}>
              <p className={styles.heroLede}>
                A small Western Australian distributor with a stubborn belief — that the right
                bottle, in the right hands, makes the night.
              </p>
              <span className={styles.heroPlace}>Perth · Western Australia</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ══ Houses on a loop ══ */}
      <div className={styles.rail}>
        <Marquee items={HOUSE_LOGOS} className={styles.railText} />
      </div>

      {/* ══ The spine ══ */}
      <div className={styles.spineWrap} ref={spine} id="story">
        <div className={`container ${styles.spineGrid}`}>
          {/* Sticky drawn line + years */}
          <div className={styles.spineCol} aria-hidden="true">
            <span className={styles.spineLineBase} />
            <motion.span
              className={styles.spineLineFill}
              style={reduced ? { transform: 'scaleY(1)' } : { scaleY: fill }}
            />
            <div className={styles.years}>
              {YEARS.map((y, i) => (
                <div key={y} className={`${styles.year} ${i <= yearIndex ? styles.yearOn : ''}`}>
                  <span className={styles.yearDot} />
                  <span className={styles.yearLabel}>{y}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chapters */}
          <div className={styles.chapters}>
            {CHAPTERS.map((c) => {
              const [head, tail] = splitHeading(c.heading, c.gradientFrom);
              return (
                <section
                  key={c.id}
                  id={c.id}
                  className={`${styles.chapter} ${c.flip ? styles.chapterFlip : ''}`}
                >
                  <div>
                    <Reveal y={16}><p className={styles.kicker}>{c.kicker}</p></Reveal>
                    <h2 className={styles.title}>
                      {head && <><RevealText text={head} />{' '}</>}
                      <em className="gradient-text"><RevealText text={tail} /></em>
                    </h2>
                    <Reveal y={18} delay={0.14}>{c.body}</Reveal>
                  </div>
                  <Plate src={c.img} alt={c.alt} />
                </section>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ How we work ══ */}
      <section className={styles.section}>
        <div className="container">
          <Reveal y={16}><p className={styles.kicker}>How we work</p></Reveal>
          <h2 className={styles.title}>
            <RevealText text="Four rules we" />{' '}
            <em className="gradient-text"><RevealText text="don't bend." /></em>
          </h2>
          <Reveal y={16} delay={0.12}>
            <p className={styles.lede}>
              Everything above is the story. This is the operating model underneath it — the part
              buyers ask about on the first call and investors ask about on the second.
            </p>
          </Reveal>
          <div className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} y={24} delay={0.1 + (i % 2) * 0.08}>
                <div className={styles.pillar}>
                  <span className={styles.pillarN}>{p.n}</span>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarBody}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Figures ══ */}
      <section className={styles.figures}>
        <div className="container">
          <Reveal y={16}><p className={styles.kicker}>By the numbers</p></Reveal>
          <div className={styles.figureGrid}>
            {FIGURES.map((f, i) => (
              <Reveal key={f.label} y={24} delay={i * 0.08}>
                <div className={styles.figureCell}>
                  <span className={`${styles.figureNum} gradient-text`}>
                    <CountUp to={f.to} suffix={f.suffix} />
                  </span>
                  <p className={styles.figureLabel}>{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Portfolio ══ */}
      <section className={styles.section}>
        <div className="container">
          <Reveal y={16}><p className={styles.kicker}>The portfolio</p></Reveal>
          <h2 className={styles.title}>
            <RevealText text="Nine houses," />{' '}
            <em className="gradient-text"><RevealText text="full national exclusivity." /></em>
          </h2>
          <Reveal y={16} delay={0.12}>
            <p className={styles.lede}>
              Rum from Cuba and Jamaica, tequila from Jalisco, bourbon and blended whiskey from the
              States, pisco from Peru and cachaça from Brazil. Nine producers, ranged so they
              complement each other rather than compete for the same shelf.
            </p>
          </Reveal>
          <div className={styles.houses}>
            {HOUSES.map((h, i) => (
              <Reveal key={h.name} y={24} delay={0.05 + (i % 4) * 0.06}>
                <div className={styles.house}>
                  <img
                    src={h.img}
                    alt={`${h.name} — 3two1 portfolio`}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                  />
                  <span className={styles.houseName}>{h.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Team ══ */}
      <section className={styles.section}>
        <div className="container">
          <Reveal y={16}><p className={styles.kicker}>People</p></Reveal>
          <h2 className={styles.title}>
            <RevealText text="The" />{' '}
            <em className="gradient-text"><RevealText text="team." /></em>
          </h2>
          <Reveal y={16} delay={0.12}>
            <p className={styles.lede}>
              Small on purpose. Between them the team has spent the better part of two decades on
              the other side of the bar — which is more or less the only thing we screen for.
            </p>
          </Reveal>
          <div className={styles.team}>
            {TEAM.map((m, i) => (
              <Reveal key={m.name} y={24} delay={0.08 + i * 0.08}>
                <div className={styles.member}>
                  <span className={styles.monogram} aria-hidden="true">{initials(m.name)}</span>
                  <div>
                    <p className={styles.memberName}>{m.name}</p>
                    <p className={styles.memberRole}>{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Closing CTA ══ */}
      <section className={`${styles.section} ${styles.cta}`}>
        <div className="container">
          <Reveal y={16}><p className={styles.kicker}>Contact</p></Reveal>
          <h2 className={`${styles.ctaTitle} gradient-text`}>
            <RevealText text="Talk to a real human." />
          </h2>
          <Reveal y={18} delay={0.2}>
            <p className={styles.ctaNote}>
              The fastest way to start trading with us is to email or call. No forms that disappear,
              no three-week wait for a callback.
            </p>
          </Reveal>
          <Reveal y={16} delay={0.24}>
            <ol className={styles.steps}>
              {NEXT_STEPS.map((step, i) => (
                <li key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal y={16} delay={0.26}>
            <div className={styles.ctaBtns}>
              <MagneticButton variant="solid" onClick={() => navigate('/contact')} cursorLabel="Contact">
                Get in touch <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton variant="outline" href={`tel:${contact.phone.replace(/\s/g, '')}`} cursorLabel="Call">
                {contact.phone}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
