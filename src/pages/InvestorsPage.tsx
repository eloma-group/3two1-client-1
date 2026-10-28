import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { contact } from '../data/content';
import Reveal, { RevealHeading } from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import styles from './InvestorsPage.module.css';

/* Everything on this page comes from the 2028 roadmap & capital raise deck.
   Figures marked as projections are the deck's own forecasts. */

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const RAISE = [
  { k: 'Structure', v: '% equity, loan or convertible note' },
  { k: 'Raise', v: 'Up to $1.2M' },
  { k: 'Exit', v: 'Possible at 4 years, with a share buyback mechanism' },
];

/* 3 parts spirit, 2 parts sour, 1 part sweet — where the name comes from. */
const BALANCE = [
  {
    parts: 3, name: 'Spirit', tag: 'The most important part of any drink',
    body: 'Our focus is on identifying and filling gaps in the market with exceptional products that truly stand out.',
  },
  {
    parts: 2, name: 'Sour', tag: 'Everything good needs balance',
    body: 'Balance is key to exceptional results. We curate a diverse and rich portfolio so each brand is elevated to its full potential.',
  },
  {
    parts: 1, name: 'Sweet', tag: 'Sweetness does not have to be fake',
    body: 'The role of sweeteners in a cocktail cannot be overstated. Like our syrups, we deliver consistency and quality every time.',
  },
];

const JOURNEY = [
  { year: '2017', customers: 10, units: '1,800 units · 3 pallets', note: 'Started alone - hand selling the quality of the product and delivering by the unit.' },
  { year: '2019', customers: 150, units: '7,894 units · 11 pallets', note: 'Hired Yannick, well known in WA hospitality, who extended our contract base. Jimmy Houston later brought in Dan Murphy’s.' },
  { year: '2022', customers: 1000, units: '45,200 units · 68 pallets', note: 'Ranged in all major wholesalers across the country, with recurring orders - and more products in a better blend.' },
  { year: '2024', customers: 2300, units: '68,645 units · 105 pallets', note: 'Welcomed The London Essence Co. and scaled it to 8,000 cases a year.' },
];

const JOURNEY_POINTS = [
  'One of only two distributors in the market with this profile.',
  'The credibility a great distributor needs - and the opportunities that come with it.',
  'Attracting profiles from the competition: new staff, investors and executives.',
  'Distribution access to 12,000 venues, on and off premise, with a low barrier to entry.',
];

/* $M. `inv` is the deck's projection with the new capital. */
const SALES: { y: string; bau: number; inv?: number; staff: string; invStaff?: string }[] = [
  { y: '18-19', bau: 0.069, staff: '1' },
  { y: '19-20', bau: 0.34, staff: '2' },
  { y: '20-21', bau: 1.48, staff: '5' },
  { y: '21-22', bau: 2.3, staff: '8' },
  { y: '22-23', bau: 2.6, staff: '10' },
  { y: '23-24', bau: 2.6, staff: '6' },
  { y: '24-25', bau: 1.9, staff: '6' },
  { y: '25-26', bau: 1.9, inv: 3.1, staff: '6', invStaff: '6' },
  { y: '26-27', bau: 4.7, inv: 6.5, staff: '7', invStaff: '9' },
  { y: '27-28', bau: 5.8, inv: 11.3, staff: '9', invStaff: '12' },
  { y: '28-29', bau: 7, inv: 17.3, staff: '10', invStaff: '16-20' },
];
const SALES_MAX = 17.3;
const TODAY = 7; // index of the first projected year

const ROADMAP = [
  { when: '2020-21', title: 'Financial consolidation', body: 'We took the time during Covid to strengthen the business and map out the plan.' },
  { when: '2021-23', title: 'Confirmation of success', body: 'Initial targets met. A diverse, strong portfolio, with missing categories sourced brand by brand.' },
  { when: '2024-25', title: 'Banner groups & New Zealand', body: 'A dedicated sales team for off-premise banner groups, and company entry into New Zealand.' },
  { when: '2026-28', title: 'Spirits distributor of choice', body: 'Venues of choice, on and off, come to us for the portfolio and service - and we activate alongside them.' },
];

