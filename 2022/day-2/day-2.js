const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();

// Part 1
{
  let W = 6;
  let D = 3;
  let L = 0;

  let points = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  let outcomes = {
    "A X": D,
    "A Y": W,
    "A Z": L,
    "B X": L,
    "B Y": D,
    "B Z": W,
    "C X": W,
    "C Y": L,
    "C Z": D,
  };

  let sum = 0;
  let rounds = input.split("\n");
  rounds.forEach((round) => {
    sum += outcomes[round] + points[round.slice(-1)];
  });

  console.log(`Part 1: ${sum}`);
}

// Part 2

{
  let A = 1; // rock
  let B = 2; // paper
  let C = 3; // scissors

  let outcome = {
    X: 0, // loss
    Y: 3, // draw
    Z: 6, // win
  };

  let choices = {
    "A X": C,
    "A Y": A,
    "A Z": B,
    "B X": A,
    "B Y": B,
    "B Z": C,
    "C X": B,
    "C Y": C,
    "C Z": A,
  };

  let sum = 0;
  let rounds = input.split("\n");
  rounds.forEach((round) => {
    sum += choices[round] + outcome[round.slice(-1)];
  });

  console.log(`Part 2: ${sum}`);
}
