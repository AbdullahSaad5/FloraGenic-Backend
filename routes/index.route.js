var express = require("express");
var router = express.Router();
const verifyJWT = require("../middleware/jwt-verify.mw");

/* GET home page. */
router.get("/", verifyJWT, function (req, res, next) {
  res.json({ message: "Hello World" });
});

module.exports = router;
