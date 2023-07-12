export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nbr-nuxt-2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    'portal-vue/nuxt',

  ],

  i18n: {
    locales: [
      {
        code: 'ka',
        iso: 'ka',
        name: 'Georgian',
        file: 'ka.js',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.js',
      },
    ],
    defaultLocale: 'ka',
    langDir: 'lang/',
    lazy: true,
    detectBrowserLanguage: false,
  },

  styleResources: {
    scss: [
      './assets/scss/_variables.scss',
      './assets/scss/_functions.scss',
      './assets/scss/_mixins.scss',
      './assets/scss/_bs-resources.scss',
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }



}
