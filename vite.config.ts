import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/Hanzero/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
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
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/hanzi-writer-data@2\.0\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'hanzi-writer-stroke-cache',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/dict\.youdao\.com\/dictvoice\?.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'youdao-audio-cache',
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      }
    })
  ],
  build: {
    emptyOutDir: true,
    target: 'es2020',
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/hanzi-writer/')) {
            return 'hanzi-vendor';
          }
          if (id.includes('node_modules/pinyin-pro/')) {
            return 'pinyin-vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons-vendor';
          }
          if (id.includes('node_modules/idb-keyval/')) {
            return 'storage-vendor';
          }
          if (id.includes('src/data/hsk/hsk1')) {
            return 'hsk-1-data';
          }
          if (id.includes('src/data/hsk/hsk2')) {
            return 'hsk-2-data';
          }
          if (id.includes('src/data/hsk/hsk3')) {
            return 'hsk-3-data';
          }
          if (id.includes('src/data/hsk/hsk4')) {
            return 'hsk-4-data';
          }
          if (id.includes('src/data/hsk/hsk5')) {
            return 'hsk-5-data';
          }
          if (id.includes('src/data/hsk/hsk6')) {
            return 'hsk-6-data';
          }
          if (id.includes('src/data/lessons/tier0')) {
            return 'curriculum-tier0';
          }
          if (id.includes('src/data/lessons/tier1')) {
            return 'curriculum-tier1';
          }
          if (id.includes('src/data/lessons/tier2')) {
            return 'curriculum-tier2';
          }
          if (id.includes('manifestData.json')) {
            return 'curriculum-manifest';
          }
          if (id.includes('src/data/lessons/tier3')) {
            if (/unit(2[6-9]|3[0-5])/.test(id)) {
              return 'curriculum-tier3a';
            }
            return 'curriculum-tier3b';
          }
          if (id.includes('src/data/lessons/tier4')) {
            return 'curriculum-tier4';
          }
        }
      }
    }
  }
});
