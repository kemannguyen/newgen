import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { firebaseApp } from "../firebase-config";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
import "../style/Order.css";

const Order = () => {
  //use this for dev local
  const stripe = require("stripe")(process.env.STRIPE_SECRET);
  const navigate = useNavigate();

  const [cEmail, setcEmail] = useState();
  const [cTotal, setcTotal] = useState();
  const [cItems, setcItems] = useState([]);
  const [orderItems, setoItems] = useState([]);
  const [showItems, setShowItems] = useState([]);
  const [once, setOnce] = useState(false);
  const [once2, setOnce2] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [adress, setAdress] = useState("");
  const [searchID, setSearchID] = useState("");
  const [shippingfee, setShipping] = useState(0);

  const location = useLocation();
  const patharr = location.pathname.split("/");
  const uniqueItemIds = new Set();

  const db = getFirestore(firebaseApp);

  const q = query(collection(db, "items"));

  useEffect(() => {
    const fetchData = async () => {
      //clear basket after buy
      localStorage.clear();
      window.dispatchEvent(new Event("storageChange"));

      //fetch store items
      const sessionStorageItems = sessionStorage.getItem("clothingItems");
      if (sessionStorageItems) {
        setcItems(JSON.parse(sessionStorageItems));
        console.log("session storage all");
      } else {
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
        setcItems(items);
        sessionStorage.setItem("clothingItems", JSON.stringify(items));
        console.log("fetch all");
      }
    };

    //PROD
    //`/api/fetch-session?sessionId=${patharr[2]}`

    //DEV
    //`http://localhost:7000/api/fetch-session?sessionId=${patharr[2]}`

    const fetchSessionData = async () => {
      if (!patharr[2]) {
        return;
      }
      try {
        const response = await fetch(
          `/api/fetch-session?sessionId=${patharr[2]}`
        );
        const data = await response.json();

        const session = data.session;
        const lineItems = data.lineItems.data;

        setcEmail(session.customer_details.email);
        setcTotal(session.amount_total / 100);
        setOrderID(session.payment_intent);
        setAdress(session.shipping_details.address);

        const items = lineItems.map((lineItem) => lineItem.description);
        setoItems(items);
        console.log("sess", session.total_details.amount_shipping);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();
    //---
    fetchData();
  }, []);

  const saveifnotexisting = async (orderref) => {
    try {
      // Query the Firestore collection to check if a document with the same name exists
      const usersRef = collection(db, "orders");
      const q2 = query(usersRef, where("ID", "==", orderref));
      const querySnapshot = await getDocs(q2);

      if (!querySnapshot.empty) {
        // If a document with the same name exists, show a message and don't add it to Firestore

        console.log("order exists already");
      } else {
        // If no document with the same name exists, proceed to add the new user
        await addDoc(collection(db, "orders"), {
          ID: orderref,
          sessID: patharr[2],
        });

        console.log("order ADDED");
      }
    } catch (error) {
      console.error("Error checking or adding document: ", error);
    }
  };

  //saves the orderRef to the database if it doesnt already exist
  if (orderID !== "" && !once2) {
    console.log(orderID);
    saveifnotexisting(orderID);
    setOnce2(true);
  }

  //make objects for the item cards
  let shownitems = [];
  if (orderItems.length > 0 && once === false) {
    for (let i = 0; i < orderItems.length; i++) {
      try {
        let itemsplit = orderItems[i].split(":");
        let name = itemsplit[0].trim();
        let size = itemsplit[1].trim();
        console.log("name:size", name, ":", size);
        const foundItem = cItems.find((item) => item.Name === name);
        //console.log("found", foundItem);
        let tempitem = {
          Name: name,
          Size: size,
          Image: foundItem.Image,
          Price: foundItem.Price,
        };
        shownitems.push(tempitem);
      } catch {}
    }
    setOnce(true);
    setShowItems(shownitems);
  }
  // Get the number of duplicates for a specific item
  const getDuplicateCount = (itemName, itemSize) => {
    return showItems.filter(
      (item) => item.Name === itemName && item.Size === itemSize
    ).length;
  };

  const searchinfirebase = async (orderref) => {
    try {
      // Query the Firestore collection to check if a document with the same name exists
      const usersRef = collection(db, "orders");
      const q2 = query(usersRef, where("ID", "==", orderref));
      const querySnapshot = await getDocs(q2);

      if (!querySnapshot.empty) {
        // If a document with the same name exists, show a message and don't add it to Firestore
        const doc = querySnapshot.docs[0];
        console.log(doc.data());
        let tempItem = doc.data();
        console.log(tempItem.sessID);
        navigate(`/order/${tempItem.sessID}`);
        window.location.reload();
      } else {
        // If no document with the same name exists, proceed to add the new user
        console.log("order doesn't exist");
      }
    } catch (error) {
      console.error("Error checking or adding document: ", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    // Logic to handle the search can be added here
    console.log("Searching for:", searchID);
    searchinfirebase(searchID);
  };

  if (showItems.length === 0) {
    return (
      <div className="margintop-hd find-order-container ">
        <div className="find-order-text">Find your order</div>
        <div>
          <input
            className="find-order-input"
            type="text"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter order ID"
          />
          <button className="find-order-btn" onClick={handleSearch}>
            Find
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="margintop100">
      <div className="order-text">
        <div className="order-title">Order: {orderID}</div>
        <div>{cEmail}</div>
        <div>
          Shipping info: {adress.line1}, {adress.postal_code} {adress.city}
        </div>
      </div>
      {showItems.map((item, index) => {
        const uniqueKey = `${item.ID}-${item.Size}-${index}`; // Ensure each key is unique, even for duplicates

        if (uniqueItemIds.has(item.ID + item.Size)) {
          return null; // Skip rendering if the item ID and Size combo has already been mapped out
        }

        uniqueItemIds.add(item.ID + item.Size);
        return (
          <div key={uniqueKey}>
            <div className="basket-item-cards">
              <img className="basket-img" src={item.Image} alt="" />
              <div className="basket-row-sort">
                <div className="basket-itemname">{item.Name}</div>
                <div>Size: {item.Size}</div>
                <div className="basket-price">${item.Price}</div>
              </div>
              <span className="order-dupe">
                x{getDuplicateCount(item.Name, item.Size)}
              </span>
            </div>
          </div>
        );
      })}
      <div className="order-text">Shipping: ${cTotal}</div>
      <div className="order-text">Total: ${cTotal}</div>
    </div>
  );
};

export default Order;
