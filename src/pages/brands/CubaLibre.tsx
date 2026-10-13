import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import styles from './CubaLibre.module.css';

/* ── The Black Tears Cuba Libre ──────────────────────────────────────────
   A product page for the brand's signature serve. The spec is Black Tears'
   own (50 ml rum, 10 ml lime, 150 ml cola, built over ice in a tall glass);
   the history draws on the widely recorded account of the drink's birth in
   Havana around 1900. Period photographs are public-domain photochroms by
   the Detroit Publishing Co., credited at the foot of the page. */

const bt = (f: string) => `/images/brands/black-tears/${f}.webp`;
const cl = (f: string) => `/images/brands/black-tears/cuba-libre/${f}.webp`;
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SPEC = [
  { amount: '50', unit: 'ml', what: 'Black Tears Dry Spiced', note: 'The base - coffee, cacao and ají dulce over Cuban rum' },
  { amount: '10', unit: 'ml', what: 'Fresh lime juice', note: 'Squeezed to order; this is what makes it a Cuba Libre' },
  { amount: '150', unit: 'ml', what: 'Cola', note: 'Well chilled, from a fresh bottle or gun line' },
  { amount: '-', unit: '', what: 'Cubed ice', note: 'Fill the glass to the rim' },
  { amount: '1', unit: 'wedge', what: 'Lime, to garnish', note: 'Dropped in, or on the rim' },
];

const METHOD = [
  { title: 'Ice the glass', body: 'Fill a tall highball glass to the top with fresh, hard cubes. More ice means slower dilution, not a weaker drink.' },
  { title: 'Rum and lime', body: 'Pour in 50 ml of Black Tears Dry Spiced and 10 ml of fresh lime juice.' },
  { title: 'Top with cola', body: 'Add 150 ml of cold cola, poured slowly down the inside of the glass to keep the fizz.' },
  { title: 'Stir and garnish', body: 'One or two gentle lifts with a bar spoon - just enough to bring it together - then a lime wedge.' },
];

const PROFILE = [
  { label: 'Sweetness', value: 2, of: 5, note: 'Dry spiced rum keeps the sugar in check; the cola brings the rest' },
  { label: 'Bitterness', value: 3, of: 5, note: 'Cacao and roasted coffee, like a dark-chocolate edge' },
  { label: 'Spice', value: 3, of: 5, note: 'A slow, warm build from ají dulce, Cuba’s sweet chilli' },
  { label: 'Citrus', value: 3, of: 5, note: 'Lime cuts through and lifts the whole drink' },
  { label: 'Strength', value: 2, of: 5, note: 'A long, easy highball - roughly 8–9% ABV once the ice has done its work' },
];

const TIMELINE = [
  { year: '1898', title: 'A war ends, a slogan lives on', body: 'The Spanish–American War ends Spanish rule in Cuba. “¡Cuba Libre!” - free Cuba - had been the rallying cry of the island’s independence movement.' },
  { year: 'c. 1900', title: 'Cola reaches Havana', body: 'Bottled Coca-Cola is shipped into Cuba from the United States, and American soldiers stationed in Havana start ordering it with the local rum.' },
  { year: 'Aug 1900', title: 'The toast that named it', body: 'By the best-known account, a U.S. Army Signal Corps officer orders Cuban rum with Coca-Cola in a Havana bar. The soldiers around him follow suit, and a toast goes up: “¡Por Cuba libre!”' },
  { year: '1945', title: 'A hit record', body: 'The Andrews Sisters’ “Rum and Coca-Cola” tops the American charts and carries the drink around the world.' },
  { year: 'Today', title: 'A contemporary classic', body: 'The International Bartenders Association lists the Cuba Libre among its official cocktails, and it is a fixture on bar menus everywhere.' },
];

const TIPS = [
  { title: 'Cold everything', body: 'Chill the cola and, if you can, the glass. Warm cola melts ice fast and goes flat in the glass.' },
  { title: 'Lime is not optional', body: 'Without it you have a rum and cola. The juice sharpens the cacao and coffee in Black Tears and stops the drink reading sweet.' },
  { title: 'Pour cola last, and slowly', body: 'Down the side of the glass or a bar spoon. Stir once or twice - a hard stir knocks the bubbles out.' },
  { title: 'Mind the cola', body: 'A cane-sugar or craft cola gives a drier, spicier drink. A bigger, sweeter cola pushes the vanilla. Both work; taste and choose.' },
];

