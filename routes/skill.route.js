const express = require("express");
const router = express.Router();
const Skill = require("../models/skill.model");

/* Get all skills */
router.get("/", (req, res, next) => {
  Skill.find((err, skills) => {
    if (err) {
      return next(err);
    }
    res.json(skills);
  });
});

/* Search a skill */
router.get("/search/:name", (req, res, next) => {
  const { name } = req.params;
  Skill.find({ name: { $regex: name, $options: "i" } }, (err, skills) => {
    if (err) {
      return next(err);
    }
    res.json(skills);
  });
});

/* Add a new skill */
router.post("/", (req, res, next) => {
  const { name, description, experienceLevel } = req.body;

  const skill = new Skill({
    name,
    description,
    experienceLevel,
  });

  skill.save((err, skill) => {
    if (err) {
      return next(err);
    }
    res.json(skill);
  });
});

/* Update a skill */
router.patch("/:skillID", (req, res, next) => {
  const { skillID } = req.params;
  Skill.findByIdAndUpdate(
    skillID,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, skill) => {
      if (err) {
        return next(err);
      }
      res.json(skill);
    }
  );
});

/* Delete a skill */
router.delete("/:skillID", (req, res, next) => {
  const { skillID } = req.params;
  Skill.findByIdAndDelete(skillID, (err, skill) => {
    if (err) {
      return next(err);
    }
    res.json(skill);
  });
});

module.exports = router;
