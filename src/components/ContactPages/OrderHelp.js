import React from "react";

const OrderHelp = () => {
  return (
    <div className="flexbox info" style={{ marginTop: "100px" }}>
      <div className="info-subheader-XL">How to find your order</div>
      <div className="info-breadtext info-bold">
        ● You can find your order ID in the order confirmation Email sent.{" "}
      </div>
      <div className="info-img">
        <img
          className="info-imgsize"
          src="https://drive.google.com/thumbnail?id=163ONWPlPv13T-G7RFZQllVoOyR6EkX0_&sz=w1920"
        />
      </div>
      <div className="info-breadtext info-bold">
        ● Copy the order ID and press on the "find order" button in the
        navigation menu.
      </div>
      <div className="info-img">
        <img
          className="info-imgsize"
          src="https://drive.google.com/thumbnail?id=1pO3HsqicNjaWH9F00bfvtqUpugFqETfK&sz=w1920"
        />
      </div>
      <div className="info-breadtext info-bold">
        ● Paste the order ID in the input field (1.) and press the find button
        (2.), your order should now appear!
      </div>
      <div className="info-img">
        <img
          className="info-imgsize"
          src="https://drive.google.com/thumbnail?id=1Ni1nF1FsGHtIclilDLXU9o7sAASklTAB&sz=w1920
"
        />
      </div>
    </div>
  );
};

export default OrderHelp;
