import React from "react";
import "../style/NavigationLayer.css";
import { useNavigate } from "react-router-dom";
import basketicon from "../images/basket-icon.png";
import useLocalStorageItemCount from "./useLocalStorageItemCount";

const NavigationLayer = ({ openMenu }) => {
  const navigate = useNavigate();
  const itemCount = useLocalStorageItemCount("myBasket");

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
  const ToOrder = () => {
    window.scrollTo(0, 0);
    navigate("/basket");
    openMenu(false);
    window.location.reload();
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
        <p className="navmenu-btn" onClick={ToOrder}>
          Find order
        </p>
        <div className="cartnumball">
          <div className="cartnumlayer">{itemCount}</div>
        </div>
        <img className="cartlayer" src={basketicon} onClick={ToBasket} alt="" />
      </div>
    </div>
  );
};

export default NavigationLayer;
