// src/components/ClothingItem.js
import React from "react";

const ClothingItem = ({ item }) => {
  //remove category later, only here

  return (
    <div className="clothing-item">
      <img src={item.Image} alt={item.Name} className="clothing-image" />
      <span className="item-title">{item.Name}</span>
      {/*<p>Category: {item.category}</p>*/}
      <br></br>
      <span>{item.Description}</span>
      <p className="item-price">${item.Price}</p>
    </div>
  );
};

export default ClothingItem;
