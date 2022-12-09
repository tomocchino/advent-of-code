const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();
const lines = input.split("\n");

let numRows = lines.length;
let numCols = lines[0].length;
let gridString = lines.join("");

function getPoint(row, col) {
  return gridString[row * numCols + col];
}

function getDirectionalTreeInfo(row, col, direction) {
  let point = getPoint(row, col);
  let isClear = true;
  let score = 0;
  switch (direction) {
    case "up":
      while (isClear && --row >= 0) {
        let next = getPoint(row, col);
        if (next >= point) {
          isClear = false;
        }
        score++;
      }
      break;
    case "right":
      while (isClear && ++col < numCols) {
        let next = getPoint(row, col);
        if (next >= point) {
          isClear = false;
        }
        score++;
      }
      break;
    case "down":
      while (isClear && ++row < numRows) {
        let next = getPoint(row, col);
        if (next >= point) {
          isClear = false;
        }
        score++;
      }
      break;
    case "left":
      while (isClear && --col >= 0) {
        let next = getPoint(row, col);
        if (next >= point) {
          isClear = false;
        }
        score++;
      }
      break;
  }
  return { isClear, score };
}

let visibleTrees = 0;
let scenicScores = [];
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    let up = getDirectionalTreeInfo(row, col, "up");
    let right = getDirectionalTreeInfo(row, col, "right");
    let down = getDirectionalTreeInfo(row, col, "down");
    let left = getDirectionalTreeInfo(row, col, "left");

    if (up.isClear || right.isClear || down.isClear || left.isClear) {
      visibleTrees++;
    }
    scenicScores.push(up.score * right.score * down.score * left.score);
  }
}

console.log(`\nPart 1: ${visibleTrees}`);
console.log(`Part 2: ${Math.max(...scenicScores)}`);

// Sample
// Part 1: 21
// Part 2: 8

// Input
// Part 1: 1538
// Part 2: 496125
