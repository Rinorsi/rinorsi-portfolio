import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/rinorsi-portfolio/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [react()],
})
