// src/components/Controls.jsx
import React from "react";

const Controls = ({
  setMode,
  runBFS,
  runDFS,
  runAStar,
  runDijkstra,
  resetGrid,
  speed,
  setSpeed,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-2 bg-gray-100 rounded-lg shadow-md">
      
      {/* Mode Buttons */}
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={() => setMode("start")}
        >
          Start
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => setMode("end")}
        >
          End
        </button>
        <button
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          onClick={() => setMode("wall")}
        >
          Wall
        </button>
      </div>

      {/* Algorithm Buttons */}
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={runBFS}
        >
          BFS
        </button>
        <button
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          onClick={runDFS}
        >
          DFS
        </button>
        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          onClick={runAStar}
        >
          A*
        </button>
        <button
          className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          onClick={runDijkstra}
        >
          Dijkstra
        </button>
      </div>

      {/* Reset Button */}
      <div>
        <button
          className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition"
          onClick={resetGrid}
        >
          Reset
        </button>
      </div>

      {/* Speed Slider */}
      <div className="flex items-center gap-2">
        <label htmlFor="speed" className="text-gray-700">Speed:</label>
        <input
          id="speed"
          type="range"
          min="5"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-32"
        />
        <span>{speed} ms</span>
      </div>

    </div>
  );
};

export default Controls;