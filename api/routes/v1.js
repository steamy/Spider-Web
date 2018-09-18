const {Router} = require('express')

const router = Router()

/**
 * spider
 */
const SpiderContoller = require('../controller/spider')
router.get('/admin/spider/statistics', SpiderContoller.getStatistics)
router.get('/admin/spider/', SpiderContoller.getinitData)
router.post('/admin/spider/interval_time', SpiderContoller.updateRefreshInterval)

module.exports = router
