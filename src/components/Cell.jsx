// src/components/Cell.jsx
import React from "react";

const Cell = ({ cell, onMouseDown, onMouseEnter, onMouseUp }) => {
  let bg = "bg-white";
  let cursor = "cursor-pointer";

  switch (cell.type) {
    case "wall":
      bg = "bg-gray-900";
      break;
    case "start":
      bg = "bg-green-500";
      break;
    case "end":
      bg = "bg-red-500";
      break;
    case "visited":
      bg = "bg-blue-400";
      break;
    case "path":
      bg = "bg-yellow-400";
      break;
    default:
      bg = "bg-white";
  }

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      className={`w-7 h-7 border border-gray-700 ${bg} ${cursor} 
                 transition-colors duration-200 hover:opacity-80 rounded-sm`}
    ></div>
  );
};

export default Cell;