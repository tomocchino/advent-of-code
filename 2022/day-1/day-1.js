const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();

function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}

let calorieSums = input
  .split("\n\n")
  .map((inventory) => {
    return sum(inventory.split("\n").map((str) => parseInt(str, 10)));
  })
  .sort((a, b) => b - a);

console.log(`Part 1: ${calorieSums[0]}`);
console.log(`Part 2: ${sum(calorieSums.slice(0, 3))}`);
