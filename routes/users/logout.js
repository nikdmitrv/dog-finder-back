const express = require("express");
const router = express.Router();

router.get("/", async function(req, res) {
  req.session.destroy();
  res.clearCookie("sniffer");
  console.log(req.session);
  console.log(req.cookies);
  res.json({ message: "loggedOut" });
});

module.exports = router;
