const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();
const lines = input.split("\n");

let path = "/";
let filesystem = {};
let currentDirectory = null;
lines.forEach((line) => {
  if (line.match(/^\d+/)) {
    let fileSize = Number(line.split(" ")[0]);
    currentDirectory.size += fileSize;
  } else if (line.match(/^dir/)) {
    let dirName = line.split(" ").pop();
    currentDirectory.folders.push(path + "/" + dirName);
  } else if (line.startsWith("$ cd")) {
    let dirName = line.split(" ").pop();
    if (dirName === "..") {
      path = path.split("/").slice(0, -1).join("/");
      return;
    } else if (dirName != "/") {
      path += "/" + dirName;
    }

    currentDirectory = { size: 0, folders: [] };
    filesystem[path] = currentDirectory;
  }
});

let directorySizes = {};
Object.keys(filesystem).forEach((path) => {
  let directory = filesystem[path];
  let dirSize = directory.size;
  let folders = directory.folders;
  while (folders.length > 0) {
    let nextDir = filesystem[folders.pop()];
    dirSize += nextDir.size;
    if (nextDir.folders.length) {
      folders.push(...nextDir.folders);
    }
  }
  directorySizes[path] = dirSize;
});

const usedDiskSpace = directorySizes["/"];
const unusedDiskSpace = 70000000 - usedDiskSpace;
const minDeletionSize = 30000000 - unusedDiskSpace;

let partOneSize = 0;
let partTwoSize = 0;

Object.values(directorySizes)
  .sort((a, b) => {
    return a - b;
  })
  .forEach((size) => {
    if (size <= 100000) {
      partOneSize += size;
    } else if (!partTwoSize && size > minDeletionSize) {
      partTwoSize = size;
    }
  });

console.log(`Part 1: ${partOneSize}`); // Part 1: 1667443
console.log(`Part 2: ${partTwoSize}`); // Part 2: 8998590
