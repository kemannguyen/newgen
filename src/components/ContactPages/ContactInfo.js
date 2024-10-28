import React, { useState } from "react";
import Snackbar from "../Snackbar";

const ContactInfo = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [topic, setTopic] = useState("Can't find order");
  const [submitmsg, setSubmitmsg] = useState("");

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(isValidEmail(e.target.value));
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmitChange = (e) => {
    setSubmitmsg(e.target.value);
  };

  const handleButtonClick = () => {
    //SEND MAIL TO COMPANY WITH THIS INFO
    console.log(email, topic, submitmsg);
    showSnackbar("Question has been submitted!");
    setEmail("");
    setSubmitmsg("");
  };

  const isValidEmail = (email) => {
    // Regular expression to validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flexbox info">
      <div className="info-title" style={{ marginBottom: "20px" }}>
        Contact us
      </div>
      <div className="info-subheader-XL">Email us</div>
      <div className="info-breadtext" style={{ marginTop: "20px" }}>
        <div>
          <div>
            <div>
              <label>Email </label>{" "}
              {email != "" ? (
                <span>
                  {" "}
                  {isEmailValid === true && (
                    <span style={{ color: "green" }}> - Valid Email</span>
                  )}
                  {isEmailValid === false && (
                    <span style={{ color: "red" }}> - Invalid Email</span>
                  )}
                </span>
              ) : (
                <span></span>
              )}
            </div>
            <div>
              <input
                className="info-input"
                placeholder="Enter your Email.."
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div>
            <div>
              <label>What can we help you with?</label>
            </div>
            <div>
              <select
                className="info-input"
                value={topic}
                onChange={handleTopicChange}
              >
                <option value="Can't find order">I can't find my order</option>
                <option value="Return order">
                  I would like to return my order
                </option>
                <option value="Payment">Payment</option>
                <option value="Other">Other </option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <label>Question</label>
            </div>
            <div>
              <textarea
                className="info-input"
                placeholder="Write your question here.."
                value={submitmsg}
                onChange={handleSubmitChange}
                style={{ height: "200px", fontSize: "18px" }}
              ></textarea>
            </div>
          </div>
          <br />

          <div>
            <button
              disabled={!isEmailValid}
              onClick={() => {
                handleButtonClick();
              }}
            >
              submit
            </button>
          </div>
        </div>
      </div>
      <div className="info-subheader-XL info-margintop">Call us</div>
      <div className="info-breadtext" style={{ marginTop: "20px" }}>
        <div>
          <a href="tel:+46701234567">
            <img
              className="info-icon"
              src="https://drive.google.com/thumbnail?id=16B8QZdgSBHAl9nr7cyPoyxakAEsvCGdy&sz=w1920"
              alt=""
            />
          </a>
        </div>
        <div style={{ marginBottom: "50px" }}>
          <a className="info-redirect info-bold" href="tel:+46701234567">
            +46 70123 4567
          </a>
        </div>
      </div>
      {snackbarVisible && (
        <Snackbar
          message={snackbarMessage}
          duration={5000}
          onClose={handleCloseSnackbar}
        />
      )}
    </div>
  );
};

export default ContactInfo;
