const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gardenerSchema = new Schema({
  email: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  CNIC: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
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
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Gardener", gardenerSchema);
