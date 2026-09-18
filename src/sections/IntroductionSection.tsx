/**
 * IntroductionSection — self-contained, portable intro / "about" section.
 *
 * Extracted from the BIVRY homepage. Everything the section needs
 * (data, styles, animations) lives in THIS ONE FILE so it can be
 * dropped into any React site.
 *
 * ── Requirements ─────────────────────────────────────────────────
 *   npm i framer-motion gsap
 *
 * ── Usage ────────────────────────────────────────────────────────
 *   import { IntroductionSection } from './IntroductionSection'
 *   <IntroductionSection />
 *
 * What it renders:
 *   - Big animated headline "Road Freight / & Warehousing, / Done Right."
 *   - Intro paragraph + Australia / International location tag lists
 *   - An infinite auto-scrolling country-flag ticker (greyscale, with a
 *     full-colour centre reveal + hover tooltips), powered by GSAP.
 *
 * Flag images come from https://flagcdn.com (no assets to copy).
 * All styling is inline / in a <style> tag (no external CSS file needed).
 */

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import gsap from 'gsap'
import MagneticButton from '../components/MagneticButton'

/* ── Theme ──────────────────────────────────────────────────────── */
const NAVY  = '#1d1015'
const GREEN = '#e8446f'
const ease  = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ── Data ───────────────────────────────────────────────────────── */
const PLACES = [
  'Darwin', 'Broome', 'Perth', 'Adelaide', 'Melbourne', 'Hobart',
  'Brisbane', 'Gold Coast', 'Newcastle', 'Sydney', 'Auckland',
  'Wellington', 'Vanuatu', 'Fiji', 'Cook Is.',
]

const COUNTRIES = [
  { src: '/images/brandstrip-black-tears.webp',  name: 'Black Tears'  },
  { src: '/images/brandstrip-giffard.webp',      name: 'Giffard'      },
  { src: '/images/brandstrip-pueblo-viejo.webp', name: 'Pueblo Viejo' },
  { src: '/images/brandstrip-burnt-ends.webp',   name: 'Burnt Ends'   },
  { src: '/images/brandstrip-worthy-park.webp',  name: 'Worthy Park'  },
  { src: '/images/brandstrip-whiskey-row.webp',  name: 'Whiskey Row'  },
  { src: '/images/brandstrip-san-matias.webp',   name: 'San Matías'   },
]

// Repeat the 7 logos so one "half" of the track is always wider than the
// viewport → the GSAP -50% loop stays seamless on any screen size.
const STRIP = [...COUNTRIES, ...COUNTRIES, ...COUNTRIES]

