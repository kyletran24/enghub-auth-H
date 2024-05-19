const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter a valid student account"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
  },
});

const Admins = mongoose.model("Admins", AdminSchema);

module.exports = Admins;
