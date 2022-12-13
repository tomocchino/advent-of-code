const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();
const instructions = input.split("\n");
{
  let X = 1;
  let cycle = 0;
  let queuedValue = 0;

  let checkStart = 20;
  let checkStep = 40;
  let interesting = [];

  while (++cycle) {
    if (cycle % checkStep == checkStart) {
      // console.log(`After cycle ${cycle}, X = ${X} (${cycle * X})`);
      interesting.push(cycle * X);
    }

    let instruction = instructions.shift();
    if (!instruction) {
      break;
    }

    if (queuedValue) {
      X += queuedValue;
    }

    if (instruction == "noop") {
      queuedValue = 0;
    } else if (instruction.startsWith("addx")) {
      queuedValue = Number(instruction.split(" ")[1]);
      instructions.unshift("noop");
    }
  }

  function sum(list) {
    return list.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  console.log(`Part 1: ${sum(interesting)}`);
}