const FAQ = [
  {
    q: 'What is the difference between a Cuba Libre and a rum and cola?',
    a: 'The lime. A Cuba Libre is rum and cola with fresh lime juice in the glass and a lime garnish. Leave the lime out and it is simply a rum and cola.',
  },
  {
    q: 'Why make it with a spiced rum?',
    a: 'Most Cuba Libres use a light white rum. Black Tears is a dry spiced Cuban rum, so its coffee, cacao and chilli notes sit right alongside the caramel and spice already in cola - the drink tastes deeper without getting sweeter.',
  },
  {
    q: 'What does “dry spiced” mean?',
    a: 'Black Tears is made with very little sugar - around 9 g per litre - where many spiced rums are noticeably sweet. The result is a bittersweet rum that reads dry on the finish.',
  },
  {
    q: 'Where does the name Black Tears come from?',
    a: 'From “Lágrimas Negras”, the much-loved Cuban son written by Miguel Matamoros in 1929. The title translates as “black tears”.',
  },
  {
    q: 'Which glass should I use?',
    a: 'A tall highball or Collins glass, filled with ice. The height keeps the drink cold and the bubbles lively.',
  },
  {
    q: 'Can I batch it for an event?',
    a: 'Batch the rum and lime ahead (50 : 10 per serve) and keep it cold. Build each drink to order over fresh ice and top with cola at the last moment so it stays sparkling.',
  },
];

const FACTS = [
  { value: '40%', label: 'ABV' },
  { value: '700 ml', label: 'Bottle' },
  { value: '~9 g/L', label: 'Sugar' },
  { value: 'Cuba', label: 'Origin' },
];

