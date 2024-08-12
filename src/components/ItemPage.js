// src/components/ItemPage.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../style/ItemPage.css";
import { firebaseApp } from "../firebase-config";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function ItemPage() {
  const location = useLocation();
  const [citems, setcItems] = useState([]);
  const [itemID, setitemID] = useState();
  const [sizes, setItemSizes] = useState([]);
  const patharr = location.pathname.split("/");

  let item;

  const db = getFirestore(firebaseApp);

  const q = query(
    collection(db, "itemsinstock"),
    where("ID", "==", parseInt(patharr[3]))
  );

  useEffect(() => {
    const fetchData = async () => {
      const sessionStorageItems = sessionStorage.getItem("clothingItems");
      if (sessionStorageItems) {
        setcItems(JSON.parse(sessionStorageItems));
      }
      const sessionStorageSizes = sessionStorage.getItem("itemsSizes");
      let itemsizes = sessionStorageSizes
        ? JSON.parse(sessionStorageSizes)
        : [];

      // Check if the size for the current itemID is already present
      const sizeExists = itemsizes.some(
        (size) => size.ID.toString() == patharr[3]
      );

      if (!sizeExists) {
        // If size doesn't exist, fetch from Firestore
        const querySnapshot = await getDocs(q);
        const fetchedSizes = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        // Add fetched sizes to the existing sizes array
        itemsizes = [...itemsizes, ...fetchedSizes];
        setItemSizes(itemsizes);

        // Update local storage
        sessionStorage.setItem("itemsSizes", JSON.stringify(itemsizes));
        console.log(
          "Fetched and added new sizes to local storage.",
          patharr[3]
        );
      } else {
        // If size exists, just set the state
        setItemSizes(itemsizes);
        console.log("Size exists, no need to fetch.");
      }

      setitemID(patharr[3]);
    };
    fetchData();
  }, [location]);

  console.log("stock", sizes);
  if (citems.length > 0) {
    item = citems.find((item) => item.ID.toString() === itemID);
  }

  if (!item)
    return <div className="margintop100 marginleft80 ">Item not found!</div>;

  return (
    <div className="margintop100 marginleft">
      <div className=" item-page">
        <h1>
          {item.Name} : {item.ID}
        </h1>
        <img className="item-image" src={item.Image} alt="" />
        <div className="item-body">
          <div className="item-body-l">
            <p>${item.Price}</p>
            {sizes.map((itemsize) => (
              <div key={itemsize.ID + itemsize.Size}>
                {itemsize.Size} : {itemsize.Amount} left in stock
              </div>
            ))}
          </div>
          <div className="item-body-r">
            <p>{item.Name} </p>
            <p>{item.Description} item desc</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
