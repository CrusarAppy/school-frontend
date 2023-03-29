import React from "react";
import { convertToNepali } from "../../helpers/nepaliConvert";

const NepaliTextField = React.forwardRef(({ id, inputClass, text, setText, placeholder, inputRef }, ref) => {
  const handleChange = (e) => {
    setText(convertToNepali(e.target.value));
  };

  return (
    <textarea className={inputClass} value={text} onChange={handleChange} id={id} placeholder={placeholder} ref={ref} />
  );
});

export default NepaliTextField;
