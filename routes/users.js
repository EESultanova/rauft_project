//Здесь вся логика регистрации и авторизации Андрей

const router = require("express").Router();
const User = require("../db/models/User");

const bcrypt = require("bcrypt");

const saltRound = 10;

const checkAdmin = require("../middlewares/checkAdmin");

const checkAuth = require("../middlewares/checkAuth");

// const router = Router()

//Ручка для регистрации

router.get('/signup', (req, res) => {
  res.render('signup');
})
router.post('/signup', checkAdmin, async (req, res) => {
  try {
    const { name, email, password, age, education, login } = req.body;
    console.log(req.body)
    const pass = await bcrypt.hash(password, saltRound);
    const user = new User({ name, email, password: pass, age, education, login }); 
    await user.save();
    return res.redirect("/");
  } catch (error) {
    return res.render("signup", { error });
  }
});

//Ручка для авторизации

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", checkAuth, async (req, res) => {
  try {
    
    const { email, password } = req.body;
    if (email && password) {
      const searchByEmail = await User.findOne({ email });
      if (
        searchByEmail &&
        (await bcrypt.compare(password, searchByEmail.password)) &&
        (searchByEmail.role == 0 || searchByEmail.role == 1)
      ) {
        console.log('searchByEmail--->', searchByEmail)
        req.session.roleSession = searchByEmail.role;
        req.session.emailSession = searchByEmail.email;
        req.session.idSession = searchByEmail._id;
        res.locals.email = req.session.emailSession
        console.log('POST sign in---->',req.session);
        return res.redirect("/club");
      }
    } else {
      return res.render("signin", { error: "Sorry, you are not approved yet" });
    }
  } catch (error) {
    return res.render("signin", { error });
  }
});

module.exports = router;
