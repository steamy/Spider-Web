const v1 = require('./v1')
const ws = require('./ws')

module.exports = (app) => {
  app.use('/api/v1', v1)
  app.use('/ws', ws)
}
