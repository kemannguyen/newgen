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
import Snackbar from "./Snackbar";

function ItemPage() {
  const location = useLocation();
  const [citems, setcItems] = useState([]);
  const [itemID, setitemID] = useState();
  const [sizes, setItemSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState();

  const patharr = location.pathname.split("/");

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  let basketItemKey = 0;

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleButtonClick = () => {
    showSnackbar("Item added to basket!");
  };

  let item;

  const db = getFirestore(firebaseApp);

  const qi = query(collection(db, "items"));

  const q = query(
    collection(db, "itemsinstock"),
    where("ID", "==", parseInt(patharr[3]))
  );

  useEffect(() => {
    const fetchData = async () => {
      const sessionStorageItems = sessionStorage.getItem("clothingItems");
      if (sessionStorageItems) {
        setcItems(JSON.parse(sessionStorageItems));
      } else {
        const querySnapshot = await getDocs(qi);
        const items = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
        setcItems(items);
        sessionStorage.setItem("clothingItems", JSON.stringify(items));
        console.log("fetch all");
      }
      const sessionStorageSizes = sessionStorage.getItem("itemsSizes");
      let itemsizes = sessionStorageSizes
        ? JSON.parse(sessionStorageSizes)
        : [];

      // Check if the size for the current itemID is already present
      const sizeExists = itemsizes.some(
        (size) => size.ID.toString() === patharr[3]
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
    };
    setitemID(patharr[3]);
    fetchData();
  }, [location]);

  //Finds the item that are suppose to be shown
  if (citems.length > 0) {
    item = citems.find((item) => item.ID.toString() === itemID);
  }

  //sorts sized S M L
  let array = sizes;
  const sortedArray = array.sort((a, b) => {
    const order = { S: 1, M: 2, L: 3 };
    return order[a.Size] - order[b.Size];
  });

  //Saves the selected size for add to basket
  const selectSize = (letter) => {
    setSelectedSize(letter);
    console.log("PRESSED: RESULTS ", letter);
  };

  //saves object to local storage
  const saveToLocalStorage = () => {
    let duplicateCount = 1;
    let dataArray = [];
    try {
      const key = localStorage.key(0);
      const existingData = localStorage.getItem(key);
      dataArray = existingData ? JSON.parse(existingData) : [];

      if (existingData) {
        try {
          const parsedItem = JSON.parse(existingData); // Parse the JSON string back into an object

          // Check if the item has an ID and if it equals the item id
          for (let i = 0; i < parsedItem.length; i++) {
            if (
              parsedItem[i].ID === itemID &&
              parsedItem[i].Size === selectedSize
            ) {
              duplicateCount++;
            }
            console.log(i + 1);
          }
          console.log("LENGTH", parsedItem.length);
          basketItemKey = parsedItem.length;
        } catch (error) {
          console.log(`Could not parse item with key ${key}: `, error);
        }
      }
    } catch (error) {
      console.log("nothing in localstorage yet", error);
    }
    //find item that we selected
    let tempItem = sizes.find(
      (size) => size.ID.toString() === itemID && size.Size === selectedSize
    );

    //add if there is stock for it
    if (tempItem.Amount - duplicateCount >= 0) {
      const addedItem = {
        ID: itemID,
        Name: item.Name,
        Size: selectedSize,
        ImgUrl: item.Image,
        Price: item.Price,
        ItemKey: basketItemKey,
      };

      dataArray.push(addedItem);
      const jsonString = JSON.stringify(dataArray); // Convert object to JSON string
      localStorage.setItem("myBasket", jsonString); // Save to local storage

      window.dispatchEvent(new Event("storageChange"));

      console.log("Object saved to local storage:", addedItem);
      showSnackbar("Item added to basket!");
    } else {
      console.log("You've already selected all the ones in stock");
      showSnackbar("You have already selected all the ones in stock!");
    }
  };

  if (!item)
    return (
      <div className="margintop100 marginleft80 flexbox">Item not found!</div>
    );

  return (
    <div className="margintop100 marginleft flexbox">
      <div className=" item-page">
        <h1>{item.Name}</h1>
        <img className="item-image" src={item.Image} alt="" />
        <div className="item-body">
          <div className="item-body-l">
            <p>{item.Name} </p>
            <p>${item.Price}</p>
            <div className="sizes-layout">
              {sortedArray.map((itemsize) => {
                if (itemsize.ID.toString() === itemID) {
                  const isDisabled = itemsize.Amount < 1;

                  return (
                    <div
                      className={`size-layout ${
                        selectedSize === itemsize.Size ? "active" : ""
                      } ${isDisabled ? "disabled" : ""}`}
                      key={itemsize.ID + itemsize.Size}
                      onClick={() => {
                        if (!isDisabled) {
                          selectSize(itemsize.Size);
                        }
                      }}
                    >
                      {itemsize.Size}
                      {itemsize.Amount}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="item-body-r">
            <p>{item.Description} item desc</p>
          </div>
        </div>
        <button
          className={`btn ${selectedSize != null ? "active" : "disabled"}`}
          onClick={() => saveToLocalStorage()}
        >
          Add to cart
        </button>
        {snackbarVisible && (
          <Snackbar
            message={snackbarMessage}
            duration={3000}
            onClose={handleCloseSnackbar}
          />
        )}
      </div>
    </div>
  );
}

export default ItemPage;
