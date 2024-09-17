// src/components/ShoppingPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClothingItem from "./ClothingItem";
import "../style/Shop.css";
import { firebaseApp } from "../firebase-config";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const Shop = ({ selectedCategory }) => {
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const [citems, setcItems] = useState([]);

  const db = getFirestore(firebaseApp);

  const q = query(collection(db, "items"));

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  //replace depending in db
  //console.log("cdata", citems);

  const filteredClothing = selectedCategory
    ? citems.filter((item) => item.Category === selectedCategory)
    : citems;

  const totalPages = Math.ceil(filteredClothing.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = filteredClothing.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="shopping-page margintop80 flexbox">
      <div className="clothing-list">
        {selectedItems.map((item) => (
          <Link className="link" key={item.ID} to={`/shop/item/${item.ID}`}>
            <ClothingItem key={item.ID} item={item} />
          </Link>
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
