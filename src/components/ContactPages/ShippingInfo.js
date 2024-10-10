import React from "react";

const ShippingInfo = () => {
  return (
    <div className="flexbox info" style={{ marginTop: "150px" }}>
      <div className="info-subheader-XL">Shipping</div>

      <div className="info-breadtext" style={{ marginTop: "50px" }}>
        Welcome to New Gen Fashion ("Company", "we", "our", or "us"). By
        accessing or using our website, mobile applications, and other services
        (collectively, the “Services”), you agree to be bound by the following
        Terms and Conditions (“Terms”). If you do not agree to these Terms,
        please refrain from using our Services. We reserve the right to change
        these Terms at any time, and such modifications will be effective upon
        posting on our website. Your continued use of the Services constitutes
        acceptance of the updated Terms.
      </div>
      <div className="info-subheader-L" style={{ marginTop: "50px" }}>
        1. Acceptance of Terms
      </div>
      <div className="info-breadtext" style={{ marginTop: "10px" }}>
        By using our Services, you agree to comply with and be legally bound by
        these Terms, our{" "}
        <a className="info-redirect" href="/contact-us/privacy-p">
          Privacy Policy
        </a>
        , and any additional terms and conditions that may apply to specific
        sections of the Services or to products and services available through
        the Services. If you are using the Services on behalf of a company or
        other legal entity, you represent and warrant that you have the
        authority to bind that entity to these Terms.
      </div>
    </div>
  );
};

export default ShippingInfo;
