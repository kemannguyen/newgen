import React from "react";
import "../../style/ContactPages.css";
import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FAQs = () => {
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} rounded {...props} />
  ))(({ theme }) => ({
    border: `1px solid  ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 20,
    },
    "&::before": {
      display: "none",
    },
  }));

  return (
    <div className="flexbox info">
      <div className="info-title" style={{ marginBottom: "20px" }}>
        FAQs
      </div>
      <div className="info-subheader-L">Common questions asked</div>
      <div className="info-breadtext" style={{ marginTop: "20px" }}>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            Where can I find my order?
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <div>
                To find your order you go to find order through the header.
              </div>
              <br></br>
              <div>
                Enter your order ID: "pi_...", you can find this ID in the email
                you did the purchase with.
              </div>
              <div>Press the find button and the order should appear.</div>
              <br></br>
              <a className="info-redirect" href="/contact-us/myorder">
                More detailed intructions
              </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            Where do you shipp to?
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <a className="sidebar-btn">We shipp everywhere!</a>
            </div>
            <div className="sidebar-section">
              <a className="info-redirect" href="/contact-us/shipping">
                More info about shipping.
              </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            Do you allow refunds?
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <div>
                <a className="sidebar-btn">
                  Yes, after you've completed your purchase you have{" "}
                  <a className="info-bold">30 days</a> to return your product if
                  you're not satisfied.
                </a>
              </div>
              <div>
                <a className="sidebar-btn">
                  <a className="info-bold">Please note</a> that the product has
                  to be in the same condition as it were when you first got it
                  for the return to be eligible.
                </a>
              </div>
              <div>
                <a className="info-redirect" href="/contact-us/returns">
                  Request a return
                </a>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            How do I track my order?
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <div>
                <a className="sidebar-btn">
                  When your order has been sent from our storage, you'll recive
                  an Universal Parcel Tracking number in your mail!
                </a>
              </div>
              <br></br>
              <div>
                {" "}
                To track the order enter the number in{" "}
                <a
                  className="info-redirect"
                  href="https://parcelsapp.com/en/tracking"
                >
                  https://parcelsapp.com/en/tracking.
                </a>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            How long does it take for a order to arrive?
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <div>
                <a className="sidebar-btn">
                  This usually depends on where you are located, but the
                  delivery usually takes:
                </a>
              </div>
              <div>
                <a className="info-bold">EU: 5-7 days.</a>
              </div>
              <div>
                <a className="info-bold">Outside: 10-14 days.</a>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            What payment methods do you accept?
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <a className="sidebar-btn">
                Currently we only accept debit card payments such as VISA,
                Mastercard etc. But we are working on implementing more payment
                methods in the near future.
              </a>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div style={{ marginTop: "100px" }}>
        <div className="info-subheader">
          Still haven't found the answer to your questions?
        </div>
        <div className="info-breadtext">Reach customer support</div>
        <div className="info-breadtext">
          <a className="info-redirect" href="contact-us/details">
            {" "}
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
