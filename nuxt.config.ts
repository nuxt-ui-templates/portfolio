// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    // Pages read the native `content.get()` / `content.list()` / `content.navigation()` API, but v4
    // has no equivalent for two v3 features this template uses, so the v3 compatibility layer stays
    // on for them: blog search sections (`queryCollectionSearchSections`, `UContentSearch`) and
    // `<MDC>`, which renders the markdown strings of `about.yml` and the FAQ in `index.yml`.
    v3Composables: true
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ogImage: {
    zeroRuntime: true
  },

  prerender: {
    routes: [
      '/'
    ],
    crawlLinks: true
  }
})
