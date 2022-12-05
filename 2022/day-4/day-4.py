input = open("day-4/input.txt").read()

contains = []
overlaps = []

for line in input.split("\n"):
    span1, span2 = line.split(",")
    s1, e1 = map(int, span1.split("-"))
    s2, e2 = map(int, span2.split("-"))

    if (s1 >= s2 and e1 <= e2) or (s2 >= s1 and e2 <= e1):
        contains.append(line)

    if (e1 >= s2 and e1 <= e2) or (e2 >= s1 and e2 <= e1):
        overlaps.append(line)

print("Part 1: %d" % len(contains))
print("Part 2: %d" % len(overlaps))
