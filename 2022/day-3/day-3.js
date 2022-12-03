const input = require("fs").readFileSync(`${__dirname}/sample.txt`).toString();
const lines = input.split("\n");

const LOWER_START = "a".charCodeAt(0) - 1;
const UPPER_START = "A".charCodeAt(0) - 27;

function decode(letter) {
  let code = letter.charCodeAt(0);
  if (/[a-z]/.test(letter)) {
    return code - LOWER_START;
  } else if (/[A-Z]/.test(letter)) {
    return code - UPPER_START;
  }
}

function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}

// Part 1

let part1Duplicates = [];
lines.forEach((line) => {
  let mid = Math.floor(line.length / 2);
  let set1 = new Set(line.slice(0, mid));
  let set2 = new Set(line.slice(mid));
  Array.from(set2).forEach((val) => {
    if (set1.has(val)) {
      part1Duplicates.push(decode(val));
    }
  });
});

console.log(`Part 1: ${sum(part1Duplicates)}`);

// Part 2

let groups = [];
for (let ii = 0; ii < lines.length; ii += 3) {
  groups.push([lines[ii], lines[ii + 1], lines[ii + 2]]);
}

let part2Duplicates = [];
groups.map((group) => {
  let set1 = new Set(group[0]);
  let set2 = new Set(group[1]);
  let set3 = new Set(group[2]);
  Array.from(set3).forEach((val) => {
    if (set1.has(val) && set2.has(val)) {
      part2Duplicates.push(decode(val));
    }
  });
});

console.log(`Part 2: ${sum(part2Duplicates)}`);
