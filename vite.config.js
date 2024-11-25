import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  plugins: [
      react(),
      ViteImageOptimizer({
          png: { quality: 80 },
          jpeg: { quality: 75 },
          webp: { quality: 80 },
          avif: { quality: 70 },
          svg: {
              plugins: [
                  { name: 'removeViewBox', active: false },
                  { name: 'sortAttrs' },
              ],
          },
      }),
  ],
});
