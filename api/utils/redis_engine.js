const redis = require('redis')

let r = redis.createClient('6379', '120.77.242.48')


module.exports = r
