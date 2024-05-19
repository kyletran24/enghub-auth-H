import LessonInfo from "./LessonInfo";
import ParseDate from "../helpers/ParseDate";

interface Props {
  studentEmail: string;
  lesson: {
    date: string;
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
}

const LessonCard = ({ studentEmail, lesson }: Props) => {
  const showLesson = () => {
    const className = ".LessonInfo" + ParseDate(lesson.date);
    let elements = document.querySelectorAll(className);

    Array.from(elements).forEach((element) => {
      element.classList.toggle("Popup");
    });
  };

  return (
    <div className="LessonCard card">
      <div onClick={showLesson} className="card-body">
        <h5 className="card-title">{lesson.date}</h5>
      </div>
      <LessonInfo
        studentEmail={studentEmail}
        date={lesson.date}
        listening={lesson.listening}
        reading={lesson.reading}
        writing={lesson.writing}
        speaking={lesson.speaking}
      ></LessonInfo>
    </div>
  );
};

export default LessonCard;
