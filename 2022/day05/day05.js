const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();
const [diagram, moveStrings] = input.split("\n\n");

const moves = moveStrings.split("\n").map((str) => {
  let [num, from, to] = str
    .match(/move (\d+) from (\d+) to (\d+)/)
    .slice(1, 4)
    .map(Number);
  return { num, from: from - 1, to: to - 1 };
});

function getStacks(diagram) {
  let stacks = [];
  let rows = diagram.split("\n");
  let numCols = (rows[0].length + 1) / 4;
  for (ii = 0; ii < numCols; ii++) {
    stacks[ii] = [];
  }

  rows.pop(); // pop the stack indices off…
  rows.forEach((row) => {
    for (let ii = 0; ii < numCols; ii++) {
      let offset = ii * 4 + 1;
      let char = row[offset];
      if (char != " ") {
        stacks[ii].push(char);
      }
    }
  });
  return stacks;
}

// Part 1
{
  let stacks = getStacks(diagram);
  moves.forEach((move) => {
    let { num, from, to } = move;
    while (num--) {
      stacks[to].unshift(stacks[from].shift());
    }
  });

  console.log(`Part 1: ${stacks.map((stack) => stack[0]).join("")}`);
}

// Part 2
{
  let stacks = getStacks(diagram);
  moves.forEach((move) => {
    let { num, from, to } = move;
    stacks[to].unshift(...stacks[from].splice(0, num));
  });

  console.log(`Part 2: ${stacks.map((stack) => stack[0]).join("")}`);
}
