import React, { useEffect } from "react";
import "../style/Snackbar.css"; // Optional: to style the Snackbar

const Snackbar = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className="snackbar">{message}</div>;
};

export default Snackbar;
