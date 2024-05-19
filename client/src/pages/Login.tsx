import "../styles/PageContent.scss";
import "../styles/Page.scss";

import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import BG1 from "./../assets/BG1.png";
import arrow from "./../assets/arrow.png";
import sticker1 from "./../assets/sticker1.png";
import sticker2 from "./../assets/sticker2.png";
import sticker3 from "./../assets/sticker3.png";
import BigLogo from "./../assets/BigLogo.png";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { email, password } = data;

    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          email: "",
          password: "",
        });
        toast.success("Login successful!");

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Page LoginPage" style={{ backgroundImage: `url(${BG1})` }}>
      <div className="PageContentWrapper">
        <Navbar></Navbar>
        <div className="PageContent">
          <div className="ContentLeft">
            <div className="ContentTitle">
              <h3>ĐĂNG NHẬP</h3>
            </div>

            <form className="LoginForm" onSubmit={loginUser}>
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
              <button type="submit">Đăng nhập</button>
            </form>
            <Link to="/register">
              <button className="ContentCTA">
                <span className="ContentCTAText">Đăng ký</span>
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

export default Login;
