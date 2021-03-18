//Здесь будет вся логика регистрации и авторизации Андрей

const { Router, User } = require('express');

// const {
//   userSignupRender, userSignup, userSigninRender, userSignin, userSignout,
// } = require('..')

// const userRouter = Router()
// userRouter.route('/signup')
//   .get(userSignupRender)
//   .post(userSignup)
// userRouter.route('/signin')
//   .get(userSigninRender)
//  .post(userSignin) 
// userRouter.route('/signout')
//   .get(userSignout)

const router = Router()

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.post('/signup', (req, res) => {
  try {
    const { name, email, password, age, education } = req.body;
    if (email === 'admin@admin.com') {
      const admin = new User
    }


  } catch (error)

})

module.exports = userRouter
