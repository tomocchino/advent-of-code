const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();
const [diagram, moveStrings] = input.split("\n\n");

const moves = moveStrings.split("\n").map((str) => {
  let [num, from, to] = str
    .match(/move (\d+) from (\d+) to (\d+)/)
    .slice(1, 4)
    .map(Number);
  return { num, from: from - 1, to: to - 1 };
});

let rows = diagram.split("\n");
let numCols = (rows[0].length + 1) / 4;
let stacks = new Array(numCols).fill("");
rows.pop(); // pop the stack indices off…
rows.forEach((row) => {
  for (let ii = 0; ii < numCols; ii++) {
    let offset = ii * 4 + 1;
    let char = row[offset];
    if (char != " ") {
      stacks[ii] += char;
    }
  }
});

let part1Stacks = stacks.slice();
moves.forEach((move) => {
  let { num, from, to } = move;
  while (num--) {
    part1Stacks[to] = part1Stacks[from][0] + part1Stacks[to];
    part1Stacks[from] = part1Stacks[from].slice(1);
  }
});

let part2Stacks = stacks.slice();
moves.forEach((move) => {
  let { num, from, to } = move;
  part2Stacks[to] = part2Stacks[from].slice(0, num) + part2Stacks[to];
  part2Stacks[from] = part2Stacks[from].slice(num);
});

console.log(`Part 1: ${part1Stacks.map((stack) => stack[0]).join("")}`);
console.log(`Part 2: ${part2Stacks.map((stack) => stack[0]).join("")}`);
