const input = require("fs").readFileSync(`${__dirname}/sample.txt`).toString();

const MOVES = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const OUTCOMES = {
  win: 6,
  draw: 3,
  loss: 0,
};

let partOneMoves = {
  X: MOVES.rock,
  Y: MOVES.paper,
  Z: MOVES.scissors,
};

let partOneOutcomes = {
  "A X": OUTCOMES.draw,
  "A Y": OUTCOMES.win,
  "A Z": OUTCOMES.loss,
  "B X": OUTCOMES.loss,
  "B Y": OUTCOMES.draw,
  "B Z": OUTCOMES.win,
  "C X": OUTCOMES.win,
  "C Y": OUTCOMES.loss,
  "C Z": OUTCOMES.draw,
};

let partTwoMoves = {
  "A X": MOVES.scissors,
  "A Y": MOVES.rock,
  "A Z": MOVES.paper,
  "B X": MOVES.rock,
  "B Y": MOVES.paper,
  "B Z": MOVES.scissors,
  "C X": MOVES.paper,
  "C Y": MOVES.scissors,
  "C Z": MOVES.rock,
};

let partTwoOutcomes = {
  X: OUTCOMES.loss,
  Y: OUTCOMES.draw,
  Z: OUTCOMES.win,
};

let partOneSum = 0;
let partTwoSum = 0;
input.split("\n").forEach((round) => {
  partOneSum += partOneMoves[round.slice(-1)] + partOneOutcomes[round];
  partTwoSum += partTwoMoves[round] + partTwoOutcomes[round.slice(-1)];
});

console.log(`Part 1: ${partOneSum}`);
console.log(`Part 2: ${partTwoSum}`);
