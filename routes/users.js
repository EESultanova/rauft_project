//Здесь вся логика регистрации и авторизации Андрей

const { Router } = require('express');
const User = require('../db/models/User');

const bcrypt = require('bcrypt');

const saltRound = 10;

const checkAdmin = require('../middlewares/checkAdmin');

const checkAuth = require('../middlewares/checkAuth');


const router = Router()

//Ручка для регистрации

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.post('/signup', checkAdmin, async (req, res) => {
  try {
    const { name, email, password, age, education, login } = req.body;
    const pass = await bcrypt.hash(password, saltRound);
    const user = new User ({ name, email, password: pass, age, education, login, role: 0 });
    await user.save();
    return res.redirect ('/')
  } catch (error) {
    return res.render ('signup', {error});
  }
})

//Ручка для авторизации

router.get('/signin', (req, res) => {
  res.render('signin');
})

router.post('/signin', checkAuth, async (req, res) => {
  try {
    const { email } = req.body;
    const searchByEmail = await User.findOne({ email })
    if (searchByEmail.role === 0 || searchByEmail.role === 1) {
      req.session.roleSession = searchByEmail.role;
      req.session.emailSession = searchByEmail.email;
      req.session.idSession = searchByEmail._id;
      return res.redirect ('/club')
    } else {
    return res.render ('signin', { error : "Sorry, you are not approved yet" });
  }
  } catch (error) {
    return res.render ('signin', {error});
  }

})

module.exports = router

