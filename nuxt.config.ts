// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: { class: 'text-foreground' },
      charset: 'utf-8',
      script: [
        {
          'data-website-id': '6c68f778-6d7a-4142-b0b9-607e34cbccc4',
          defer: true,
          src: 'https://umami.arduc.ch/script.js'
        }
      ],
      title: 'Presence Controller',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    }
  },
  colorMode: {
    classSuffix: '',
    componentName: 'ColorScheme',
    fallback: 'dark',
    preference: 'system',
    storage: 'localStorage',
    storageKey: 'color-mode'
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  icon: {
    clientBundle: {
      icons: [
        'lucide:download',
        'lucide:upload',
        'lucide:users',
        'lucide:trash-2',
        'lucide:plus',
        'lucide:x',
        'lucide:download-cloud',
        'lucide:loader-2',
        'lucide:share',
        'lucide:check',
        'lucide:wifi-off',
        'lucide:wifi'
      ],
      scan: true
    },
    provider: 'iconify',
    serverBundle: {
      collections: ['lucide']
    }
  },
  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],
  pwa: {
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      type: 'module'
    },
    manifest: {
      background_color: '#0a0a0a',
      categories: ['productivity', 'business'],
      description: 'Contrôle de présence pour entrées en service',
      display: 'standalone',
      icons: [
        {
          purpose: 'any',
          sizes: '192x192',
          src: '/pwa-192x192.png',
          type: 'image/png'
        },
        {
          purpose: 'any',
          sizes: '512x512',
          src: '/pwa-512x512.png',
          type: 'image/png'
        },
        {
          purpose: 'maskable',
          sizes: '512x512',
          src: '/pwa-512x512-maskable.png',
          type: 'image/png'
        }
      ],
      name: 'Swiss Army Presence Controller',
      orientation: 'portrait',
      scope: '/',
      short_name: 'Presence Ctrl',
      shortcuts: [
        {
          description: 'Ajouter rapidement une nouvelle présence',
          icons: [{ sizes: '192x192', src: '/pwa-192x192.png', type: 'image/png' }],
          name: 'Enregistrer présence',
          short_name: 'Enregistrer',
          url: '/controller/register?source=shortcut'
        },
        {
          description: 'Consulter toutes les présences enregistrées',
          icons: [{ sizes: '192x192', src: '/pwa-192x192.png', type: 'image/png' }],
          name: 'Voir présences',
          short_name: 'Présences',
          url: '/controller/presences?source=shortcut'
        },
        {
          description: 'Configurer les sections militaires',
          icons: [{ sizes: '192x192', src: '/pwa-192x192.png', type: 'image/png' }],
          name: 'Gérer sections',
          short_name: 'Sections',
          url: '/controller?source=shortcut'
        }
      ],
      start_url: '/',
      theme_color: '#0a0a0a'
    },
    registerType: 'prompt',
    workbox: {
      cleanupOutdatedCaches: true,
      globIgnores: ['**/*.map', '**/node_modules/**', '**/*.md'],
      globPatterns: ['**/*.{js,css,html}', '**/*.{png,svg,ico,webp}'],
      navigateFallback: '/',
      runtimeCaching: [
        {
          handler: 'CacheFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            },
            cacheName: 'google-fonts-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365,
              maxEntries: 10
            }
          },
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i
        },
        {
          handler: 'NetworkFirst',
          options: {
            cacheName: 'analytics-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24,
              maxEntries: 5
            },
            networkTimeoutSeconds: 3
          },
          urlPattern: /^https:\/\/umami\.arduc\.ch\/.*/i
        },
        {
          handler: 'CacheFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            },
            cacheName: 'local-images-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365,
              maxEntries: 50
            }
          },
          urlPattern: /^https?:\/\/[^/]+\/pictures\/.*/i
        }
      ]
    }
  },
  shadcn: {
    componentDir: './ui',
    prefix: ''
  }
})
