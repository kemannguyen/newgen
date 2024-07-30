import React, { useEffect, useState } from "react";
import "../style/Header.css";
import { useNavigate } from "react-router-dom";
import NavigationLayer from "./NavigationLayer";
import xicon from "../images/x-icon1.png";
import icon from "../images/menu-icon1.png";
import ngicon from "../images/ngicon.png";
import basketicon from "../images/basket-icon.png";

const Header = () => {
  var pathname = window.location.pathname;

  const [menu, setMenu] = useState(false);
  const openMenu = () => setMenu(!menu);
  const [tabindex, setindex] = useState(0);

  useEffect(() => {
    switch (pathname) {
      case "/":
        setindex(0);
        break;
      case "/shop":
        setindex(1);
        break;
      case "/outfit-of-the-day":
        setindex(2);
        break;
      case "/about-us":
        setindex(3);
        break;
      case "/contact-us":
        setindex(4);
        break;
      case "/basket":
        setindex(5);
        break;
      default:
        break;
    }
  }, [pathname]);

  //makes the body non scrollable when nav menu is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menu]);

  const navigate = useNavigate();

  const ToHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
    if (tabindex !== 0) {
      window.location.reload();
    }
  };

  const ToMenu = () => {
    window.scrollTo(0, 0);
    navigate("/shop");
  };

  const ToOOTD = () => {
    window.scrollTo(0, 0);
    navigate("/outfit-of-the-day");
  };

  const ToAbtUs = () => {
    window.scrollTo(0, 0);
    navigate("/about-us");
  };

  const ToContactUs = () => {
    window.scrollTo(0, 0);
    navigate("/contact-us");
  };

  const ToBasket = () => {
    window.scrollTo(0, 0);
    navigate("/basket");
  };

  const screenWidth = () => {
    if (window.outerWidth >= 842) {
      setMenu(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", screenWidth);
    return () => window.removeEventListener("resize", screenWidth);
  }, []);

  //navbuttons active or not
  let homebtn;
  if (tabindex === 0) {
    homebtn = (
      <span className="navbtn-active" onClick={ToHome}>
        {" "}
        home
      </span>
    );
  } else {
    homebtn = (
      <span className="navbtn" onClick={ToHome}>
        {" "}
        home
      </span>
    );
  }

  let shopbtn;
  if (tabindex === 1) {
    shopbtn = (
      <span className="navbtn-active" onClick={ToMenu}>
        {" "}
        shop
      </span>
    );
  } else {
    shopbtn = (
      <span className="navbtn" onClick={ToMenu}>
        {" "}
        shop
      </span>
    );
  }

  let ootdbtn;
  if (tabindex === 2) {
    ootdbtn = (
      <span className="navbtn-active" onClick={ToOOTD}>
        {" "}
        outfit of the day
      </span>
    );
  } else {
    ootdbtn = (
      <span className="navbtn" onClick={ToOOTD}>
        {" "}
        outfit of the day
      </span>
    );
  }

  let abtusbtn;
  if (tabindex === 3) {
    abtusbtn = (
      <span className="navbtn-active" onClick={ToAbtUs}>
        {" "}
        about us
      </span>
    );
  } else {
    abtusbtn = (
      <span className="navbtn" onClick={ToAbtUs}>
        {" "}
        about us
      </span>
    );
  }

  let contactusbtn;
  if (tabindex === 4) {
    contactusbtn = (
      <span className="navbtn-active" onClick={ToContactUs}>
        {" "}
        contact us
      </span>
    );
  } else {
    contactusbtn = (
      <span className="navbtn" onClick={ToContactUs}>
        {" "}
        contact us
      </span>
    );
  }

  let basketbtn;
  if (tabindex === 5) {
    basketbtn = (
      <span className="navbtn-active" onClick={ToBasket}>
        {" "}
        <img
          className="navbtn-active navimg"
          src={basketicon}
          onClick={ToBasket}
          alt=""
        ></img>
      </span>
    );
  } else {
    basketbtn = (
      <span className="navbtn" onClick={ToBasket}>
        {" "}
        <img
          className="navbtn-active navimg"
          src={basketicon}
          onClick={ToBasket}
          alt=""
        ></img>
      </span>
    );
  }

  return (
    <div className="header">
      <img
        className="titleimg"
        src="https://drive.google.com/thumbnail?id=1wMf_FDBKDfq1amsV-2MYmW7hIvRhIBoX&sz=w1920"
        onClick={ToHome}
        alt=""
      ></img>

      <div className="navbtns">
        {homebtn}
        {shopbtn}
        {ootdbtn}
        {abtusbtn}
        {contactusbtn}
      </div>
      <div className="cartimg">{basketbtn}</div>
      <div className="cart">
        <div className="cartnum">0</div>
      </div>

      <img
        className="menu-btn"
        src={menu ? xicon : icon}
        onClick={openMenu}
        alt=""
      />

      <div className={menu ? "unhide" : "hide"}>
        <NavigationLayer openMenu={setMenu} setIndex={setindex} />
      </div>
    </div>
  );
};

export default Header;
