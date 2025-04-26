import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
    strictPort: true,
    port: 3001
  },
  root: "./frontend",
  build: {
    outDir: "../frontend-build",
    emptyOutDir: true,
    reportCompressedSize: true
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  }
});
