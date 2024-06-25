import React from "react";
import "../style/NavigationLayer.css";
import { useNavigate } from "react-router-dom";

const NavigationLayer = ({ openMenu }) => {
  const navigate = useNavigate();
  const ToHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
    openMenu(false);
  };
  const ToMenu = () => {
    window.scrollTo(0, 0);
    navigate("/meny");
    openMenu(false);
  };
  const ToAbtUs = () => {
    window.scrollTo(0, 0);
    navigate("/about-us");
    openMenu(false);
  };
  const ToOOTD = () => {
    window.scrollTo(0, 0);
    navigate("/outfit-of-the-day");
    openMenu(false);
  };
  const ToContactUs = () => {
    window.scrollTo(0, 0);
    navigate("/contact-us");
    openMenu(false);
  };

  return (
    <div className="bg-layercover">
      <div className="btn-container">
        <p className="navmenu-btn" onClick={ToHome}>
          Home
        </p>
        <p className="navmenu-btn" onClick={ToMenu}>
          Shop
        </p>
        <p className="navmenu-btn" onClick={ToOOTD}>
          Outfit of the day
        </p>
        <p className="navmenu-btn" onClick={ToAbtUs}>
          About us
        </p>
        <p className="navmenu-btn" onClick={ToContactUs}>
          Contact Us
        </p>
      </div>
    </div>
  );
};

export default NavigationLayer;