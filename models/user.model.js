const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  bannedStatus: {
    type: Boolean,
    default: false,
  },
});
// User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
