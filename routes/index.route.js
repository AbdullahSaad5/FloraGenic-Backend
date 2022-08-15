const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const customerRouter = require("./customer.route");
const adminRouter = require("./admin.route");
const addressRouter = require("./address.route");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.use("/auth", authRouter);
router.use("/customer", customerRouter);
router.use("/admin", adminRouter);
router.use("/address", addressRouter);

module.exports = router;
