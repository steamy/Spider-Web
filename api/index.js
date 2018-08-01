const express = require('express')
const {Nuxt, Builder} = require('nuxt')

process.env.DEBUG = 'nuxt:*'

// Create express instnace
const app = express()

//web-socket config
var expressWs = require('express-ws')(app)

const subRedis = require('./utils/redis_engine')

/**
 * redis 订阅
 */
let fetchedUserNumUpdate = 'fetched_user_num_update'
subRedis.on('message', function (channel, message) {
  console.log('get_message_from_redis')
  if (channel === fetchedUserNumUpdate) {
    const wss = expressWs.getWss().clients
    wss.forEach(function (ws, index) {
      if (ws.readyState === 1) {
        ws.send(message)
      } else {
        console( String(ws.sessionId) + 'closed')
      }
    })
  }
})
subRedis.subscribe(fetchedUserNumUpdate)

// Require API routes
const users = require('./routes/users')
const router =require('./routes')
// Import API Routes
app.use('/api', users)
router(app)

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

module.exports = expressWs
