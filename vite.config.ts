import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Hanzero/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Hanzero - เริ่มจาก 0 สู่ภาษาจีนคล่องตัว',
        short_name: 'Hanzero 🐰',
        description: 'แพลตฟอร์มเรียนภาษาจีนตั้งแต่ศูนย์แบบเข้าใจง่าย สบายใจ ไม่น่ากลัว',
        theme_color: '#047857',
        background_color: '#FDFBF7',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}']
      }
    })
  ],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chinese-vendor': ['pinyin-pro', 'hanzi-writer', 'idb-keyval']
        }
      }
    }
  }
});
