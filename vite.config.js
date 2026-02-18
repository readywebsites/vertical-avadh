import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/V5-vertical-avadh-mobile/',   // 👈 aa tamaru exact repo naam mukvu
  plugins: [react()],
})
