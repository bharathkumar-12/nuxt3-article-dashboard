// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  experimental: {
    appManifest: false,
  },

  nitro: {
    preset: 'netlify',
  },

  // Enable TypeScript strict mode
  typescript: {
    strict: true,
    typeCheck: false, // Disable typeCheck in dev (run npm run typecheck separately)
  },

  // SSR is enabled by default in Nuxt 3
  ssr: true,

  // Modules
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  // Runtime configuration
  runtimeConfig: {
    // Private keys (server-side only)
    apiSecret: '',
    // Public keys (exposed to client)
    public: {
      apiBase: 'https://mocki.io/v1/52930ca2-656e-4c3c-9eab-8ad842fe0cc4',
    },
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
  },

  // App configuration
  app: {
    head: {
      title: 'Article Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'A production-ready Nuxt 3 Article Dashboard',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        },
      ],
    },
  },

  // Auto-imports for composables and utilities
  imports: {
    dirs: ['composables', 'composables/**', 'utils', 'stores'],
  },

  // Components auto-import configuration
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
});
