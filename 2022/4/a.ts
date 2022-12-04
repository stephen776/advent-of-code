const input = await Deno.readTextFile('./input.txt');

const assignments = input
  .split(/\n/)
  .filter((x) => x !== '')
  .map((x) => x.split(','))
  .map((x) => x.map((y) => y.split('-').map((n) => +n)));

// a
let containedCount = 0;
assignments.forEach(([[aStart, aEnd], [bStart, bEnd]]) => {
  if ((bStart >= aStart && bEnd <= aEnd) || (aStart >= bStart && aEnd <= bEnd))
    containedCount += 1;
});

// b
let overlapCount = 0;
assignments.forEach(([[aStart, aEnd], [bStart, bEnd]]) => {
  if (aStart <= bEnd && aEnd >= bStart) overlapCount += 1;
});

console.log({assignments, containedCount, overlapCount});
