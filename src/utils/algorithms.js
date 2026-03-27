// src/utils/algorithms.js

// =======================
// 💤 Sleep Helper
// =======================
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Normalize speed (slower = better visualization)
function getDelay(speed) {
  return Math.max(10, 200 - speed);
}

// =======================
// 🔵 BFS
// =======================
export async function bfs(grid, startNode, endNode, setGrid, speed = 20) {
  const directions = [[1,0],[-1,0],[0,1],[0,-1]];
  const queue = [startNode];
  const visited = new Set([key(startNode)]);
  const parent = new Map();

  while (queue.length) {
    const current = queue.shift();

    if (current !== startNode && current !== endNode) {
      current.type = "visited";
      setGrid([...grid]);
      await sleep(getDelay(speed));
    }

    if (isEnd(current, endNode)) {
      await reconstructPath(parent, endNode, startNode, grid, setGrid, speed);
      return;
    }

    for (const [dr, dc] of directions) {
      const neighbor = getNeighbor(grid, current, dr, dc);
      if (!neighbor || neighbor.type === "wall") continue;

      const k = key(neighbor);
      if (!visited.has(k)) {
        visited.add(k);
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  alert("No path found!");
}

// =======================
// 🟣 DFS
// =======================
export async function dfs(grid, startNode, endNode, setGrid, speed = 20) {
  const directions = [[1,0],[-1,0],[0,1],[0,-1]];
  const visited = new Set();
  const parent = new Map();

  async function dfsVisit(node) {
    if (!node || visited.has(key(node))) return false;

    visited.add(key(node));

    if (node !== startNode && node !== endNode) {
      node.type = "visited";
      setGrid([...grid]);
      await sleep(getDelay(speed));
    }

    if (isEnd(node, endNode)) return true;

    for (const [dr, dc] of directions) {
      const neighbor = getNeighbor(grid, node, dr, dc);
      if (!neighbor || neighbor.type === "wall") continue;

      if (!visited.has(key(neighbor))) {
        parent.set(neighbor, node);
        if (await dfsVisit(neighbor)) return true;
      }
    }

    return false;
  }

  const found = await dfsVisit(startNode);
  if (found) {
    await reconstructPath(parent, endNode, startNode, grid, setGrid, speed);
  } else {
    alert("No path found!");
  }
}

// =======================
// 🟡 A* Algorithm
// =======================
export async function aStar(grid, startNode, endNode, setGrid, speed = 20) {
  const openSet = [startNode];
  const cameFrom = new Map();

  const gScore = new Map();
  const fScore = new Map();

  initializeScores(grid, gScore, fScore);

  gScore.set(key(startNode), 0);
  fScore.set(key(startNode), heuristic(startNode, endNode));

  while (openSet.length) {
    openSet.sort((a, b) => fScore.get(key(a)) - fScore.get(key(b)));
    const current = openSet.shift();

    if (current !== startNode && current !== endNode) {
      current.type = "visited";
      setGrid([...grid]);
      await sleep(getDelay(speed));
    }

    if (isEnd(current, endNode)) {
      await reconstructPath(cameFrom, endNode, startNode, grid, setGrid, speed);
      return;
    }

    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const neighbor = getNeighbor(grid, current, dr, dc);
      if (!neighbor || neighbor.type === "wall") continue;

      const tentative = gScore.get(key(current)) + 1;

      if (tentative < gScore.get(key(neighbor))) {
        cameFrom.set(neighbor, current);
        gScore.set(key(neighbor), tentative);
        fScore.set(key(neighbor), tentative + heuristic(neighbor, endNode));

        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    }
  }

  alert("No path found!");
}

// =======================
// 🔴 Dijkstra
// =======================
export async function dijkstra(grid, startNode, endNode, setGrid, speed = 20) {
  const dist = new Map();
  const visited = new Set();
  const parent = new Map();

  initializeDistances(grid, dist);
  dist.set(key(startNode), 0);

  const pq = [startNode];

  while (pq.length) {
    pq.sort((a, b) => dist.get(key(a)) - dist.get(key(b)));
    const current = pq.shift();

    if (visited.has(key(current))) continue;
    visited.add(key(current));

    if (current !== startNode && current !== endNode) {
      current.type = "visited";
      setGrid([...grid]);
      await sleep(getDelay(speed));
    }

    if (isEnd(current, endNode)) {
      await reconstructPath(parent, endNode, startNode, grid, setGrid, speed);
      return;
    }

    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const neighbor = getNeighbor(grid, current, dr, dc);
      if (!neighbor || neighbor.type === "wall") continue;

      const alt = dist.get(key(current)) + 1;

      if (alt < dist.get(key(neighbor))) {
        dist.set(key(neighbor), alt);
        parent.set(neighbor, current);
        pq.push(neighbor);
      }
    }
  }

  alert("No path found!");
}

// =======================
// 🟢 Reconstruct Path
// =======================
export async function reconstructPath(parent, endNode, startNode, grid, setGrid, speed = 20) {
  let current = endNode;

  while (current !== startNode) {
    current = parent.get(current);
    if (!current || current === startNode) break;

    current.type = "path";
    setGrid([...grid]);
    await sleep(getDelay(speed));
  }
}

// =======================
// 🧠 Helpers
// =======================

function key(node) {
  return `${node.row}-${node.col}`;
}

function isEnd(a, b) {
  return a.row === b.row && a.col === b.col;
}

function getNeighbor(grid, node, dr, dc) {
  const r = node.row + dr;
  const c = node.col + dc;
  if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length) return null;
  return grid[r][c];
}

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function initializeScores(grid, gScore, fScore) {
  for (let row of grid) {
    for (let cell of row) {
      gScore.set(key(cell), Infinity);
      fScore.set(key(cell), Infinity);
    }
  }
}

function initializeDistances(grid, dist) {
  for (let row of grid) {
    for (let cell of row) {
      dist.set(key(cell), Infinity);
    }
  }
}