import { useState } from "react";
import "../styles/AddLessonForm.scss";
import { toast } from "react-hot-toast";
import axios from "axios";

interface Props {
  studentEmail: String;
}

const AddLessonForm = ({ studentEmail }: Props) => {
  const [data, setData] = useState({
    date: "",
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
  });

  const closeForm = () => {
    let elements = document.querySelectorAll(".AddLessonForm");
    Array.from(elements).forEach((element) => {
      element.classList.toggle("Popup");
    });
  };

  const addLesson = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { date, listening, reading, writing, speaking } = data;

    try {
      const { data } = await axios.post("/createLesson", {
        studentEmail,
        date,
        listening,
        reading,
        writing,
        speaking,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          date: "",
          listening: 0,
          reading: 0,
          writing: 0,
          speaking: 0,
        });
        toast.success("Đã thêm buổi học.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="AddLessonForm">
      <form onSubmit={addLesson}>
        <label>Date</label>
        <input
          type="text"
          name="date"
          placeholder="Ngày học"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
        ></input>
        <br></br>
        <label>Điểm Listening</label>
        <input
          type="number"
          min="1"
          max="9"
          name="listening"
          placeholder="Điểm Listening"
          value={data.listening}
          onChange={(e) =>
            setData({ ...data, listening: Number(e.target.value) })
          }
        ></input>
        <br></br>
        <label>Điểm Reading</label>
        <input
          type="number"
          min="1"
          max="9"
          name="reading"
          placeholder="Điểm Reading"
          value={data.reading}
          onChange={(e) =>
            setData({ ...data, reading: Number(e.target.value) })
          }
        ></input>
        <br></br>
        <label>Điểm Writing</label>
        <input
          type="number"
          min="1"
          max="9"
          name="writing"
          placeholder="Điểm Writing"
          value={data.writing}
          onChange={(e) =>
            setData({ ...data, writing: Number(e.target.value) })
          }
        ></input>
        <br></br>
        <label>Điểm Speaking</label>
        <input
          type="number"
          min="1"
          max="9"
          name="speaking"
          placeholder="Điểm Speaking"
          value={data.speaking}
          onChange={(e) =>
            setData({ ...data, speaking: Number(e.target.value) })
          }
        ></input>
        <button type="submit">Thêm buổi học</button>
      </form>
      <button className="btn btn-danger closeButton" onClick={closeForm}>
        Đóng
      </button>
    </div>
  );
};

export default AddLessonForm;
