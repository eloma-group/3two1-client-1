import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Two changes to the built index.html, both for the first paint:
 *
 * - The stylesheets index.html links (the base styles) are written into the
 *   page as <style> blocks, so the first paint does not wait for a second
 *   request.
 * - The chunks src/main.tsx imports one after another (see the boot sequence
 *   there), and their stylesheets, are listed as preload links, so they
 *   download alongside the entry script instead of one round trip at a time.
 */
function firstPaint(): Plugin {
  return {
    name: 'first-paint',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return
      let source = String(html.source)
      const inlined = new Set<string>()

      source = source.replace(
        /<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g,
        (tag, file: string) => {
          const css = bundle[file]
          if (!css || css.type !== 'asset') return tag
          inlined.add(file)
          // The inert link stays for Vite's chunk loader: it looks for a
          // <link> with this href before loading a chunk that depends on the
          // sheet, and would otherwise append it again, after (and so over)
          // the page styles.
          return `<style>${String(css.source).trim()}</style><link rel="stylesheet" href="/${file}" media="not all" disabled>`
        },
      )

      const entry = Object.values(bundle).find((c) => c.type === 'chunk' && c.isEntry)
      if (entry && entry.type === 'chunk') {
        const wanted = new Set<string>()
        const walk = (file: string) => {
          if (wanted.has(file)) return
          const chunk = bundle[file]
          if (!chunk || chunk.type !== 'chunk') return
          wanted.add(file)
          chunk.imports.forEach(walk)
        }
        entry.dynamicImports.forEach(walk)
        const css = new Set<string>()
        for (const file of wanted) {
          const chunk = bundle[file]
          if (chunk.type === 'chunk') chunk.viteMetadata?.importedCss.forEach((f) => inlined.has(f) || css.add(f))
        }
        const links = [
          ...[...css].map((file) => `<link rel="preload" as="style" crossorigin href="/${file}">`),
          ...[...wanted]
            .filter((file) => !source.includes(`/${file}"`))
            .map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`),
        ].join('\n    ')
        if (links) source = source.replace('</head>', `  ${links}\n  </head>`)
      }

      html.source = source
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), firstPaint()],
  server: {
    host: true,
    port: 5173,
    // allow tunnel hostnames (cloudflare/ngrok/localtunnel) to reach the dev server
    allowedHosts: true,
  },
})
