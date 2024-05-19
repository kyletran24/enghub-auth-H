import logo from "./../assets/Logo.png";
import "../styles/Navbar.scss";

import axios from "axios";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Navbar = () => {
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

  return (
    <div className="Navbar">
      <div className="LogoDiv">
        <Link to="/">
          <img className="Logo" src={logo}></img>
        </Link>
      </div>
      <div className="NavButtons">
        <Link to="/">
          <button className="NavButton">
            <p className="ButtonText">Thông Tin</p>
          </button>
        </Link>
        <Link to="/giaovien">
          <button className="NavButton">
            <p className="ButtonText">Giáo viên</p>
          </button>
        </Link>
        <Link to="/khoahoc">
          <button className="NavButton">
            <p className="ButtonText">Khóa học</p>
          </button>
        </Link>

        <Link to="/trainghiemhoc">
          <button className="NavButton">
            <p className="ButtonText">Trải nghiệm học</p>
          </button>
        </Link>
      </div>

      <div className="LoginButtonDiv">
        {user ? (
          <div className="LoggedInNav">
            <Link to="/student">
              <button className="NavButton">
                <p className="ButtonText">Trang cá nhân</p>
              </button>
            </Link>
            <button className="LogOutButton NavButton" onClick={LogOut}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="NavButton">
              <p className="ButtonText">Login</p>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
