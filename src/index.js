import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Shop from "./components/Shop";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const images = [
  "https://drive.google.com/thumbnail?id=1OpU4lLrxSjRXXIBHOr1oafP81VlllBnK&sz=w1920",
  "https://drive.google.com/thumbnail?id=1b2SZXhtMjVTCwnlNua_8hbSCGt5cALB8&sz=w1920",
  "https://drive.google.com/thumbnail?id=11WSUd8-cjq_RmXK0YK-QhlGZ2ycxP8o8&sz=w1920",
  "https://drive.google.com/thumbnail?id=10P_vEyhCE-K2892V6RD-L-KC6lVfOieB&sz=w1920",
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Header />
      <Routes>
        <Route path="/" element={<Home images={images} interval={8000} />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
