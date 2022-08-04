const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  addressName: {
    type: String,
    required: true,
  },
  addressLocation: {
    type: String,
    required: true,
  },
  addressCity: {
    type: String,
    required: true,
  },
  setAsDefault: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Address", addressSchema);
