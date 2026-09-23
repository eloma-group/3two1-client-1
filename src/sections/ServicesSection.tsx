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

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/* ── Theme ──────────────────────────────────────────────────────── */
const NAVY  = 'rgb(var(--ink-rgb))'
const GREEN = '#e8446f'
const ease  = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* Fine film grain so the panel never looks like a flat colour fill */
const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/* ── Data ───────────────────────────────────────────────────────── */
export interface GalleryItem {
  imageUrl: string
  imageAlt: string
  label: string
  /** Full-bleed lifestyle scene (image carries its own backdrop). */
  scene?: boolean
  /** Optional per-item panel theme (falls back to the parent house). */
  bg?: string
  accent?: string
}

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
  /** Full-bleed lifestyle scene (image carries its own backdrop). */
  scene?: boolean
  /** Country of origin — shown as a chip and drives the panel theme. */
  country: string
  /** Panel backdrop gradient, themed by spirit + country. */
  bg: string
  /** Accent colour for glow, eyebrow and counter. */
  accent: string
  /** When present, the image panel shows the full range instead of one bottle. */
  gallery?: GalleryItem[]
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
    shortDescription: 'Dry Spiced Rum · Cuba',
    imageUrl: '/images/black-tears-dry-spiced-rum-cuba.webp',
    imageAlt: 'Black Tears dry spiced Cuban rum bottle on a Havana bar at sunset',
    scene: true,
    country: 'Cuba',
    accent: '#ff8a3d',
    bg: 'radial-gradient(120% 100% at 58% 22%, #5a3312 0%, #2e1808 52%, #0b0603 100%)',
  },
  {
    id: 'worthy-park',
    number: '02',
    preLabel: 'SINGLE ESTATE RUM',
    name: 'Worthy Park',
    title: 'Pure Jamaican Funk.',
    description:
      'Single-estate Jamaican rum with all the funk and depth the island is famous for. From cane to bottle on one estate.',
    shortDescription: 'Single Estate Reserve · Jamaica · Est. 1670',
    imageUrl: '/images/worthy-park-single-estate-jamaica-rum.webp',
    imageAlt: 'Worthy Park single estate Jamaica rum bottle with sugar cane and island coast',
    scene: true,
    country: 'Jamaica',
    accent: '#f2c94c',
    bg: 'radial-gradient(120% 100% at 55% 20%, #2f5721 0%, #163310 50%, #05100a 100%)',
  },
  {
    id: 'giffard',
    number: '03',
    preLabel: 'LIQUEURS & EAUX-DE-VIE',
    name: 'Giffard',
    title: 'Fruit, Not Fashion.',
    description:
      'Five generations of distillers in Angers, working with whole fruit. Liqueurs, purées and syrups chosen by sommeliers and head bartenders because they make the cocktail better.',
    shortDescription: 'Liqueurs & Eaux-de-vie · Angers, France · Since 1885',
    imageUrl: '/images/giffard-abricot-du-roussillon-apricot-liqueur.webp',
    imageAlt: 'Giffard Abricot du Roussillon apricot liqueur bottle in a French terroir scene',
    scene: true,
    country: 'France',
    accent: '#e879a6',
    bg: 'radial-gradient(120% 100% at 58% 22%, #45163a 0%, #250c20 52%, #0a0509 100%)',
    gallery: [
      { imageUrl: '/images/giffard-abricot-du-roussillon-apricot-liqueur.webp', label: 'Abricot du Roussillon', imageAlt: 'Giffard Abricot du Roussillon apricot liqueur bottle in a French terroir scene', scene: true },
      { imageUrl: '/images/giffard-lichi-li-lychee-liqueur.webp',               label: 'Lichi-Li',              imageAlt: 'Giffard Lichi-Li lychee liqueur bottle with fresh lychees and blossom',           scene: true },
      { imageUrl: '/images/giffard-watermelon-liqueur.webp',                    label: 'Watermelon',           imageAlt: 'Giffard Watermelon liqueur bottle with fresh watermelon at Angers',              scene: true },
      { imageUrl: '/images/giffard-passion-fruit-puree.webp',                   label: 'Passion Fruit',        imageAlt: 'Giffard Passion Fruit purée bottle with tropical island backdrop',               scene: true },
      { imageUrl: '/images/giffard-mango-syrup.webp',                           label: 'Mango Sirop',          imageAlt: 'Giffard Mango syrup bottle with ripe mangoes in a tropical scene',               scene: true },
      { imageUrl: '/images/giffard-coconut-syrup.webp',                         label: 'Coconut Sirop',        imageAlt: 'Giffard Coconut syrup bottle with fresh coconuts and palm leaves',               scene: true },
    ],
  },
  {
    id: 'pueblo-viejo',
    number: '04',
    preLabel: 'BLANCO TEQUILA',
    name: 'Pueblo Viejo',
    title: 'Pure Blue Agave.',
    description:
      'A blanco built on blue agave - clean, bright and made for the margarita. The bartender’s working tequila.',
    shortDescription: 'Blanco Tequila · Jalisco, Mexico',
    imageUrl: '/images/pueblo-viejo-blanco-tequila-jalisco-mexico.webp',
    imageAlt: 'Pueblo Viejo Blanco 100% agave azul tequila bottle in a Jalisco agave field at sunset',
    scene: true,
    country: 'Mexico',
    accent: '#3ad6b0',
    bg: 'radial-gradient(120% 100% at 58% 22%, #124a41 0%, #0a2723 52%, #04100e 100%)',
  },
  {
    id: 'burnt-ends',
    number: '05',
    preLabel: 'BLENDED WHISKEY',
    name: 'Burnt Ends',
    title: 'Charred-Oak Character.',
    description:
      'A peated and sherry-finished blended whiskey with smoke and sweetness in balance. The great pitmasters of America, in a bottle.',
    shortDescription: 'Blended Whiskey · USA',
    imageUrl: '/images/burnt-ends-blended-whiskey-tennessee.webp',
    imageAlt: 'Burnt Ends blended whiskey bottle on a Tennessee farm at sunset',
    scene: true,
    country: 'USA',
    accent: '#ff6a2b',
    bg: 'radial-gradient(120% 100% at 58% 22%, #5e2a0d 0%, #301305 52%, #0b0503 100%)',
  },
  {
    id: 'san-matias',
    number: '06',
    preLabel: 'TEQUILA',
    name: 'San Matías',
    title: 'The Second-Oldest Tequila House in Mexico.',
    description:
      'Casa San Matías has been distilling 100% blue agave in the highlands of Jalisco since 1886 - family-owned, quietly excellent. Gran Reserva Extra-Añejo.',
    shortDescription: 'Gran Reserva Tequila · Jalisco, Mexico · Since 1886',
    imageUrl: '/images/san-matias-gran-reserva-extra-anejo-tequila.webp',
    imageAlt: 'San Matías Gran Reserva extra añejo tequila bottle in a Jalisco agave field',
    scene: true,
    country: 'Mexico',
    accent: '#e6b84c',
    bg: 'radial-gradient(120% 100% at 58% 22%, #4a3b12 0%, #271e08 52%, #0a0803 100%)',
  },
  {
    id: 'whiskey-row',
    number: '07',
    preLabel: 'STRAIGHT BOURBON',
    name: 'Whiskey Row',
    title: 'The Birthplace of Bourbon.',
    description:
      'A blend of straight bourbon whiskey built on an eighteenth-century recipe. Straight, honest and made to move.',
    shortDescription: 'Straight Bourbon · Louisville, Kentucky',
    imageUrl: '/images/whiskey-row-straight-bourbon-kentucky.webp',
    imageAlt: 'Whiskey Row straight bourbon bottle on an oak barrel in Louisville Kentucky',
    scene: true,
    country: 'USA',
    accent: '#4fbf87',
    bg: 'radial-gradient(120% 100% at 58% 22%, #14432f 0%, #0b241a 52%, #04100b 100%)',
  },
]

