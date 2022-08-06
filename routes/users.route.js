var express = require("express");
const passport = require("passport");
const User = require("../models/user.model");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", function (req, res, next) {
  const { email, password } = req.body;
  const user = new User({ email, password, bannedStatus: false });
  user.save((err, user) => {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  function (req, res, next) {
    try {
      res.json(req.user);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
