import { StrictMode, startTransition } from 'react'

/* The splash in index.html is plain HTML and CSS and covers the page for its
   first six seconds, so nothing here is on screen yet. The app therefore
   starts in short steps rather than one long one: React, the hero (with the
   animation library), smooth scrolling (with GSAP) and the rest of the app
   are each evaluated in a task of their own, with the browser free to draw
   the splash in between. vite.config.ts preloads these chunks, so the imports
   resolve from memory. The modules are the app's own, not the bare packages,
   so the bundler still drops whatever the app does not use. */

const nextTask = () => new Promise<void>((resolve) => setTimeout(resolve))

/** Resolves once the web fonts the page opens with have arrived (or `max` ms
    have passed). Mounting after them means the page is laid out once, in its
    real fonts, instead of once in the fallbacks and again on each swap. */
function fontsSettled(max: number) {
  const link = document.getElementById('gfonts') as HTMLLinkElement | null
  const sheet = new Promise<void>((resolve) => {
    if (!link || link.media === 'all') resolve()
    else link.addEventListener('load', () => resolve(), { once: true })
  })
  const fonts = sheet
    // Two frames: the splash text is restyled with the new sheet and its
    // fonts start downloading, which is what `fonts.ready` then waits for.
    .then(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
    .then(() => document.fonts.ready)
  return Promise.race([fonts, new Promise((resolve) => setTimeout(resolve, max))])
}

async function boot() {
  const [{ createRoot }] = await Promise.all([import('react-dom/client'), fontsSettled(1500)])
  await nextTask()
  await import('./sections/Hero.tsx')
  await nextTask()
  await import('./hooks/useLenis.ts')
  await nextTask()
  const { default: App } = await import('./App.tsx')
  await nextTask()
  const root = createRoot(document.getElementById('root')!)
  // As a transition, so React renders in slices and yields between them
  startTransition(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
}

void boot()
