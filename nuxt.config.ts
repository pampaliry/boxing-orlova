// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  // -----------------------------------------
  // 🧩 Runtime Config
  // -----------------------------------------
  runtimeConfig: {
    CMS_API_URL: process.env.NUXT_CMS_API_URL,
    CMS_READONLY_TOKEN: process.env.NUXT_CMS_READONLY_TOKEN,
    CMS_MOCK: process.env.NUXT_CMS_MOCK ?? '0',

    public: {
      wsUrl: process.env.NUXT_PUBLIC_WS_URL || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      CMS_URL: process.env.NUXT_PUBLIC_CMS_URL,
      CMS_MEDIA: process.env.NUXT_PUBLIC_CMS_MEDIA || '',
    },

    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailTo: process.env.MAIL_TO,

    // 🔥 NUTNÉ PRE PRODUKČNÝ PORT – teraz sa bude rešpektovať
    PORT: process.env.PORT || '3001',
    NITRO_PORT: process.env.NITRO_PORT || '3001',
    NITRO_HOST: process.env.NITRO_HOST || '0.0.0.0'
  },

  devtools: { enabled: false },

  // -----------------------------------------
  // 🎨 Styling
  // -----------------------------------------
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/styles/main.scss',
  ],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    plugins: [vuetify({ autoImport: true })],
    vue: { template: { transformAssetUrls } },
  },

  // -----------------------------------------
  // 🚀 Nitro Server — toto JE kľúčové
  // -----------------------------------------
  nitro: {
    compatibilityDate: '2025-08-12',
    preset: 'node-server',        
    serveStatic: true,
    routeRules: {},
  },

  // -----------------------------------------
  // 📦 Modules
  // -----------------------------------------
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // -----------------------------------------
  // ⚡ PWA
  // -----------------------------------------
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: null,
      globPatterns: ['**/*.{js,css,ico,png,svg,webp}'],
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: { cacheName: 'html-cache', networkTimeoutSeconds: 5 },
        },
        {
          urlPattern: ({ request }) =>
            ['style', 'script', 'worker'].includes(request.destination),
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'asset-cache' },
        },
        {
          urlPattern: ({ request }) =>
            ['image', 'font'].includes(request.destination),
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
      ],
    },

    manifest: {
      name: 'Boxing Orlová - Klub bojových uměňí',
      short_name: 'Boxing Orlová',
      description: 'Klub bojových uměňí.',
      theme_color: '#424242',
      background_color: '#f4f4f4',
      display: 'standalone',
      start_url: '/',
      lang: 'cs',
      icons: [
        { src: '/pwa-icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
  },

  // -----------------------------------------
  // 🌍 SEO
  // -----------------------------------------
  app: {
    head: {
      htmlAttrs: { lang: 'cs' },
      title: 'Boxing Orlová – Box a MMA pro děti, mládež i dospělé',

      link: [{ rel: 'canonical', href: 'https://boxing-orlova.mm-smart.eu/' }],

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#d0202a' },

        {
          name: 'description',
          content:
            'Oficiální klub bojových umění v Orlové. Tréninky boxu a MMA pro děti, mládež i dospělé.',
        },

        // OG
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://boxing-orlova.mm-smart.eu/' },
        {
          property: 'og:title',
          content: 'Boxing Orlová – Klub Boxu a MMA',
        },
        {
          property: 'og:description',
          content:
            'Tréninky boxu a MMA v Orlové. Profesionální vedení, kondice, technika, sparingy — pro děti i dospělé.',
        },
        {
          property: 'og:image',
          content: 'https://boxing-orlova.mm-smart.eu/social-preview.jpg',
        },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Boxing Orlová – Klub Boxu a MMA',
        },
        {
          name: 'twitter:description',
          content:
            'Tréninky boxu a MMA v Orlové. Profesionální vedení, kondice, technika, sparingy.',
        },
        {
          name: 'twitter:image',
          content: 'https://boxing-orlova.mm-smart.eu/social-preview.jpg',
        },
      ],
    },
  },

  // -----------------------------------------
  // 🔍 Site Config (pre sitemap/robots)
  // -----------------------------------------
  site: {
    url: 'https://boxing-orlova.mm-smart.eu',
    name: 'Boxing Orlová',
  },

  sitemap: {},

  robots: {
    groups: [
      { userAgent: '*', disallow: ['/api/', '/admin/', '/dev/'] },
      { userAgent: '*', allow: ['/'] },
    ],
    sitemap: ['https://boxing-orlova.mm-smart.eu/sitemap.xml'],
  },
});
