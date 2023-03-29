import React from "react";

const NumberInput = ({ id, inputClass, text, setText, placeholder }) => {
  const handleChange = (e) => {
    if (!isNaN(e.target.value)) {
      setText(e.target.value);
    }
  };

  return (
    <input
      className={inputClass}
      value={text}
      onChange={handleChange}
      id={id}
      placeholder={placeholder}
    />
  );
};

export default NumberInput;
