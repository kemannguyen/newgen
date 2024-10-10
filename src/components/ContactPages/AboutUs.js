import React from "react";
import FadeInSection from "../FadeInSection";

const AboutUs = () => {
  return (
    <div className="flexbox" style={{ marginTop: "150px" }}>
      <div className="info-aboutus-container">
        <div className="info-aboutus-divider">
          <div className="info-aboutus-subheader-XL">About us</div>
          <div className="info-aboutus-breadtext" style={{ marginTop: "50px" }}>
            At NewGen Fashion, we believe that fashion is more than just
            clothing—it’s a form of self-expression. Our mission is to celebrate
            individuality by providing a diverse range of styles that empower
            people to embrace their unique creativity and freedom. We aspire to
            offer a wide assortment of high-quality apparel that caters to
            everyone, regardless of style, age, or preference.
            <br></br>
            <br></br>
            Whether you’re seeking bold statement pieces or timeless classics,
            our collections are thoughtfully curated to ensure there’s something
            for everyone. We are committed to delivering fashion at reasonable
            prices, without compromising on quality, because we believe that
            looking and feeling your best shouldn’t break the bank.
            <br></br>
            <br></br> Join us in redefining fashion, one outfit at a time, and
            discover your style with NewGen Fashion—where individuality and
            affordability meet.
          </div>
        </div>
        <div className="info-aboutus-divider" style={{ marginBottom: "40px" }}>
          <FadeInSection>
            <img
              className="info-aboutus-img"
              src="https://drive.google.com/thumbnail?id=10P8fiN3vqFqKVCPtZKpmwwFsYRWQqSqJ&sz=w1920"
            />
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
