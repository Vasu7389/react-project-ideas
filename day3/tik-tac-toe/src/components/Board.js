import React from "react";
import Square from "./Square";

const style = {
  borderRadius: "10px",
  width: "250px",
  height: "250px",
  margin: "0 auto",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
  boxShadow: "#3c8be0 5px 5px 3px 0px",
};

const Board = ({ squares, handleClick }) => (
  <div style={style}>
    {squares.map((square, index) => (
      <Square key={index} value={square} onClick={() => handleClick(index)} />
    ))}
  </div>
);

export default Board;
