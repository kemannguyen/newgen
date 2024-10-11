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
                <a href="/contact-us/details" className="section-btn">
                  Contact us
                </a>
              </div>
              <div className="section-btns">
                <a href="/contact-us/myorder" className="section-btn">
                  My order
                </a>
              </div>
              <div className="section-btns">
                {" "}
                <a href="/contact-us/FAQ" className="section-btn">
                  Payment
                </a>
              </div>
              <div className="section-btns">
                {" "}
                <a href="/contact-us/FAQ" className="section-btn">
                  FAQs
                </a>
              </div>
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
              <div className="section-btns">
                {" "}
                <a href="/contact-us/shipping" className="section-btn">
                  Shipping options
                </a>
              </div>
              <div className="section-btns">
                {" "}
                <a href="/contact-us/returns" className="section-btn">
                  Returns
                </a>
              </div>
            </div>
          </div>
          <div className="section-text">
            <div>OUR COMPANY </div>
            <div className="section">
              <div className="section-btns">
                {" "}
                <a href="/contact-us/about-us" className="section-btn">
                  About us{" "}
                </a>
              </div>
              <div className="section-btns">
                {" "}
                <a href="/contact-us/terms" className="section-btn">
                  Terms and conditions
                </a>
              </div>
              <div className="section-btns">
                {" "}
                <a href="/contact-us/privacy-p" className="section-btn">
                  Privacy policy
                </a>
              </div>
              <div className="section-btns">
                {" "}
                <a href="/contact-us/cookie-p" className="section-btn">
                  Cookie policy
                </a>
              </div>
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
