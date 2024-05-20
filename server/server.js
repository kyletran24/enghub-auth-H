const express = require("express");
const dotenv = require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const path = require("path");
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

// app.use("/", express.static(path.join(__dirname, "./routes/authRoutes")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.kyletran.me/");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use("/", require("./routes/authRoutes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
