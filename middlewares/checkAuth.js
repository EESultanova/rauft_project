// Делает Андрей

const User = require('../db/models/User');

const bcrypt = require('bcrypt');


const checkAuth = async (req, res, next) => {
  const { email, password } = req.body;
  const searchByEmail = await User.findOne({ email })
    if(searchByEmail === false) {
      return res.render('signin', { error: 'Your email is not correct'})
    } else {
      if (!(await bcrypt.compare(password, searchByEmail?.password))) {
      return res.render('signin', { error: 'Your password is not correct'})
      } else {
         return next()
      }
    }
  }

module.exports = checkAuth
