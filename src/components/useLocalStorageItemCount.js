import { useState, useEffect } from "react";

const useLocalStorageItemCount = (key) => {
  const [itemCount, setItemCount] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem(key)) || [];
    return storedItems.length;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedItems = JSON.parse(localStorage.getItem(key)) || [];
      setItemCount(storedItems.length);
    };

    window.addEventListener("storage", handleStorageChange);

    // For same-tab updates, you might also want to dispatch a custom event as needed
    window.addEventListener("storageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, [key]);

  return itemCount;
};
export default useLocalStorageItemCount;
