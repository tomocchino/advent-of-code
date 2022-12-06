import os
input = open(os.path.dirname(__file__) + "/input.txt").read()

def find_marker(string, marker_length):
    index = 0
    while index < len(string):
      chars = set()
      for ii in range(marker_length):
        chars.add(string[index + ii])
      if marker_length == len(chars):
        return marker_length + index
      index += 1

for line in input.split("\n"):
  print("Part1: %d" % find_marker(line, 4))
  print("Part 2: %d" % find_marker(line, 14))
