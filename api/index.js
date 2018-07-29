const express = require('express')
const {Nuxt, Builder} =  require('nuxt')

process.env.DEBUG = 'nuxt:*'

// Create express instnace
const app = express()

// Require API routes
const users = require('./routes/users')

// Import API Routes
app.use('/api', users)
// console.log('test')

// render
// We instantiate nuxt.js with the options
const isProd = (process.env.NODE_ENV === 'production')
const config = require('../nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with Nuxt.js
app.use(nuxt.render)

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build()
    .then(listen)
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
else {
  listen()
}

function listen () {
  // Listen the server
  app.listen('3000', '0.0.0.0')
  console.log('Server listening on http://localhost:3000 .')
}
