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

function scoreRound(move, outcome) {
  return MOVES[move] + OUTCOMES[outcome];
}

let partOneMoves = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

let partOneOutcomes = {
  "A X": "draw",
  "A Y": "win",
  "A Z": "loss",
  "B X": "loss",
  "B Y": "draw",
  "B Z": "win",
  "C X": "win",
  "C Y": "loss",
  "C Z": "draw",
};

let partTwoMoves = {
  "A X": "scissors",
  "A Y": "rock",
  "A Z": "paper",
  "B X": "rock",
  "B Y": "paper",
  "B Z": "scissors",
  "C X": "paper",
  "C Y": "scissors",
  "C Z": "rock",
};

let partTwoOutcomes = {
  X: "loss",
  Y: "draw",
  Z: "win",
};

let partOneSum = 0;
let partTwoSum = 0;
input.split("\n").forEach((round) => {
  partOneSum += scoreRound(
    partOneMoves[round.slice(-1)],
    partOneOutcomes[round]
  );
  partTwoSum += scoreRound(
    partTwoMoves[round],
    partTwoOutcomes[round.slice(-1)]
  );
});

console.log(`Part 1: ${partOneSum}`);
console.log(`Part 2: ${partTwoSum}`);
