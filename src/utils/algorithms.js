// src/utils/algorithms.js

// Sleep helper
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// BFS Algorithm
export async function bfs(grid, startNode, endNode, setGrid, speed = 20) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [1, 0], [-1, 0], [0, 1], [0, -1]
  ];

  const queue = [];
  const visited = new Set();
  const parent = new Map();

  queue.push(startNode);
  visited.add(`${startNode.row}-${startNode.col}`);

  while (queue.length > 0) {
    const current = queue.shift();
    const { row, col } = current;

    if (current !== startNode && current !== endNode) {
      grid[row][col].type = "visited";
      setGrid([...grid]);
      await sleep(speed);
    }

    if (row === endNode.row && col === endNode.col) {
      await reconstructPath(parent, endNode, startNode, grid, setGrid, speed);
      return;
    }

    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const neighbor = grid[nr][nc];
        const key = `${nr}-${nc}`;

        if (!visited.has(key) && neighbor.type !== "wall") {
          queue.push(neighbor);
          visited.add(key);
          parent.set(neighbor, current);
        }
      }
    }
  }

  alert("No path found!");
}

// A* Algorithm
export async function aStar(grid, startNode, endNode, setGrid, speed = 20) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [1, 0], [-1, 0], [0, 1], [0, -1]
  ];

  const openSet = [];
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  function key(node) { return `${node.row}-${node.col}`; }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      gScore.set(key(grid[r][c]), Infinity);
      fScore.set(key(grid[r][c]), Infinity);
    }
  }

  gScore.set(key(startNode), 0);
  fScore.set(key(startNode), heuristic(startNode, endNode));

  openSet.push(startNode);

  while (openSet.length > 0) {
    // Pick node with lowest fScore
    openSet.sort((a, b) => fScore.get(key(a)) - fScore.get(key(b)));
    const current = openSet.shift();

    if (current !== startNode && current !== endNode) {
      current.type = "visited";
      setGrid([...grid]);
      await sleep(speed);
    }

    if (current.row === endNode.row && current.col === endNode.col) {
      await reconstructPath(cameFrom, endNode, startNode, grid, setGrid, speed);
      return;
    }

    for (const [dr, dc] of directions) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const neighbor = grid[nr][nc];
        if (neighbor.type === "wall") continue;

        const tentative_g = gScore.get(key(current)) + 1;
        if (tentative_g < gScore.get(key(neighbor))) {
          cameFrom.set(neighbor, current);
          gScore.set(key(neighbor), tentative_g);
          fScore.set(key(neighbor), tentative_g + heuristic(neighbor, endNode));
          if (!openSet.includes(neighbor)) openSet.push(neighbor);
        }
      }
    }
  }

  alert("No path found!");
}

// Heuristic function for A* (Manhattan distance)
function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

// Unified reconstructPath for BFS & A*
export async function reconstructPath(cameFrom, endNode, startNode, grid, setGrid, speed = 20) {
  let current = endNode;
  while (current !== startNode) {
    current = cameFrom.get(current);
    if (!current || current === startNode) break;
    current.type = "path";
    setGrid([...grid]);
    await sleep(speed);
  }
}
export async function dfs(grid, startNode, endNode, setGrid, speed = 20) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [[1,0], [-1,0], [0,1], [0,-1]];
  const visited = new Set();
  const parent = new Map();

  async function dfsVisit(node) {
    if (!node || visited.has(`${node.row}-${node.col}`)) return false;
    visited.add(`${node.row}-${node.col}`);

    if (node !== startNode && node !== endNode) {
      node.type = "visited";
      setGrid([...grid]);
      await sleep(speed);
    }

    if (node.row === endNode.row && node.col === endNode.col) return true;

    for (const [dr, dc] of directions) {
      const nr = node.row + dr;
      const nc = node.col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const neighbor = grid[nr][nc];
        if (neighbor.type === "wall") continue;
        if (!visited.has(`${nr}-${nc}`)) {
          parent.set(neighbor, node);
          const found = await dfsVisit(neighbor);
          if (found) return true;
        }
      }
    }
    return false;
  }

  const found = await dfsVisit(startNode);
  if (found) await reconstructPath(parent, endNode, startNode, grid, setGrid, speed);
  else alert("No path found!");
}
export async function dijkstra(grid, startNode, endNode, setGrid, speed = 20) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [[1,0], [-1,0], [0,1], [0,-1]];
  const dist = new Map();
  const visited = new Set();
  const parent = new Map();

  function key(node){ return `${node.row}-${node.col}`; }

  for (let r=0;r<rows;r++){
    for (let c=0;c<cols;c++){
      dist.set(key(grid[r][c]), Infinity);
    }
  }

  dist.set(key(startNode),0);
  const pq = [startNode];

  while(pq.length > 0){
    pq.sort((a,b)=>dist.get(key(a))-dist.get(key(b)));
    const current = pq.shift();
    visited.add(key(current));

    if(current !== startNode && current !== endNode){
      current.type = "visited";
      setGrid([...grid]);
      await sleep(speed);
    }

    if(current.row === endNode.row && current.col === endNode.col){
      await reconstructPath(parent,endNode,startNode,grid,setGrid,speed);
      return;
    }

    for(const [dr,dc] of directions){
      const nr = current.row + dr;
      const nc = current.col + dc;
      if(nr>=0 && nr<rows && nc>=0 && nc<cols){
        const neighbor = grid[nr][nc];
        if(neighbor.type==="wall") continue;
        const alt = dist.get(key(current)) + 1; // weight = 1
        if(alt < dist.get(key(neighbor))){
          dist.set(key(neighbor), alt);
          parent.set(neighbor,current);
          if(!visited.has(key(neighbor))) pq.push(neighbor);
        }
      }
    }
  }

  alert("No path found!");
}