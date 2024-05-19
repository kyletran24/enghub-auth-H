import { useState } from "react";
import "../styles/AddStudentForm.scss";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddStudentForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const closeForm = () => {
    let elements = document.querySelectorAll(".AddStudentForm");
    Array.from(elements).forEach((element) => {
      element.classList.toggle("Popup");
    });
  };

  const registerUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { name, email, password } = data;

    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          name: "",
          email: "",
          password: "",
        });
        toast.success("Đã thêm học sinh.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="AddStudentForm">
      <form onSubmit={registerUser}>
        <label>Họ và tên</label>
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        ></input>
        <br></br>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        ></input>
        <br></br>
        <label>Mật khẩu</label>
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        ></input>
        <button type="submit">Thêm học sinh</button>
      </form>
      <button className="btn btn-danger closeButton" onClick={closeForm}>
        Đóng
      </button>
    </div>
  );
};

export default AddStudentForm;
