const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();
const lines = input.split("\n");

let grid = lines.join("");
let numRows = lines.length;
let numCols = lines[0].length;

function getTree(row, col) {
  return Number(grid[row * numCols + col]);
}

function getTreeInfo(row, col, direction) {
  let score = 0;
  let isClear = true;
  let currentTree = getTree(row, col);

  function checkTree(row, col) {
    isClear = getTree(row, col) < currentTree;
    score++;
  }

  if (direction == "n") {
    while (isClear && --row >= 0) {
      checkTree(row, col);
    }
  } else if (direction == "e") {
    while (isClear && ++col < numCols) {
      checkTree(row, col);
    }
  } else if (direction == "s") {
    while (isClear && ++row < numRows) {
      checkTree(row, col);
    }
  } else if (direction == "w") {
    while (isClear && --col >= 0) {
      checkTree(row, col);
    }
  }

  return { isClear, score };
}

let visibleTrees = 0;
let scenicScores = [];
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    let n = getTreeInfo(row, col, "n");
    let e = getTreeInfo(row, col, "e");
    let s = getTreeInfo(row, col, "s");
    let w = getTreeInfo(row, col, "w");

    if (n.isClear || e.isClear || s.isClear || w.isClear) {
      visibleTrees++;
    }
    scenicScores.push(n.score * e.score * s.score * w.score);
  }
}

console.log(`Part 1: ${visibleTrees}`);
console.log(`Part 2: ${Math.max(...scenicScores)}`);
