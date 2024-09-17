import React from "react";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer
      className="footer-class"
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
      }}
    >
      <div>
        <div className="footer-container">
          <div className="section-text">
            <div>COSTUMER CARE</div>
            <div>contact us</div>
            <div>my order</div>
            <div>payment</div>
            <div>contact us</div>
          </div>
          <div className="section-text">
            <div>SHIPPING & RETURNS </div>
          </div>
          <div className="section-text">
            <div>OUR COMPANY </div>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <hr></hr>
          <p>
            &copy; {new Date().getFullYear()} Keman Nguyen. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