const FOOTPRINT_NOW = [
  { n: 6, label: 'Employees', note: 'Inc. executives - a presence in each major state.' },
  { n: 5, label: 'National wholesalers', note: 'Ranged across the country.' },
  { n: 8, label: 'Warehouses', note: 'Stock held close to every market we serve.' },
];

const ISLANDS = [
  { place: 'Hamilton Island (AU)', who: 'Blackstone', cases: '5,000+' },
  { place: 'Fiji', who: '', cases: '600' },
  { place: 'New Caledonia', who: 'Sullivan NC SAS', cases: '600' },
  { place: 'New Zealand', who: 'Funlab & Langham', cases: '200 (900+ potential)' },
  { place: 'Vanuatu', who: 'Fung Kuei', cases: '150' },
  { place: 'Cook Islands', who: 'Prime Foods', cases: '150' },
];

const PLATFORMS = [
  { title: 'Organisational', items: ['Office 365', 'OnTap Data', 'Rhino CRM', 'Monday'] },
  { title: 'Fulfilment', items: ['Unleashed', 'BevChain', 'Carton Cloud', 'Keepspace'] },
  { title: 'Selling', items: ['DrinksUp.com.au', 'ALM Connect', 'Hairy Dog', 'Dan Murphy’s Online', 'Boozebud', 'Amazon'] },
];

const STRATEGY = [
  { title: 'Recruitment', body: 'We hire industry leaders with a true passion and drive to secure us as a top-level distributor.' },
  { title: 'Marketing', body: 'Campaigns adapted to the season and trends - and more present in that space than our competition.' },
  { title: 'Top-down approach', body: 'A portfolio dedicated to the top 10% of Australian venues and the most discerning customers.' },
  { title: 'End-consumer experience', body: 'Integral to our marketing - it drives online sales through our website and brand exposure.' },
  { title: 'Spirits & cocktails', body: 'New additions curated to fit our ethos and vision, such as The London Essence Co.' },
  { title: 'Off-premise nurturing', body: 'Contracts with retailers such as Woolworths, Coles and Cellarbrations.' },
];

const BRANDS_NEW = [
  { name: 'Suze & Dubonnet', kind: 'French aperitifs', when: 'Start mid-2025', figure: '$700K+', note: 'sales a year, already generating' },
  { name: 'Pampero', kind: 'Rums', when: 'Start ASAP', figure: '$3.3M+', note: 'sales a year, previously owned by Diageo' },
];

const EXPANSION = [
  {
    tag: '01 · 2024+', title: 'Open 3Two1 Drinks New Zealand',
    points: ['A market as big as QLD/WA', '$2.5M sales a year minimum', 'Exclusive rights already signed - Giffard & Pampero'],
  },
  {
    tag: '02 · 2028+', title: 'Master wholesale in South-East Asia',
    points: ['Sub-distribute our brands to the Asian market', 'Or open 3Two1 Drinks in Singapore, Thailand or India', 'Brand exclusive rights discussed, not signed'],
  },
];

const FUNDS = [
  { label: 'Stock', pct: 51.3, color: 'var(--rose-700)' },
  { label: 'Staff', pct: 25.6, color: 'var(--rose-500)' },
  { label: 'Working capital', pct: 17.9, color: 'var(--coral)' },
  { label: 'Marketing', pct: 5.1, color: 'var(--peach)' },
];

const EXIT_ROUTES = [
  'Share buyback by current shareholders, or a share sale',
  'A competing beer portfolio',
  'A brand - several we speak to are known to buy out their distributors',
  'U.S. venture capital trusts investing in their own distribution',
];

