import React from "react";
import "./Button.css";

const Button = ({ children, onClickHandler, disabled = false }) => {
  return (
    <button onClick={onClickHandler} className="buttons" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
