// src/components/Filter.js
import React from "react";

const Filter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter">
      <button
        className={selectedCategory === "" ? "active" : ""}
        onClick={() => onCategoryChange("")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;
