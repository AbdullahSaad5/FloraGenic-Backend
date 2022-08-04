const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  addresses: [
    {
      addressID: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },
    },
  ],
  payments: [
    {
      paymentID: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Vendor", vendorSchema);
