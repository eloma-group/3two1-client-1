import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion, useInView, useReducedMotion, useScroll, useSpring, useTransform,
} from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { contact } from '../data/content';
import Reveal, { RevealHeading, RevealText } from '../components/Reveal';
import Marquee from '../components/Marquee';
import MagneticButton from '../components/MagneticButton';
import { AU_DOT_GRID } from '../data/auDotGrid';
import styles from './Investors.module.css';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* Each figure carries one line of context, so the number reads as evidence
   rather than a boast. */
const FIGURES = [
  {
    to: 450, suffix: '+', label: 'Active trade accounts',
    note: 'Bars, bottle shops and cafés — from Perth metro to the east coast.',
  },
  {
    to: 9, suffix: '', label: 'Brand houses',
    note: 'Rum, tequila, whiskey, pisco, cachaça and liqueur, every one on exclusive national rights.',
  },
  {
    to: 8, suffix: ' yrs', label: 'Independent & family-held',
    note: 'Owner-operated since 2018, with the portfolio held outright.',
  },
];

const YEARS = ['2018 · Founded', 'Our story', 'Founders', 'Investors', 'Today'];

/* Real coordinates, drawn on the footprint map. `label` says which side of the
   pin the name hangs: Brisbane and Sydney sit on the east coast, so theirs go
   out over the sea; the southern cities hang theirs below. */
const PLACES: {
  name: string; lat: number; lng: number; label: 'below' | 'right'; hq?: boolean;
}[] = [
  { name: 'Perth',     lat: -31.953, lng: 115.857, label: 'below', hq: true },
  { name: 'Sydney',    lat: -33.868, lng: 151.209, label: 'right' },
  { name: 'Melbourne', lat: -37.814, lng: 144.963, label: 'below' },
  { name: 'Brisbane',  lat: -27.47,  lng: 153.025, label: 'right' },
  { name: 'Adelaide',  lat: -34.929, lng: 138.601, label: 'below' },
];

/* The same brand strip the home page runs, rather than the names set in type —
   on a page about the portfolio the marks carry more than the words do. Each
   mark opens that house's page.
   Demonio de los Andes and Thoquino sit out until their marks exist. */
