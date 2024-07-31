// src/components/ShoppingPage.js
import React, { useState, useEffect } from "react";
import clothingData from "../data/clothingData";
import ClothingItem from "./ClothingItem";
import "../style/Shop.css";

const Shop = ({ selectedCategory }) => {
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredClothing = selectedCategory
    ? clothingData.filter((item) => item.category === selectedCategory)
    : clothingData;

  const totalPages = Math.ceil(filteredClothing.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = filteredClothing.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="shopping-page margintop80">
      <div className="clothing-list">
        {selectedItems.map((item) => (
          <ClothingItem key={item.id} item={item} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
