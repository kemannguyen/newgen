import React from "react";
import "../style/NavigationLayer.css";
import { useNavigate } from "react-router-dom";
import basketicon from "../images/basket-icon.png";

const NavigationLayer = ({ openMenu }) => {
  const navigate = useNavigate();
  const ToHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
    openMenu(false);
  };
  const ToMenu = () => {
    window.scrollTo(0, 0);
    navigate("/shop");
    openMenu(false);
  };
  const ToAbtUs = () => {
    window.scrollTo(0, 0);
    navigate("/about-us");
    openMenu(false);
  };
  const ToOOTD = () => {
    window.scrollTo(0, 0);
    navigate("/outfit-highlights");
    openMenu(false);
  };
  const ToBasket = () => {
    window.scrollTo(0, 0);
    navigate("/basket");
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
          Outfit highlights
        </p>
        <p className="navmenu-btn" onClick={ToAbtUs}>
          About us
        </p>
        <div className="cartnumball">
          <div className="cartnumlayer">0</div>
        </div>
        <img className="cartlayer" src={basketicon} onClick={ToBasket} alt="" />
      </div>
    </div>
  );
};

export default NavigationLayer;
