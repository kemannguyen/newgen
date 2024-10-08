import React, { useState, useEffect } from "react";
import "../style/Basket.css";
import Snackbar from "./Snackbar";
import { firebaseApp } from "../firebase-config";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";

function Basket() {
  const [basketItems, setBasketItems] = useState([]);
  const [sizes, setItemSizes] = useState([]);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [totalprice, settotalprice] = useState(0);

  const uniqueItemIds = new Set();

  let basketItemKey = 0;

  const db = getFirestore(firebaseApp);
  //   const q = query(
  //     collection(db, "itemsinstock"),
  //     where("ID", "==", parseInt(patharr[3]))
  //   );

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };
  const localStorageKeyExists = (key) => {
    return localStorage.getItem(key) !== null;
  };

  // Load items from local storage when the component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem("myBasket");
    if (localStorageKeyExists("myBasket")) {
      if (storedItems) {
        setBasketItems(JSON.parse(storedItems));
      }
      let tempArr = JSON.parse(storedItems);

      const fetchData = async (itemID, q) => {
        const sessionStorageSizes = sessionStorage.getItem("itemsSizes");
        let itemsizes = sessionStorageSizes
          ? JSON.parse(sessionStorageSizes)
          : [];

        // Check if the size for the current itemID is already present
        const sizeExists = itemsizes.some(
          (size) => size.ID.toString() === itemID
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
          console.log("Fetched and added new sizes to local storage.");
        } else {
          // If size exists, just set the state
          setItemSizes(itemsizes);
          console.log("Size exists, no need to fetch.");
        }
      };
      let temptotprice = 0;
      for (let i = 0; i < tempArr.length; i++) {
        const q = query(
          collection(db, "itemsinstock"),
          where("ID", "==", parseInt(tempArr[i].ID))
        );
        fetchData(tempArr[i].ID, q);
        temptotprice += tempArr[i].Price;
      }
      settotalprice(temptotprice);
    }
  }, []);

  // Function to remove an item from the basket
  const removeItem = (removeditem) => {
    const initialCount = basketItems.length;

    const updatedItems = basketItems.filter(
      (item) => !(item.ID === removeditem.ID && item.Size === removeditem.Size)
    );

    const removedCount = initialCount - updatedItems.length;
    let newtotprice = totalprice - removeditem.Price * removedCount;
    settotalprice(newtotprice);

    console.log("removing: ", removeditem);
    setBasketItems(updatedItems);
    showSnackbar("Item removed from basket!");
    localStorage.setItem("myBasket", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("storageChange"));
  };

  //DUPLICATES****

  const saveToLocalStorage = (item) => {
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
              parsedItem[i].ID === item.ID &&
              parsedItem[i].Size === item.Size
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
      (size) => size.ID.toString() === item.ID && size.Size === item.Size
    );

    //add if there is stock for it
    if (tempItem.Amount - duplicateCount >= 0) {
      const addedItem = {
        ID: item.ID,
        Name: item.Name,
        Size: item.Size,
        ImgUrl: item.ImgUrl,
        Price: item.Price,
        ItemKey: basketItemKey,
      };

      const updatedItems = [...basketItems, addedItem];
      setBasketItems(updatedItems);

      dataArray.push(addedItem);
      const jsonString = JSON.stringify(dataArray); // Convert object to JSON string
      localStorage.setItem("myBasket", jsonString); // Save to local storage

      window.dispatchEvent(new Event("storageChange"));

      console.log("Object saved to local storage:", addedItem);
      let newtotprice = totalprice + addedItem.Price;
      settotalprice(newtotprice);
      showSnackbar("Item added to basket!");
    } else {
      console.log("You've already selected all the ones in stock");
      showSnackbar("You have already selected all the ones in stock!");
    }
  };

  // Function to add a duplicate item to the basket
  const addDuplicate = (addedItem) => {
    saveToLocalStorage(addedItem);
  };

  // Function to remove a duplicate item from the basket
  const removeDuplicate = (removeditem) => {
    const itemIndex = basketItems.findLastIndex(
      (item) => item.ID === removeditem.ID && item.Size === removeditem.Size
    );
    if (itemIndex > -1) {
      const updatedItems = basketItems.filter(
        (_, index) => index !== itemIndex
      );

      setBasketItems(updatedItems);
      localStorage.setItem("myBasket", JSON.stringify(updatedItems));
      window.dispatchEvent(new Event("storageChange"));
      let newtotprice = totalprice - removeditem.Price;
      settotalprice(newtotprice);
      showSnackbar("Item removed from basket!");
    }
  };

  // Get the number of duplicates for a specific item
  const getDuplicateCount = (itemId, itemSize) => {
    return basketItems.filter(
      (item) => item.ID === itemId && item.Size === itemSize
    ).length;
  };

  //payment integration

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PpSl2RwzgwWxDaI63QX1bujUuP369rNjATqpX7mYH9J6NzlzARCD8EALfgX5GWzYD6dTF64kPqLguvvEhuQAPlE00iQpelFLq"
    ); // Your public key

    const items = basketItems.map((item) => ({
      id: item.ID,
      name: item.Name,
      size: item.Size,
      price: item.Price * 100, // Convert dollars to cents
      //quantity: getDuplicateCount(item.ID, item.Size),
    }));

    //for prod
    //"https://newgenfashion.vercel.app/api/create-checkout-session"

    //for dev
    //"http://localhost:7000/api/create-checkout-session"

    try {
      const response = await fetch(
        "https://newgenfashion.vercel.app/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items }),
        }
      );
      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      console.log("result::", result);
      if (result.error) {
        alert(result.error.message);
        console.log("error2", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to initiate payment process.");
    }
  };
  // If basket is empty, display a message
  if (basketItems.length === 0) {
    return (
      <div className="margintop-hd flexbox flex-center-h">
        Your basket is empty!
      </div>
    );
  }
  return (
    <div className="flexbox">
      <h1 className="margintop-hd basket-title">Your Basket</h1>
      <div className="totprice">
        test card: 4242 4242 4242 4242, any future date, cvc.
      </div>
      {basketItems.map((item, index) => {
        const uniqueKey = `${item.ID}-${item.Size}-${index}`; // Ensure each key is unique, even for duplicates

        if (uniqueItemIds.has(item.ID + item.Size)) {
          return null; // Skip rendering if the item ID and Size combo has already been mapped out
        }

        uniqueItemIds.add(item.ID + item.Size);

        return (
          <div key={uniqueKey}>
            <div className="basket-item-cards">
              <img className="basket-img" src={item.ImgUrl} alt="" />
              <div className="basket-row-sort">
                <div className="basket-itemname">{item.Name}</div>
                <div>Size: {item.Size}</div>
                <div className="basket-price">${item.Price}</div>
              </div>

              <button
                className="basket-dupe-btn-l"
                onClick={() => removeDuplicate(item)}
              >
                -
              </button>
              <span className="dupe-amt">
                {getDuplicateCount(item.ID, item.Size)}
              </span>
              <button
                className="basket-dupe-btn"
                onClick={() => addDuplicate(item)}
              >
                +
              </button>
              <button
                className="basket-remove"
                onClick={() => removeItem(item)}
              >
                Remove all
              </button>
            </div>
          </div>
        );
      })}
      <div className="totprice">Total: ${totalprice}</div>
      <button className="checkoutbtn" onClick={makePayment}>
        Check out
      </button>
      {snackbarVisible && (
        <Snackbar
          message={snackbarMessage}
          duration={3000}
          onClose={handleCloseSnackbar}
        />
      )}
    </div>
  );
}

export default Basket;
