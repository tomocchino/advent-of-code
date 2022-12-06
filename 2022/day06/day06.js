const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();

function findMarker(str, markerLength) {
  let index = 0;
  while (index++ < str.length) {
    let set = new Set();
    for (let ii = 0; ii < markerLength; ii++) {
      set.add(str[index + ii]);
    }
    if (markerLength == set.size) {
      return markerLength + index;
    }
  }
}

input.split("\n").map((line) => {
  console.log(`Part 1: ${findMarker(line, 4)}`);
  console.log(`Part 2: ${findMarker(line, 14)}`);
});
