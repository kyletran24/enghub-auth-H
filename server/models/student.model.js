const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  lessons: {
    type: [
      {
        date: String,
        listening: Number,
        reading: Number,
        speaking: Number,
        writing: Number,
      },
    ],
    required: false,
  },
});

const Students = mongoose.model("Students", StudentSchema);

module.exports = Students;
