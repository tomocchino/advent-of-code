import os
input = open(os.path.dirname(__file__) + "/input.txt").read()

calorie_sums = []

for line in input.split("\n\n"):
    inventory = line.split("\n")
    calorie_sums.append(sum(map(int, inventory)))

calorie_sums.sort(reverse=True)

print("Part 1: %d" % calorie_sums[0])
print("Part 2: %d" % sum(calorie_sums[0:3]))
