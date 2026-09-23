import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/* Zoom-lock: keep the hero + header rendering at their 100% size for any
   browser/display zoom. devicePixelRatio tracks desktop zoom (1.25 = 125%);
   we expose the inverse as --zoom-lock, engaged only for the typical zoom
   range so true hi-DPI (retina ≥2x) and 1x screens are left untouched. */
function updateZoomLock() {
  const dpr = window.devicePixelRatio || 1
  const scale = dpr > 1.05 && dpr < 1.95 ? +(1 / dpr).toFixed(4) : 1
  document.documentElement.style.setProperty('--zoom-lock', String(scale))
}
updateZoomLock()
window.addEventListener('resize', updateZoomLock)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
