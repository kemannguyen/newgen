// src/components/SideNavbar.js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/SideNavbar.css";

const SideNavbar = ({ categories, selectedCategory, onCategoryChange }) => {
  const location = useLocation();
  const [inShop, setInShop] = useState(false);

  useEffect(() => {
    let tempPath = location.pathname;
    if (tempPath.includes("/shop")) {
      setInShop(true);
    } else {
      setInShop(false);
    }
  }, [location.pathname]);

  return (
    <div className={inShop ? "visible" : "hidden"}>
      <div className="side-navbar">
        <h2>Categories</h2>
        <ul>
          <li>
            <Link
              to="/shop"
              className={location.pathname === "/shop" ? "active" : ""}
              onClick={() => onCategoryChange("")}
            >
              All
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`shop/category/${category}`}
                className={
                  location.pathname === `shop/category/${category}`
                    ? "active"
                    : ""
                }
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
