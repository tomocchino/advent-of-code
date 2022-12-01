const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();

function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}

// Part 1
{
  let maxCalories = 0;
  let inventories = input.split("\n\n");
  inventories.forEach((inventory) => {
    let snackCalories = inventory.split("\n").map((str) => parseInt(str, 10));
    maxCalories = Math.max(maxCalories, sum(snackCalories));
  });

  console.log(`Part 1: ${maxCalories}`);
}

// Part 2
{
  let inventories = input.split("\n\n");
  let calorieCounts = inventories.map((inventory) => {
    let snackCalories = inventory.split("\n").map((str) => parseInt(str, 10));
    return sum(snackCalories);
  });

  let topThree = calorieCounts.sort((a, b) => b - a).slice(0, 3);
  let topThreeSum = sum(topThree);

  console.log(`Part 2: ${topThreeSum}`);
}
