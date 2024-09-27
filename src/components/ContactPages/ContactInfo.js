import React from "react";

const ContactInfo = () => {
  return (
    <div className="flexbox info info-centercontainer">
      <div className="info-title" style={{ marginBottom: "20px" }}>
        Contact us
      </div>
      <div className="info-subheader-XL">Email us</div>
      <div className="info-breadtext" style={{ marginTop: "20px" }}>
        <div>
          <form>
            <div>
              <div>
                <label for="fname">Full Name</label>
              </div>
              <div>
                <input
                  className="info-input"
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Your name.."
                />
              </div>
            </div>
            <div>
              <div>
                <label for="Subject">What can we help you with?</label>
              </div>
              <div>
                <select id="Subject" name="Subject" className="info-input">
                  <option value="Can't find order">
                    I can't find my order
                  </option>
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
                <label for="Question">Question</label>
              </div>
              <div>
                <textarea
                  className="info-input"
                  id="Question"
                  name="Question"
                  placeholder="Write your question here.."
                  style={{ height: "200px", fontSize: "18px" }}
                ></textarea>
              </div>
            </div>
            <br />
            <div>
              <input className="info-medium" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
      <div className="info-subheader-XL info-margintop">Call us</div>
      <div className="info-breadtext" style={{ marginTop: "20px" }}>
        <div>
          <img
            className="info-img"
            src="https://drive.google.com/thumbnail?id=1Z5poGhDEscqZuGMT35OOh4p1rzSzB_PS&sz=w1920"
          />
        </div>
        <div>
          <a>+46 70123 4567</a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
