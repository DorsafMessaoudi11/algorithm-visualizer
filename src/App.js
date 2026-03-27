import React from "react";
import Grid from "./components/Grid";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
          Algorithm Visualizer
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Visualize pathfinding algorithms in real-time
        </p>
      </header>

      {/* Main Content */}
      <main className="flex justify-center items-start px-4 pb-10">
        <div className="w-full max-w-6xl bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700">
          <Grid />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm pb-4">
        Built with React + Tailwind CSS 🚀
      </footer>

    </div>
  );
}

export default App;
