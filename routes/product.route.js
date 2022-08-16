const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

/* GET all products. */
router.get("/", (req, res, next) => {
  Product.find().exec((err, products) => {
    if (err) {
      return next(err);
    }
    res.json(products);
  });
});

/* Get a specific product */
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id)
    // .populate("reviews")
    // .populate("tags")
    .exec((err, product) => {
      if (err) {
        return next(err);
      }
      res.json(product);
    });
});

/* Search a specific product */
router.get("/search/:name", (req, res, next) => {
  Product.find({ name: { $regex: req.params.name, $options: "i" } }).exec(
    (err, product) => {
      if (err) {
        return next(err);
      }
      res.json(product);
    }
  );
});

/* Add a new product */
router.post("/", (req, res, next) => {
  // TODO: Verify Nursery ID before adding the product
  const { nurseryID, name, price, description, category, stock, image } =
    req.body;

  const product = new Product({
    nurseryID,
    name,
    price,
    description,
    category,
    stock,
    image,
    reviews: [],
    tags: req.body.tags ? req.body.tags : [],
  });

  product.save((err, product) => {
    if (err) {
      return next(err);
    }
    res.json(product);
  });
});

/* Update a specific product */
router.patch("/:id", (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      $new: true,
    },
    (err, product) => {
      if (err) {
        return next(err);
      }
      res.json(product);
    }
  );
});

/* Delete a specific product */
router.delete("/:id", (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    if (err) {
      return next(err);
    }
    res.json(product);
  });
});

module.exports = router;
