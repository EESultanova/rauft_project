const { Router } = require('express')
const User = require('../db/models/User')
const adminRouter = Router()

adminRouter.get('/', async (req, res) => {
  const candidates = await User.find({ role: 2 })
  console.log(candidates);
  res.render('admin', { candidates })
})

// adminRouter.patch()

module.exports = adminRouter
