var express = require("express");
var router = express.Router();
const authRouter = require("./auth.route");
const usersRouter = require("./users.route");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;
