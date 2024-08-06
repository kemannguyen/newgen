// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Shop from "./components/Shop";
import SideNavbar from "./components/SideNavbar";
import clothingData from "./data/clothingData";
import ItemPage from "./components/ItemPage";

const App = () => {
  const images = [
    "https://drive.google.com/thumbnail?id=1Z5poGhDEscqZuGMT35OOh4p1rzSzB_PS&sz=w1920",
    "https://drive.google.com/thumbnail?id=1OpU4lLrxSjRXXIBHOr1oafP81VlllBnK&sz=w1920",
    "https://drive.google.com/thumbnail?id=1ytHhVRZR6rAyL335kYbo2209h7Hhmmcr&sz=w1920",
    "https://drive.google.com/thumbnail?id=1iEI41bIEvuJPL5qQjF0U63pFvQxK0yio&sz=w1920",
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = ["tops", "bottoms", "hoodies", "outerwear", "accessories"];
  const [selectedItem, setSelectedItem] = useState();
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handleSelectedItemChange = (item) => {
    setSelectedItem(item);
  };

  return (
    <Router>
      <Header />
      <div className="app-container">
        <SideNavbar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <Routes>
          <Route path="/" element={<Home images={images} interval={8000} />} />

          <Route
            path="/shop"
            element={
              <Shop
                selectedCategory=""
                onSelectedItemChange={handleSelectedItemChange}
              />
            }
          />
          {categories.map((category) => (
            <Route
              key={category}
              path={`/category/${category}`}
              element={
                <Shop
                  selectedCategory={category}
                  onSelectedItemChange={handleSelectedItemChange}
                />
              }
            />
          ))}
          <Route
            path="/shop/category/*"
            element={<Shop selectedCategory={selectedCategory} />}
          />
          <Route
            path="/shop/item/*"
            element={<ItemPage item={selectedItem} />}
          />

          <Route path="/outfit-of-the-day" element={""} />
          <Route path="/about-us" element={""} />
          <Route path="/basket" element={""} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
