const User = require("../db/models/User");
const { Router } = require("express");
const checkIsAdmin = require("../middlewares/checkIsAdmin");
const adminRouter = Router();

//Добавить checkAdmin
adminRouter.get("/", checkIsAdmin, async (req, res) => {
  let candidates = await User.aggregate([
    { $match: { role: 2 } },
    {
      $project: {
        date_of_birth: {
          $dateToString: { format: "%d-%m-%Y", date: "$date_of_birth" },
        },
        name: 1,
        age: 1,
        education: 1,
        industry: 1,
        hobby: 1,
      },
    },
  ]);
  res.render("admin", { candidates });
});

adminRouter.patch("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    user.role = 1;
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

adminRouter.delete("/", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = adminRouter;

//.toLocaleString('ru-RU', {year: 'numeric', month: "2-digit", day:"2-digit"})
