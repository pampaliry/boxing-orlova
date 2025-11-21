// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  runtimeConfig: {
    CMS_API_URL: process.env.NUXT_CMS_API_URL,
    CMS_READONLY_TOKEN: process.env.NUXT_CMS_READONLY_TOKEN,
    CMS_MOCK: process.env.NUXT_CMS_MOCK ?? '0',
    port: process.env.PORT || 3001,
    nitroPort: process.env.NITRO_PORT || 3001,
    nitroHost: process.env.NITRO_HOST || "0.0.0.0",
    public: {
      wsUrl: process.env.NUXT_PUBLIC_WS_URL || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      CMS_URL: process.env.NUXT_PUBLIC_CMS_URL,
      CMS_MEDIA: process.env.NUXT_PUBLIC_CMS_MEDIA || '',
    },
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailTo: process.env.MAIL_TO,
  },

  devtools: { enabled: false },

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

  nitro: {
    compatibilityDate: '2025-08-12',
    preset: 'node',
    serveStatic: true,
    routeRules: {}
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // ⚡ PWA nastavenia
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
      description:
        'Klub bojových uměňí.',
      theme_color: '#424242',
      background_color: '#f4f4f4',
      display: 'standalone',
      start_url: '/',
      lang: 'sk',
      icons: [
        { src: '/pwa-icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
  },

  // 🌍 SEO nastavenia
 app: {
  head: {
    htmlAttrs: { lang: 'cs' },
    title: 'Boxing Orlová – Box a MMA pro děti, mládež i dospělé',
    link: [
      { rel: 'canonical', href: 'https://boxing-orlova.mm-smart.eu/' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#d0202a' },

      {
        name: 'description',
        content:
          'Oficiální klub bojových umění v Orlové. Tréninky boxu a MMA pro děti, mládež i dospělé. Profesionální trenéři, kondiční příprava, sparingy a individuální tréninky.'
      },

      // OG
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://boxing-orlova.mm-smart.eu/' },
      {
        property: 'og:title',
        content: 'Boxing Orlová – Klub Boxu a MMA'
      },
      {
        property: 'og:description',
        content:
          'Oficiální klub bojových umění v Orlové. Tréninky boxu a MMA pro děti, mládež i dospělé. Přijď si vyzkoušet první trénink.'
      },
      {
        property: 'og:image',
        content: 'https://boxing-orlova.mm-smart.eu/social-preview.jpg'
      },

      // TWITTER
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Boxing Orlová – Klub Boxu a MMA'
      },
      {
        name: 'twitter:description',
        content:
          'Tréninky boxu a MMA v Orlové. Profesionální vedení, kondice, technika, sparingy — pro děti i dospělé.'
      },
      {
        name: 'twitter:image',
        content: 'https://boxing-orlova.mm-smart.eu/social-preview.jpg'
      }
    ]
  }
}
,

  // ✅ Nuxt Site Config (pre sitemap/robots)
  site: {
    url: 'https://mm-smart.eu',
    name: 'MM Smart',
  },

  // ✅ Sitemap nastavenia
  sitemap: {
    //gzip: true,
  },

  // ✅ Robots.txt nastavenia
  robots: {
    groups: [
      { userAgent: '*', disallow: ['/api/', '/admin/', '/dev/'] },
      { userAgent: '*', allow: ['/'] },
    ],
    sitemap: ['https://mm-smart.eu/sitemap.xml'],
  },
});
