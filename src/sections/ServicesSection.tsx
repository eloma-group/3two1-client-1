/**
 * ServicesSection — self-contained, portable services section.
 *
 * Extracted from the BIVRY homepage. Everything the section needs
 * (data, styles, sub-components) lives in THIS ONE FILE so it can be
 * dropped into any React site.
 *
 * ── Requirements ─────────────────────────────────────────────────
 *   npm i framer-motion lucide-react
 *
 * ── Usage ────────────────────────────────────────────────────────
 *   import { ServicesSection } from './ServicesSection'
 *   <ServicesSection />
 *
 * Replace the SERVICES data + imageUrl paths with your own content.
 * All styling is inline (no external CSS file needed).
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* ── Theme ──────────────────────────────────────────────────────── */
const NAVY  = '#1d1015'
const GREEN = '#e8446f'
const ease  = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ── Data ───────────────────────────────────────────────────────── */
export interface Service {
  id: string
  number: string
  preLabel: string
  name: string
  title: string
  description: string
  shortDescription?: string
  imageUrl: string
  imageAlt: string
}

const SERVICES: Service[] = [
  {
    id: 'black-tears',
    number: '01',
    preLabel: 'SPICED RUM',
    name: 'Black Tears',
    title: 'Coffee, Cacao, Midnight.',
    description:
      'A spiced rum built on a coffee-and-cacao profile - dark, aromatic and unmistakably its own. Made to reinvent the rum & cola.',
    shortDescription: 'Spiced Rum · Cuba',
    imageUrl: '/images/house-black-tears.png',
    imageAlt: 'Black Tears spiced rum bottle',
  },
  {
    id: 'giffard',
    number: '02',
    preLabel: 'LIQUEURS & EAUX-DE-VIE',
    name: 'Giffard',
    title: 'Fruit, Not Fashion.',
    description:
      'Five generations of distillers in Angers, working with whole fruit. Chosen by sommeliers and head bartenders because they make the cocktail better.',
    shortDescription: 'Liqueurs & Eaux-de-vie · Angers, France · Since 1885',
    imageUrl: '/images/house-giffard.png',
    imageAlt: 'Giffard liqueur bottle',
  },
  {
    id: 'pueblo-viejo',
    number: '03',
    preLabel: 'BLANCO TEQUILA',
    name: 'Pueblo Viejo',
    title: 'Pure Blue Agave.',
    description:
      'A blanco built on blue agave - clean, bright and made for the margarita. The bartender’s working tequila.',
    shortDescription: 'Blanco Tequila · Jalisco, Mexico',
    imageUrl: '/images/house-pueblo-viejo.png',
    imageAlt: 'Pueblo Viejo blanco tequila bottle',
  },
  {
    id: 'burnt-ends',
    number: '04',
    preLabel: 'AMERICAN WHISKEY',
    name: 'Burnt Ends',
    title: 'Charred-Oak Character.',
    description:
      'A charred-oak American whiskey with smoke and sweetness in balance. Built for the stirred-down classics.',
    shortDescription: 'American Whiskey · USA',
    imageUrl: '/images/house-burnt-ends.png',
    imageAlt: 'Burnt Ends American whiskey bottle',
  },
  {
    id: 'worthy-park',
    number: '05',
    preLabel: 'SINGLE ESTATE RUM',
    name: 'Worthy Park',
    title: 'Pure Jamaican Funk.',
    description:
      'Single-estate Jamaican rum with all the funk and depth the island is famous for. From cane to bottle on one estate.',
    shortDescription: 'Single Estate Rum · Jamaica',
    imageUrl: '/images/house-worthy-park.png',
    imageAlt: 'Worthy Park single estate rum bottle',
  },
  {
    id: 'whiskey-row',
    number: '06',
    preLabel: 'WHISKEY',
    name: 'Whiskey Row',
    title: 'Straight, Honest, Easy.',
    description:
      'An approachable, easy-pouring whiskey built for the well. Straight, honest and made to move.',
    shortDescription: 'Whiskey · USA',
    imageUrl: '/images/house-whiskey-row.png',
    imageAlt: 'Whiskey Row bottle',
  },
  {
    id: 'san-matias',
    number: '07',
    preLabel: 'TEQUILA',
    name: 'San Matías',
    title: 'The Second-Oldest Tequila House in Mexico.',
    description:
      'Casa San Matías has been distilling 100% blue agave in the highlands of Jalisco since 1886 - family-owned, quietly excellent. Reposado, Añejo and Extra-Añejo.',
    shortDescription: 'Tequila · Jalisco, Mexico · Since 1886',
    imageUrl: '/images/house-san-matias.png',
    imageAlt: 'San Matías tequila bottle',
  },
]

