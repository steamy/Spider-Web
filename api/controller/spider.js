const fetchSpiderStatistics = require('./vendor-log')
const redis = require('redis')
const Promise = require('bluebird')
Promise.promisifyAll(redis.Multi.prototype)

class SpiderContoller {
  constructor () {
    this.getStatistics = this.getStatistics.bind(this)
    this.getinitData = this.getinitData.bind(this)
    this.getPreview = this.getPreview.bind(this)
  }

  getStatistics (req, res, next) {
    res.json(fetchSpiderStatistics())
  }

  getPreview (req, res, next) {
    res.json()
  }

  async getinitData (req, res, next) {
    let data = {
      preview: {}
    }
    let preview = false
    preview = await this.getPreviewFromReids()
    console.log(preview)
    if (preview) {
      data.preview = preview
    }
    res.json(data)
  }

  async getPreviewFromReids () {
    let r = redis.createClient('6379', '120.77.242.48')
    let res = await r.multi().scard('userid_wanted').scard('userid_used').hlen('useful_proxy').execAsync()
    let data = {
      'userid_wanted_num': res[0],
      'userid_used_num': res[1],
      'useful_proxy_num': res[2]
    }
    return data
  }
/**
 * class ------ end***/
}

module.exports = new SpiderContoller()
