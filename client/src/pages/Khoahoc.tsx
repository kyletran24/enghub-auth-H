import "../styles/PageContent.scss";
import "../styles/Page.scss";

import Navbar from "../components/Navbar";
import BG1 from "./../assets/BG1.png";

import arrow from "./../assets/arrow.png";
import sticker1 from "./../assets/sticker1.png";
import sticker2 from "./../assets/sticker2.png";
import sticker3 from "./../assets/sticker3.png";
import BigLogo from "./../assets/BigLogo.png";

const KhoahocPage = () => {
  return (
    <div
      className="Page KhoahocPage"
      style={{ backgroundImage: `url(${BG1})` }}
    >
      <div className="PageContentWrapper">
        <Navbar></Navbar>
        <div className="PageContent">
          <div className="ContentLeft">
            <div className="ContentTitle">
              <h3>KHOA HOC</h3>
            </div>

            <p className="ContentBody">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi.
              <br></br>
              <br></br>
              Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed
              diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
              exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat.
            </p>
            <button className="ContentCTA">
              <span className="ContentCTAText">SWIPE</span>
              <img className="ContentCTAArrow" src={arrow}></img>
            </button>
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

export default KhoahocPage;
