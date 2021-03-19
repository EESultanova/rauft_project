const User = require("../db/models/User");
const checkIsAdmin = async (req, res, next) => {
  const userId = req.session.idSession

  if (userId) {
    const currentUser = await User.findById(userId);
    req.roleSession = currentUser.role;

    if (req.roleSession  == 0) {
      return next();
    }
    return;
  }
  return res.redirect("/");
};

module.exports = checkIsAdmin;
