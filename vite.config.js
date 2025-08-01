import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
    // Remover el plugin de tailwindcss de aquí
  ],
  css: {
    postcss: './postcss.config.js', // Asegurar que use PostCSS
  },
})