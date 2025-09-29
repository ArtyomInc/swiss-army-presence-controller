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
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],
  shadcn: {
    componentDir: './ui',
    prefix: ''
  }
})
