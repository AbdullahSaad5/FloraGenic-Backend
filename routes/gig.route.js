const express = require("express");
const router = express.Router();
const Gig = require("../models/gig.model");

/* GET all gigs */
router.get("/", (req, res, next) => {
  Gig.find({})
    .populate("sellerID")
    .exec((err, gigs) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(gigs);
    });
});

/* GET a gig by id */
router.get("/:gigID", (req, res, next) => {
  const { gigID } = req.params;
  Gig.findById(gigID)
    .populate("sellerID")
    .exec((err, gig) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(gig);
    });
});

/* Update a gig */
router.patch("/:gigID", (req, res, next) => {
  const { gigID } = req.params;
  Gig.findByIdAndUpdate(
    gigID,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, gig) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(gig);
    }
  );
});

/* POST a new gig */
router.post("/", (req, res, next) => {
  const { sellerID, name, description, type, images, packages } = req.body;
  const newGig = new Gig({
    sellerID,
    name,
    description,
    type,
    images,
    packages,
  });
  newGig.save((err, gig) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(gig);
  });
});

/* DELETE a gig */
router.delete("/:gigID", (req, res, next) => {
  const { gigID } = req.params;
  Gig.findByIdAndRemove(gigID, (err, gig) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(gig);
  });
});
