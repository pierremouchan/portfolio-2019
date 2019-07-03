export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Pierre Mouchan | Creative developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Portfolio - Pierre Mouchan, a passionate creative developer.'
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'Pierre Mouchan - Portfolio'
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'noindex,nofollow'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: '/ogimage.jpg'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  pageTransition: {},

  // MANIFEST OPTIONS
  manifest: {
    name: 'Pierre Mouchan | Portfolio',
    short_name: 'Pierre Mouchan | Portfolio',
    description: 'Portfolio - Pierre Mouchan, a passionate creative developer.',
    lang: 'en',
    orientation: 'natural'
  },
  // META FOR PWA SUPPORT (COMES UP WITH LOT OF META TAGS)
  // options : https://pwa.nuxtjs.org/modules/meta.html#options
  meta: {
    // Most of these settings defines OG tags
    author: 'Pierre Mouchan',
    name: 'Pierre Mouchan | Creative developer',
    theme_color: '#F25D61',
    description: 'Portfolio - Pierre Mouchan, a passionate creative developer.',
    lang: 'en'
  },

  // DYNAMIC ROUTE TO GENERATE
  generate: {
    routes: [
      '/projects/design3d',
      '/projects/fsif',
      '/projects/portfolios',
      '/projects/socialforgood'
    ]
  },

  // NuxtJS disable loading indication between pages

  loading: false,

  /*
   ** Nuxt.js modules
   */

  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    'nuxt-svg',
    '@nuxtjs/pwa'
  ],
  // StyleRessource is used to have global variables and mixins over all .vue files
  // Don't put styles inside, use the option css:[] instead
  styleResources: {
    scss: [
      './assets/scss/_config/_variables.scss',
      './assets/scss/_plugins/_mq.scss',
      './assets/scss/_config/_fonts-mixins.scss',
      './assets/scss/_config/_mixins.scss'
    ]
  },

  /*
   ** Global CSS
   */

  // css:[] is used to have global styles all over .vue files
  // Don't put variables inside, use the option styleRessources instead
  css: [
    './assets/scss/_config/_base.scss',
    './assets/scss/_config/_vue_overrides.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */

  plugins: ['./plugins/settings.js', './plugins/preloadImg.js'],

  /*
   ** Build configuration
   */

  build: {},

  env: {
    // Global environment VAR, access it using process.env.yourVariable
    example: 'example'
  },

  // Where you app will be served under ??
  // like http://yourdomain.com/app/ or http://yourdomain.com/stuff for example
  // Set this path there

  router: {
    // YOU HAVE TO SET IT IN THE PATH TO FAVICON
    base: '/'
    // MIDDLEWARE CALL AFTER EACH ROUTES CHANGES
    // middleware: 'routesHandler'
  },

  /*
   ** You can extend webpack config here
   */

  extend(config, { isDev, isClient }) {}
};