const HOUSE_LOGOS = [
  { src: '/images/brandstrip-black-tears.webp',    alt: 'Black Tears',  to: '/brands/black-tears' },
  { src: '/images/brandstrip-worthy-park.webp',    alt: 'Worthy Park',  to: '/brands/worthy-park' },
  { src: '/images/brandstrip-giffard.webp',        alt: 'Giffard',      to: '/brands/giffard' },
  { src: '/images/brandstrip-pueblo-viejo.webp',   alt: 'Pueblo Viejo', to: '/brands/pueblo-viejo' },
  { src: '/images/brandstrip-burnt-ends.webp',     alt: 'Burnt Ends',   to: '/brands/burnt-ends' },
  { src: '/images/brandstrip-san-matias.webp',     alt: 'San Matías',   to: '/brands/san-matias' },
  { src: '/images/brandstrip-whiskey-row.webp',    alt: 'Whiskey Row',  to: '/brands/whiskey-row' },
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
      const p = Math.min(1, (now - start) / 1200);
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

/**
 * By the numbers, set over a full-bleed bar photograph: the figures sit on one
 * frosted panel along the bottom, and the photo drifts slower than the page.
 */
function FiguresBand() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section className={styles.figures} ref={ref}>
      <motion.div className={styles.figuresPhoto} style={reduced ? undefined : { y: photoY }} aria-hidden="true">
        <img src="/images/about-numbers-pour.webp" alt="" loading="lazy" decoding="async" />
      </motion.div>
      <div className={styles.figuresScrim} aria-hidden="true" />

      <div className={`container ${styles.figuresInner}`}>
        <div className={styles.figuresHead}>
          <Reveal y={16}><p className={styles.kicker}>By the numbers</p></Reveal>
          <h2 className={styles.title}>
            <RevealHeading parts={[{ text: 'Small team,' }, { text: 'serious reach.', accent: true }]} />
          </h2>
          <Reveal y={16} delay={0.12}>
            <p className={styles.figuresLede}>
              Every figure below was earned behind a bar like this one — a venue, a house and a
              year at a time.
            </p>
          </Reveal>
        </div>

        <Reveal y={30} delay={0.1}>
          <dl className={styles.glass}>
            {FIGURES.map((f) => (
              <div key={f.label} className={styles.glassCell}>
                <dt className={styles.glassLabel}>{f.label}</dt>
                <dd className={styles.glassNum}>
                  <CountUp to={f.to} suffix="" />
                  {f.suffix && (
                    <span className={`${styles.glassSuffix} ${f.suffix === '+' ? styles.glassSuffixUp : ''} gradient-text`}>
                      {f.suffix.trim()}
                    </span>
                  )}
                </dd>
                <dd className={styles.glassNote}>{f.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* Footprint map projection: equirectangular, with longitude squeezed by
   cos 27deg (the middle of the continent) so Australia keeps its shape. */
const MAP_K = Math.cos((27 * Math.PI) / 180);
const MAP_S = 20;
const project = (lat: number, lng: number) => ({
  x: (lng - 112) * MAP_K * MAP_S,
  y: (-lat - 10) * MAP_S,
});
/* West of the WA border (129E) is home turf, so those dots carry the brand tint. */
const WA_BORDER = 129;
const HQ = PLACES.find((p) => p.hq)!;

/** Dot map of Australia: freight lines run out of Perth to every city we serve. */
function FootprintMap() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const open = reduced || inView;

  const hq = project(HQ.lat, HQ.lng);
  const routes = PLACES.filter((p) => !p.hq).map((p) => {
    const to = project(p.lat, p.lng);
    /* Bow each line north by a share of its length so the routes fan out over
       the continent instead of stacking along the south coast. */
    const dist = Math.hypot(to.x - hq.x, to.y - hq.y);
    const cx = (hq.x + to.x) / 2;
    const cy = (hq.y + to.y) / 2 - dist * 0.3;
    return { name: p.name, d: `M${hq.x},${hq.y} Q${cx},${cy} ${to.x},${to.y}` };
  });

  return (
    <figure
      className={styles.mapFigure}
      ref={ref}
      role="img"
      aria-label={`Map of Australia with delivery routes from Perth to ${routes.map((r) => r.name).join(', ')}`}
    >
      <svg viewBox="-30 0 900 700" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <motion.g
          initial={reduced ? false : { opacity: 0 }}
          animate={open ? { opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease }}
        >
          {AU_DOT_GRID.map(([lat, lng]) => {
            const { x, y } = project(lat, lng);
            return (
              <circle
                key={`${lat},${lng}`}
                cx={x}
                cy={y}
                r={4.6}
                className={lng < WA_BORDER ? styles.mapDotWa : styles.mapDot}
              />
            );
          })}
        </motion.g>

        {routes.map((r, i) => (
          <g key={r.name}>
            <motion.path
              d={r.d}
              className={styles.mapRoute}
              initial={reduced ? false : { pathLength: 0 }}
              animate={open ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.3, delay: 0.5 + i * 0.16, ease }}
            />
            {/* Stock on the move: a dashed overlay that crawls along the route
                once it has drawn. */}
            {!reduced && (
              <motion.path
                d={r.d}
                className={styles.mapFlow}
                initial={{ opacity: 0 }}
                animate={open ? { opacity: 1 } : undefined}
                transition={{ duration: 0.6, delay: 1.8 + i * 0.16 }}
              />
            )}
          </g>
        ))}

        {PLACES.map((p, i) => {
          const { x, y } = project(p.lat, p.lng);
          const right = p.label === 'right';
          return (
            <motion.g
              key={p.name}
              initial={reduced ? false : { opacity: 0, scale: 0.4 }}
              animate={open ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.6, delay: p.hq ? 0.3 : 1.4 + (i - 1) * 0.16, ease }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              {p.hq && <circle cx={x} cy={y} r={12} className={styles.mapPulse} />}
              <circle cx={x} cy={y} r={p.hq ? 12 : 8.5} className={styles.mapPin} />
              <text
                x={right ? x + 20 : x}
                y={right ? y + 8 : y + 40}
                textAnchor={right ? 'start' : 'middle'}
                className={styles.mapLabel}
              >
                {p.name}
                {p.hq && <tspan className={styles.mapHq} dx={8}>HQ</tspan>}
              </text>
            </motion.g>
          );
        })}
      </svg>
      <figcaption className={styles.mapKey}>
        <span><i className={styles.mapKeyHq} aria-hidden="true" /> Perth HQ · weekly across WA</span>
        <span><i className={styles.mapKeyRoute} aria-hidden="true" /> National freight</span>
      </figcaption>
    </figure>
  );
}

interface Chapter {
  id: string;
  kicker: string;
  heading: string;
  gradientFrom?: number; // word index where the gradient half of the heading starts
  flip?: boolean;
  /* A chapter shows either a photograph (img + alt) or its own figure (media). */
  img?: string;
  alt?: string;
  media?: ReactNode;
  body: ReactNode;
}

/** `ready` flips once the splash starts to leave, so the hero rises in view. */
export default function Investors({ ready = true }: { ready?: boolean }) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const hero = useRef<HTMLElement>(null);
  const spine = useRef<HTMLDivElement>(null);
  const [yearIndex, setYearIndex] = useState(0);

  useEffect(() => {
    document.title = 'Our Story — 3two1 drinks';
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
      alt: 'Pueblo Viejo Blanco tequila bottle with a shot glass on sunlit stone',
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
      media: <FootprintMap />,
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
            <RevealHeading
              parts={[{ text: 'In good' }, { text: 'company.', accent: true }]}
              accentAs="span"
              play={ready}
              delay={0.15}
            />
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
                      <RevealHeading parts={[...(head ? [{ text: head }] : []), { text: tail, accent: true }]} />
                    </h2>
                    <Reveal y={18} delay={0.14}>{c.body}</Reveal>
                  </div>
                  {c.media ?? <Plate src={c.img!} alt={c.alt!} />}
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
            <RevealHeading parts={[{ text: 'Four rules we' }, { text: "don't bend.", accent: true }]} />
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
      <FiguresBand />

      {/* ══ Team ══ */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.teamHead}>
            <div>
              <Reveal y={16}><p className={styles.kicker}>People</p></Reveal>
              <h2 className={styles.title}>
                <RevealHeading parts={[{ text: 'The' }, { text: 'team.', accent: true }]} />
              </h2>
            </div>
            <Reveal y={16} delay={0.12}>
              <p className={styles.teamLede}>
                Small on purpose. Between them the team has spent the better part of two decades on
                the other side of the bar — which is more or less the only thing we screen for.
              </p>
            </Reveal>
          </div>
          <div className={styles.team}>
            {TEAM.map((m, i) => (
              <Reveal key={m.name} y={28} delay={0.08 + i * 0.1}>
                <article className={styles.member}>
                  <div className={styles.memberTop}>
                    <span className={styles.memberN}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.memberRole}>{m.role}</span>
                  </div>
                  {/* No portraits yet, so the initials stand in for one. */}
                  <span className={styles.monogram} aria-hidden="true">{initials(m.name)}</span>
                  <h3 className={styles.memberName}>{m.name}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Closing CTA ══ */}
      <section className={`${styles.section} ${styles.cta}`}>
        <div className="container">
          <Reveal y={16}><p className={styles.kicker}>Contact</p></Reveal>
          <h2 className={styles.ctaTitle}>
            <RevealText text="Talk to a real human." accent />
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
