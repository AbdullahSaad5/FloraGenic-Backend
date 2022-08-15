const express = require("express");
const router = express.Router();
const Admin = require("../models/admin.model");
const User = require("../models/user.model");

/* GET all admins with their auth data. */
router.get("/", function (req, res, next) {
  Admin.find()
    .populate("userID", "email")
    .exec(function (err, admins) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(admins);
    });
});

// Get specific admin by ID
router.get("/:id", function (req, res, next) {
  Admin.findById(req.params.id)
    .populate("userID", "email")
    .exec(function (err, admin) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(admin);
    });
});

// Search for admin by name
router.get("/search/:name", function (req, res, next) {
  Admin.find({ name: { $regex: req.params.name, $options: "i" } })
    .populate("userID", "email")
    .exec(function (err, admins) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(admins);
    });
});

// Add new admin
router.post("/", (req, res, next) => {
  User.findById(req.body.userID, function (err, user) {
    // Checking if user exists and is admin
    if (err) {
      console.log(err);
      return next(err);
    } else if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else if (user.userType !== "admin") {
      return res.status(403).json({
        message: "User is not an admin",
      });
    }

    const admin = new Admin({
      userID: req.body.userID,
      name: req.body.name,
      phone: req.body.phone,
      CNIC: req.body.CNIC,
    });

    admin.save((err, admin) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(admin);
    });
  });
});

// Update admin
router.patch("/:id", (req, res, next) => {
  Admin.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, admin) => {
      if (err) {
        return next(err);
      }
      if (!admin) {
        return next("Admin not found");
      }
      res.json(admin);
    }
  );
});

// Delete admin
router.delete("/:id", (req, res, next) => {
  Admin.findByIdAndRemove(req.params.id, (err, admin) => {
    if (err) {
      return next(err);
    }
    if (!admin) {
      return next("Admin not found");
    }
    User.findByIdAndRemove(admin.userID, (err, user) => {
      if (err) {
        return next(err);
      }
      res.json({
        message: "Admin deleted successfully",
      });
    });
  });
});

module.exports = router;
