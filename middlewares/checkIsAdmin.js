const User = require("../db/models/User");
const checkIsAdmin = async (req, res, next) => {
  const userId = req.session?.user?.id;

  if (userId) {
    const currentUser = await User.findById(userId);
    req.userRole = currentUser.role;

    if (req.role === 0) {
      return next();
    }
    return;
  }
  return res.redirect("/");
};

module.exports = checkIsAdmin;
