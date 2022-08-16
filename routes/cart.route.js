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
router.patch("/:itemID", (req, res, next) => {
  const { itemID } = req.params;
  const { quantity, totalPrice } = req.body;

  CartItem.findByIdAndUpdate(
    itemID,
    { $set: { quantity, totalPrice } },
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
router.delete("/:itemID", (req, res, next) => {
  const { itemID } = req.params;
  CartItem.findByIdAndDelete(itemID, (err, product) => {
    if (err) {
      return next(err);
    }
    res.json(product);
  });
});

module.exports = router;
