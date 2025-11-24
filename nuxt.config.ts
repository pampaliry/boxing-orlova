// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config';
import vuetify from 'vite-plugin-vuetify';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

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

    PORT: process.env.PORT || '3001',
    NITRO_PORT: process.env.NITRO_PORT || '3001',
    NITRO_HOST: process.env.NITRO_HOST || '0.0.0.0',
  },

  devtools: { enabled: false },

  experimental: {
    typedPages: false,
    asyncEntry: false,
  },

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

  // -----------------------------------------
  // 🚀 Nitro server
  // -----------------------------------------
  nitro: {
    compatibilityDate: '2025-08-12',
    preset: 'node-server',
    serveStatic: true,
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
  // 🖼️ Nuxt Image CONFIG (TS fixnutý cez *.d.ts)
  // -----------------------------------------

  image: {
    provider: 'ipx',
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
    },
    presets: {
      responsive: {
        modifiers: {
          widths: [320, 640, 1024],
          format: 'webp',
          densities: [1],
        },
        sizes: '(max-width: 320px) 100vw, (max-width: 640px) 100vw, 1024px',
      },
      logo: {
        modifiers: {
          format: 'webp',
        },
      },
    },
  },
  /* image: {
    provider: 'ipx',
    dir: 'assets/imgs-opt/',
    screens: {
      sm: 320,
      md: 640,
      lg: 1024,
    },
    presets: {
      responsive: {
        modifiers: {
          format: 'webp',
        },
        sizes: '100vw sm:320px md:640px lg:1024px',
      },
    },
  },*/

  // -----------------------------------------
  // 🎨 Vite (SCSS + Image Optimizer)
  // -----------------------------------------
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/colours.scss" as *;`,
        },
      },
    },
    plugins: [
      ViteImageOptimizer({
        png: { quality: 80 },
        jpeg: { quality: 80 },
        webp: { quality: 75 },
        avif: { quality: 50 },
        svg: { multipass: true },
      }),
    ],
  },

  // -----------------------------------------
  // ⚡ PWA CONFIG
  // -----------------------------------------
  pwa: {
    registerType: 'autoUpdate',

    manifest: {
      name: 'Boxing Orlová - Klub bojových uměňí',
      short_name: 'Boxing Orlová',
      description: 'Klub bojových uměňí.',
      theme_color: '#000000',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      lang: 'cs',
      icons: [
        { src: '/pwa-icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },

    workbox: {
      navigateFallback: null,
      globPatterns: ['**/*.{js,css,ico,svg,webp}'],

      runtimeCaching: [
        {
          urlPattern: (ctx: any) => ctx.request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'html-cache',
            networkTimeoutSeconds: 5,
          },
        },
        {
          urlPattern: (ctx: any) =>
            ['style', 'script', 'worker'].includes(ctx.request.destination),
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'asset-cache' },
        },
        {
          urlPattern: (ctx: any) =>
            ['image', 'font'].includes(ctx.request.destination),
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
      ],
    },
  },

  // -----------------------------------------
  // 🌍 SEO
  // -----------------------------------------
  app: {
    head: {
      htmlAttrs: { lang: 'cs' },
      title: 'Boxing Orlová – Bojové sporty pro děti, mládež i dospělé',
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
        { property: 'og:title', content: 'Boxing Orlová – Klub Boxu a MMA' },
        {
          property: 'og:description',
          content:
            'Tréninky boxu a MMA v Orlové. Kondice, technika, sparingy — pro děti i dospělé.',
        },
        {
          property: 'og:image',
          content: 'https://boxing-orlova.mm-smart.eu/social-preview.jpg',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },
});
