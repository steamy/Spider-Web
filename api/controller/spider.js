const fetchSpiderStatistics = require('./vendor-log')
const redis = require('redis')
const Promise = require('bluebird')
Promise.promisifyAll(redis.Multi.prototype)
const User = require('../utils/douban_user')

class SpiderContoller {
  constructor () {
    this.getStatistics = this.getStatistics.bind(this)
    this.getinitData = this.getinitData.bind(this)
    this.getPreview = this.getPreview.bind(this)
    this.updateRefreshInterval = this.updateRefreshInterval.bind(this)
  }
  async updateRefreshInterval (req, res, next) {
    console.log(req.body)
    let interval = req.body.refresh_interval
    let resJson = await this.updateIntervalInRedis(parseInt(interval))
    res.json(resJson)
  }

  getStatistics (req, res, next) {
    res.json(fetchSpiderStatistics())
  }

  getPreview (req, res, next) {
    res.json()
  }

  async getinitData (req, res, next) {
    let data = {
      preview: {},
      users: []
    }
    let preview = await this.getPreviewFromReids()
    if (preview) {
      data.preview = preview
    }
    data.users = await this.getLastFetchData()
    res.json(data)
  }

  async getPreviewFromReids () {
    let r = redis.createClient('6379', '120.77.242.48')
    let res = await r.multi().scard('userid_wanted').scard('userid_used').hlen('useful_proxy').get('spider_monitor_refresh_time').execAsync()
    let data = {
      'userid_wanted_num': res[0],
      'userid_used_num': res[1],
      'useful_proxy_num': res[2],
      'refresh_interval': res[3]
    }
    r.quit()
    return data
  }
  async getLastFetchData () {
    var users = []
    try {
      let queryObj = await User.findAll({
        attributes: ['user_nickname', 'location', 'check_in_time', 'signature'],
        order: [ ['id', 'DESC'] ],
        limit: 3
      })
      users = queryObj
      if (typeof (users) === 'undefined') {
        return []
      }
      return users
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async updateIntervalInRedis (interval) {
    let r = redis.createClient('6379', '120.77.242.48')
    let res = await r.multi().set('spider_monitor_refresh_time', interval).execAsync()
    let json = {}
    if (res[0] !== 'OK') {
      json = {
        'code': 500,
        'message': res[0]
      }
    } else {
      json = {
        'code': 200,
        'message': 'success'
      }
    }
    return json
  }
/**
 * class ------ end***/
}

module.exports = new SpiderContoller()
