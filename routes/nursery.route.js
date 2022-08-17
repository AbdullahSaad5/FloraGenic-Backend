const express = require("express");
const router = express.Router();
const Nursery = require("../models/nursery.model");

/* Get all nurseries */
router.get("/", (req, res, next) => {
  Nursery.find((err, nurseries) => {
    if (err) {
      return next(err);
    }
    res.json(nurseries);
  });
});

/* Get a specific nursery */
router.get("/:nurseryID", (req, res, next) => {
  const { nurseryID } = req.params;
  Nursery.findById(nurseryID)
    .populate("address")
    .exec((err, nursery) => {
      if (err) {
        return next(err);
      }
      res.json(nursery);
    });
});

/* Find a nursery by name */
router.get("/search/:name", (req, res, next) => {
  const { name } = req.params;
  Nursery.find({ name: { $regex: name, $options: "i" } })
    .populate("address")
    .exec((err, nursery) => {
      if (err) {
        return next(err);
      }
      res.json(nursery);
    });
});

/* Add a new nursery */
router.post("/", (req, res, next) => {
  const {
    name,
    details,
    address,
    openingHours,
    closingHours,
    contactNumber,
    emailAddress,
    images,
  } = req.body;

  const nursery = new Nursery({
    name,
    details,
    address,
    openingHours,
    closingHours,
    contactNumber,
    emailAddress,
    images,
  });

  nursery.save((err, nursery) => {
    if (err) {
      return next(err);
    }
    res.json(nursery);
  });
});

/* Update a nursery */
router.patch("/:nurseryID", (req, res, next) => {
  const { nurseryID } = req.params;
  Nursery.findByIdAndUpdate(
    nurseryID,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, nursery) => {
      if (err) {
        return next(err);
      }
      res.json(nursery);
    }
  );
});

/* Delete a nursery */
router.delete("/:nurseryID", (req, res, next) => {
  const { nurseryID } = req.params;
  Nursery.findByIdAndDelete(nurseryID, (err, nursery) => {
    if (err) {
      return next(err);
    }
    res.json(nursery);
  });
});

module.exports = router;
