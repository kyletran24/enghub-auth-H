const Students = require("../models/student.model");
const Admins = require("../models/admin.model");

const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// Register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    if (!password || password.length < 8) {
      return res.json({
        error: "password should be at least 8 characters",
      });
    }

    const exist = await Students.findOne({ email: email });

    if (exist) {
      return res.json({
        error: "email is taken already",
      });
    }

    // Hashing password
    const hashedPassword = await hashPassword(password);

    // Sample lesson array
    lessons = [
      {
        date: "1/1/2024",
        listening: 2,
        reading: 4,
        speaking: 6,
        writing: 8,
      },
      {
        date: "2/2/2024",
        listening: 3,
        reading: 6,
        speaking: 7,
        writing: 2,
      },
      {
        date: "3/3/2024",
        listening: 6,
        reading: 2,
        speaking: 3,
        writing: 4,
      },
    ];

    // Create user
    const student = await Students.create({
      name,
      email,
      password: hashedPassword,
      lessons,
      role: "student",
    });

    return res.json(student);
  } catch (error) {
    console.log(error);
  }
};

// Login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin
    const admin = await Admins.findOne({ email: email });

    if (admin) {
      // Check if password match
      const match = await comparePassword(password, admin.password);

      console.log(match);

      if (match) {
        jwt.sign(
          {
            email: admin.email,
            id: admin._id,
          },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;

            res.cookie("token", token).json(admin);
          }
        );
      } else {
        res.json({
          error: "password do not match",
        });
      }
    } else {
      // Check if user exists
      const student = await Students.findOne({ email: email });

      if (!student) {
        return res.json({
          error: "no user found",
        });
      }
      // Check if password match

      const match = await comparePassword(password, student.password);

      if (match) {
        jwt.sign(
          {
            email: student.email,
            id: student._id,
            name: student.name,
            lessons: student.lessons,
          },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;

            res
              .cookie("token", token, {
                secure: true,
                sameSite: "none",
                domain: "https://www.kyletran.me",
              })
              .json(student);
          }
        );
      } else {
        res.json({
          error: "password do not match",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  const options = {
    expires: new Date(Date.now() + 1000),
  };
  res.cookie("token", "token", options);
  res.status(200).json({
    status: "success",
    secure: true,
    httpOnly: true,
  });
};

const getProfile = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, student) => {
      if (err) throw err;

      res.json(student);
    });
  } else {
    res.json(undefined);
  }
};

const getLessons = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, student) => {
      if (err) throw err;

      res.json(student.lessons);
    });
  } else {
    res.json(undefined);
  }
};

const checkAdmin = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const dbUser = await Admins.findOne({ email: user.email });

      if (dbUser) {
        res.json(dbUser);
      } else {
        res.json({
          error: "not authorized",
        });
      }
    });
  } else {
    res.json({
      error: "missing token",
    });
  }
};

const getAllStudents = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const email = user.email;

      const dbUser = await Admins.findOne({ email: user.email });

      if (dbUser) {
        const allStudents = await Students.find({});

        res.json(allStudents);
      } else {
        res.json({
          error: "Not authorized!",
        });
      }
    });
  } else {
    res.json({
      error: "missing token",
    });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  getLessons,
  checkAdmin,
  getAllStudents,
  logoutUser,
};
