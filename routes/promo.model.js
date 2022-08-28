const express = require("express");
const router = express.Router();

const Promo = require("../models/promo.model");

router.get("/", (req, res, next) => {
  Promo.find({}, (err, promo) => {
    if (err) {
      return next(err);
    }
    res.json(promo);
  });
});

router.post("/", (req, res, next) => {
  const { name, description, discount, startDate, endDate } = req.body;
  const newPromo = new Promo({
    name,
    description,
    discount,
    startDate,
    endDate,
  });
  newPromo
    .save((err, promo) => {
      if (err) {
        return next(err);
      }
      res.json(promo);
    })
    .catch((err) => next(err));
});

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  Promo.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, promo) => {
      if (err) {
        return next(err);
      }
      res.json(promo);
    }
  ).catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Promo.findByIdAndRemove(id, (err, promo) => {
    if (err) {
      return next(err);
    }
    res.json(promo);
  }).catch((err) => next(err));
});

module.exports = router;
