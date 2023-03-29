import React from "react";

function SubHeader({ title, color, bgcolor }) {
  return (
    <div className="sub-header" style={{ color: color, backgroundColor: bgcolor }}>
      {title}
    </div>
  );
}

export default SubHeader;
