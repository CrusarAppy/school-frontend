import React from "react";
import { Form } from "react-bootstrap";
import { convertToNepali } from "../../utils/nepaliInput/nepaliConvert";
const NepaliInput = React.forwardRef(
  ({ id, text, setText, placeholder }, ref) => {
    const handleChange = (e) => {
      setText(convertToNepali(e.target.value));
    };

    return (
      <Form.Control
        type="text"
        name="title"
        placeholder={placeholder}
        value={text || ""}
        onChange={handleChange}
      />
    );
  }
);

export default NepaliInput;
