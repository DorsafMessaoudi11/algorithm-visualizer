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
    <div className="w-full flex flex-col gap-4 p-4 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">

      {/* 🧠 Mode Selection */}
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-400 mb-2">Select Tool</p>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 transition shadow-md"
            onClick={() => setMode("start")}
          >
            Start
          </button>

          <button
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition shadow-md"
            onClick={() => setMode("end")}
          >
            End
          </button>
        </div>
      </div>

      {/* 🚀 Algorithms */}
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-400 mb-2">Algorithms</p>
        <div className="flex flex-wrap justify-center gap-3">

          <button
            className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition shadow-md"
            onClick={runBFS}
          >
            BFS
          </button>

          <button
            className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 transition shadow-md"
            onClick={runDFS}
          >
            DFS
          </button>

          <button
            className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition shadow-md text-black"
            onClick={runAStar}
          >
            A*
          </button>

          <button
            className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 transition shadow-md"
            onClick={runDijkstra}
          >
            Dijkstra
          </button>

        </div>
      </div>

      {/* ⚡ Speed Control */}
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-400 mb-2">Animation Speed</p>
        <div className="flex items-center gap-3">
          <input
            id="speed"
            type="range"
            min="10"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-40 accent-indigo-500"
          />
          <span className="text-sm text-gray-300">{speed}</span>
        </div>
      </div>

      {/* 🔄 Reset */}
      <div className="flex justify-center">
        <button
          className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition shadow-md"
          onClick={resetGrid}
        >
          Reset Grid
        </button>
      </div>

    </div>
  );
};

export default Controls;