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
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dzqbzqgqw/image/upload/v1589788981/default_avatar_qxqzqr.png",
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
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  payments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
});

customerSchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: Date.now() } });
  next();
});

module.exports = mongoose.model("Customer", customerSchema);
