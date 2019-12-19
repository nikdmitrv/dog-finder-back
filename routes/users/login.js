const express = require("express");
const router = express.Router();

const User = require("../../models/schemas/UserSchema");

router.post("/", async function(req, res) {
  let emailInput = req.body.email;
  let passwordInput = req.body.password;
  const currentUser = await User.findOne({
    email: emailInput
  });
  if (currentUser && passwordInput === currentUser.password) {
    req.session.logged = true;
    req.session.name = req.body.email;
    res.json({ currentUser });
  } else {
    res.status(400).json({ message: "Неверный email или пароль" });
  }
});

module.exports = router;
