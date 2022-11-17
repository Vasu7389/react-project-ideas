import React from "react";

const style = {
  background: "#e73d9f",
  border: "2px solid #4935ff",
  fontSize: "2rem",
  fontWeight: "800",
  cursor: "pointer",
  outline: "none",
};

const Square = ({ value, onClick }) => (
  <button style={style} onClick={onClick}>
    {value}
  </button>
);

export default Square;