function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function CubaLibre() {
  const hero = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const glassY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const wordY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  useEffect(() => {
    document.title = 'The Cuba Libre - Black Tears · 3two1 drinks';
  }, []);

  return (
    <div className={styles.page}>
      {/* ═══ Hero ═══ */}
      <section className={styles.hero} ref={hero}>
        <div className={styles.heroTop}>
          <Link to="/" className={styles.crumb}>← Home</Link>
          <span>Signature serve · No. 01</span>
        </div>

        <div className={styles.heroGrid}>
          <motion.div className={styles.heroCopy} style={reduce ? undefined : { y: wordY }}>
            <span className={styles.label}>The Black Tears way</span>
            <h1 className={styles.heroTitle}>
              Cuba<br />Libre<span>.</span>
            </h1>
            <p className={styles.heroLede}>
              Havana’s most famous highball, built on the world’s first dry spiced Cuban rum. Coffee,
              cacao and a little chilli under the cola - and the squeeze of lime that earns it the name.
            </p>
            <dl className={styles.heroSpec}>
              <div><dt>Black Tears</dt><dd>50 ml</dd></div>
              <div><dt>Lime</dt><dd>10 ml</dd></div>
              <div><dt>Cola</dt><dd>150 ml</dd></div>
              <div><dt>Glass</dt><dd>Highball</dd></div>
            </dl>
          </motion.div>

          <motion.figure className={styles.heroGlass} style={reduce ? undefined : { y: glassY }}>
            <img src="/images/brand-black-tears-cuba-libre.webp" alt="A Black Tears Cuba Libre in a tall glass with ice and lime wedges" />
          </motion.figure>
        </div>
      </section>

      {/* ═══ The build ═══ */}
      <section className={styles.build} id="recipe">
        <div className={styles.wrap}>
          <Rise><span className={`${styles.label} ${styles.labelDark}`}>I. The build</span></Rise>
          <Rise delay={0.05}><h2 className={styles.head}>Five things in a tall glass.</h2></Rise>

          <div className={styles.buildGrid}>
            <Rise className={styles.card}>
              <div className={styles.cardTop}>
                <span>Spec</span>
                <span>Serves 1 · Build</span>
              </div>
              <ul className={styles.spec}>
                {SPEC.map((s) => (
                  <li key={s.what}>
                    <span className={styles.specAmt}>{s.amount}<small>{s.unit}</small></span>
                    <span className={styles.specWhat}>
                      <b>{s.what}</b>
                      <em>{s.note}</em>
                    </span>
                  </li>
                ))}
              </ul>
              <div className={styles.cardFoot}>
                <span>Glass · Highball</span>
                <span>Ice · Cubed</span>
                <span>Garnish · Lime wedge</span>
              </div>
            </Rise>

            <ol className={styles.method}>
              {METHOD.map((m, i) => (
                <Rise key={m.title} delay={0.06 * i}>
                  <li>
                    <span className={styles.stepNo}>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{m.title}</h3>
                      <p>{m.body}</p>
                    </div>
                  </li>
                </Rise>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═══ The rum ═══ */}
      <section className={styles.rum}>
        <div className={`${styles.wrap} ${styles.rumGrid}`}>
          <Rise className={styles.rumImg}>
            <img src={bt('highball')} alt="A bottle of Black Tears Dry Spiced beside a highball with lime" loading="lazy" />
          </Rise>
          <div>
            <Rise><span className={styles.label}>II. The rum</span></Rise>
            <Rise delay={0.05}><h2 className={styles.headLight}>Why it tastes different.</h2></Rise>
            <Rise delay={0.1}>
              <p className={styles.body}>
                Black Tears is the first dry spiced rum to come out of Cuba. Aged Cuban rum is spiced with
                three things from the island’s own kitchen - roasted coffee, cacao and ají dulce, the
                sweet chilli of Cuban cooking - and kept low in sugar, so it lands bittersweet rather than
                sticky.
              </p>
            </Rise>
            <Rise delay={0.14}>
              <p className={styles.body}>
                In a Cuba Libre that matters. Cola already brings caramel, vanilla and a little spice;
                Black Tears meets it with dark chocolate and roast instead of more sugar. The lime keeps
                it sharp. The result is the same drink everyone knows, with the lights turned down.
              </p>
            </Rise>
            <Rise delay={0.18}>
              <dl className={styles.facts}>
                {FACTS.map((f) => (
                  <div key={f.label}><dd>{f.value}</dd><dt>{f.label}</dt></div>
                ))}
              </dl>
            </Rise>
          </div>
        </div>
      </section>

      {/* ═══ Flavour profile ═══ */}
      <section className={styles.profile}>
        <div className={styles.wrap}>
          <Rise><span className={`${styles.label} ${styles.labelDark}`}>III. In the glass</span></Rise>
          <Rise delay={0.05}><h2 className={styles.head}>How it drinks.</h2></Rise>
          <div className={styles.profileGrid}>
            <Rise className={styles.notes}>
              <div><span>Nose</span><p>Cola spice and lime zest over roasted coffee and cocoa.</p></div>
              <div><span>Palate</span><p>Bittersweet and bright - chocolate, coffee and a warm chilli glow, lifted by lime.</p></div>
              <div><span>Finish</span><p>Dry and clean, with cacao and spice that linger after the fizz.</p></div>
            </Rise>
            <div className={styles.bars}>
              {PROFILE.map((p, i) => (
                <Rise key={p.label} delay={0.05 * i}>
                  <div className={styles.bar}>
                    <div className={styles.barHead}>
                      <b>{p.label}</b>
                      <span>{p.value} / {p.of}</span>
                    </div>
                    <div className={styles.dots} aria-label={`${p.label}: ${p.value} out of ${p.of}`}>
                      {Array.from({ length: p.of }, (_, k) => (
                        <i key={k} className={k < p.value ? styles.dotOn : undefined} />
                      ))}
                    </div>
                    <p>{p.note}</p>
                  </div>
                </Rise>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ History ═══ */}
      <section className={styles.history}>
        <div className={styles.wrap}>
          <Rise><span className={styles.label}>IV. The story</span></Rise>
          <Rise delay={0.05}><h2 className={styles.headLight}>“¡Por Cuba libre!”</h2></Rise>
          <Rise delay={0.1}>
            <p className={styles.historyLede}>
              Few drinks carry a toast in their name. The Cuba Libre was born in Havana at the turn of the
              twentieth century, when a new soft drink from the north met the island’s rum - and a city
              still celebrating its independence.
            </p>
          </Rise>

          <div className={styles.historyGrid}>
            <div className={styles.photos}>
              <Rise className={styles.photoTall}>
                <figure>
                  <img src={cl('havana-1900-street')} alt="A cobbled Havana street lined with shops, around 1900" loading="lazy" />
                  <figcaption>Calle de Habana, c. 1900</figcaption>
                </figure>
              </Rise>
              <Rise className={styles.photoWide} delay={0.08}>
                <figure>
                  <img src={cl('havana-1900-tacon')} alt="The Teatro Tacón in Havana in 1900" loading="lazy" />
                  <figcaption>Teatro Tacón, Havana, 1900</figcaption>
                </figure>
              </Rise>
              <Rise className={styles.photoWide} delay={0.12}>
                <figure>
                  <img src={cl('havana-1900-plaza')} alt="A Havana plaza with a marble fountain and palms, around 1900" loading="lazy" />
                  <figcaption>Havana, c. 1900</figcaption>
                </figure>
              </Rise>
            </div>

            <ol className={styles.timeline}>
              {TIMELINE.map((t, i) => (
                <Rise key={t.year} delay={0.05 * i}>
                  <li>
                    <span className={styles.year}>{t.year}</span>
                    <h3>{t.title}</h3>
                    <p>{t.body}</p>
                  </li>
                </Rise>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═══ Cuba Libre vs rum & cola ═══ */}
      <section className={styles.versus}>
        <div className={styles.wrap}>
          <Rise><span className={`${styles.label} ${styles.labelDark}`}>V. The difference</span></Rise>
          <Rise delay={0.05}><h2 className={styles.head}>It’s all in the lime.</h2></Rise>
          <Rise delay={0.1}>
            <div className={styles.table} role="table" aria-label="Cuba Libre compared with a rum and cola">
              <div className={styles.row} role="row">
                <span role="columnheader" />
                <span role="columnheader">Rum &amp; cola</span>
                <span role="columnheader" className={styles.hl}>Black Tears Cuba Libre</span>
              </div>
              {[
                ['Rum', 'Any rum, usually white', 'Black Tears Dry Spiced'],
                ['Lime', 'None', '10 ml fresh juice + wedge'],
                ['Taste', 'Sweet, simple', 'Bittersweet, cacao & coffee, bright'],
                ['Glass', 'Anything', 'Tall highball, full of ice'],
              ].map(([k, a, b]) => (
                <div className={styles.row} role="row" key={k}>
                  <span role="rowheader">{k}</span>
                  <span role="cell">{a}</span>
                  <span role="cell" className={styles.hl}>{b}</span>
                </div>
              ))}
            </div>
          </Rise>
        </div>
      </section>

      {/* ═══ Tips ═══ */}
      <section className={styles.tips}>
        <div className={styles.wrap}>
          <Rise><span className={styles.label}>VI. Behind the bar</span></Rise>
          <Rise delay={0.05}><h2 className={styles.headLight}>Pour it properly.</h2></Rise>
          <div className={styles.tipGrid}>
            {TIPS.map((t, i) => (
              <Rise key={t.title} delay={0.06 * i} className={styles.tip}>
                <span className={styles.tipNo}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className={styles.faq}>
        <div className={`${styles.wrap} ${styles.faqGrid}`}>
          <div>
            <Rise><span className={`${styles.label} ${styles.labelDark}`}>VII. Questions</span></Rise>
            <Rise delay={0.05}><h2 className={styles.head}>Good to know.</h2></Rise>
          </div>
          <div className={styles.faqList}>
            {FAQ.map((f) => (
              <details key={f.q} className={styles.qa}>
                <summary>
                  {f.q}
                  <Plus size={20} aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Trade ═══ */}
      <section className={styles.trade}>
        <div className={`${styles.wrap} ${styles.tradeGrid}`}>
          <div>
            <Rise><span className={styles.label}>For the trade</span></Rise>
            <Rise delay={0.05}><h2 className={styles.headLight}>Put it on the list.</h2></Rise>
            <Rise delay={0.1}>
              <p className={styles.body}>
                Swap the house rum and cola for a Black Tears Cuba Libre and charge for it. It builds in
                seconds, needs nothing you don’t already stock, and gives the menu a story worth telling.
                We supply the rum, staff training and menu copy across Australia.
              </p>
            </Rise>
            <Rise delay={0.14}>
              <div className={styles.actions}>
                <Link to="/contact" className={styles.btn}>Become a stockist <ArrowUpRight size={18} /></Link>
                <Link to="/brands/black-tears" className={styles.btnGhost}>Meet Black Tears</Link>
              </div>
            </Rise>
          </div>
          <Rise className={styles.tradeImg} delay={0.08}>
            <img src={bt('cheers')} alt="Friends toasting with Black Tears highballs" loading="lazy" />
          </Rise>
        </div>
      </section>

      {/* ═══ Credits ═══ */}
      <footer className={styles.credits}>
        <div className={styles.wrap}>
          <p>
            Recipe: Black Tears Dry Spiced brand serve. Historic photographs: photochrom prints by the Detroit
            Publishing Co., c. 1900 - public domain, from the Library of Congress via Wikimedia Commons. The
            1900 origin story follows the widely reported account of Bacardi’s Fausto Rodríguez; like most
            cocktail histories, it is told rather than proven.
          </p>
          <p>Enjoy Black Tears responsibly. Not for sale to persons under 18.</p>
        </div>
      </footer>
    </div>
  );
}
