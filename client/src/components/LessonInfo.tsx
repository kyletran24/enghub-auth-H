import { useState } from "react";
import "../styles/LessonInfo.scss";
import { toast } from "react-hot-toast";
import axios from "axios";
import ParseScore from "../helpers/ParseScore";
import ParseDate from "../helpers/ParseDate";

interface Props {
  studentEmail: string;
  date: string;
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

const LessonInfo = ({
  studentEmail,
  date,
  listening,
  reading,
  writing,
  speaking,
}: Props) => {
  const [data, setData] = useState({
    newDate: "",
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
  });

  const closeForm = () => {
    const className = ".LessonInfo" + ParseDate(date);
    let elements = document.querySelectorAll(className);
    Array.from(elements).forEach((element) => {
      element.classList.toggle("Popup");
    });

    elements = document.querySelectorAll(".EditLessonForm");
    Array.from(elements).forEach((element) => {
      element.classList.remove("Popup");
    });
  };

  const showEditForm = () => {
    let elements = document.querySelectorAll(".EditLessonForm");
    Array.from(elements).forEach((element) => {
      element.classList.toggle("Popup");
    });
  };

  const editLesson = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { newDate, listening, reading, writing, speaking } = data;

    try {
      const { data } = await axios.put("/updateLesson", {
        oldDate: date,
        studentEmail,
        newDate,
        listening,
        reading,
        writing,
        speaking,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          newDate: "",
          listening: 0,
          reading: 0,
          writing: 0,
          speaking: 0,
        });
        toast.success("Đã sửa thông tin buổi học.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`LessonInfo LessonInfo${ParseDate(date)}`}>
      <div className="LessonInfoWrapper">
        <div className="LessonScores">
          <h3>Date: {date}</h3>
          <div>
            <h4>Listening: {listening}</h4>
            <div className="meter">
              <span style={{ width: ParseScore(listening) + "%" }}>
                <span className="progress"></span>
              </span>
            </div>

            <h4>Reading: {reading}</h4>
            <div className="meter">
              <span style={{ width: ParseScore(reading) + "%" }}>
                <span className="progress"></span>
              </span>
            </div>

            <h4>Writing: {writing}</h4>
            <div className="meter">
              <span style={{ width: ParseScore(writing) + "%" }}>
                <span className="progress"></span>
              </span>
            </div>

            <h4>Speaking: {speaking}</h4>
            <div className="meter">
              <span style={{ width: ParseScore(speaking) + "%" }}>
                <span className="progress"></span>
              </span>
            </div>

            <button
              onClick={showEditForm}
              className="btn btn-primary EditLessonBtn"
            >
              Sửa thông tin buổi học
            </button>
          </div>
        </div>

        <div className="EditLessonForm">
          <form onSubmit={editLesson}>
            <label>Ngày</label>
            <input
              type="text"
              name="date"
              placeholder="Ngày học"
              value={data.newDate}
              onChange={(e) => setData({ ...data, newDate: e.target.value })}
            ></input>
            <br></br>
            <label>Điểm Listening mới</label>
            <input
              type="number"
              min="1"
              max="9"
              name="listening"
              placeholder="Điểm Listening mới"
              value={data.listening}
              onChange={(e) =>
                setData({ ...data, listening: Number(e.target.value) })
              }
            ></input>
            <br></br>
            <label>Điểm Reading mới</label>
            <input
              type="number"
              min="1"
              max="9"
              name="reading"
              placeholder="Điểm Reading mới"
              value={data.reading}
              onChange={(e) =>
                setData({ ...data, reading: Number(e.target.value) })
              }
            ></input>
            <br></br>
            <label>Điểm Writing mới</label>
            <input
              type="number"
              min="1"
              max="9"
              name="writing"
              placeholder="Điểm Writing mới"
              value={data.writing}
              onChange={(e) =>
                setData({ ...data, writing: Number(e.target.value) })
              }
            ></input>
            <br></br>
            <label>Điểm Speaking mới</label>
            <input
              type="number"
              min="1"
              max="9"
              name="speaking"
              placeholder="Điểm Speaking mới"
              value={data.speaking}
              onChange={(e) =>
                setData({ ...data, speaking: Number(e.target.value) })
              }
            ></input>
            <button type="submit">Sửa thông tin</button>
          </form>
        </div>
      </div>

      <button className="btn btn-danger closeButton" onClick={closeForm}>
        Đóng
      </button>
    </div>
  );
};

export default LessonInfo;
