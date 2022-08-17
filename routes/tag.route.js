const express = require("express");
const router = express.Router();
const Tag = require("../models/tag.model");

/* Get all tags */
router.get("/", (req, res, next) => {
  Tag.find((err, tags) => {
    if (err) {
      return next(err);
    }
    res.json(tags);
  });
});

/* Search a tag */
router.get("/search/:name", (req, res, next) => {
  const { name } = req.params;
  Tag.find({ name: { $regex: name, $options: "i" } }, (err, tags) => {
    if (err) {
      return next(err);
    }
    res.json(tags);
  });
});

/* Add a new tag */
router.post("/", (req, res, next) => {
  const { name } = req.body;

  const tag = new Tag({
    name,
  });

  tag.save((err, tag) => {
    if (err) {
      return next(err);
    }
    res.json(tag);
  });
});

/* Update a tag */
router.patch("/:tagID", (req, res, next) => {
  const { tagID } = req.params;
  Tag.findByIdAndUpdate(
    tagID,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, tag) => {
      if (err) {
        return next(err);
      }
      res.json(tag);
    }
  );
});

/* Delete a tag */
router.delete("/:tagID", (req, res, next) => {
  const { tagID } = req.params;
  Tag.findByIdAndDelete(tagID, (err, tag) => {
    if (err) {
      return next(err);
    }
    res.json(tag);
  });
});

module.exports = router;
