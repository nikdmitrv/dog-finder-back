const express = require("express");
const router = express.Router();

const User = require("../../models/schemas/UserSchema");

router.get("/", async function(req, res) {
  if (req.session && req.session.logged) {
    const currentUser = await User.findOne({
      email: req.session.name
    });
    res.json({ currentUser });
  } else {
    console.log("session expired");

    res.clearCookie("sniffer");
    res.status(400).send("session expired");
  }
});

module.exports = router;
