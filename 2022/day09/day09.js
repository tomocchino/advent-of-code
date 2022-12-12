const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();

function createRope(knots) {
  return Array.from({ length: knots }, () => [0, 0]);
}

function isTouching(point1, point2) {
  let [p1x, p1y] = point1;
  let [p2x, p2y] = point2;
  return Math.abs(p1x - p2x) <= 1 && Math.abs(p1y - p2y) <= 1;
}

function movePoint(point, dir) {
  if (dir == "R") {
    point[0]++;
  } else if (dir == "D") {
    point[1]--;
  } else if (dir == "L") {
    point[0]--;
  } else if (dir == "U") {
    point[1]++;
  }
}

function catchPointUp(point1, point2) {
  let [p1x, p1y] = point1;
  let [p2x, p2y] = point2;

  let dx = p2x - p1x;
  let dy = p2y - p1y;

  let tx = dx > 0 ? 1 : -1;
  let ty = dy > 0 ? 1 : -1;

  point1[0] += dx == 0 ? 0 : tx;
  point1[1] += dy == 0 ? 0 : ty;
}

function simulateRope(moves, length) {
  let rope = createRope(length);
  let tailLocations = new Set();

  moves.forEach(([dir, count]) => {
    while (count-- > 0) {
      movePoint(rope[0], dir);
      for (let ii = 1; ii < rope.length; ii++) {
        let pointInFront = rope[ii - 1];
        let pointInBack = rope[ii];
        if (!isTouching(pointInBack, pointInFront)) {
          catchPointUp(pointInBack, pointInFront);
        }
        if (ii == rope.length - 1) {
          tailLocations.add(pointInBack.join(","));
        }
      }
    }
  });

  return tailLocations.size;
}

let moves = input.split("\n").map((line) => {
  let [dir, count] = line.split(" ");
  return [dir, Number(count)];
});

console.log(`Part 1: ${simulateRope(moves, 2)}`);
console.log(`Part 2: ${simulateRope(moves, 10)}`);
