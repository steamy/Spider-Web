const nodeExternals = require('webpack-node-externals')

module.exports = {
  plugins: [{src: '@plugins/element-ui.js', ssr: true}],
  /**
   * router
   */
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: '404',
        path: '*',
        component: resolve(__dirname, 'pages/error_404.vue')
      })
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'spider',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'element-ui'],
    babel: {
      'plugins': [['component', [
        {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk'
        }
      ]]]
    },
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      /**
       * 配置echarts
       */
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            // default value for `whitelist` is
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-echarts/]
          })
        ]
      }

      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [
    // API middleware
    // '~/api/index.js'
  ]
}
