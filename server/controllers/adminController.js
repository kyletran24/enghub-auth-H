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
}

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
}

const editLesson = async (req, res) => {
  const { date, email } = req.body;

  const dbStudent = await Students.findOne({ email });

  const lesson = dbStudent.lessons.find((lesson) => lesson.date === date);

  if (lesson) {
      const { writing, speaking , reading , listening } = req.body;
      lesson.writing = writing;
      lesson.speaking = speaking;
      lesson.reading = reading;
      lesson.listening = listening;
      await dbStudent.save();
      return "Lesson updated successfully";
  } else {
      res.json("Lesson not found");
  }
}

const createLesson = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
        if (err) throw err;
  
        const email = user.email;
  
        const dbUser = await Admins.findOne ({ email });

        if (dbUser) {
          const { email } = req.body;

          const dbStudent = await Students.findOne({ email });

          if (dbStudent) {
              const { date, writing, speaking, reading, listening } = req.body;
              dbStudent.lessons.push({ date, writing, speaking, reading, listening });
              await dbStudent.save();
              res.json("Lesson created successfully");
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
}

module.exports = {
    deleteStudent,
    updateStudent,
    createLesson,
};