const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  getLessons,
  checkAdmin,
  getAllStudents,
  logoutUser,
} = require("../controllers/authController");

const {
  deleteStudent,
  updateStudent,
  createLesson,
  updateLesson,
} = require("../controllers/adminController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "https://www.kyletran.me",
    methods: ["GET", "POST", "PUT", "DELETE"],
    Headers: true,
    exposedHeaders: "Set-Cookie",
  })
);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/profile", getProfile);
router.get("/checkAdmin", checkAdmin);
router.get("/allStudents", getAllStudents);

router.get("/studentLessons", getLessons);
router.delete("/deleteStudent", deleteStudent);
router.put("/updateStudent", updateStudent);
router.put("/updateLesson", updateLesson);
router.post("/createLesson", createLesson);

module.exports = router;
