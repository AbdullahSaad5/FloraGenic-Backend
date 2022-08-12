const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

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
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          bannedStatus: req.user.bannedStatus,
        },
        "secret"
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Authorization", "Bearer " + token);
      res.json({
        message: "You are logged in",
        user_details: req.user,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
