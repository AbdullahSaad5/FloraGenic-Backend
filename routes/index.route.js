const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const customerRouter = require("./customer.route");
const adminRouter = require("./admin.route");
const addressRouter = require("./address.route");
const productRouter = require("./product.route");
const cartRouter = require("./cart.route");
const nurseryRouter = require("./nursery.route");
const tagRouter = require("./tag.route");
const skillRouter = require("./skill.route");
const gardenerRouter = require("./gardener.route");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.use("/auth", authRouter);
router.use("/customer", customerRouter);
router.use("/admin", adminRouter);
router.use("/address", addressRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/nurseries", nurseryRouter);
router.use("/tags", tagRouter);
router.use("/skills", skillRouter);
router.use("/gardeners", gardenerRouter);

module.exports = router;
