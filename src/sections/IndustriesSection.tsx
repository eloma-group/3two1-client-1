/**
 * IndustriesSection — self-contained, portable "Industries We Serve" section.
 *
 * Extracted from the BIVRY homepage. Everything the section needs
 * (data, styles, sub-components, animations) lives in THIS ONE FILE
 * so it can be dropped into any React site.
 *
 * ── Requirements ─────────────────────────────────────────────────
 *   npm i framer-motion lucide-react
 *
 * ── Usage ────────────────────────────────────────────────────────
 *   import { IndustriesSection } from './IndustriesSection'
 *   <IndustriesSection />
 *
 * What it renders: a full-width mosaic grid of small icon cells with
 * 4 auto-flipping cards in the centre that reveal all 8 industries.
 * All styling is inline / in <style> tags (no external CSS file needed).
 */

import { useState, useEffect } from 'react'
import {
  Wine, Martini, Beer, Coffee, GlassWater, Grape,
  Store, Building2, Hotel, UtensilsCrossed, ChefHat, CupSoda,
  Music, PartyPopper, Users, Truck, Ship, Globe, MapPin,
  Award, Star, Sparkles, Gift, Percent, Snowflake, Leaf,
  Clock, Zap, Heart, ShoppingBag, Warehouse, Wheat,
  RotateCcw,
} from 'lucide-react'
import { motion } from 'framer-motion'

/* ── Theme ──────────────────────────────────────────────────────── */
const GREEN  = '#e8446f'
const NAVY   = '#1d1015'
const BORDER = 'rgba(29,16,21,0.08)'

/* ── Data ───────────────────────────────────────────────────────── */
export interface Industry {
  name: string
}

const INDUSTRIES: Industry[] = [
  { name: 'Cocktail Bars' },
  { name: 'Restaurants' },
  { name: 'Sage Shops' },
  { name: 'Bottle Shops' },
  { name: 'Cafés' },
  { name: 'Retail Chain' },
  { name: 'Events & Catering' },
  { name: 'Distributors' },
]

/* ── Card face data (colour + icon + tags per industry) ─────────── */
type FaceMeta = {
  bg:     string   // subtle tinted white
  accent: string
  Icon:   React.ElementType
  tags:   [string, string]
}

const FACE_META: Record<string, FaceMeta> = {
  'Cocktail Bars':     { bg: '#fdf2f6', accent: '#b41f52', Icon: Martini,         tags: ['Signature Serves', 'Back Bar']     },
  'Restaurants':       { bg: '#fff5f0', accent: '#c2410c', Icon: UtensilsCrossed, tags: ['By The Glass',     'Wine Pairing']  },
  'Sage Shops':        { bg: '#fffbeb', accent: '#a16207', Icon: ShoppingBag,     tags: ['Curated Range',    'Specialty']     },
  'Bottle Shops':      { bg: '#fdf4ff', accent: '#be185d', Icon: Wine,            tags: ['Retail Range',     'Take-Home']     },
  'Cafés':             { bg: '#fdf6ec', accent: '#92400e', Icon: Coffee,          tags: ['Coffee Liqueur',   'All-Day']       },
  'Retail Chain':      { bg: '#fdf2f8', accent: '#db2777', Icon: Store,           tags: ['High Volume',      'Nationwide']    },
  'Events & Catering': { bg: '#fff1f4', accent: '#e8446f', Icon: PartyPopper,     tags: ['Functions',        'Bulk Orders']   },
  'Distributors':      { bg: '#fffaf0', accent: '#b45309', Icon: Truck,           tags: ['Wholesale',        'Nationwide']    },
}

