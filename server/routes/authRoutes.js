const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  getLessons,
  checkRole,
} = require("../controllers/authController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "https://enghub2.onrender.com",
  })
);

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.get("/studentLessons", getLessons);
router.get("/checkRole", checkRole);

module.exports = router;
