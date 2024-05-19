import "../styles/PageContent.scss";
import "../styles/Page.scss";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

import Navbar from "../components/Navbar";
import BG1 from "./../assets/BG1.png";
import axios from "axios";

import arrow from "./../assets/arrow.png";
import sticker1 from "./../assets/sticker1.png";
import sticker2 from "./../assets/sticker2.png";
import sticker3 from "./../assets/sticker3.png";
import BigLogo from "./../assets/BigLogo.png";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
        toast.success("Register successful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="Page RegisterPage"
      style={{ backgroundImage: `url(${BG1})` }}
    >
      <div className="PageContentWrapper">
        <Navbar></Navbar>
        <div className="PageContent">
          <div className="ContentLeft">
            <div className="ContentTitle">
              <h3>ĐĂNG KÝ</h3>
            </div>

            <form className="RegisterForm" onSubmit={registerUser}>
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
              <button type="submit">Đăng ký</button>
            </form>
            <Link to="/login">
              <button className="ContentCTA">
                <span className="ContentCTAText">Đăng nhập</span>
                <img className="ContentCTAArrow" src={arrow}></img>
              </button>
            </Link>
          </div>
          <div className="ContentRight">
            <img className="BigLogo" src={BigLogo}></img>
            <img className="Sticker Sticker1" src={sticker1}></img>
            <img className="Sticker Sticker2" src={sticker2}></img>
            <img className="Sticker Sticker3" src={sticker3}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
