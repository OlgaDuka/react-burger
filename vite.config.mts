import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Относительный base нужен для деплоя в подкаталог (gh-pages) — как раньше `homepage: "./"`.
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    // CRA слушал 0.0.0.0; без этого dev-сервер в Docker был бы недоступен снаружи.
    host: true,
    strictPort: true,
  },
  preview: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    target: 'es2020',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
  },
})
