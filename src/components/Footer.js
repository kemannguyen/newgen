import React from "react";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer
      className="footer-class"
      style={{
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <div>
        <div className="footer-container">
          <div className="section-text">
            <div>COSTUMER CARE</div>
            <div className="section">
              <div className="section-btns">
                <a href="/order" className="section-btn">
                  Contact us
                </a>
              </div>
              <div className="section-btns">
                <a href="/order" className="section-btn">
                  My order
                </a>
              </div>
              <div className="section-btn">Payment</div>
            </div>
          </div>
          <div className="section-text">
            <div>SHIPPING & RETURNS </div>
            <div className="section">
              <div className="section-btns">
                <a href="/order" className="section-btn">
                  Track my order
                </a>
              </div>
              <div className="section-btns">Shipping options</div>
              <div className="section-btns">Returns</div>
            </div>
          </div>
          <div className="section-text">
            <div>OUR COMPANY </div>
            <div className="section">
              <div className="section-btns">About us</div>
            </div>
          </div>
        </div>
        <div
          className="watermark"
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
