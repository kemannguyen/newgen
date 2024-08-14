import React, { useState, useEffect, useRef } from "react";
import "../style/Home.css";

const Home = ({ images, interval = 8000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 0); // Change the delay here if needed
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, interval);

    return () => {
      clearInterval(slideInterval.current);
    };
  }, []);

  const goToSlide = (index) => {
    clearInterval(slideInterval.current);
    setCurrentIndex(index);
    slideInterval.current = setInterval(nextSlide, interval);
  };

  return (
    <div className="margintop80">
      <div className="slider ">
        <div
          className="slider-wrapper"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className="slide" key={index}>
              <img src={image} alt="loading.." />
            </div>
          ))}
        </div>
        <button className="prev" onClick={prevSlide}>
          ❮
        </button>
        <button className="next" onClick={nextSlide}>
          ❯
        </button>
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className={`fade-in ${visible ? "show" : ""}`}>
        <div className="title2 graybg">
          <p style={{ marginBottom: 100 }}>
            DON'T FOLLOW TRENDS, SET THEM
            <br />
          </p>
        </div>
        <div className="breadtext graybg">
          Times are changing, people's style are constantly
        </div>
        <div className="breadtext graybg">
          getting more unique and free spirited so we the
        </div>
        <div className="breadtext graybg">
          fashion industry also has to adapt.
        </div>
        <div className="breadtext graybg">
          New Gen's goal is to proivde a place where
        </div>
        <div className="breadtext graybg">
          YOU can experiment and find your own unique style!
        </div>
        <div className="breadtext graybg bold">
          <p style={{ marginTop: 50 }}>DON'T SETTLE, BE A TRENDSETTER.</p>
        </div>

        <div className="breadtext lightgraybg">
          <p className="margintop80">
            Another color background with small pic animate when scrolling to it
            "fade in" and more text here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