/* ── Single service row ─────────────────────────────────────────── */
function ServiceRow({
  svc, index, isHovered, isSelected, onEnter, onLeave,
}: {
  svc: Service
  index: number
  isHovered: boolean
  isSelected: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const active = isHovered || isSelected
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.7, delay: index * 0.045, ease }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        borderBottom: '1px solid rgba(29,16,21,0.07)',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Green left reveal bar */}
      <motion.div
        animate={{ scaleX: active ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.32, ease }}
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '3px', background: GREEN,
          transformOrigin: 'left', zIndex: 2,
        }}
      />

      {/* Subtle row bg wash */}
      <div style={{
        position: 'absolute', inset: 0,
        background: active ? 'rgba(232,68,111,0.05)' : 'transparent',
        transition: 'background 0.35s ease',
        pointerEvents: 'none',
      }} />

      {/* Row content */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center',
        gap: 'clamp(12px, 2vw, 28px)',
        padding: 'clamp(18px, 2.6vw, 32px) clamp(24px, 4vw, 64px)',
      }}>
        {/* Index number */}
        <div style={{
          fontSize: 'clamp(10px, 0.9vw, 12px)',
          fontWeight: 700, letterSpacing: '0.6px',
          color: active ? GREEN : 'rgba(29,16,21,0.22)',
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0, width: '26px',
          transition: 'color 0.3s ease',
        }}>
          {svc.number}
        </div>

        {/* Category pre-label */}
        <div className="ss-prelabel" style={{
          fontSize: '8.5px', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          color: active ? GREEN : 'rgba(29,16,21,0.3)',
          flexShrink: 0,
          width: 'clamp(68px, 7.5vw, 108px)',
          lineHeight: 1.35,
          transition: 'color 0.3s ease',
        }}>
          {svc.preLabel}
        </div>

        {/* Hairline divider */}
        <div className="ss-divider" style={{
          width: '1px', alignSelf: 'stretch',
          background: active ? `${GREEN}55` : 'rgba(29,16,21,0.08)',
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }} />

        {/* Service name */}
        <motion.div
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.38, ease }}
          style={{
            flex: 1,
            color: active ? NAVY : 'rgba(29,16,21,0.6)',
            transition: 'color 0.3s ease',
          }}
        >
          <div style={{
            fontSize: 'clamp(17px, 2.2vw, 32px)',
            fontWeight: 700,
            letterSpacing: '-0.03em', lineHeight: 1.1,
          }}>
            {svc.name}
          </div>
          {svc.shortDescription && (
            <h3 style={{
              margin: '8px 0 0',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(14px, 1.3vw, 17px)',
              fontWeight: 400,
              color: 'rgba(29,16,21,0.52)',
              letterSpacing: 'normal', lineHeight: 1.6,
            }}>
              {svc.shortDescription}
            </h3>
          )}
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={{
            rotate: isHovered ? -45 : 0,
            opacity: active ? 1 : 0.2,
          }}
          transition={{ duration: 0.28, ease }}
          style={{ flexShrink: 0, color: GREEN }}
        >
          <ArrowUpRight size={20} strokeWidth={1.8} />
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ── Sticky image panel ─────────────────────────────────────────── */
function ImagePanel({ index }: { index: number }) {
  const svc = SERVICES[index]
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
      background: 'radial-gradient(120% 100% at 60% 25%, #3a1320 0%, #1d0a12 55%, #0c0507 100%)',
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={svc.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(4px, 1vw, 14px) clamp(4px, 1vw, 14px) clamp(120px, 15vh, 180px)',
          }}
        >
          <img
            src={svc.imageUrl}
            alt={svc.imageAlt}
            loading="lazy"
            style={{
              maxWidth: '100%', maxHeight: '100%',
              width: 'auto', height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45))',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom fade - for caption legibility */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(12,5,7,0.95) 0%, rgba(12,5,7,0.4) 30%, transparent 55%)',
      }} />

      {/* Service info caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={svc.id + '-caption'}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42, ease }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            zIndex: 3, padding: 'clamp(28px, 4vw, 52px)',
          }}
        >
          <div style={{
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '2.5px', textTransform: 'uppercase',
            color: '#ff7d84', marginBottom: '10px',
          }}>
            {svc.preLabel}
          </div>
          <div style={{
            fontSize: 'clamp(20px, 2.6vw, 34px)',
            fontWeight: 700, color: '#ffffff',
            letterSpacing: '-0.035em', lineHeight: 1.1,
            marginBottom: '10px',
          }}>
            {svc.title}
          </div>
          <div style={{
            fontSize: 'clamp(12px, 1vw, 13.5px)',
            color: 'rgba(255,255,255,0.52)', lineHeight: 1.75,
            maxWidth: '320px',
          }}>
            {svc.description}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Counter badge */}
      <div style={{
        position: 'absolute', top: 'clamp(24px, 3vw, 40px)', right: 'clamp(24px, 3vw, 40px)',
        zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 14px',
        background: 'rgba(12,5,7,0.55)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '100px',
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff7d84', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.3px' }}>
          {svc.number} / {String(SERVICES.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

/* ── Main export ────────────────────────────────────────────────── */
export function ServicesSection() {
  const [hovered,  setHovered]  = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const active = hovered ?? selected ?? 0

  return (
    <section id="services" style={{ position: 'relative', overflow: 'clip', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Intro header ── */}
      <div
        className="ss-intro"
        style={{
          position: 'relative', overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr',
          background: 'linear-gradient(135deg, rgba(29,16,21,0.06) 0%, rgba(232,68,111,0.04) 50%, #ffffff 100%)',
          borderBottom: '1px solid rgba(29,16,21,0.08)',
        }}
      >
        {/* Faint watermark number */}
        <div style={{
          position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(100px,18vw,200px)', fontWeight: 900, lineHeight: 1,
          color: 'rgba(29,16,21,0.04)', letterSpacing: '-0.06em',
          pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        }}>07</div>

        {/* Left - eyebrow + large headline */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: 'clamp(28px,3.5vw,44px) clamp(24px,5vw,80px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px',
        }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ display: 'inline-flex', gap: '3px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: GREEN, display: 'block' }} />
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: GREEN, opacity: 0.45, display: 'block' }} />
            </span>
            <h2 style={{ margin: 0, fontFamily: "'Inter', system-ui, sans-serif", fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: GREEN }}>
              In Every Great Bar, Bottle Shop &amp; Cafe
            </h2>
          </motion.div>

          {/* Display headline */}
          <div>
            {(['Seven Houses.', 'One Portfolio.'] as const).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.045em',
                  color: i === 0 ? NAVY : GREEN,
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right - description */}
        <div className="ss-intro-right" style={{
          position: 'relative', zIndex: 1,
          padding: 'clamp(28px,4vw,52px) clamp(24px,5vw,80px)',
          display: 'flex', alignItems: 'center',
          borderTop: '1px solid rgba(29,16,21,0.07)',
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '3px', borderRadius: '2px', alignSelf: 'stretch', flexShrink: 0, background: `linear-gradient(to bottom, ${GREEN}, ${GREEN}30)` }} />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              style={{
                fontSize: 'clamp(14px, 1.3vw, 17px)',
                color: 'rgba(29,16,21,0.52)',
                lineHeight: 1.85, margin: 0,
              }}
            >
              Seven houses placed by hand across the region - coast to coast,
              both sides of the Tasman, out to the Pacific.
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── Body: rows left + sticky image right ── */}
      <div
        className="ss-body"
        style={{ display: 'grid', gridTemplateColumns: '1fr', alignItems: 'start' }}
      >
        {/* Left: row list */}
        <div>
          <div style={{ height: '1px', background: 'rgba(29,16,21,0.07)' }} />

          {SERVICES.map((svc, i) => (
            <ServiceRow
              key={svc.id}
              svc={svc}
              index={i}
              isHovered={hovered === i}
              isSelected={selected === i}
              onEnter={() => { setHovered(i); setSelected(null) }}
              onLeave={() => { setHovered(null); setSelected(i) }}
            />
          ))}
        </div>

        {/* Right: sticky image panel */}
        <div
          className="ss-panel"
          style={{
            position: 'sticky', top: 0,
            height: '100vh', overflow: 'hidden',
            display: 'none',
          }}
        >
          <ImagePanel index={active} />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .ss-intro       { grid-template-columns: 52fr 48fr !important; }
          .ss-intro-right { border-top: none !important; border-left: 1px solid rgba(29,16,21,0.07) !important; }
          .ss-body        { grid-template-columns: 52fr 48fr !important; }
          .ss-panel       { display: block !important; }
        }
        @media (max-width: 600px) {
          .ss-prelabel, .ss-divider { display: none !important; }
        }
      `}</style>
    </section>
  )
}
