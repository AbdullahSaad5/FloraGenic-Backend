const express = require("express");
const router = express.Router();
const Customer = require("../models/customer.model");

/* GET all customers with their auth data. */
router.get("/", function (req, res, next) {
  Customer.find()
    .populate("userID", "email userType")
    .exec(function (err, customers) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(customers);
    });
});

// Get specific customer by ID
router.get("/:id", function (req, res, next) {
  Customer.findById(req.params.id)
    .populate("userID", "email")
    .exec(function (err, customer) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(customer);
    });
});

// Search for customer by name
router.get("/search/:name", function (req, res, next) {
  Customer.find({ name: { $regex: req.params.name, $options: "i" } })
    .populate("userID", "email")
    .exec(function (err, customers) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(customers);
    });
});

// Add new customer
router.post("/", (req, res, next) => {
  const customer = new Customer({
    userID: req.body.userID,
    name: req.body.name,
    dob: req.body.dob,
    nationality: req.body.nationality,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    addresses: [],
    payments: [],
  });

  customer.save((err, customer) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(customer);
  });
});

// Update specific customer
router.patch("/:id", (req, res, next) => {
  Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, customer) => {
      if (err) {
        return next(err);
      }
      res.json(customer);
    }
  );
});

// Delete specific customer
router.delete("/:id", (req, res, next) => {
  Customer.findByIdAndRemove(req.params.id, (err, customer) => {
    if (err) {
      return next(err);
    }
    res.json(customer);
  });
});

module.exports = router;
