const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");

/* Get all orders */
router.get("/", (req, res, next) => {
  Order.find((err, orders) => {
    if (err) {
      return next(err);
    }
    res.json(orders);
  });
});

/* Get all orders of a customer*/
router.get("/customer/:customerId", (req, res, next) => {
  const { customerId } = req.params;
  Order.find({ customerID: customerId }, (err, orders) => {
    if (err) {
      return next(err);
    }
    res.json(orders);
  });
});

/* Get order by id */
router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .populate("products.productId")
    .populate("paymentID")
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* Create order */
router.post("/", (req, res, next) => {
  const {
    customerID,
    products,
    totalPrice,
    discount,
    totalPriceAfterDiscount,
    shippingAddress,
    paymentID,
  } = req.body;

  const order = new Order({
    customerID,
    products,
    totalPrice,
    discount,
    totalPriceAfterDiscount,
    shippingAddress,
    paymentID,
  });

  order.save((err, order) => {
    if (err) {
      return next(err);
    }
    res.json(order);
  });
});

/* Update order */
router.put("/:id", (req, res, next) => {
  Order.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, order) => {
      if (err) {
        return next(err);
      }
      res.json(order);
    }
  )
    .populate("products.productId")
    .populate("paymentID");
});

module.exports = router;