/* ── Card face ──────────────────────────────────────────────────── */
function CardFace({ industry, back, innerRadius }: {
  industry: Industry; back?: boolean; innerRadius?: React.CSSProperties
}) {
  const m = FACE_META[industry.name]
  if (!m) return null

  return (
    <div style={{
      position: 'absolute', inset: 0,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden' as never,
      transform: back ? 'rotateY(180deg)' : 'none',
      background: m.bg,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      ...innerRadius,
    }}>

      {/* 2px top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: m.accent, opacity: 0.85,
      }} />

      {/* Very soft ambient wash behind icon */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 85% 55% at 50% 34%, ${m.accent}18 0%, transparent 62%)`,
      }} />

      {/* Icon - centred in upper ~58% */}
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingBottom: '6px', position: 'relative',
      }}>
        <div style={{
          width: '56px', height: '56px',
          borderRadius: '15px',
          background: '#ffffff',
          border: `1px solid ${m.accent}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 18px ${m.accent}22, 0 1px 4px rgba(0,0,0,0.05)`,
        }}>
          <m.Icon size={25} color={m.accent} strokeWidth={1.6} />
        </div>
      </div>

      {/* Hairline separator */}
      <div style={{
        height: '1px', margin: '0 14px',
        background: `rgba(29,16,21,0.07)`,
      }} />

      {/* Bottom content */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{
          fontSize: 'clamp(11.5px, 1.4vw, 15.5px)',
          fontWeight: 700, color: NAVY,
          letterSpacing: '-0.025em', lineHeight: 1.2,
          marginBottom: '8px',
        }}>
          {industry.name}
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {m.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.6px',
              padding: '3px 8px', borderRadius: '4px',
              background: `${m.accent}12`,
              color: m.accent,
              textTransform: 'uppercase',
              border: `1px solid ${m.accent}26`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Flip card shell ────────────────────────────────────────────── */
const PAIRS: [Industry, Industry][] = [
  [INDUSTRIES[0], INDUSTRIES[4]],
  [INDUSTRIES[1], INDUSTRIES[5]],
  [INDUSTRIES[2], INDUSTRIES[6]],
  [INDUSTRIES[3], INDUSTRIES[7]],
]

const FLIP_CONFIG = [
  { interval: 5200, delay: 700  },
  { interval: 6600, delay: 2400 },
  { interval: 4900, delay: 1600 },
  { interval: 7200, delay: 3600 },
]

// 10-column grid (gridAutoRows = 8vw), 6 rows total.
// Cards occupy the centre 2×2 blocks; small cells fill the rest.
const CARD_POS = [
  { gridColumn: '4 / span 2', gridRow: '2 / span 2' },
  { gridColumn: '6 / span 2', gridRow: '2 / span 2' },
  { gridColumn: '4 / span 2', gridRow: '4 / span 2' },
  { gridColumn: '6 / span 2', gridRow: '4 / span 2' },
]

// Outer corner (diagonally opposite to centre gap) stays square; other 3 corners rounded
const CARD_INNER_RADIUS: React.CSSProperties[] = [
  { borderTopRightRadius: '9px', borderBottomRightRadius: '9px', borderBottomLeftRadius: '9px' },
  { borderTopLeftRadius:  '9px', borderBottomRightRadius: '9px', borderBottomLeftRadius: '9px' },
  { borderTopLeftRadius:  '9px', borderTopRightRadius:    '9px', borderBottomRightRadius: '9px' },
  { borderTopLeftRadius:  '9px', borderTopRightRadius:    '9px', borderBottomLeftRadius:  '9px' },
]

function FlipCard({ pairIdx, flipped, onFlip, innerRadius }: {
  pairIdx: number; flipped: boolean; onFlip: () => void
  innerRadius: React.CSSProperties
}) {
  const [front, back] = PAIRS[pairIdx]
  const [hov, setHov] = useState(false)

  return (
    <div
      onClick={onFlip}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ height: '100%', perspective: '1200px', cursor: 'pointer', position: 'relative' }}
    >
      {/* Flip hint */}
      <div style={{
        position: 'absolute', top: '9px', right: '10px', zIndex: 10,
        display: 'flex', alignItems: 'center', gap: '3px',
        fontSize: '8px', fontWeight: 700, letterSpacing: '0.8px',
        textTransform: 'uppercase', color: 'rgba(29,16,21,0.3)',
        opacity: hov ? 1 : 0.6,
        transition: 'opacity 0.25s', pointerEvents: 'none',
      }}>
        <RotateCcw size={9} strokeWidth={2.5} style={{
          color: hov ? 'rgba(29,16,21,0.55)' : 'rgba(29,16,21,0.28)',
          transform: hov ? 'rotate(-180deg)' : 'rotate(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }} />
        flip
      </div>

      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.78s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        <CardFace industry={front} innerRadius={innerRadius} />
        <CardFace industry={back} back innerRadius={innerRadius} />
      </div>
    </div>
  )
}

/* ── Surrounding small cells (decorative capability tags) ───────── */
const ITEMS = [
  { icon: Wine,            label: 'Wine'            },
  { icon: Martini,         label: 'Cocktails'       },
  { icon: Beer,            label: 'Beer & Cider'    },
  { icon: Coffee,          label: 'Coffee Liqueur'  },
  { icon: GlassWater,      label: 'Spirits'         },
  { icon: Grape,           label: 'Agave'           },
  { icon: Store,           label: 'Bottle Shops'    },
  { icon: Building2,       label: 'Hotels'          },
  { icon: Hotel,           label: 'Hospitality'     },
  { icon: UtensilsCrossed, label: 'Restaurants'     },
  { icon: ChefHat,         label: 'Kitchens'        },
  { icon: CupSoda,         label: 'Mixers'          },
  { icon: Music,           label: 'Nightlife'       },
  { icon: PartyPopper,     label: 'Events'          },
  { icon: Users,           label: 'Trade Only'      },
  { icon: Truck,           label: 'Delivery'        },
  { icon: Ship,            label: 'Imported'        },
  { icon: Globe,           label: 'Worldwide'       },
  { icon: MapPin,          label: 'Coast to Coast'  },
  { icon: Award,           label: 'Award-Winning'   },
  { icon: Star,            label: 'Premium'         },
  { icon: Sparkles,        label: 'Craft'           },
  { icon: Gift,            label: 'Gifting'         },
  { icon: Percent,         label: 'Trade Pricing'   },
  { icon: Snowflake,       label: 'Chilled Serves'  },
  { icon: Leaf,            label: 'Natural'         },
  { icon: Clock,           label: 'Same Week'       },
  { icon: Zap,             label: 'Fast Dispatch'   },
  { icon: Heart,           label: 'Bartender Loved' },
  { icon: ShoppingBag,     label: 'Retail'          },
  { icon: Warehouse,       label: 'In Stock'        },
  { icon: Wheat,           label: 'Grain to Glass'  },
]

// 10 cols × 6 rows = 60 slots; flip cards occupy 4 × (2 cols × 2 rows) = 16 slots → 44 small cells
const CELLS_44 = Array.from({ length: 44 }, (_, i) => ITEMS[i % ITEMS.length])

function SmallCell({ icon: Icon, label, className }: { icon: React.ElementType; label: string; className?: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className={className}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '8px', padding: '10px 6px', userSelect: 'none',
        cursor: 'default',
        /* inset outline - no layout shift on hover */
        outline: hov ? '2px solid rgba(29,16,21,0.45)' : '2px solid transparent',
        outlineOffset: '-2px',
        transition: 'outline-color 0.15s ease',
      }}
    >
      <Icon
        size={24}
        color={hov ? NAVY : 'rgba(29,16,21,0.45)'}
        strokeWidth={1.5}
        style={{ transition: 'color 0.15s ease' }}
      />
      <span style={{
        fontSize: '10px',
        color: hov ? 'rgba(29,16,21,0.75)' : 'rgba(29,16,21,0.52)',
        fontWeight: 600, textAlign: 'center', lineHeight: 1.3,
        transition: 'color 0.15s ease',
      }}>
        {label}
      </span>
    </div>
  )
}

/* ── Main export ────────────────────────────────────────────────── */
export function IndustriesSection() {
  const [flipped, setFlipped] = useState([false, false, false, false])

  useEffect(() => {
    type H = ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>
    const ids: H[] = []
    FLIP_CONFIG.forEach(({ interval, delay }, i) => {
      const tid = setTimeout(() => {
        const iid = setInterval(() => {
          setFlipped(prev => { const n = [...prev]; n[i] = !n[i]; return n })
        }, interval)
        ids.push(iid)
      }, delay)
      ids.push(tid)
    })
    return () => ids.forEach(id => {
      clearTimeout(id as ReturnType<typeof setTimeout>)
      clearInterval(id as ReturnType<typeof setInterval>)
    })
  }, [])

  const flip = (i: number) =>
    setFlipped(prev => { const n = [...prev]; n[i] = !n[i]; return n })

  return (
    <section id="industries" style={{ background: '#fff', paddingTop: 'clamp(64px,9vw,110px)', paddingBottom: 'clamp(40px,5vw,60px)', overflow: 'hidden', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Header - padded */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,72px)', padding: '0 clamp(24px,5vw,80px)' }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ display: 'inline-flex', gap: '3px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: GREEN, display: 'block' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: GREEN, opacity: 0.45, display: 'block' }} />
          </span>
          <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: GREEN }}>
Sectors We Deliver To
          </span>
        </div>
        <h2 style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: NAVY, letterSpacing: '-0.04em', lineHeight: 1.08, margin: '0 0 14px' }}>
          Sectors In Which<br /><span style={{ color: GREEN }}>We Deliver.</span>
        </h2>
        <p style={{ fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(29,16,21,0.5)', lineHeight: 1.75, maxWidth: '460px', margin: '0 auto' }}>
          From cocktail bars to bottle shops - click any card to flip and explore all 8 sectors we deliver to.
        </p>
      </motion.div>

      {/* Full-width grid wrapper with left/right fade masks */}
      <div style={{ position: 'relative' }}>
        {/* Col 1 fade (left) */}
        <div className="ind-fade-left" style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '11%', zIndex: 10,
          background: 'linear-gradient(to right, #fff 20%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Col 10 fade (right) */}
        <div className="ind-fade-right" style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '11%', zIndex: 10,
          background: 'linear-gradient(to left, #fff 20%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div
          className="ind-grid"
          style={{
            display: 'grid',
            /* 10 equal columns - 1 col = 10vw → row height = 8vw */
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridAutoRows: '8vw',
            gap: '1px',
            background: BORDER,
            borderTop: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            overflow: 'hidden',
          }}
        >
          {PAIRS.map((_, i) => (
            <div key={i} className={`ind-card ind-card-${i}`} style={{ ...CARD_POS[i], background: '#fff', padding: '5px' }}>
              <FlipCard pairIdx={i} flipped={flipped[i]} onFlip={() => flip(i)} innerRadius={CARD_INNER_RADIUS[i]} />
            </div>
          ))}

          {CELLS_44.map((cell, i) => (
            <SmallCell key={`c${i}`} icon={cell.icon} label={cell.label} className="ind-small" />
          ))}
        </div>
      </div>

      {/* Footer pill */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, rgba(29,16,21,0.12))' }} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          padding: '6px 14px', borderRadius: '99px',
          border: '1px solid rgba(29,16,21,0.08)',
          background: 'rgba(232,68,111,0.05)',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: GREEN, display: 'inline-block',
            boxShadow: `0 0 0 3px ${GREEN}28`,
            animation: 'pulse-dot 2.2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.3px', color: 'rgba(29,16,21,0.45)' }}>
            8 channels &nbsp;·&nbsp; seven houses &nbsp;·&nbsp; one portfolio
          </span>
        </div>
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, rgba(29,16,21,0.12))' }} />
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 3px ${GREEN}28; }
          50%       { box-shadow: 0 0 0 6px ${GREEN}10; }
        }
      `}</style>

      <style>{`
        /* ── Tablet ≤ 860px: 2×2 flip card grid, no surrounding cells ── */
        @media (max-width: 860px) {
          .ind-grid {
            grid-template-columns: repeat(4, 1fr) !important;
            grid-auto-rows: 24vw !important;
            gap: 8px !important;
            background: transparent !important;
            border-top: none !important;
            border-bottom: none !important;
            padding: 0 clamp(12px, 3vw, 24px) !important;
          }
          .ind-small { display: none !important; }
          .ind-fade-left, .ind-fade-right { display: none !important; }
          .ind-card-0 { grid-column: 1 / span 2 !important; grid-row: 1 / span 2 !important; }
          .ind-card-1 { grid-column: 3 / span 2 !important; grid-row: 1 / span 2 !important; }
          .ind-card-2 { grid-column: 1 / span 2 !important; grid-row: 3 / span 2 !important; }
          .ind-card-3 { grid-column: 3 / span 2 !important; grid-row: 3 / span 2 !important; }
        }

        /* ── Mobile ≤ 540px: 1 card per cell, 2 cols ── */
        @media (max-width: 540px) {
          .ind-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 58vw !important;
            gap: 8px !important;
            padding: 0 12px !important;
          }
          .ind-card-0 { grid-column: 1 !important; grid-row: 1 !important; }
          .ind-card-1 { grid-column: 2 !important; grid-row: 1 !important; }
          .ind-card-2 { grid-column: 1 !important; grid-row: 2 !important; }
          .ind-card-3 { grid-column: 2 !important; grid-row: 2 !important; }
        }

        /* ── Small mobile ≤ 380px: taller rows for content breathing room ── */
        @media (max-width: 380px) {
          .ind-grid { grid-auto-rows: 70vw !important; }
        }
      `}</style>
    </section>
  )
}
