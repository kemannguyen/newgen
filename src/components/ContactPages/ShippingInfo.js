import React from "react";
import "../../style/ContactPages.css";

const ShippingInfo = () => {
  return (
    <div className="flexbox info" style={{ marginTop: "150px" }}>
      <div className="info-subheader-XL">Shipping</div>

      <div className="info-breadtext" style={{ marginTop: "50px" }}>
        At our online store, we take pride in offering worldwide shipping,
        ensuring that our products reach you no matter where you are. We partner
        with trusted postal services like DHL, Bring Express, and other reliable
        international carriers to guarantee safe and timely delivery to your
        doorstep.
      </div>
      <div className="info-breadtext" style={{ marginTop: 20 }}>
        <img
          width={35}
          height={35}
          style={{ marginRight: 10 }}
          src="https://drive.google.com/thumbnail?id=1dYpB-VfsnBZz0j8HLDLQ-uPjr1C4arnI&sz=w1920"
          alt=""
        />
        <img
          width={35}
          height={35}
          style={{ marginRight: 10 }}
          src="https://drive.google.com/thumbnail?id=1xuBrWCHm73hdBoPT_8jL3mdNT8a9AiGe&sz=w1920"
          alt=""
        />
        <img
          width={35}
          height={35}
          style={{ marginRight: 10 }}
          src="https://drive.google.com/thumbnail?id=1PaIQ_XSNimHic5IfkE0E0JaV9ZaJIb33&sz=w1920"
          alt=""
        />
      </div>
      <div className="info-subheader-L" style={{ marginTop: "50px" }}>
        Shipping Options:
      </div>
      <div className="info-breadtext" style={{ marginTop: "10px" }}>
        <div className="info-listcontainer">
          <div>∘ </div>
          <div className="info-list">
            <span className="info-bold">Standard Shipping: </span>
            Starting from just $5, our standard shipping option is both
            economical and dependable, ensuring your package arrives within 5-12
            business days.
          </div>
        </div>
        <div className="info-listcontainer">
          <div>∘ </div>
          <div className="info-list">
            <span className="info-bold">Express Shipping: </span>
            For those who need their items in a hurry, we offer express shipping
            starting at €15. With this service, your order will be prioritized
            and delivered within 2-5 business days.
          </div>
        </div>
      </div>

      <div className="info-breadtext" style={{ marginTop: "20px" }}>
        These estimated times are calculated within the EU,{" "}
        <span className="info-bold">
          {" "}
          outside EU it may take additionally 10 days.{" "}
        </span>{" "}
        We strive to make your shopping experience seamless and efficient,
        providing you with flexible options to suit your needs. Shop with us
        today and enjoy fast and reliable shipping to anywhere in the world!
      </div>
    </div>
  );
};

export default ShippingInfo;
