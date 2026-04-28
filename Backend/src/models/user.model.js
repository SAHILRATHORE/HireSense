const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already taken"],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Account is already with this email address"],
    required: true,
  },
  password: {
    type: String,
    unique: [true, "Account is already with this email address"],
    required: true,
  }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema)

module.exports = userModel