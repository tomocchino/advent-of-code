const input = require("fs").readFileSync(`${__dirname}/sample.txt`).toString();
const lines = input.split("\n");

let numRows = lines.length;
let numCols = lines[0].length;
let gridString = lines.join("");

function getPoint(row, col) {
  return gridString[row * numCols + col];
}

function treeIsVisible(row, col) {
  let point = getPoint(row, col);

  let up = row;
  let upIsClear = true;
  while (--up >= 0) {
    let next = getPoint(up, col);
    if (next >= point) {
      upIsClear = false;
    }
  }

  let right = col;
  let rightIsClear = true;
  while (++right < numCols) {
    let next = getPoint(row, right);
    if (next >= point) {
      rightIsClear = false;
    }
  }

  let down = row;
  let downIsClear = true;
  while (++down < numRows) {
    let next = getPoint(down, col);
    if (next >= point) {
      downIsClear = false;
    }
  }

  let left = col;
  let leftIsClear = true;
  while (--left >= 0) {
    let next = getPoint(row, left);
    if (next >= point) {
      leftIsClear = false;
    }
  }

  return upIsClear || rightIsClear || downIsClear || leftIsClear;
}

function getVisibleTreeCount() {
  let visibleTrees = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (treeIsVisible(row, col)) {
        visibleTrees++;
      }
    }
  }
  return visibleTrees;
}

function getScenicScore(row, col) {
  if (row == 0 || col == 0 || row == numRows - 1 || col == numCols - 1) {
    return true;
  }

  let point = getPoint(row, col);

  let up = row;
  let upScore = 0;
  let upIsClear = true;
  while (upIsClear && --up >= 0) {
    let next = getPoint(up, col);
    if (next >= point) {
      upIsClear = false;
    }
    upScore++;
  }

  let right = col;
  let rightScore = 0;
  let rightIsClear = true;
  while (rightIsClear && ++right < numCols) {
    let next = getPoint(row, right);
    if (next >= point) {
      rightIsClear = false;
    }
    rightScore++;
  }

  let down = row;
  let downScore = 0;
  let downIsClear = true;
  while (downIsClear && ++down < numRows) {
    let next = getPoint(down, col);
    if (next >= point) {
      downIsClear = false;
    }
    downScore++;
  }

  let left = col;
  let leftScore = 0;
  let leftIsClear = true;
  while (leftIsClear && --left >= 0) {
    let next = getPoint(row, left);
    if (next >= point) {
      leftIsClear = false;
    }
    leftScore++;
  }

  return upScore * rightScore * leftScore * downScore;
}

function getScenicScores() {
  let scenicScores = [];
  for (let row = 1; row < numRows - 1; row++) {
    for (let col = 1; col < numCols - 1; col++) {
      scenicScores.push(getScenicScore(row, col));
    }
  }
  return scenicScores;
}

console.log(`\nPart 1: ${getVisibleTreeCount()}`);
console.log(`Part 2: ${Math.max(...getScenicScores())}`);