const LEADERS = [
  { name: 'Charles Docus', role: 'Founder & Managing Director', note: 'Former solicitor · Former bartender', img: '/images/investors/charles-docus.webp' },
  { name: 'Scott Penman', role: 'Shareholder & Director', note: 'Director of two other companies', img: '/images/investors/scott-penman.webp' },
  { name: 'Peter Weeks', role: 'Legal Advisor', note: 'Managing Partner at Weeks & Co.', img: '/images/investors/peter-weeks.webp' },
  { name: 'Alexander Stucken & Verity Coles', role: 'Shareholders', note: 'Venue owners · Terrarium Perth', img: '/images/investors/alexander-stucken-verity-coles.webp' },
];

const GROUND = [
  { name: 'Charles Docus', role: 'General Manager / Director' },
  { name: 'Scott Penman', role: 'Co-director' },
  { name: 'Bronwyn Has', role: 'Operations / Accounts Manager' },
  { name: 'Yannick Douzals', role: 'WA Sales Manager / National Spirits Specialist' },
  { name: 'Steven Payne', role: 'NSW Sales Manager' },
  { name: 'Ellen Lamz', role: 'Accounts & Logistics Assistant' },
  { name: 'Mycol Cavalieri', role: 'Gold Coast Rep · Giffard BA' },
];

