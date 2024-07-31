// src/components/ClothingItem.js
import React from "react";

const ClothingItem = ({ item }) => {
  //remove category later, only here
  return (
    <div className="clothing-item">
      <img src={item.imageUrl} alt={item.name} className="clothing-image" />
      <span className="item-title">{item.name}</span>
      {/*<p>Category: {item.category}</p>*/}
      <br></br>
      <span>{item.description}</span>
      <p className="item-price">${item.price}</p>
    </div>
  );
};

export default ClothingItem;
