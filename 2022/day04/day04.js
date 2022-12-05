const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();

let contains = [];
let overlaps = [];

input.split("\n").forEach((line) => {
  let [span1, span2] = line.split(",");
  let [s1, e1] = span1.split("-").map(Number);
  let [s2, e2] = span2.split("-").map(Number);
  if ((s1 >= s2 && e1 <= e2) || (s2 >= s1 && e2 <= e1)) {
    contains.push(line);
  }
  if ((e1 >= s2 && e1 <= e2) || (e2 >= s1 && e2 <= e1)) {
    overlaps.push(line);
  }
});

console.log(`Part 1: ${contains.length}`);
console.log(`Part 2: ${overlaps.length}`);
