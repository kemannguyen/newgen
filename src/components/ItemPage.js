// src/components/ItemPage.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../style/ItemPage.css";

function ItemPage() {
  const location = useLocation();
  const [citems, setcItems] = useState([]);
  const [itemID, setitemID] = useState();
  let item;

  useEffect(() => {
    const fetchData = async () => {
      const localStorageItems = localStorage.getItem("clothingItems");
      if (localStorageItems) {
        setcItems(JSON.parse(localStorageItems));
      } else {
        console.log("what");
      }
      let temppatharr = location.pathname.split("/");
      setitemID(temppatharr[3]);
    };
    fetchData();
  }, []);

  console.log("items", citems, itemID);
  if (citems.length > 0) {
    item = citems.find((item) => item.ID == itemID);
  }

  if (!item)
    return <div className="margintop80 marginleft80">Item not found!</div>;

  return (
    <div className="margintop80 marginleft80">
      <h1>
        {item.Name} : {item.ID}
      </h1>
      <img src={item.Image} />
      <p>{item.Description}</p>
      <p>${item.Price}</p>
    </div>
  );
}

export default ItemPage;
