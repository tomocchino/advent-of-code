const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();
const lines = input.split("\n");

let grid = lines.join("");
let numRows = lines.length;
let numCols = lines[0].length;

function getTree(row, col) {
  return Number(grid[row * numCols + col]);
}

function getTreeInfo(row, col, dir) {
  let score = 0;
  let isClear = true;
  let currentTree = getTree(row, col);

  function checkTree(row, col) {
    isClear = getTree(row, col) < currentTree;
    score++;
  }

  while (dir == "n" && isClear && --row >= 0) checkTree(row, col);
  while (dir == "w" && isClear && --col >= 0) checkTree(row, col);
  while (dir == "s" && isClear && ++row < numRows) checkTree(row, col);
  while (dir == "e" && isClear && ++col < numCols) checkTree(row, col);

  return { isClear, score };
}

let visibleTrees = 0;
let scenicScores = [];
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    let n = getTreeInfo(row, col, "n");
    let w = getTreeInfo(row, col, "w");
    let s = getTreeInfo(row, col, "s");
    let e = getTreeInfo(row, col, "e");

    scenicScores.push(n.score * w.score * s.score * e.score);
    if (n.isClear || w.isClear || s.isClear || e.isClear) {
      visibleTrees++;
    }
  }
}

console.log(`Part 1: ${visibleTrees}`);
console.log(`Part 2: ${Math.max(...scenicScores)}`);