/* ── Single service row ─────────────────────────────────────────── */
function ServiceRow({
  svc, index, isHovered, isSelected, onEnter, onLeave, onSubEnter, onSubLeave,
}: {
  svc: Service
  index: number
  isHovered: boolean
  isSelected: boolean
  onEnter: () => void
  onLeave: () => void
  onSubEnter: (item: GalleryItem) => void
  onSubLeave: () => void
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
        borderBottom: '1px solid rgba(var(--ink-rgb),0.07)',
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
          color: active ? GREEN : 'rgba(var(--ink-rgb),0.22)',
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
          color: active ? GREEN : 'rgba(var(--ink-rgb),0.3)',
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
          background: active ? `${GREEN}55` : 'rgba(var(--ink-rgb),0.08)',
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }} />

        {/* Service name */}
        <motion.div
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.38, ease }}
          style={{
            flex: 1,
            color: active ? NAVY : 'rgba(var(--ink-rgb),0.6)',
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
              color: 'rgba(var(--ink-rgb),0.52)',
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

      {/* Expandable submenu (e.g. Giffard range) — opens on hover */}
      {svc.gallery && (
        <AnimatePresence initial={false}>
          {active && (
            <motion.div
              key="submenu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: 'clamp(10px, 1.4vw, 18px)',
                padding: '0 clamp(24px, 4vw, 64px) clamp(20px, 2.6vw, 30px) clamp(58px, 8vw, 160px)',
              }}>
                {svc.gallery.map((item, gi) => (
                  <motion.div
                    key={item.imageUrl}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 + gi * 0.05, ease }}
                    onMouseEnter={() => onSubEnter(item)}
                    onMouseLeave={onSubLeave}
                    whileHover={{ y: -4 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                      padding: 'clamp(12px, 1.4vw, 18px) 10px',
                      borderRadius: '14px',
                      background: 'rgba(232,68,111,0.05)',
                      border: '1px solid rgba(232,68,111,0.14)',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      loading="eager"
                      style={{
                        height: 'clamp(72px, 8vw, 108px)', width: 'auto',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.18))',
                      }}
                    />
                    <span style={{
                      fontSize: 'clamp(11px, 0.95vw, 13px)',
                      fontWeight: 600, letterSpacing: '-0.01em',
                      color: NAVY, textAlign: 'center', lineHeight: 1.3,
                    }}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}

/* ── Sticky image panel ─────────────────────────────────────────── */
function ImagePanel({ index, override }: { index: number; override?: GalleryItem | null }) {
  const svc = SERVICES[index]
  const imgUrl   = override ? override.imageUrl : svc.imageUrl
  const imgAlt   = override ? override.imageAlt : svc.imageAlt
  const imgKey   = override ? override.imageUrl : svc.id
  const capTitle = override ? override.label : svc.title
  const bg       = (override && override.bg) ? override.bg : svc.bg
  const accent   = (override && override.accent) ? override.accent : svc.accent
  const isScene  = override ? !!override.scene : !!svc.scene
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', overflow: 'hidden',
    }}>
      {/* Themed backdrop — crossfades per bottle/country */}
      <AnimatePresence mode="sync">
        <motion.div
          key={bg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(65% 45% at 58% 6%, rgba(255,255,255,0.16) 0%, transparent 55%), ${bg}`,
          }}
        />
      </AnimatePresence>

      {/* Accent glow behind the bottle + soft floor pool */}
      <AnimatePresence mode="sync">
        <motion.div
          key={accent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(50% 40% at 58% 32%, ${accent}66 0%, transparent 70%), radial-gradient(45% 14% at 55% 82%, ${accent}40 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      {/* Vignette for depth */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(120% 95% at 50% 38%, transparent 42%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* Film grain so it never reads as a flat colour */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: NOISE_URL, backgroundSize: '160px 160px',
        opacity: 0.11, mixBlendMode: 'overlay',
      }} />

      {/* Country chip (hidden for full scenes — the image carries its own) */}
      {!isScene && (
        <AnimatePresence mode="wait">
          <motion.div
            key={svc.country}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
            style={{
              position: 'absolute', top: 'clamp(24px, 3vw, 40px)', left: 'clamp(24px, 3vw, 40px)',
              zIndex: 3,
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '6px 14px',
              background: 'rgba(12,5,7,0.5)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${accent}55`,
              borderRadius: '100px',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.82)' }}>
              {svc.country}
            </span>
          </motion.div>
        </AnimatePresence>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={imgKey}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: isScene ? 0 : 'clamp(4px, 1vw, 14px) clamp(4px, 1vw, 14px) clamp(120px, 15vh, 180px)',
          }}
        >
          {isScene ? (
            <img
              src={imgUrl}
              alt={imgAlt}
              loading="eager"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
              }}
            />
          ) : (
            <img
              src={imgUrl}
              alt={imgAlt}
              loading="eager"
              style={{
                maxWidth: '100%', maxHeight: '100%',
                width: 'auto', height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45))',
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom fade - deeper for the text caption, lighter for full scenes */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: isScene
          ? 'linear-gradient(to top, rgba(12,5,7,0.55) 0%, rgba(12,5,7,0.12) 22%, transparent 40%)'
          : 'linear-gradient(to top, rgba(12,5,7,0.95) 0%, rgba(12,5,7,0.4) 30%, transparent 55%)',
      }} />

      {/* Service info caption (scenes carry their own baked-in copy) */}
      {!isScene && (
        <AnimatePresence mode="wait">
          <motion.div
            key={imgKey + '-caption'}
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
              color: accent, marginBottom: '10px',
            }}>
              {svc.preLabel}
            </div>
            <div style={{
              fontSize: 'clamp(20px, 2.6vw, 34px)',
              fontWeight: 700, color: '#ffffff',
              letterSpacing: '-0.035em', lineHeight: 1.1,
              marginBottom: '10px',
            }}>
              {capTitle}
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
      )}

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
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
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
  const [subItem,  setSubItem]  = useState<GalleryItem | null>(null)
  const active = hovered ?? selected ?? 0

  // Preload every panel + gallery image on mount so switching on hover is
  // instant — no blank background while the new image is fetched.
  useEffect(() => {
    const urls = new Set<string>()
    SERVICES.forEach((s) => {
      urls.add(s.imageUrl)
      s.gallery?.forEach((g) => urls.add(g.imageUrl))
    })
    urls.forEach((url) => { const img = new Image(); img.src = url })
  }, [])

  return (
    <section id="services" style={{ position: 'relative', overflow: 'clip', background: 'var(--surface)', color: NAVY, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Intro header ── */}
      <div
        className="ss-intro"
        style={{
          position: 'relative', overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr',
          background: 'linear-gradient(135deg, rgba(var(--ink-rgb),0.06) 0%, rgba(232,68,111,0.04) 50%, var(--surface) 100%)',
          borderBottom: '1px solid rgba(var(--ink-rgb),0.08)',
        }}
      >
        {/* Faint watermark number */}
        <div style={{
          position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(100px,18vw,200px)', fontWeight: 900, lineHeight: 1,
          color: 'rgba(var(--ink-rgb),0.04)', letterSpacing: '-0.06em',
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
          borderTop: '1px solid rgba(var(--ink-rgb),0.07)',
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
                color: 'rgba(var(--ink-rgb),0.52)',
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
          <div style={{ height: '1px', background: 'rgba(var(--ink-rgb),0.07)' }} />

          {SERVICES.map((svc, i) => (
            <ServiceRow
              key={svc.id}
              svc={svc}
              index={i}
              isHovered={hovered === i}
              isSelected={selected === i}
              onEnter={() => { setHovered(i); setSelected(null) }}
              onLeave={() => { setHovered(null); setSelected(i); setSubItem(null) }}
              onSubEnter={(item) => setSubItem(item)}
              onSubLeave={() => setSubItem(null)}
            />
          ))}
        </div>

        {/* Right: sticky image panel */}
        <div
          className="ss-panel"
          style={{
            position: 'sticky', top: 'auto', bottom: 0,
            alignSelf: 'end',
            width: '100%', aspectRatio: '1 / 1',
            overflow: 'hidden',
            display: 'none',
          }}
        >
          <ImagePanel index={active} override={subItem} />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .ss-intro       { grid-template-columns: 52fr 48fr !important; }
          .ss-intro-right { border-top: none !important; border-left: 1px solid rgba(var(--ink-rgb),0.07) !important; }
          .ss-body        { grid-template-columns: 50fr 50fr !important; }
          .ss-panel       { display: block !important; }
        }
        @media (max-width: 600px) {
          .ss-prelabel, .ss-divider { display: none !important; }
        }
      `}</style>
    </section>
  )
}
