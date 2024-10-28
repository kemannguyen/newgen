import React, { useEffect, useRef, useState } from "react";

const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Force reflow
  useEffect(() => {
    if (isVisible && sectionRef.current) {
      const node = sectionRef.current;
      node.classList.remove("visible"); // Temporarily remove the class
      void node.offsetWidth; // Trigger reflow
      node.classList.add("visible"); // Re-add the class to restart the animation
    }
  }, [isVisible]);

  return (
    <div className={`fade-in ${isVisible ? "visible" : ""}`} ref={sectionRef}>
      {children}
    </div>
  );
};

export default FadeInSection;
