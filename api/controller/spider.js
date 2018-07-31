const fetchSpiderStatistics = require('./vendor-log')

class SpiderContoller {
  constructor () {
    this.getStatistics = this.getStatistics.bind(this)
  }
  getStatistics (req, res, next) {
    res.json(fetchSpiderStatistics())
  }
}

module.exports = new SpiderContoller()