/* ── Main export ────────────────────────────────────────────────── */
export function IntroductionSection() {
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const tween1    = useRef<gsap.core.Tween | null>(null)
  const tween2    = useRef<gsap.core.Tween | null>(null)
  const activeL2  = useRef<HTMLElement | null>(null)

  const clearL2 = () => {
    activeL2.current?.classList.remove('bivry-l2-active')
    activeL2.current = null
  }

  const activateL2 = (i: number) => {
    clearL2()
    const el = track2Ref.current?.children[i] as HTMLElement | undefined
    if (el) { el.classList.add('bivry-l2-active'); activeL2.current = el }
  }

  useEffect(() => {
    // Wait one frame so scrollWidth is stable after first paint
    const initId = requestAnimationFrame(() => {
      if (!track1Ref.current || !track2Ref.current) return

      const half = track1Ref.current.scrollWidth / 2
      if (half <= 0) return

      // Content is duplicated, so -half and 0 are visually identical → seamless loop.
      const cfg: gsap.TweenVars = {
        x: -half,
        duration: half / 40, // ~40 px/s
        ease: 'none',
        repeat: -1,
      }

      tween1.current = gsap.to(track1Ref.current, cfg)
      tween2.current = gsap.to(track2Ref.current, cfg)
    })

    return () => {
      cancelAnimationFrame(initId)
      tween1.current?.kill()
      tween2.current?.kill()
    }
  }, [])

  return (
    <section
      id="about"
      style={{
        background: 'var(--surface)',
        padding: 'clamp(96px, 12vw, 160px) clamp(24px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── Top grid ── */}
      <div
        className="intro-top"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'flex-start',
          marginBottom: 'clamp(64px, 9vw, 112px)',
        }}
      >
        {/* Left - headline */}
        <div>
          <h2 style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 'clamp(40px, 5.6vw, 74px)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.045em',
            margin: 0,
          }}>
            {([
              { text: 'Seven Houses,',   color: 'rgb(var(--ink-rgb))',  weight: 800, italic: false },
              { text: 'One Portfolio,',  color: 'rgba(var(--ink-rgb),0.22)', weight: 700, italic: true  },
              { text: 'Built for Trade.', color: GREEN,                weight: 800, italic: false },
            ] as const).map((line, i) => (
              <div
                key={i}
                style={{ overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}
              >
                <motion.span
                  initial={{ y: '105%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.82, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'block',
                    color: line.color,
                    fontWeight: line.weight,
                    fontStyle: line.italic ? 'italic' : 'normal',
                  }}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h2>
        </div>

        {/* Right - paragraph + tags */}
        <div style={{ paddingTop: 'clamp(6px, 1vw, 14px)' }}>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.78, delay: 0.18, ease }}
            style={{
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              color: 'rgba(var(--ink-rgb),0.52)',
              lineHeight: 1.8,
              margin: '0 0 30px',
            }}
          >
            Curated imports. Trade-first service. A tight portfolio built for bartenders.
            3two1 brings seven of the world's most respected drinks houses under one roof -
            from blue-agave tequila to coffee-spiced rum - delivered to the best bars,
            bottle shops and cafés, coast to coast.
          </motion.p>

          {/* Network place names */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.26, ease }}
            style={{ margin: '0 0 30px' }}
          >
            <div style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '2.2px',
              textTransform: 'uppercase', color: 'var(--rose-700)', marginBottom: '12px',
            }}>
              The 3two1 network
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {PLACES.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.035, ease }}
                  whileHover={{ y: -2 }}
                  className="intro-place"
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    fontSize: '11.5px', fontWeight: 600,
                    letterSpacing: '0.02em',
                    color: 'rgba(var(--ink-rgb),0.72)',
                    padding: '6px 14px',
                    background: 'var(--chip)',
                    border: '1px solid rgba(232,68,111,0.22)',
                    borderRadius: '100px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px -3px rgba(110,16,48,0.18)',
                    backdropFilter: 'blur(4px)',
                    cursor: 'default',
                  }}
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.32, ease }}
            style={{ display: 'inline-block' }}
          >
            <MagneticButton variant="solid" href="#" cursorLabel="Download">
              Download Our Portfolio <Download size={18} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* ── Divider + flag ticker ── */}
      <div style={{ borderTop: '1px solid rgba(var(--ink-rgb),0.07)', paddingTop: 'clamp(48px, 7vw, 80px)' }}>

        {/* Country flags */}
        <div
          style={{ overflow: 'hidden', position: 'relative', height: '150px', transform: 'translateZ(0)' }}
          onMouseEnter={() => { tween1.current?.pause(); tween2.current?.pause() }}
          onMouseLeave={() => { tween1.current?.play(); tween2.current?.play(); clearL2() }}
        >
          {/* ── Layer 1: greyscale - hover via CSS only, zero React state ── */}
          <div
            ref={track1Ref}
            style={{
              display: 'flex', gap: '40px', width: 'max-content',
              alignItems: 'flex-end', position: 'absolute', top: 28, left: 0,
              willChange: 'transform',
            }}
          >
            {[...STRIP, ...STRIP].map((c, i) => (
              <div key={`g${i}`} className="bivry-flag-item" onMouseEnter={() => activateL2(i)}>
                <div className="bivry-flag-tooltip">{c.name}</div>
                <div className="bivry-flag-img">
                  <img
                    src={c.src}
                    alt={c.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Layer 2: full colour, masked to centre - purely presentational ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 24%, black 34%, black 66%, transparent 76%, transparent 100%)',
            maskImage:        'linear-gradient(to right, transparent 0%, transparent 24%, black 34%, black 66%, transparent 76%, transparent 100%)',
            pointerEvents: 'none', overflow: 'visible',
          }}>
            <div
              ref={track2Ref}
              style={{
                display: 'flex', gap: '40px', width: 'max-content',
                alignItems: 'flex-end', position: 'absolute', top: 28, left: 0,
                willChange: 'transform',
              }}
            >
              {[...STRIP, ...STRIP].map((c, i) => (
                <div key={`c${i}`} className="bivry-l2-flag" style={{ flexShrink: 0 }}>
                  <div style={{
                    width: '120px', height: '120px',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={c.src}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Edge fades ── */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '64px', zIndex: 3, background: 'linear-gradient(to right, var(--surface), transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '64px', zIndex: 3, background: 'linear-gradient(to left, var(--surface), transparent)', pointerEvents: 'none' }} />
        </div>

      </div>

      <style>{`
        .intro-place {
          transition: border-color 0.28s ease, box-shadow 0.28s ease, background 0.28s ease;
        }
        .intro-place:hover {
          border-color: rgba(232,68,111,0.5) !important;
          box-shadow: 0 8px 20px -8px rgba(232,68,111,0.45) !important;
          background: var(--chip-hover) !important;
        }
        .bivry-flag-item {
          position: relative;
          flex-shrink: 0;
          cursor: pointer;
        }
        .bivry-flag-tooltip {
          position: absolute;
          bottom: calc(100% + 7px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: ${NAVY};
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 5px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.18s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1);
          z-index: 10;
        }
        .bivry-flag-item:hover .bivry-flag-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .bivry-flag-img {
          width: 120px;
          height: 120px;
          overflow: hidden;
          filter: grayscale(1) opacity(0.4);
          transform: scale(1);
          transition: transform 0.38s cubic-bezier(0.16,1,0.3,1), filter 0.2s;
        }
        .bivry-flag-item:hover .bivry-flag-img {
          transform: scale(1.14);
        }
        .bivry-l2-flag > div {
          transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
        }
        .bivry-l2-flag.bivry-l2-active > div {
          transform: scale(1.14);
        }
        @media (max-width: 900px) {
          .intro-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
