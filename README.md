# 3two1 drinks — premium beverage brand website

A cinematic, award-style marketing site for **3two1** ("The Taste of Passion") — a
house of premium spirits built for trade across **Australia · New Zealand · Pacific Islands**.

Business content (seven houses, trade channels, cocktails, stats, contact) is drawn from
the reference site; the UI/UX is an original pink-coral luxury design.

## Stack
- React 19 + TypeScript + Vite
- Framer Motion (reveals, page/menu transitions, parallax)
- GSAP + ScrollTrigger (splash timeline, pinned horizontal brand scroll)
- Lenis (smooth scrolling)
- React Router DOM
- Lucide React (+ inline brand icons)
- CSS Modules

## Getting started
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build -> dist/
npm run preview
```

## Structure
```
src/
  data/content.ts        All brand & business copy (single source of truth)
  hooks/                 useLenis (smooth scroll + ScrollTrigger sync), useMediaQuery
  components/            Splash, Cursor, Navbar, ScrollProgress, MagneticButton,
                         Reveal, SmartImage, Marquee, icons
  sections/              Hero, Story, Brands, Stats, Trade, Experience,
                         Bartenders, Contact, Footer
  pages/Home.tsx         Composes the sections
  App.tsx                Router, splash gate, global chrome
```

## Key features
- **Session-based splash** — GSAP timeline, runs once per session (`sessionStorage`).
- **Cinematic hero** — layered parallax, floating particles, scroll-driven typography,
  product spotlight, magnetic CTAs, scroll indicator.
- **Pinned horizontal brand showcase** — GSAP ScrollTrigger on desktop, stacks on mobile.
- **Custom cursor**, magnetic buttons, count-up stats, animated marquee, glass cards.
- Fully responsive (mobile -> 4K), reduced-motion & touch fallbacks.

## Images
All product/hero art uses placeholder paths under `/public/images/*.webp`.
`SmartImage` renders an elegant gradient fallback until the real files are dropped in —
no broken-image icons. Supplied logo/pineapple/splash assets are already in place.
```
/images/product-<brand>.webp   <- drop final product shots here
```
