export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/icons/favicon.ico' }
    ]
  },

  // Force HTTPS
  serverMiddleware: ['redirect-ssl'],

  // NuxtJS disable loading indication between pages

  loading: false,

  /*
   ** Nuxt.js modules
   */

  modules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources', 'nuxt-svg'],
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

  plugins: ['./plugins/settings.js'],

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
    base: '/'
  },

  /*
   ** You can extend webpack config here
   */

  extend(config, ctx) {}
};
