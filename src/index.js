import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Shop from "./components/Shop";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const images = [
  "https://drive.google.com/thumbnail?id=1Z5poGhDEscqZuGMT35OOh4p1rzSzB_PS&sz=w1920",
  "https://drive.google.com/thumbnail?id=1OpU4lLrxSjRXXIBHOr1oafP81VlllBnK&sz=w1920",
  "https://drive.google.com/thumbnail?id=1ytHhVRZR6rAyL335kYbo2209h7Hhmmcr&sz=w1920",
  "https://drive.google.com/thumbnail?id=1iEI41bIEvuJPL5qQjF0U63pFvQxK0yio&sz=w1920",
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Header />
      <Routes>
        <Route path="/" element={<Home images={images} interval={8000} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/outfit-of-the-day" element={<Shop />} />
        <Route path="/about-us" element={<Shop />} />
        <Route path="/basket" element={<Shop />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
