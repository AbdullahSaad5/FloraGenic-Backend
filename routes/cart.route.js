const express = require("express");
const router = express.Router();
const CartItem = require("../models/cart.model");

/* Get all products in a cart of a user */
router.get("/:customerID", (req, res, next) => {
  CartItem.find({ userID: req.params.customerID }).exec((err, products) => {
    if (err) {
      return next(err);
    }
    res.json(products);
  });
});

/* Add a product to user's cart */
router.post("/:customerID", (req, res, next) => {
  const { productID, quantity, totalPrice } = req.body;
  const { customerID } = req.params;

  const cartItem = new CartItem({
    productID,
    userID: customerID,
    quantity,
    totalPrice,
  });

  cartItem.save((err, cartItem) => {
    if (err) {
      return next(err);
    }
    res.json(cartItem);
  });
});

/* Update product count in a cart */
router.patch("/:customerID/:productID", (req, res, next) => {
  const { customerID, productID } = req.params;

  CartItem.findOneAndUpdate(
    { userID: customerID, productID: productID },
    { $set: { quantity: req.body.quantity, totalPrice: req.body.totalPrice } },
    { new: true },
    (err, cartItem) => {
      if (err) {
        return next(err);
      }
      res.json(cartItem);
    }
  );
});

/* Remove a product from a cart */
router.delete("/:customerID/:productID", (req, res, next) => {
  const { customerID, productID } = req.params;
  CartItem.findOneAndDelete({
    userID: customerID,
    productID,
  }).exec((err, product) => {
    if (err) {
      return next(err);
    }
    res.json(product);
  });
});

module.exports = router;
