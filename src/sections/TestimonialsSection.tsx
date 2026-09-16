/**
 * TestimonialsSection — self-contained, portable "Client Stories" section.
 *
 * Extracted from the BIVRY homepage. Everything the section needs
 * (data, styles, animations) lives in THIS ONE FILE so it can be
 * dropped into any React site.
 *
 * ── Requirements ─────────────────────────────────────────────────
 *   npm i framer-motion
 *
 * ── Usage ────────────────────────────────────────────────────────
 *   import { TestimonialsSection } from './TestimonialsSection'
 *   <TestimonialsSection />
 *
 * What it renders: a header ("Client Stories" / "Trusted Across Australia.")
 * above 1–3 infinite vertical-scrolling columns of review cards (5 stars,
 * quote, avatar + author). Extra columns reveal on wider screens.
 *
 * NOTE: the original used Tailwind classes for responsive column hiding —
 * here that is replaced with plain CSS media queries (no Tailwind needed).
 * All styling is inline / in a <style> tag (no external CSS file needed).
 */

import React from 'react'
import { motion } from 'framer-motion'

/* ── Theme ──────────────────────────────────────────────────────── */
const NAVY  = '#1d1015'
const GREEN = '#e8446f'
const ease  = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ── Data ───────────────────────────────────────────────────────── */
export interface Testimonial {
  id:       number
  quote:    string
  author:   string
  role:     string
  company:  string
  location: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: 'The Pueblo Viejo blanco is our house margarita pour now. Clean, bright and priced so we can run it every night without blinking. My bartenders actually ask for it.',
    author: 'Liam Bennett',
    role: 'Bar Manager',
    company: 'The Long Room',
    location: 'Melbourne, VIC',
  },
  {
    id: 2,
    quote: 'Black Tears completely changed how we build our rum & colas. Guests notice the coffee-cacao note straight away and we sell twice as many. It has become a signature serve.',
    author: 'Olivia Grant',
    role: 'Venue Owner',
    company: 'Mitchell & Co.',
    location: 'Sydney, NSW',
  },
  {
    id: 3,
    quote: 'Giffard is the only liqueur range I trust on my back bar. The fruit is honest, the colour holds in a cocktail, and the 3two1 team always keeps us stocked before we run dry.',
    author: 'Noah Patel',
    role: 'Head Bartender',
    company: 'Aster Rooftop',
    location: 'Sydney, NSW',
  },
  {
    id: 4,
    quote: 'We put Worthy Park on our daiquiri list expecting a slow burn - it flew. That Jamaican funk gives the drink real depth and regulars now order it by name.',
    author: 'Chloe Turner',
    role: 'Beverage Director',
    company: 'Clarke House',
    location: 'Brisbane, QLD',
  },
  {
    id: 5,
    quote: 'Ordering through 3two1 is effortless. One rep, one portfolio, delivery when they say - so I spend less time chasing stock and more time behind the bar. Exactly what a busy venue needs.',
    author: 'Ethan Ward',
    role: 'Bottle Shop Owner',
    company: 'Torres Cellars',
    location: 'Perth, WA',
  },
  {
    id: 6,
    quote: 'Switching our well tequila to San Matías was the easiest upgrade we have made. Guests taste the difference in a Paloma and our repeat orders jumped within the first month.',
    author: 'Ava Robinson',
    role: 'Group Buyer',
    company: 'Foster Hospitality',
    location: 'Adelaide, SA',
  },
  {
    id: 7,
    quote: 'Burnt Ends is my go-to for a stirred-down Manhattan. That charred-oak character sits perfectly with vermouth and it has quietly become one of our best-selling whiskies.',
    author: 'Marcus Reid',
    role: 'Bar Owner',
    company: "O'Brien's Tavern",
    location: 'Melbourne, VIC',
  },
  {
    id: 8,
    quote: 'Whiskey Row pours beautifully in the well - approachable, honest and it moves. For a high-volume room it keeps the classics consistent and the margins healthy.',
    author: 'Isla Fraser',
    role: 'Operations Manager',
    company: 'Neon Social',
    location: 'Gold Coast, QLD',
  },
  {
    id: 9,
    quote: 'Seven houses under one portfolio means one order, one invoice, one relationship. 3two1 gets it to us on time every week and the range covers our whole cocktail list.',
    author: 'Jack Sullivan',
    role: 'Café & Bar Owner',
    company: 'Walsh & Daughters',
    location: 'Hobart, TAS',
  },
]

/* ── Avatar colours cycling through 4 tints ─────────────────────── */
const AVATAR_PALETTE = [
  { bg: '#FBE4EA', fg: '#b41f52' },
  { bg: '#F5E6DC', fg: '#c2410c' },
  { bg: '#F7EBD8', fg: '#a16207' },
  { bg: '#F6E1EC', fg: '#be185d' },
]

