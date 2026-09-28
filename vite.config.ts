import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // allow tunnel hostnames (cloudflare/ngrok/localtunnel) to reach the dev server
    allowedHosts: true,
  },
})
