// src/components/Grid.jsx
import React, { useState } from "react";
import Cell from "./Cell";
import Controls from "./Controls";
import { bfs, aStar, dfs, dijkstra, sleep } from "../utils/algorithms";

const Grid = ({ rows = 20, cols = 20 }) => {
  // Create empty grid
  const createGrid = () =>
    Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({ row: r, col: c, type: "empty" }))
    );

  const [grid, setGrid] = useState(createGrid());
  const [mode, setMode] = useState("wall"); // current tool: wall/start/end
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [speed, setSpeed] = useState(20); // animation speed

  // Handle clicking a cell
  const handleCellClick = (r, c) => {
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    const cell = newGrid[r][c];

    if (mode === "start") {
      if (startNode) newGrid[startNode.row][startNode.col].type = "empty";
      cell.type = "start";
      setStartNode({ row: r, col: c });
    } else if (mode === "end") {
      if (endNode) newGrid[endNode.row][endNode.col].type = "empty";
      cell.type = "end";
      setEndNode({ row: r, col: c });
    } else {
      if (cell.type !== "start" && cell.type !== "end") {
        cell.type = cell.type === "wall" ? "empty" : "wall";
      }
    }

    setGrid(newGrid);
  };

  // Reset the grid
  const resetGrid = () => {
    setGrid(createGrid());
    setStartNode(null);
    setEndNode(null);
  };

  // Run BFS
  const runBFS = async () => {
    if (!startNode || !endNode) {
      alert("Please set start and end nodes!");
      return;
    }
    await bfs(grid, startNode, endNode, setGrid, speed);
  };

  // Run A*
  const runAStar = async () => {
    if (!startNode || !endNode) {
      alert("Please set start and end nodes!");
      return;
    }
    await aStar(grid, startNode, endNode, setGrid, speed);
  };
  const runDFS = async () => {
    if (!startNode || !endNode) { alert("Set start/end"); return; }
    await dfs(grid, startNode, endNode, setGrid, speed);
  };

  const runDijkstra = async () => {
    if (!startNode || !endNode) { alert("Set start/end"); return; }
    await dijkstra(grid, startNode, endNode, setGrid, speed);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      {/* Controls */}
      <Controls
        setMode={setMode}
        runBFS={runBFS}
        runAStar={runAStar}
        resetGrid={resetGrid}
        speed={speed}
        setSpeed={setSpeed}
      />

      {/* Grid */}
      <div className="flex flex-col items-center mt-6">
        <div
          className="grid gap-1 shadow-lg p-2 rounded-xl"
          style={{ gridTemplateColumns: `repeat(${cols}, 30px)` }}
        >
          {grid.flat().map(cell => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              onClick={() => handleCellClick(cell.row, cell.col)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;