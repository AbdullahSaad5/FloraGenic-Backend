const express = require("express");
const router = express.Router();
const Favorite = require("../models/favorite.model");

/* GET all favorites of a customer*/
router.get("/:customerID", (req, res, next) => {
  const { customerID } = req.params;
  Favorite.find({ userID: customerID })
    .populate("productId")
    .exec((err, favorites) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(favorites);
    });
});

/* Get a favorite by id */
router.get("/:customerID/:productID", (req, res, next) => {
  const { customerID, productID } = req.params;
  Favorite.findOne({ userID: customerID, productID: productID })
    .populate("productId")
    .exec((err, favorite) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(favorite);
    });
});

/* POST a new favorite */
router.post("/:customerID", (req, res, next) => {
  const { customerID } = req.params;
  const { productID } = req.body;

  const newFavorite = new Favorite({
    productID,
    userID: customerID,
  });

  newFavorite.save((err, favorite) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(favorite);
  });
});

/* DELETE a favorite */
router.delete("/:customerID/:productID", (req, res, next) => {
  const { customerID, productID } = req.params;

  Favorite.findOneAndRemove(
    { userID: customerID, productID },
    (err, favorite) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(favorite);
    }
  );
});

module.exports = router;
