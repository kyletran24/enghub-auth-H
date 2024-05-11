import "../styles/Student.scss";
import BG1 from "./../assets/BG1.png";

import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Student = () => {
  const navigate = useNavigate();

  const user = useUserContext();
  const [role, setRole] = useState("");

  if (user) {
    axios.get("/checkRole").then(({ data }) => {
      setRole(data);
    });

    if (role == "admin") {
      navigate("/admin");
    }

    const [currentLesson, setLesson] = useState({});

    return (
      <div
        className="Page StudentPage"
        style={{ backgroundImage: `url(${BG1})` }}
      >
        <div className="PageContentWrapper">
          <div className="PageContent">
            <div className="ContentLeft">
              <div className="ContentTitle">
                <h3>Welcome, {user.name}</h3>
              </div>

              <div className="LessonsDiv">
                <h3>Your past lessons:</h3>
                {user.lessons.map((lesson, index) => (
                  <div
                    className="LessonDate"
                    onClick={() => setLesson(lesson)}
                    key={index}
                  >
                    {lesson["date"]}
                  </div>
                ))}
              </div>
            </div>

            <div className="ContentRight">
              <div className="CurrentLesson">
                <h3>
                  {Object.keys(currentLesson).length !== 0
                    ? `Date: ${Object.values(currentLesson)[0]}`
                    : `Pick a date on the left bar`}
                </h3>
                {Object.entries(currentLesson)
                  .slice(1)
                  .slice(0, -1)
                  .map((skill, id) => (
                    <div>
                      <h4>{`${skill[0].toUpperCase()}: ${skill[1]}`}</h4>
                      <progress value={id} max="10"></progress>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="PageContentWrapper">
        <div className="PageContent"></div>
      </div>
    );
  }
};

export default Student;
