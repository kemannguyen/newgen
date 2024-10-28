import React, { useState } from "react";
import Snackbar from "../Snackbar";
import { firebaseApp } from "../../firebase-config";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";

const ReturnInfo = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [orderID, setOrderID] = useState("");
  const [savedOrderID, setSavedOrderID] = useState("");
  const [isOrderIDValid, setValidOrderID] = useState(null);
  const [item, setItem] = useState("");
  const [submitmsg, setSubmitmsg] = useState("");

  const validCheck = orderID.length === 27;

  const db = getFirestore(firebaseApp);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleOrderIDChange = (e) => {
    setOrderID(e.target.value);
  };

  const handleTopicChange = (e) => {
    setItem(e.target.value);
  };

  const handleSubmitChange = (e) => {
    setSubmitmsg(e.target.value);
  };

  const handleButtonClick = () => {
    //SEND MAIL TO COMPANY WITH THIS INFO
    console.log(savedOrderID, item, submitmsg);
    showSnackbar("Question has been submitted!");
    setOrderID("");
    setSubmitmsg("");
    setValidOrderID(false);
  };

  const handleValidation = async () => {
    isValidOrderID(orderID);
    setSavedOrderID(orderID);
  };

  const isValidOrderID = async (checkID) => {
    // Regular expression to validate email addresses ****
    const usersRef = collection(db, "orders");
    const q = query(usersRef, where("ID", "==", checkID));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("order exists");
      setValidOrderID(true);
    } else {
      console.log("order don't exist");
      setValidOrderID(false);
    }
  };
  return (
    <div className="flexbox info" style={{ marginTop: "150px" }}>
      <div className="info-subheader-XL">Returns</div>

      <div className="info-subheader-L" style={{ marginTop: "50px" }}>
        Return policy
      </div>
      <div className="info-breadtext" style={{ marginTop: "10px" }}>
        We want you to be satisfied with your purchase. If you are not happy
        with a product, you may return it in accordance with our Return Policy.
        Returns are accepted within{" "}
        <span className="info-bold">30 days of receipt</span>, provided the
        items are in their original condition and packaging for a full refund.
        <br></br>
        <br></br>
        All returned items must be in their original condition,{" "}
        <span className="info-bold">
          {" "}
          with tags attached and in their original packaging.
        </span>{" "}
        We offer free returns for customers in the EU using our pre-paid return
        label. For customers outside the EU, return shipping costs are the
        responsibility of the buyer.
        <br></br>
        <br></br>
        <span className="info-bold">Non-Returnable Items: </span>
        Some items, such as personalized or final sale items, are non-returnable
        and will be clearly marked as such on the product page.
      </div>

      <div className="info-subheader-L" style={{ marginTop: "50px" }}>
        Step-by-Step Return Instructions
      </div>
      <div className="info-breadtext" style={{ marginTop: "10px" }}>
        To make sure you have a smooth return experience please follow the
        instructions below:{" "}
        <div className="info-listcontainer" style={{ marginTop: "10px" }}>
          <div>1. </div>
          <div className="info-list">
            <span className="info-bold">Initiate Your Return: </span>
            Contact customer support and request a return or fill out the return
            request form below.
          </div>
        </div>
        <div className="info-listcontainer">
          <div>2. </div>
          <div className="info-list">
            <span className="info-bold">Prepare the Package: </span>
            Use the return label (provided to customers within EU) or use your
            own shipping. Ensure the product is securely packaged.
          </div>
        </div>
        <div className="info-listcontainer">
          <div>3. </div>
          <div className="info-list">
            <span className="info-bold">Ship It: </span>
            Attach the return label to your package and drop it off at the
            nearest post office.
          </div>
        </div>
        <div className="info-list">
          <div className="info-bold">NewGen Fashion</div>
          <div>Returns Department</div>
          <div>Västra Hamngatan 15C </div>
          <div>411 17 Göteborg, Sweden</div>
        </div>
      </div>
      <div className="info-subheader-L" style={{ marginTop: "50px" }}>
        Refunds
      </div>
      <div className="info-breadtext" style={{ marginTop: "10px" }}>
        Refunds will be processed to the same card that did the purchase within
        5-7 business days after we receive the returned item. Original shipping
        fees are non-refundable.
      </div>

      <div className="info-subheader-L" style={{ marginTop: "50px" }}>
        Return Form
      </div>
      <div className="info-breadtext" style={{ marginTop: "20px" }}>
        <div>
          <div>
            <div>
              <label className="info-bold">
                Order ID <a style={{ color: "red" }}>*</a>
              </label>{" "}
              {validCheck ? (
                <span>
                  {isOrderIDValid === true && (
                    <span style={{ color: "green" }}> - Valid OrderID</span>
                  )}
                  {isOrderIDValid === false && (
                    <span style={{ color: "red" }}> - Invalid OrderID</span>
                  )}
                </span>
              ) : (
                <span></span>
              )}
            </div>
            <div>
              <input
                className="info-input"
                placeholder="Enter your Order ID.."
                value={orderID}
                onChange={handleOrderIDChange}
              />

              <button
                style={{ marginTop: "5px", marginBottom: "5px" }}
                className="info-bold"
                disabled={!validCheck}
                onClick={() => {
                  handleValidation();
                }}
              >
                Validate
              </button>
            </div>
          </div>
          <div>
            <div>
              <label className="info-bold">
                Which item do you want to return?{" "}
                <a style={{ color: "red" }}>*</a>
              </label>
            </div>
            <div>
              <input
                className="info-input"
                placeholder="Describe item"
                value={item}
                onChange={handleTopicChange}
              />
            </div>
          </div>
          <div>
            <div>
              <label className="info-bold">
                Why do you want to return it? <a style={{ color: "red" }}>*</a>
              </label>
            </div>
            <div>
              <textarea
                className="info-input"
                placeholder="Write your answer here.."
                value={submitmsg}
                onChange={handleSubmitChange}
                style={{ height: "200px", fontSize: "18px" }}
              ></textarea>
            </div>
          </div>
          <br />

          <div style={{ marginBottom: "40px" }}>
            <button
              className="info-bold"
              disabled={!isOrderIDValid || item === "" || submitmsg === ""}
              onClick={() => {
                handleButtonClick();
              }}
            >
              submit
            </button>
          </div>
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

export default ReturnInfo;
