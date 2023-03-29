import React, { useState } from "react";

function GoTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <div>
      <div
        style={{
          position: "fixed",
          right: "1%",
          bottom: "40px",
          height: "20px",
          fontSize: "3rem",
          zIndex: "1",
          cursor: "pointer",
          color: "green",
          border: "none",
        }}
      >
        <div className="back-to-top" onClick={scrollToTop} style={{ display: visible ? "inline" : "none" }}>
          Top
        </div>
      </div>
    </div>
  );
}

export default GoTop;
