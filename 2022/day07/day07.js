const input = require("fs").readFileSync(`${__dirname}/input.txt`).toString();
const lines = input.split("\n");

function goOut(path) {
  return path.split("/").slice(0, -1).join("/") || "/";
}

let cwd = "/";
let node = { folders: [], size: 0 };
let directories = {};
lines.forEach((line) => {
  if (line.startsWith("$ cd")) {
    let dir = line.split(" ").pop();
    if (dir === "..") {
      cwd = goOut(cwd);
      return;
    } else if (dir === "/") {
      cwd = "/";
    } else if (cwd === "/") {
      cwd = "/" + dir;
    } else {
      cwd += "/" + dir;
    }
    node = { folders: [], files: {}, size: 0 };
    directories[cwd] = node;
  } else if (line.match(/^\d+/)) {
    let [size, fileName] = line.split(" ");
    node.files[fileName] = Number(size);
    node.size += Number(size);
  } else if (line.match(/^dir/)) {
    let dir = line.split(" ")[1];
    let folderName = cwd == "/" ? "/" + dir : cwd + "/" + dir;
    node.folders.push(folderName);
  }
});

let sizes = {};
for (let name in directories) {
  let directory = directories[name];
  let dirSize = directory.size;
  let folders = directory.folders;
  while (folders.length > 0) {
    let nextDir = directories[folders.pop()];
    dirSize += nextDir.size;
    if (nextDir.folders.length) {
      folders.push(...nextDir.folders);
    }
  }
  sizes[name] = dirSize;
}

let totalSize = 0;
Object.values(sizes).forEach((size) => {
  if (size <= 100000) {
    totalSize += size;
  }
});

console.log(`Part 1: ${totalSize}`); // Part 1: 1667443

const totalDiskSpace = 70000000;
const usedDiskSpace = sizes["/"];
const unusedDiskSpaceNeeded = 30000000;
const unusedDiskSpace = totalDiskSpace - usedDiskSpace;
const minDeletionSize = unusedDiskSpaceNeeded - unusedDiskSpace;

let sortedSizes = Object.values(sizes).sort((a, b) => {
  return a - b;
});

for (let ii = 0; ii < sortedSizes.length; ii++) {
  let size = sortedSizes[ii];
  if (size > minDeletionSize) {
    console.log(`Part 2: ${size}`); // Part 2: 8998590
    break;
  }
}
