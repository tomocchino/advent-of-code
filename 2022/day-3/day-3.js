const input = require("fs").readFileSync(`${__dirname}/sample.txt`).toString();

function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}

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

let duplicates = [];
input.split("\n").forEach((rucksack) => {
  let mid = Math.floor(rucksack.length / 2);
  let set1 = new Set(rucksack.slice(0, mid));
  let set2 = new Set(rucksack.slice(mid));

  Array.from(set2).forEach((val) => {
    if (set1.has(val)) {
      duplicates.push(decode(val));
    }
  });
});

console.log(`Part 1: ${sum(duplicates)}`);

let groups = [];
let lines = input.split("\n");
for (let ii = 0; ii < lines.length; ii += 3) {
  groups.push([lines[ii], lines[ii + 1], lines[ii + 2]]);
}

let duplicates2 = [];
groups.map((group) => {
  let set1 = new Set(group[0]);
  let set2 = new Set(group[1]);
  let set3 = new Set(group[2]);
  Array.from(set3).forEach((val) => {
    if (set1.has(val) && set2.has(val)) {
      duplicates2.push(decode(val));
    }
  });
});

console.log(sum(duplicates2));
