const Students = require("../models/student.model");
const Admins = require("../models/admin.model");
const jwt = require("jsonwebtoken");

const deleteStudent = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const email = user.email;

      const dbUser = await Admins.findOne({ email });

      if (dbUser) {
        try {
          const { email } = req.body;

          if (!email) {
            return res.json({
              error: "Student email is required",
            });
          }

          const student = await Students.findOneAndDelete({ email });

          return res.json(student);
        } catch (error) {
          console.log(error);
        }
      } else {
        res.json({
          error: "Admin not authorized!",
        });
      }
    });
  } else {
    res.json("Token not authorized");
  }
};

const updateStudent = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const email = user.email;

      const dbUser = await Admins.findOne({ email });

      if (dbUser) {
        const { email } = req.body;

        const dbStudent = await Students.findOne({ email });

        if (dbStudent) {
          const { name, password, date } = req.body;
          if (name !== undefined) dbStudent.name = name;
          if (password !== undefined) dbStudent.password = password;
          if (date !== undefined) dbStudent.lesson = await editLesson(req, res);
          await dbStudent.save();
          res.json("Student updated successfully!");
        } else {
          res.json("Student not found");
        }
      } else {
        res.json("Not permitted");
      }
    });
  } else {
    res.json("Not authorized");
  }
};

const updateLesson = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const email = user.email;

      const dbUser = await Admins.findOne({ email });

      if (dbUser) {
        const { studentEmail } = req.body;

        const dbStudent = await Students.findOne({ email: studentEmail });

        if (dbStudent) {
          const { oldDate, newDate, listening, reading, writing, speaking } =
            req.body;

          const lessonList = dbStudent.lessons;

          const lesson = lessonList.find((lesson) => lesson.date === oldDate);

          if (lesson) {
            lesson.writing = writing;
            lesson.speaking = speaking;
            lesson.reading = reading;
            lesson.listening = listening;
            lesson.date = newDate;
            await dbStudent.save();
            res.json("Lesson updated successfully");
          } else {
            res.json({
              error: "Lesson not found",
            });
          }
        } else {
          res.json({
            error: "Student not found",
          });
        }
      } else {
        res.json({
          error: "not authorized",
        });
      }
    });
  } else {
    res.json({
      error: "no access token",
    });
  }
};

const createLesson = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const email = user.email;

      const dbUser = await Admins.findOne({ email });

      if (dbUser) {
        const { studentEmail } = req.body;

        const dbStudent = await Students.findOne({ email: studentEmail });

        if (dbStudent) {
          const { date, listening, reading, writing, speaking } = req.body;

          const lessonList = dbStudent.lessons;
          lessonList.push({
            date,
            listening,
            reading,
            writing,
            speaking,
          });

          await Students.findOneAndUpdate(
            { email: studentEmail },
            { lessons: lessonList }
          );

          res.json("Lesson created successfully");
        } else {
          res.json({
            error: "Student not found",
          });
        }
      } else {
        res.json({
          error: "not authorized",
        });
      }
    });
  } else {
    res.json({
      error: "no access token",
    });
  }
};

module.exports = {
  deleteStudent,
  updateStudent,
  createLesson,
  updateLesson,
};
