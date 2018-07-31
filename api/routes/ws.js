/**
 * web-socket
 */

const {Router} = require('express')
const router = Router()


router.ws('/admin', function (ws, req) {
  ws.on('message', function (msg) {
    console.log(msg)
    ws.send('ok')
  })
  ws.on('close', function () {
    console.log('close')
  })
})

module.exports = router