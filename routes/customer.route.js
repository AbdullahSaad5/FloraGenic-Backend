const express = require("express");
const router = express.Router();
const Customer = require("../models/customer.model");
const User = require("../models/user.model");

/* GET all customers with their auth data. */
router.get("/", function (req, res, next) {
  Customer.find()
    .populate("userID", "email")
    .populate("addresses")
    // .populate("payments")
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
    .populate("addresses")
    // .populate("payments")
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
    .populate("addresses")
    // .populate("payments")
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
  User.findById(req.body.userID, (err, user) => {
    if (err) {
      return next(err);
    } else if (!user) {
      return next("User not found");
    } else if (user.userType !== "customer") {
      return next("User is not customer");
    }

    console.log(user);

    const { userID, name, dob, nationality, phoneNumber, gender } = req.body;

    const customer = new Customer({
      userID,
      name,
      dob,
      nationality,
      phoneNumber,
      gender,
      addresses: [],
      payments: [],
    });

    customer.save((err, customer) => {
      if (err) {
        return next(err);
      }
      res.json(customer);
    });
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

    if (!customer) {
      return next("Customer not found");
    }

    User.findByIdAndRemove(customer.userID, (err, user) => {
      if (err) {
        next(err);
      }
      res.json({
        message: "Customer Deleted Successfully",
      });
    });
  });
});

module.exports = router;
