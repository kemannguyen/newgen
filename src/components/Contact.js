import React, { useEffect, useState } from "react";
import "../style/Contact.css";
import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Shop from "./Shop";
import Order from "./Order";
import FAQs from "./ContactPages/FAQs";

const Contact = () => {
  const [component, setComp] = useState();
  const path = window.location.pathname.split("/");
  var pathname = "/" + path[2];

  //components change due to paths
  useEffect(() => {
    switch (pathname) {
      case "/details":
        console.log("path = /details");
        break;
      case "/myorder":
        setComp(<Order />);
        break;
      case "/contact-us":
        break;
      case "/order":
        break;
      case "/basket":
        break;
      default:
        setComp(<FAQs />);
        break;
    }
  }, [pathname]);

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `0px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 20,
    },
    "&::before": {
      display: "none",
    },
  }));
  return (
    <div className="flexbox contact-container">
      <div className="contact-sidebar">
        <div className="sidebar-header">HELP CENTER</div>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            Customer Care
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us/details">
                Contact us
              </a>
            </div>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us/myorder">
                My Order
              </a>
            </div>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us">
                FAQs
              </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            Shipping & Returns
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us/shipping">
                Shipping optons
              </a>
            </div>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us/returns">
                Returns
              </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            Our Compnay
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us/about-us">
                About us
              </a>
            </div>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us/career">
                Career
              </a>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            className="sidebar-title"
            expandIcon={<ArrowDropDownIcon />}
          >
            Legal
          </AccordionSummary>
          <AccordionDetails>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us/terms">
                Terms and Conditions
              </a>
            </div>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us/privacy-p">
                Privacy Policy
              </a>
            </div>
            <div className="sidebar-section">
              <a className="sidebar-btn" href="/contact-us/cookie-p">
                Cookie Policy
              </a>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="contact-body margintop80">{component}</div>
    </div>
  );
};

export default Contact;
