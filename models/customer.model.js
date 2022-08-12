const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
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
    immutable: true,
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

customerSchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: Date.now() } });
  next();
});

module.exports = mongoose.model("Customer", customerSchema);
