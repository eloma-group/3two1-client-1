import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Coffee,
  Download,
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
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import SmartImage from '../components/SmartImage';
import { CtaStrip, PageHero } from '../components/PageBlocks';
import { usePageSetup } from '../hooks/usePageSetup';
import r from './Routed.module.css';
import styles from './TradePage.module.css';

const ICONS: Record<TradeSegment['reasons'][number]['icon'], LucideIcon> = {
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

function Segment({ data }: { data: TradeSegment }) {
  const navigate = useNavigate();
  usePageSetup(data.label);

  return (
    <div className={r.page}>
      <PageHero
        eyebrow={data.label}
        title={[{ text: data.title.before }, { text: data.title.accent, accent: true }]}
        lede={data.lede}
        image={data.image}
        actions={
          <>
            <MagneticButton variant="solid" cursorLabel="Apply" onClick={() => navigate('/contact')}>
              Open a trade account <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton variant="outline" className={r.onDark} cursorLabel="View" onClick={() => navigate('/portfolio')}>
              Download portfolio <Download size={16} />
            </MagneticButton>
          </>
        }
      />

      {/* ── Segment switcher ── */}
      <nav className={styles.switcher} aria-label="Trade segments">
        <div className={`container ${styles.switcherInner}`}>
          {tradeSegments.map((s) => (
            <button
              key={s.slug}
              className={`${styles.switch} ${s.slug === data.slug ? styles.switchOn : ''}`}
              aria-current={s.slug === data.slug ? 'page' : undefined}
              onClick={() => navigate(`/trade/${s.slug}`)}
            >
              {s.label.replace('For ', '')}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Three reasons ── */}
      <section className={r.section}>
        <div className="container">
          <Reveal y={20}>
            <div className={r.head}>
              <h2 className={r.title}>
                {data.reasonsTitle.before} <em className="gradient-text">{data.reasonsTitle.accent}</em>{' '}
                {data.reasonsTitle.after}
              </h2>
            </div>
          </Reveal>
          <div className={styles.reasons}>
            {data.reasons.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <Reveal key={v.title} y={26} delay={i * 0.08}>
                  <article className={styles.reason}>
                    <div className={styles.reasonTop}>
                      <span className={styles.reasonIcon}><Icon size={22} /></span>
                      <span className={styles.reasonNum}>0{i + 1}</span>
                    </div>
                    <h3>{v.title}</h3>
                    <p>{v.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Recommended ── */}
      <section className={`${r.section} ${r.tint}`}>
        <div className="container">
          <Reveal y={20}>
            <div className={r.head}>
              <h2 className={r.title}>
                Recommended for <em className="gradient-text">{data.label.replace('For ', '')}</em>.
              </h2>
              <a
                className={r.headLink}
                href="/portfolio"
                onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }}
              >
                Full portfolio →
              </a>
            </div>
          </Reveal>
          <div className={styles.products}>
            {data.products.map((p, i) => (
              <Reveal key={p.name} y={26} delay={i * 0.07}>
                <a
                  className={styles.product}
                  href={p.to}
                  onClick={(e) => { e.preventDefault(); navigate(p.to); }}
                  data-cursor="Explore"
                >
                  <div className={styles.productImg}>
                    <SmartImage src={p.image} alt={`${p.brand} ${p.name}`} />
                  </div>
                  <span className={styles.productLabel}>{p.brand} · {p.kind}</span>
                  <h3>{p.name}</h3>
                  <p>{p.body}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trade voice ── */}
      <section className={r.section}>
        <div className="container">
          <Reveal y={24}>
            <figure className={styles.quote}>
              <p className={r.kicker}>Trade voice</p>
              <blockquote>“{data.quote.text}”</blockquote>
              <figcaption>— {data.quote.cite}*</figcaption>
              <p className={styles.quoteNote}>*Illustrative quote — replace with real testimonial in production.</p>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── How to order ── */}
      <section className={`${r.section} ${r.tint}`}>
        <div className="container">
          <Reveal y={20}>
            <div className={r.head}>
              <h2 className={r.title}>
                How to <em className="gradient-text">order</em>.
              </h2>
            </div>
          </Reveal>
          <div className={styles.steps}>
            {data.steps.map((s, i) => (
              <Reveal key={s.title} y={24} delay={i * 0.08}>
                <article className={styles.step}>
                  <span className={styles.stepNum}>Step 0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Become a stockist ── */}
      <section className={r.section}>
        <div className="container">
          <CtaStrip
            kicker="Become a stockist"
            title={
              <>
                {data.cta.title.before} <em className="gradient-text">{data.cta.title.accent}</em>
                {data.cta.title.after && ` ${data.cta.title.after}`}
              </>
            }
            text={data.cta.body}
            placeholder={data.cta.placeholder}
          />
        </div>
      </section>
    </div>
  );
}
