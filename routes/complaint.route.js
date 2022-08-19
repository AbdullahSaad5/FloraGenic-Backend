const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint.model");

/* GET all complaints*/
router.get("/", function (req, res, next) {
  Complaint.find({}, function (err, complaints) {
    if (err) {
      return next(err);
    }
    res.json(complaints);
  }).populate("userId");
});

/* GET complaint by id */
router.get("/:complaintID", function (req, res, next) {
  const { complaintID } = req.params;
  Complaint.findById(complaintID)
    .populate("userId")
    .exec(function (err, complaint) {
      if (err) {
        return next(err);
      }
      res.json(complaint);
    });
});

/* POST a complaint */
router.post("/", function (req, res, next) {
  const { userId, type, title, description } = req.body;
  const complaint = new Complaint({
    userId,
    type,
    title,
    description,
  });
  complaint.save(function (err, complaint) {
    if (err) {
      return next(err);
    }
    res.json(complaint);
  });
});

/* Delete a complaint */
router.delete("/complaintID", (req, res, next) => {
  const { complaintID } = req.params;
  Complaint.findByIdAndDelete(complaintID, (err, complaint) => {
    if (err) {
      return next(err);
    }
    res.json(complaint);
  });
});

module.exports = router;
