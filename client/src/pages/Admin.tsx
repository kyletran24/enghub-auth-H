import "../styles/Admin.scss";
import BG1 from "./../assets/BG1.png";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useUserContext } from "../context/UserContext";
import Linechart from "../components/Linechart";
import AddStudentForm from "../components/AddStudentForm";
import LessonCard from "../components/LessonCard";
import AddLessonForm from "../components/AddLessonForm";

interface Student {
  _id: string;
  name: string;
  email: string;
  lessons: lesson[];
}

interface lesson {
  date: string;
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const user = useUserContext();

  const editStudent = () => {
    let elements = document.querySelectorAll(".deleteStudent");
    Array.from(elements).forEach((element) => {
      element.classList.toggle("showOnEdit");
    });
  };

  const addStudent = () => {
    let elements = document.querySelectorAll(".AddStudentForm");
    Array.from(elements).forEach((element) => {
      element.classList.toggle("Popup");
    });
  };

  const addLesson = () => {
    let elements = document.querySelectorAll(".AddLessonForm");
    Array.from(elements).forEach((element) => {
      element.classList.toggle("Popup");
    });
  };

  const [allStudents, setAllStudents] = useState<[Student]>([
    {
      _id: "",
      name: "",
      email: "",
      lessons: [],
    },
  ]);
  const [currentStudent, setStudent] = useState<Student>({
    _id: "",
    name: "",
    email: "",
    lessons: [],
  });

  const deleteStudent = async (email: string) => {
    try {
      const { data } = await axios.delete("/deleteStudent", {
        data: { email },
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        let remainingStudents = allStudents.filter(
          (student) => student.email != email
        ) as [Student];
        setAllStudents(remainingStudents);
        if (currentStudent.email == email) {
          setStudent({
            _id: "",
            name: "",
            email: "",
            lessons: [],
          });
        }
        toast.success("Delete successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      try {
        axios.get("/checkAdmin").then(({ data }) => {
          if (data.error) {
            toast.error(data.error);
            navigate("/student");
          } else {
            toast.success("Authorized.");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      try {
        axios.get("/allStudents").then(({ data }) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            setAllStudents(data);
            toast.success("Retrieved all students.");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div
      className="Page StudentPage"
      style={{ backgroundImage: `url(${BG1})` }}
    >
      <div className="PageContentWrapper">
        <div className="PageContent">
          <div className="ContentLeft">
            <div className="ContentTitle">
              <h3>Welcome, Admin {user.name}</h3>
            </div>

            <div className="StudentsDiv">
              <h3>All students:</h3>
              {allStudents.map((student, index) => (
                <div className="oneStudent" key={index}>
                  <div
                    className="StudentName"
                    onClick={() => setStudent(student)}
                  >
                    {student.name}
                  </div>
                  <button
                    onClick={() => deleteStudent(student.email)}
                    className="btn btn-primary showOnEdit deleteStudent"
                  >
                    X
                  </button>
                </div>
              ))}
              <button className="btn btn-primary" onClick={editStudent}>
                Edit Students
              </button>
              <button className="btn btn-primary" onClick={addStudent}>
                Add A Student
              </button>
              <AddStudentForm></AddStudentForm>
            </div>
          </div>

          <div className="ContentRight">
            <div className="CurrentStudent">
              {currentStudent.name ? (
                <div>
                  <h3>Name: {currentStudent.name}</h3>
                  <h3>Email: {currentStudent.email}</h3>
                  <div className="StudentChart">
                    <Linechart data={currentStudent.lessons}></Linechart>
                  </div>

                  <div className="LessonCards">
                    <h2>Lessons:</h2>
                    <div className="LessonCardGrid">
                      {currentStudent.lessons.map((lesson, key) => (
                        <div key={key}>
                          <LessonCard
                            studentEmail={currentStudent.email}
                            lesson={lesson}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="btn btn-primary" onClick={addLesson}>
                    Add A Lesson
                  </button>
                  <AddLessonForm
                    studentEmail={currentStudent.email}
                  ></AddLessonForm>
                </div>
              ) : (
                `Pick a student on the left bar`
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