/** Counts up once, when the figure first scrolls into view. */
function CountUp({ to, decimals = 0, prefix = '', suffix = '' }: {
  to: number; decimals?: number; prefix?: string; suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const [n, setN] = useState(() => (reduced ? to : 0));

  useEffect(() => {
    if (!inView || reduced) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setN(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);

  const shown = n.toLocaleString('en-AU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref}>{prefix}{shown}{suffix}</span>;
}

function SectionHead({ kicker, lead, accent, children, light }: {
  kicker: string; lead: string; accent: string; children?: ReactNode; light?: boolean;
}) {
  return (
    <div className={`${styles.head} ${light ? styles.headLight : ''}`}>
      <Reveal y={16}><p className={styles.kicker}>{kicker}</p></Reveal>
      <h2 className={styles.title}>
        <RevealHeading parts={[{ text: lead }, { text: accent, accent: true }]} />
      </h2>
      {children && <Reveal y={16} delay={0.12}><p className={styles.lede}>{children}</p></Reveal>}
    </div>
  );
}

/* Sections taken off the page for now. Flip one to true to bring it back. */
const SHOW = {
  sales: false,   // Sales 2018 - projections 2029
  market: false,  // Spirits sales in the Australian market
  route: false,   // Route to market
  future: false,  // Future
  funds: false,   // Investment allocation (the Exit card stays)
  ground: false,  // Our team on the ground
};

/** Sales history and projection: bars rise in sequence as the chart enters. */
function SalesChart() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const open = reduced || inView;

  return (
    <div className={styles.chart} ref={ref}>
      <div className={styles.legend}>
        <span><i className={styles.swBau} /> Business as usual</span>
        <span><i className={styles.swInv} /> With the new capital (projected)</span>
      </div>
      <div className={styles.bars} role="img" aria-label="Annual sales from $69,000 in 2018-19 to a projected $17.3M in 2028-29 with the new capital">
        {SALES.map((s, i) => (
          <div key={s.y} className={`${styles.barCol} ${i === TODAY ? styles.barToday : ''}`}>
            <div className={styles.barPair}>
              {[{ v: s.bau, cls: styles.barBau, staff: s.staff }, ...(s.inv ? [{ v: s.inv, cls: styles.barInv, staff: s.invStaff! }] : [])].map((b, j) => (
                <motion.div
                  key={j}
                  className={`${styles.bar} ${b.cls}`}
                  style={{ height: `${Math.max(1.2, (b.v / SALES_MAX) * 100)}%`, transformOrigin: 'bottom' }}
                  initial={reduced ? false : { scaleY: 0 }}
                  animate={open ? { scaleY: 1 } : undefined}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.07 + j * 0.12, ease }}
                >
                  <span className={styles.barVal}>
                    {b.v < 1 ? `$${Math.round(b.v * 1000)}K` : `$${b.v}M`}
                    <small>{b.staff} staff</small>
                  </span>
                </motion.div>
              ))}
            </div>
            <span className={styles.barYear}>{s.y}</span>
          </div>
        ))}
      </div>
      <p className={styles.fine}>
        Financial years. 2025-26 onwards are projections from the deck, shown with and without the
        new capital. Our AI automations reduce the need for staff by 1.5x, which would lift profit
        significantly.
      </p>
    </div>
  );
}

/** Use of funds: each slice draws itself round the ring in turn. */
function FundsDonut() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const open = reduced || inView;
  const r = 70;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div className={styles.funds} ref={ref}>
      <svg viewBox="0 0 200 200" className={styles.donut} role="img" aria-label="Stock 51.3%, staff 25.6%, working capital 17.9%, marketing 5.1%">
        <circle cx="100" cy="100" r={r} className={styles.donutTrack} />
        {FUNDS.map((f, i) => {
          const len = (f.pct / 100) * c;
          const offset = -acc;
          acc += len;
          return (
            <motion.circle
              key={f.label}
              cx="100" cy="100" r={r}
              fill="none"
              stroke={f.color}
              strokeWidth="26"
              strokeDasharray={`${len} ${c}`}
              strokeDashoffset={offset}
              transform="rotate(-90 100 100)"
              initial={reduced ? false : { strokeDasharray: `0 ${c}` }}
              animate={open ? { strokeDasharray: `${len} ${c}` } : undefined}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.25, ease }}
            />
          );
        })}
        <text x="100" y="96" textAnchor="middle" className={styles.donutBig}>$1.2M</text>
        <text x="100" y="118" textAnchor="middle" className={styles.donutSmall}>new capital</text>
      </svg>
      <ul className={styles.fundList}>
        {FUNDS.map((f, i) => (
          <Reveal key={f.label} y={14} delay={0.15 + i * 0.1}>
            <li>
              <i style={{ background: f.color }} />
              <span>{f.label}</span>
              <strong><CountUp to={f.pct} decimals={1} suffix="%" /></strong>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/** Market split: the big ten take the bar, then the independents' sliver grows in. */
function MarketBar() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const open = reduced || inView;
  return (
    <div className={styles.market} ref={ref}>
      <div className={styles.marketBar}>
        <motion.span
          className={styles.marketBig}
          initial={reduced ? false : { width: 0 }}
          animate={open ? { width: '95%' } : undefined}
          transition={{ duration: 1.2, ease }}
        >
          95% · The big 10 · $31B
        </motion.span>
        <motion.span
          className={styles.marketIndie}
          initial={reduced ? false : { width: 0 }}
          animate={open ? { width: '5%' } : undefined}
          transition={{ duration: 0.8, delay: 1, ease }}
        />
      </div>
      <div className={styles.marketKeys}>
        <p><strong>95% to the big 10</strong> Pernod Ricard, Diageo, Bacardi, Grants, Southtrade, Amber Spirits, Suntory, Moët, Brown-Forman, Lion.</p>
        <p><strong>5% to independents · $2B</strong> Vok, Cerbaco, Artus, Proof and Co, Iconic Beverages.</p>
      </div>
    </div>
  );
}

export default function InvestorsPage({ ready = true }: { ready?: boolean }) {
  const reduced = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const journey = useRef<HTMLElement>(null);
  const roadmap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Investors - 3Two1 Drinks';
  }, []);

  const { scrollYProgress: heroP } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroP, [0, 1], ['0%', '18%']);
  const { scrollYProgress: journeyP } = useScroll({ target: journey, offset: ['start end', 'end start'] });
  const journeyY = useTransform(journeyP, [0, 1], ['-8%', '8%']);
  /* The roadmap line draws as you scroll through the four phases. */
  const { scrollYProgress: roadP } = useScroll({ target: roadmap, offset: ['start 75%', 'end 60%'] });

  return (
    <div className={styles.page}>
      {/* ══ Hero ══ */}
      <header className={styles.hero} ref={hero}>
        <motion.div className={styles.heroImgWrap} style={reduced ? undefined : { y: heroY }}>
          <img className={styles.heroImg} src="/images/investors/roadmap-summit.webp" alt="A hiker standing on a rocky summit above the clouds" />
        </motion.div>
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <Reveal y={14}>
            <p className={styles.heroEyebrow}><i aria-hidden="true" /> Investors · Company roadmap 2026</p>
          </Reveal>
          <h1 className={styles.heroTitle}>
            <RevealHeading
              parts={[{ text: 'Capital raise' }, { text: 'opportunity.', accent: true }]}
              accentAs="span"
              play={ready}
              delay={0.15}
            />
          </h1>
          <Reveal y={18} delay={0.3}>
            <dl className={styles.raise}>
              {RAISE.map((r) => (
                <div key={r.k} className={styles.raiseCell}>
                  <dt>{r.k}</dt>
                  <dd>{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      {/* ══ 3 · 2 · 1 ══ */}
      <section className={styles.section}>
        <div className="container">
          <SectionHead kicker="Why 3Two1 Drinks? · Our philosophy" lead="Everything good needs" accent="balance.">
            Three parts spirit, two parts sour, one part sweet. The name is the recipe - and the way
            we build the portfolio.
          </SectionHead>
          <div className={styles.balance}>
            {BALANCE.map((b, i) => (
              <Reveal key={b.name} y={26} delay={0.08 + i * 0.12}>
                <article className={styles.part}>
                  <div className={styles.partGlass} aria-hidden="true">
                    {Array.from({ length: 3 }, (_, k) => (
                      <motion.span
                        key={k}
                        className={k < b.parts ? styles.partOn : ''}
                        initial={reduced ? false : { scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: '-15% 0px' }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.12 + (2 - k) * 0.12, ease }}
                      />
                    ))}
                  </div>
                  <p className={styles.partN}>{b.parts} part{b.parts > 1 ? 's' : ''}</p>
                  <h3 className={styles.partName}>{b.name}</h3>
                  <p className={styles.partTag}>{b.tag}</p>
                  <p className={styles.partBody}>{b.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ The journey so far ══ */}
      <section className={styles.journey} ref={journey}>
        <motion.div className={styles.journeyPhoto} style={reduced ? undefined : { y: journeyY }} aria-hidden="true">
          <img src="/images/investors/journey-road.webp" alt="" loading="lazy" decoding="async" />
        </motion.div>
        <div className={styles.journeyScrim} aria-hidden="true" />
        <div className="container">
          <SectionHead kicker="Current position" lead="The journey" accent="so far." light />
          <div className={styles.milestones}>
            {JOURNEY.map((m, i) => (
              <Reveal key={m.year} y={28} delay={0.1 + i * 0.12}>
                <article className={styles.milestone}>
                  <p className={styles.mYear}>{m.year}</p>
                  <p className={styles.mBig}><CountUp to={m.customers} suffix={i === JOURNEY.length - 1 ? '+' : ''} /></p>
                  <p className={styles.mLabel}>Customers</p>
                  <p className={styles.mUnits}>{m.units}</p>
                  <p className={styles.mNote}>{m.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal y={18} delay={0.2}>
            <ul className={styles.journeyPoints}>
              {JOURNEY_POINTS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ══ Sales ══ */}
      {SHOW.sales && (
      <section className={styles.section}>
        <div className="container">
          <SectionHead kicker="Sales 2018 - projections 2029" lead="A model that" accent="works.">
            We have grown significantly since 2018. Through careful planning and efficiency, 3Two1 Drinks has
            proven its model and welcomed and nurtured a wide variety of industry-leading brands.
          </SectionHead>
          <SalesChart />
        </div>
      </section>
      )}

      {/* ══ Roadmap ══ */}
      <section className={`${styles.section} ${styles.tint}`}>
        <div className="container">
          <SectionHead kicker="Roadmap 2024+" lead="Where we are" accent="heading." />
          <div className={styles.roadmap} ref={roadmap}>
            <span className={styles.roadLine} aria-hidden="true" />
            <motion.span
              className={styles.roadFill}
              aria-hidden="true"
              style={reduced ? { transform: 'scaleX(1)' } : { scaleX: roadP }}
            />
            {ROADMAP.map((r, i) => (
              <Reveal key={r.when} y={24} delay={0.08 + i * 0.12}>
                <article className={styles.phase}>
                  <span className={styles.phaseDot} aria-hidden="true" />
                  <p className={styles.phaseWhen}>{r.when}</p>
                  <h3 className={styles.phaseTitle}>{r.title}</h3>
                  <p className={styles.phaseBody}>{r.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Footprint ══ */}
      <section className={styles.section}>
        <div className="container">
          <SectionHead kicker="National footprint" lead="Today, and" accent="by 2030.">
            A presence in each major state is essential to the growth of the company and its brands -
            it lets us sell in every state and run campaigns nationally, true to each brand’s ethos.
          </SectionHead>
          <div className={styles.footprint}>
            <div className={styles.fpNow}>
              <p className={styles.fpTag}>By end of June 2025</p>
              {FOOTPRINT_NOW.map((f, i) => (
                <Reveal key={f.label} y={20} delay={0.08 + i * 0.1}>
                  <div className={styles.fpRow}>
                    <span className={styles.fpN}><CountUp to={f.n} /></span>
                    <div>
                      <p className={styles.fpLabel}>{f.label}</p>
                      <p className={styles.fpNote}>{f.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal y={26} delay={0.15}>
              <div className={styles.fpNext}>
                <p className={styles.fpTag}>By end of December 2030 · AUS / NZ</p>
                <div className={styles.fpRow}>
                  <span className={styles.fpN}><CountUp to={20} /></span>
                  <div>
                    <p className={styles.fpLabel}>Employees</p>
                    <p className={styles.fpNote}>
                      2+ new sales reps per state and 3 more support staff and executives for the off-trade
                      - Dan Murphy’s (Woolworths) and Liquorland / Vintage Cellars (Coles). New Zealand
                      gets a 3-person team, including a sales manager.
                    </p>
                  </div>
                </div>
                <div className={styles.teams}>
                  <div>
                    <h4>On-premise</h4>
                    <p>1 national manager</p>
                    <p>3 local managers</p>
                    <p>10 sales representatives</p>
                  </div>
                  <div>
                    <h4>Off-premise</h4>
                    <p>1 national retail</p>
                    <p>2 sales & activation managers</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ Market ══ */}
      {SHOW.market && (
      <section className={`${styles.section} ${styles.tint}`}>
        <div className="container">
          <div className={styles.marketHead}>
            <SectionHead kicker="Spirits sales in the Australian market" lead="A $35.1B market," accent="5% independent.">
              Revenue in the spirits segment is expected to grow by 6.6% a year.
            </SectionHead>
            <Reveal y={22} delay={0.15}>
              <div className={styles.potential}>
                <p className={styles.potTag}>3Two1 Drinks’ potential</p>
                <p className={styles.potBig}><CountUp to={40} prefix="$" suffix="M" /></p>
                <p className={styles.potNote}>turnover by becoming 1% of the independent, spirits-focused suppliers.</p>
              </div>
            </Reveal>
          </div>
          <MarketBar />
        </div>
      </section>
      )}

      {/* ══ Route to market ══ */}
      {SHOW.route && (
      <section className={styles.section}>
        <div className="container">
          <SectionHead kicker="Route to market" lead="On, off" accent="and offshore.">
            Liquor and syrups wholesale across the Pacific, a push into the bottle shops where the
            volume is, and direct-to-consumer where the margins double.
          </SectionHead>
          <div className={styles.routes}>
            <Reveal y={24}>
              <article className={styles.routeCard}>
                <p className={styles.routeTag}>Pacific & islands · wholesale</p>
                <ul className={styles.islands}>
                  {ISLANDS.map((s) => (
                    <li key={s.place}>
                      <span>{s.place}{s.who && <small>{s.who}</small>}</span>
                      <strong>{s.cases}<small>cases / yr</small></strong>
                    </li>
                  ))}
                </ul>
                <p className={styles.routeFoot}>Value: <strong>$1.1M AUD a year</strong> for 3 years.</p>
              </article>
            </Reveal>
            <Reveal y={24} delay={0.1}>
              <article className={`${styles.routeCard} ${styles.routeDark}`}>
                <p className={styles.routeTag}>Off premise · bottle shops</p>
                <p className={styles.routeBig}><CountUp to={0.1} decimals={1} suffix="%" /></p>
                <p className={styles.routeText}>
                  of the bottle shops in Australia is all we sell to today. Off premise is where the
                  volume is - contracted, bulk, consistent orders, while we keep supporting and
                  activating on-prem. Next: Coles Liquor, First Choice, Liquorland and Vintage Cellars.
                </p>
              </article>
            </Reveal>
            <Reveal y={24} delay={0.2}>
              <article className={styles.routeCard}>
                <p className={styles.routeTag}>Direct to consumer</p>
                <h3 className={styles.routeTitle}>Where margins double.</h3>
                <p className={styles.routeText}>
                  DrinksUp.com.au runs on Shopify and Keepspace, integrated with our sales, fulfilment and
                  social platforms, and retargets customers on Google and social. Acquisition costs more
                  than a repeat on- or off-premise customer ordering by the case.
                </p>
              </article>
            </Reveal>
          </div>
          <div className={styles.platforms}>
            <Reveal y={16}><p className={styles.platHead}>Systems & channels · <span>low overheads</span></p></Reveal>
            <div className={styles.platGrid}>
              {PLATFORMS.map((p, i) => (
                <Reveal key={p.title} y={18} delay={0.08 + i * 0.1}>
                  <div className={styles.plat}>
                    <h4>{i + 1}. {p.title}</h4>
                    <div className={styles.chips}>{p.items.map((it) => <span key={it}>{it}</span>)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ══ Strategy ══ */}
      <section className={styles.strategy}>
        <div className={styles.strategyPhoto} aria-hidden="true">
          <img src="/images/investors/strategy-studio.webp" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="container">
          <SectionHead kicker="Strategy" lead="Independent," accent="and focused.">
            3Two1 Drinks is proudly independent and voluntarily dedicated to a limited portfolio. That gives
            every brand complete focus - and attracts our competitors’ brands.
          </SectionHead>
          <div className={styles.stratGrid}>
            {STRATEGY.map((s, i) => (
              <Reveal key={s.title} y={22} delay={0.06 + (i % 3) * 0.1}>
                <div className={styles.strat}>
                  <span className={styles.stratN}>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Future ══ */}
      {SHOW.future && (
      <section className={styles.section}>
        <div className="container">
          <SectionHead kicker="Future" lead="International brands are" accent="approaching us.">
            Premium international brands with established sales are coming to 3Two1 Drinks - and two are
            already confirmed.
          </SectionHead>
          <div className={styles.brandsNew}>
            {BRANDS_NEW.map((b, i) => (
              <Reveal key={b.name} y={24} delay={0.08 + i * 0.12}>
                <article className={styles.brandNew}>
                  <div className={styles.brandTop}>
                    <span>{b.kind}</span>
                    <span className={styles.signed}>✓ {b.when}</span>
                  </div>
                  <h3>{b.name}</h3>
                  <p className={styles.brandFig}>{b.figure}<small>{b.note}</small></p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className={styles.expansion}>
            {EXPANSION.map((e, i) => (
              <Reveal key={e.title} y={24} delay={0.08 + i * 0.12}>
                <article className={styles.expand}>
                  <p className={styles.expandTag}>{e.tag}</p>
                  <h3>{e.title}</h3>
                  <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ══ Use of funds + exit ══ */}
      <section className={`${styles.section} ${styles.tint}`}>
        <div className={SHOW.funds ? `container ${styles.split}` : 'container'}>
          {SHOW.funds && (
          <div>
            <SectionHead kicker="Investment allocation" lead="How the new capital" accent="is spent." />
            <FundsDonut />
          </div>
          )}
          {/* On its own the Exit card would stretch the full container; keep it card-sized. */}
          <div style={SHOW.funds ? undefined : { maxWidth: 720 }}>
            <SectionHead kicker="Exit" lead="A clear" accent="way out." />
            <Reveal y={22} delay={0.1}>
              <div className={styles.exit}>
                <div className={styles.exitTop}>
                  <div><p className={styles.exitBig}>4-7</p><p className={styles.exitLabel}>years to exit</p></div>
                  <div><p className={styles.exitBig}>4x</p><p className={styles.exitLabel}>est. EBITDA</p></div>
                </div>
                <ul className={styles.exitList}>
                  {EXIT_ROUTES.map((r) => <li key={r}>{r}</li>)}
                </ul>
                <p className={styles.fine}>
                  Market precedents: Island to Island (now Proximo), Vanguard Brands (Lion) and Amber
                  Spirits (formerly Think Spirits).
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ Team ══ */}
      <section className={styles.section}>
        <div className="container">
          <SectionHead kicker="The team" lead="Executive team, board" accent="and shareholders.">
            Experienced individuals in their field.
          </SectionHead>
          <div className={styles.leaders}>
            {LEADERS.map((m, i) => (
              <Reveal key={m.name} y={28} delay={0.08 + i * 0.1}>
                <article className={styles.leader}>
                  <div className={styles.leaderPhoto}>
                    <img src={m.img} alt={m.name} loading="lazy" decoding="async" />
                  </div>
                  <h3>{m.name}</h3>
                  <p className={styles.leaderRole}>{m.role}</p>
                  <p className={styles.leaderNote}>{m.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
          {SHOW.ground && (
          <Reveal y={18} delay={0.1}>
            <div className={styles.ground}>
              <p className={styles.groundHead}>Our team on the ground · <span>specialists, spirit-focused and creative</span></p>
              <ul>
                {GROUND.map((g) => <li key={g.name}><strong>{g.name}</strong><span>{g.role}</span></li>)}
              </ul>
            </div>
          </Reveal>
          )}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className={`${styles.section} ${styles.cta}`}>
        <div className="container">
          <Reveal y={16}><p className={styles.kicker}>Open raise</p></Reveal>
          <h2 className={styles.ctaTitle}>
            <RevealHeading parts={[{ text: 'Up to' }, { text: '$1.2M.', accent: true }]} />
          </h2>
          <Reveal y={18} delay={0.15}>
            <p className={styles.ctaNote}>
              Equity, loan or convertible note - with an exit possible at four years through a share
              buyback. Ask us for the full deck and the CFO forecasts.
            </p>
          </Reveal>
          <Reveal y={16} delay={0.25}>
            <div className={styles.ctaBtns}>
              <MagneticButton
                variant="solid"
                cursorLabel="Email"
                href={`mailto:${contact.email}?subject=${encodeURIComponent('Investor enquiry - 3Two1 Drinks')}`}
              >
                <Mail size={17} /> Request the deck <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>
          <p className={styles.disclaimer}>
            Projections are estimates only and are not a guarantee of future performance. This page is
            for information and is not an offer of securities.
          </p>
        </div>
      </section>
    </div>
  );
}
