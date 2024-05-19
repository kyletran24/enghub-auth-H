import "../styles/Student.scss";
import BG1 from "./../assets/BG1.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useUserContext } from "../context/UserContext";
import ParseScore from "../helpers/ParseScore.tsx";
import Linechart from "../components/Linechart";

interface lesson {
  date: string;
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

const Student = () => {
  const navigate = useNavigate();

  const user = useUserContext();

  const LogOut = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.get("/logout");

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Logged out!");

        setTimeout(function () {
          window.location.reload();
        }, 2000);
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
          } else {
            toast.success("Authorized.");
            navigate("/admin");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  }, []);

  const [currentLesson, setLesson] = useState<lesson>({
    date: "",
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
  });

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
              {user.lessons ? (
                user.lessons.map((lesson, index) => (
                  <div
                    className="LessonDate"
                    onClick={() => setLesson(lesson)}
                    key={index}
                  >
                    {lesson["date"]}
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="ContentRight">
            <button
              className="LogOutButton NavButton btn btn-primary"
              onClick={LogOut}
            >
              Logout
            </button>
            <div className="CurrentLesson">
              <h3>Your progress:</h3>
              <Linechart data={user.lessons}></Linechart>
              {currentLesson.date ? (
                <div>
                  <h3>Date: {currentLesson.date}</h3>
                  <div>
                    <h4>Listening: {currentLesson.listening}</h4>
                    <div className="meter">
                      <span
                        style={{
                          width: ParseScore(currentLesson.listening) + "%",
                        }}
                      >
                        <span className="progress"></span>
                      </span>
                    </div>

                    <h4>Reading: {currentLesson.reading}</h4>
                    <div className="meter">
                      <span
                        style={{
                          width: ParseScore(currentLesson.reading) + "%",
                        }}
                      >
                        <span className="progress"></span>
                      </span>
                    </div>

                    <h4>Writing: {currentLesson.writing}</h4>
                    <div className="meter">
                      <span
                        style={{
                          width: ParseScore(currentLesson.writing) + "%",
                        }}
                      >
                        <span className="progress"></span>
                      </span>
                    </div>

                    <h4>Speaking: {currentLesson.speaking}</h4>
                    <div className="meter">
                      <span
                        style={{
                          width: ParseScore(currentLesson.speaking) + "%",
                        }}
                      >
                        <span className="progress"></span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                `Pick a date on the left bar for more details`
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
