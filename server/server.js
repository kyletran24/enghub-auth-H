const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection failed...", err);
  });

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));

// app.get("/api/getAllStudents", async (req, res) => {
//   try {
//     const students = await Students.find({});
//     console.log(students);
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/api/getStudent", async (req, res) => {
//   try {
//     const student = await Students.findOne({ stuAcc: req.body.studentAcc });
//     if (student) {
//       res.status(200).json(student);
//     } else {
//       res.status(401).send("User not found");
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/api/getAdmin", async (req, res) => {
//   try {
//     const admin = await Admins.findOne({ adminAcc: req.body.adminAcc });
//     if (admin) {
//       res.status(200).json(admin);
//     } else {
//       res.status(401).send("Admin not found");
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
