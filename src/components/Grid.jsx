// src/components/Grid.jsx

import React, { useState } from "react";
import Cell from "./Cell";
import Controls from "./Controls";
import { bfs, aStar, dfs, dijkstra } from "../utils/algorithms";

const Grid = ({ rows = 20, cols = 20 }) => {

  // =======================
  // 🧱 Create Grid
  // =======================
  const createGrid = () =>
    Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({
        row: r,
        col: c,
        type: "empty"
      }))
    );

  const [grid, setGrid] = useState(createGrid());
  const [mode, setMode] = useState("wall");
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [speed, setSpeed] = useState(50);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // =======================
  // 🖱️ Handle Cell Interaction
  // =======================
  const handleCellClick = (r, c) => {
    if (isRunning) return;

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
      // Draw walls
      if (cell.type !== "start" && cell.type !== "end") {
        cell.type = cell.type === "wall" ? "empty" : "wall";
      }
    }

    setGrid(newGrid);
  };

  // =======================
  // 🔄 Reset Grid
  // =======================
  const resetGrid = () => {
    if (isRunning) return;
    setGrid(createGrid());
    setStartNode(null);
    setEndNode(null);
  };

  // =======================
  // 🚀 Run Algorithms (safe)
  // =======================
  const runAlgo = async (algo) => {
    if (!startNode || !endNode) {
      alert("Please set start and end nodes!");
      return;
    }

    setIsRunning(true);
    await algo(grid, startNode, endNode, setGrid, speed);
    setIsRunning(false);
  };

  const runBFS = () => runAlgo(bfs);
  const runDFS = () => runAlgo(dfs);
  const runAStar = () => runAlgo(aStar);
  const runDijkstra = () => runAlgo(dijkstra);

  // =======================
  // 🎨 Render
  // =======================
  return (
    <div className="p-4 flex flex-col items-center">

      {/* Controls */}
      <Controls
        setMode={setMode}
        runBFS={runBFS}
        runDFS={runDFS}
        runAStar={runAStar}
        runDijkstra={runDijkstra}
        resetGrid={resetGrid}
        speed={speed}
        setSpeed={setSpeed}
      />

      {/* Grid */}
      <div className="flex flex-col items-center mt-6">

        <div
          className="grid gap-1 p-3 rounded-2xl bg-slate-800 shadow-2xl"
          style={{ gridTemplateColumns: `repeat(${cols}, 30px)` }}
          onMouseLeave={() => setIsMouseDown(false)}
        >
          {grid.flat().map(cell => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}

              onMouseDown={() => {
                setIsMouseDown(true);
                handleCellClick(cell.row, cell.col);
              }}

              onMouseEnter={() => {
                if (isMouseDown) {
                  handleCellClick(cell.row, cell.col);
                }
              }}

              onMouseUp={() => setIsMouseDown(false)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Grid;