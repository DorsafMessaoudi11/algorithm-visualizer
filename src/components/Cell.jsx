import React from "react";

const Cell = ({ cell, onClick }) => {
  let bg = "bg-white";
  if (cell.type === "wall") bg = "bg-black";
  if (cell.type === "start") bg = "bg-green-500";
  if (cell.type === "end") bg = "bg-red-500";
  if (cell.type === "visited") bg = "bg-blue-300";
  if (cell.type === "path") bg = "bg-yellow-400";

  return (
    <div
      onClick={onClick}
      className={`w-7 h-7 border border-gray-300 ${bg} hover:opacity-80 cell`}
    ></div>
  );
};

export default Cell;