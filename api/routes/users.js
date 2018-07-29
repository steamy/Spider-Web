const { Router } = require('express')
const User = require('../utils/douban_user')

const router = Router()

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', async function (req, res, next) {
  // console.log('test11')
  const id = parseInt(req.params.id)
  if (id >= 14) {
    try {
      let user = await User.findById(id)
      if (user) {
        res.json(user.dataValues)
      } else {
        res.sendStatus(404)
      }
    } catch (e) {
      res.sendStatus(404)
    }
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
