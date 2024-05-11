import logo from "./../assets/Logo.png";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <Link to="/login">
          <button className="NavButton">
            <p className="ButtonText">Login</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
