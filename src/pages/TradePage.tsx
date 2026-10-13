import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Coffee,
  FlaskConical,
  Layers,
  Leaf,
  Megaphone,
  Store,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { tradeSegment, tradeSegments, type TradeSegment } from '../data/tradePages';
import SmartImage from '../components/SmartImage';
import Hero from '../components/bento/Hero';
import Rise from '../components/bento/Rise';
import Pill from '../components/bento/Pill';
import Carousel from '../components/bento/Carousel';
import Segmented from '../components/bento/Segmented';
import Cta from '../components/bento/Cta';
import b from '../components/bento/bento.module.css';
import { usePageSetup } from '../hooks/usePageSetup';
import styles from './TradePage.module.css';

type Reason = TradeSegment['reasons'][number];

const ICONS: Record<Reason['icon'], LucideIcon> = {
  range: FlaskConical,
  people: UserRound,
  margin: TrendingUp,
  shelf: Store,
  pos: Megaphone,
  growth: TrendingUp,
  skus: Layers,
  coffee: Coffee,
  waste: Leaf,
};

export default function TradePage() {
  const { segment = '' } = useParams();
  const data = tradeSegment(segment);
  if (!data) return <Navigate to="/trade/bars-venues" replace />;
  return <Segment key={data.slug} data={data} />;
}

function ReasonTile({ v, className }: { v: Reason; className: string }) {
  const Icon = ICONS[v.icon];
  return (
    <article className={`${b.tile} ${className}`}>
      <span className={b.tileIcon}><Icon size={22} /></span>
      <h3 className={b.tileTitle}>{v.title}</h3>
      <p className={b.tileText}>{v.body}</p>
    </article>
  );
}

function Segment({ data }: { data: TradeSegment }) {
  const navigate = useNavigate();
  usePageSetup(data.label);
  const short = data.label.replace('For ', '');
  const [r1, r2, r3] = data.reasons;

  return (
    <div className={b.page}>
      <Hero
        eyebrow={data.label}
        title={<>{data.title.before} <em className="gradient-text">{data.title.accent}</em></>}
        lede={data.lede}
        image={data.image}
        tag={`${short} · Perth & nationwide`}
        actions={
          <>
            <Pill to="/contact">Open a trade account</Pill>
            <Pill to="/portfolio" variant="more">Download portfolio</Pill>
          </>
        }
      />

      {/* ── Segment switch ── */}
      <div className={styles.switch}>
        <Segmented
          id="trade"
          label="Trade segments"
          options={tradeSegments.map((s) => ({ key: s.slug, label: s.label.replace('For ', '') }))}
          value={data.slug}
          onChange={(slug) => navigate(`/trade/${slug}`)}
        />
      </div>

      {/* ── Why: bento ── */}
      <section className={b.section}>
        <div className="container">
          <Rise>
            <div className={b.head}>
              <p className={b.kicker}>Why 3Two1</p>
              <h2 className={b.title}>
                {data.reasonsTitle.before} <em className="gradient-text">{data.reasonsTitle.accent}</em>{' '}
                {data.reasonsTitle.after}
              </h2>
            </div>
          </Rise>

          <div className={b.grid}>
            <Rise className={b.span4}>
              <ReasonTile v={r1} className={`${b.tileDark} ${styles.fill}`} />
            </Rise>
            <Rise className={b.span2} delay={0.08}>
              <article className={`${b.tile} ${b.tileBrand} ${styles.fill}`}>
                <p className={b.tileLabel}>Premium houses</p>
                <span className={b.big}>7</span>
                <p className={b.tileText}>Under one PO, on one delivery day.</p>
              </article>
            </Rise>
            <Rise className={b.span2}>
              <article className={`${b.tile} ${styles.fill}`}>
                <p className={b.tileLabel}>Account approval</p>
                <span className={b.big}>1 day</span>
                <p className={b.tileText}>We come back within a business day.</p>
              </article>
            </Rise>
            <Rise className={b.span4} delay={0.08}>
              <article className={`${b.tile} ${b.tileOnImg} ${styles.fill}`}>
                <div className={b.tileImg} aria-hidden="true">
                  <img src="/images/about-founders-stir.webp" alt="" loading="lazy" />
                </div>
                <p className={b.tileLabel}>{r2.title}</p>
                <p className={`${b.tileTitle} ${styles.wide}`}>{r2.body}</p>
              </article>
            </Rise>
            <Rise className={b.span3}>
              <ReasonTile v={r3} className={styles.fill} />
            </Rise>
            <Rise className={b.span3} delay={0.08}>
              <article className={`${b.tile} ${styles.fill}`}>
                <p className={b.tileLabel}>Delivery</p>
                <span className={b.big}>Weekly</span>
                <p className={b.tileText}>{data.steps[2].body}</p>
              </article>
            </Rise>
          </div>
        </div>
      </section>

      {/* ── Recommended: snap carousel ── */}
      <section className={`${b.section} ${b.sectionTint}`}>
        <div className="container">
          <Rise>
            <div className={`${b.head} ${b.headLeft}`}>
              <div>
                <p className={b.kicker}>On the list</p>
                <h2 className={b.title}>Recommended for {short}.</h2>
              </div>
              <Pill to="/portfolio" variant="more">Full portfolio</Pill>
            </div>
          </Rise>
        </div>
        <Carousel label={`Recommended for ${short}`}>
          {data.products.map((p) => (
            <a
              key={p.name}
              className={`${b.tile} ${styles.product}`}
              href={p.to}
              onClick={(e) => { e.preventDefault(); navigate(p.to); }}
            >
              <p className={b.tileLabel}>{p.brand} · {p.kind}</p>
              <h3 className={styles.productName}>{p.name}</h3>
              <div className={styles.productImg}>
                <SmartImage src={p.image} alt={`${p.brand} ${p.name}`} />
              </div>
              <p className={b.tileText}>{p.body}</p>
              <span className={`${b.btn} ${b.more} ${styles.productMore}`}>Meet the house ›</span>
            </a>
          ))}
        </Carousel>
      </section>

      {/* ── Trade voice ── */}
      <section className={b.section}>
        <div className="container">
          <Rise>
            <figure className={styles.quote}>
              <p className={b.kicker}>Trade voice</p>
              <blockquote>“{data.quote.text}”</blockquote>
              <figcaption>{data.quote.cite}*</figcaption>
              <p className={styles.quoteNote}>*Illustrative quote - replace with real testimonial in production.</p>
            </figure>
          </Rise>
        </div>
      </section>

      {/* ── How to order ── */}
      <section className={`${b.section} ${b.sectionTint}`}>
        <div className="container">
          <Rise>
            <div className={b.head}>
              <p className={b.kicker}>Three steps</p>
              <h2 className={b.title}>How to <em className="gradient-text">order</em>.</h2>
            </div>
          </Rise>
          <div className={b.grid}>
            {data.steps.map((s, i) => (
              <Rise key={s.title} className={b.span2} delay={i * 0.08}>
                <article className={`${b.tile} ${styles.fill}`}>
                  <span className={b.big}>{i + 1}</span>
                  <h3 className={b.tileTitle}>{s.title}</h3>
                  <p className={b.tileText}>{s.body}</p>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── Become a stockist ── */}
      <section className={b.section}>
        <div className="container">
          <Cta
            title={<>{data.cta.title.before} {data.cta.title.accent}{data.cta.title.after && ` ${data.cta.title.after}`}</>}
            text={data.cta.body}
            placeholder={data.cta.placeholder}
          />
        </div>
      </section>
    </div>
  );
}
