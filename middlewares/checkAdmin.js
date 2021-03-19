// Делает Эля, но на всякий случай сделаем, так как был незабываемый творческий порыв


 const User = require('../db/models/User')

 const bcrypt = require('bcrypt')

const saltRound = 10

 const checkAdmin = async (req, res, next) => {
   const { name, email, password, age, education, login } = req.body;
    if(email === 'admin@admin.com') {
      const pass = await bcrypt.hash(password, saltRound);
      const admin = new User ({ name, email, password: pass, age, education, login, role: 0 });
      await admin.save();
      return res.redirect ('/')
    } else {
      return next()
    }
 }

module.exports = checkAdmin



 