// src/components/ItemPage.js
import React from "react";
import "../style/ItemPage.css";

function ItemPage({ item }) {
  if (!item)
    return <div className="margintop80 marginleft80">Item not found!</div>;
  const selectedItem = item;

  return (
    <div className="margintop80 marginleft80">
      <h1>
        {item.Name} : {item.ID}
      </h1>
      <p>{item.Description}</p>
      <p>{item.Price}</p>
    </div>
  );
}

export default ItemPage;
