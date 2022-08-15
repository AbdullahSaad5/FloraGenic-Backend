const express = require("express");
const router = express.Router();
const Address = require("../models/address.model");
const Customer = require("../models/customer.model");

// Add new address
router.post("/:customerID", (req, res, next) => {
  Customer.findById(req.params.customerID, (err, customer) => {
    if (err) {
      return next(err);
    } else if (!customer) {
      return next("Customer not found");
    }

    const totalAddresses = customer.addresses.length;

    const address = new Address({
      name: req.body.name,
      location: req.body.location,
      city: req.body.city,
      setAsDefault: totalAddresses === 0 ? true : req.body.setAsDefault,
    });

    address.save((err, address) => {
      if (err) {
        return next(err);
      }

      // Add address to customer
      Customer.findByIdAndUpdate(
        req.params.customerID,
        { $push: { addresses: address._id } },
        { new: true },
        (err, customer) => {
          if (err) {
            return next(err);
          }
          res.json(customer);
        }
      );
    });
  });
});

// Update specific address
router.patch("/:addressID", (req, res, next) => {
  Address.findByIdAndUpdate(
    req.params.addressID,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, address) => {
      if (err) {
        return next(err);
      }
      res.json(address);
    }
  );
});

// Delete specific address
router.delete("/:customerID/:addressID", (req, res, next) => {
  Customer.findById(req.params.customerID, (err, customer) => {
    if (err) {
      return next(err);
    } else if (!customer) {
      return next("Customer not found");
    }

    // Remove address from customer
    Customer.findByIdAndUpdate(
      req.params.customerID,
      { $pull: { addresses: req.params.addressID } },
      { new: true },
      (err, customer) => {
        if (err) {
          return next(err);
        }
        res.json(customer);
      }
    );

    // Remove address
    Address.findByIdAndRemove(req.params.addressID, (err, address) => {
      if (err) {
        return next(err);
      }
    });
  });
});

module.exports = router;
