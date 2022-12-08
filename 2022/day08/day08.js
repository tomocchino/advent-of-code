const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();
const lines = input.split("\n");

function createGrid(lines) {
  let grid = [];
  let rows = lines.length;
  let cols = lines[0].length;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!grid[row]) {
        grid[row] = [];
      }
      grid[row].push(Number(lines[row][col]));
    }
  }
  return grid;
}

function treeIsVisible(grid, row, col) {
  let numRows = grid.length;
  let numCols = grid[0].length;
  if (row == 0 || col == 0 || row == numRows - 1 || col == numCols - 1) {
    return true;
  }

  let point = grid[row][col];

  let up = row;
  let upIsClear = true;
  while (--up >= 0) {
    let next = grid[up][col];
    if (next >= point) {
      upIsClear = false;
    }
  }

  let right = col;
  let rightIsClear = true;
  while (++right < grid.length) {
    let next = grid[row][right];
    if (next >= point) {
      rightIsClear = false;
    }
  }

  let down = row;
  let downIsClear = true;
  while (++down < grid.length) {
    let next = grid[down][col];
    if (next >= point) {
      downIsClear = false;
    }
  }

  let left = col;
  let leftIsClear = true;
  while (--left >= 0) {
    let next = grid[row][left];
    if (next >= point) {
      leftIsClear = false;
    }
  }

  return upIsClear || rightIsClear || downIsClear || leftIsClear;
}

let grid = createGrid(lines);
console.log(grid, "\n");

let visibleTrees = 0;
grid.forEach((row, ii) => {
  row.forEach((cell, jj) => {
    if (treeIsVisible(grid, ii, jj)) {
      visibleTrees++;
    }
  });
});

console.log(`\nPart 1: ${visibleTrees}`);

function findScenicScore(grid, row, col) {
  let numRows = grid.length;
  let numCols = grid[0].length;
  if (row == 0 || col == 0 || row == numRows - 1 || col == numCols - 1) {
    return true;
  }

  let point = grid[row][col];

  let up = row;
  let upScore = 0;
  let upIsClear = true;
  while (upIsClear && --up >= 0) {
    let next = grid[up][col];
    if (next >= point) {
      upIsClear = false;
    }
    upScore++;
  }

  let right = col;
  let rightScore = 0;
  let rightIsClear = true;
  while (rightIsClear && ++right < grid.length) {
    let next = grid[row][right];
    if (next >= point) {
      rightIsClear = false;
    }
    rightScore++;
  }

  let down = row;
  let downScore = 0;
  let downIsClear = true;
  while (downIsClear && ++down < grid.length) {
    let next = grid[down][col];
    if (next >= point) {
      downIsClear = false;
    }
    downScore++;
  }

  let left = col;
  let leftScore = 0;
  let leftIsClear = true;
  while (leftIsClear && --left >= 0) {
    let next = grid[row][left];
    if (next >= point) {
      leftIsClear = false;
    }
    leftScore++;
  }

  return upScore * rightScore * leftScore * downScore;
}

let scenicScores = [];
for (let row = 1; row < grid.length - 1; row++) {
  for (let col = 1; col < grid[row].length - 1; col++) {
    scenicScores.push(findScenicScore(grid, row, col));
  }
}
console.log(scenicScores);
console.log(`Part 2: ${Math.max(...scenicScores)}`);