function Avatar({ index }: { index: number }) {
  const { bg, fg } = AVATAR_PALETTE[index % AVATAR_PALETTE.length]
  return (
    <div style={{
      width: '40px', height: '40px', borderRadius: '50%',
      background: bg, display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexShrink: 0,
    }}>
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="8" r="3.8" fill={fg}/>
        <path d="M4 20c0-4.1 3.6-7.2 8-7.2s8 3.1 8 7.2" fill={fg} opacity=".5"/>
      </svg>
    </div>
  )
}

/* ── Five-star row ──────────────────────────────────────────────── */
function Stars() {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="#F5A623" width="14" height="14">
          <path d="M8 1.2l1.85 3.75L14 5.68l-3 2.92.7 4.12L8 10.55 4.3 12.72l.7-4.12L2 5.68l4.15-.71L8 1.2z"/>
        </svg>
      ))}
    </div>
  )
}

/* ── Single testimonial card ────────────────────────────────────── */
function Card({ t, idx }: { t: Testimonial; idx: number }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: '0 20px 48px rgba(29,16,21,0.12), 0 0 0 1.5px rgba(29,16,21,0.08)',
        transition: { type: 'spring', stiffness: 380, damping: 22 },
      }}
      style={{
        background: '#ffffff',
        border: '1px solid rgba(29,16,21,0.08)',
        borderRadius: '18px',
        padding: '24px',
        boxShadow: '0 2px 12px rgba(29,16,21,0.05)',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <Stars/>
      <p style={{
        fontSize: '14px',
        color: 'rgba(29,16,21,0.65)',
        lineHeight: 1.76,
        margin: '0 0 20px',
      }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar index={idx}/>
        <div>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: NAVY, lineHeight: 1.3 }}>
            {t.author}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Infinite-scroll column ─────────────────────────────────────── */
function ScrollColumn({
  items, duration, offset, hideClass,
}: {
  items: Testimonial[]
  duration: number
  offset: number
  hideClass?: string
}) {
  return (
    <div
      style={{ flex: 1, overflow: 'hidden', minWidth: 0 }}
      className={hideClass}
    >
      <motion.div
        animate={{ y: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        {[0, 1].map(rep => (
          <React.Fragment key={rep}>
            {items.map((t, i) => (
              <Card key={`${rep}-${i}`} t={t} idx={offset + i}/>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Main export ────────────────────────────────────────────────── */
export function TestimonialsSection() {
  const col1 = TESTIMONIALS.slice(0, 3)
  const col2 = TESTIMONIALS.slice(3, 6)
  const col3 = TESTIMONIALS.slice(6, 9)

  return (
    <section
      style={{
        background: '#FBF6F7',
        backgroundImage: 'radial-gradient(rgba(29,16,21,0.035) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        padding: 'clamp(72px,9vw,112px) clamp(24px,4vw,64px)',
        borderTop: '1px solid rgba(29,16,21,0.07)',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease }}
        style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}
      >
        {/* Label */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '14px', marginBottom: '24px',
        }}>
          <div style={{ height: '1px', width: '52px', background: `${GREEN}55` }}/>
          <span style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
            textTransform: 'uppercase', color: GREEN,
          }}>
Trade Stories
          </span>
          <div style={{ height: '1px', width: '52px', background: `${GREEN}55` }}/>
        </div>

        <h2 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 'clamp(30px,4vw,48px)',
          fontWeight: 800, color: NAVY,
          letterSpacing: '-0.04em', lineHeight: 1.1,
          margin: '0 0 18px',
        }}>
          Loved Behind The Bar.
        </h2>

        <p style={{
          fontSize: 'clamp(14px,1.1vw,16px)',
          color: 'rgba(29,16,21,0.52)',
          lineHeight: 1.75, margin: '0 auto',
          maxWidth: '480px',
        }}>
          Bartenders, venue owners and buyers across the country pour the 3two1 portfolio night after night.
        </p>
      </motion.div>

      {/* Scrolling columns */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
        style={{
          display: 'flex',
          gap: '14px',
          maxHeight: '680px',
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          maskImage:        'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <ScrollColumn items={col1} duration={22} offset={0}/>
        <ScrollColumn items={col2} duration={28} offset={3} hideClass="ts-hide-md"/>
        <ScrollColumn items={col3} duration={25} offset={6} hideClass="ts-hide-lg"/>
      </motion.div>

      <style>{`
        /* 2nd column appears from 768px, 3rd column from 1024px */
        .ts-hide-md { display: none; }
        .ts-hide-lg { display: none; }
        @media (min-width: 768px)  { .ts-hide-md { display: block; } }
        @media (min-width: 1024px) { .ts-hide-lg { display: block; } }
      `}</style>
    </section>
  )
}
