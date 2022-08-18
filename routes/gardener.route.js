const express = require("express");
const router = express.Router();
const Gardener = require("../models/gardener.model");

/* Get all gardeners */
router.get("/", (req, res, next) => {
  Gardener.find((err, gardeners) => {
    if (err) {
      return next(err);
    }
    res.json(gardeners);
  });
});

/* Get a gardener */
router.get("/:gardenerID", (req, res, next) => {
  const { gardenerID } = req.params;
  Gardener.findById(gardenerID)
    .populate("servicesx")
    .populate("userID")
    .exec((err, gardener) => {
      if (err) {
        return next(err);
      }
      res.json(gardener);
    });
});

/* Search a gardener */
router.get("/search/:name", (req, res, next) => {
  const { name } = req.params;
  Gardener.find({ name: { $regex: name, $options: "i" } }, (err, gardeners) => {
    if (err) {
      return next(err);
    }
    res.json(gardeners);
  });
});

/* Add a new gardener */
router.post("/", (req, res, next) => {
  const { userID, name, phone, CNIC, image, services } = req.body;
  const gardener = new Gardener({
    userID,
    name,
    phone,
    CNIC,
    image,
    services,
  });

  gardener.save((err, gardener) => {
    if (err) {
      return next(err);
    }
    res.json(gardener);
  });
});

/* Update a gardener */
router.patch("/:gardenerID", (req, res, next) => {
  const { gardenerID } = req.params;
  Gardener.findByIdAndUpdate(
    gardenerID,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, gardener) => {
      if (err) {
        return next(err);
      }
      res.json(gardener);
    }
  );
});

/* Delete a gardener*/
router.delete("/:gardenerID", (req, res, next) => {
  const { gardenerID } = req.params;
  Gardener.findByIdAndDelete(gardenerID, (err, gardener) => {
    if (err) {
      return next(err);
    }
    res.json(gardener);
  });
});

module.exports = router;
