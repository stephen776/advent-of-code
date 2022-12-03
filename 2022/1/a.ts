const input = await Deno.readTextFile('./input.txt');

// split by the new line to get the groups
const groups = input.split(/\ns*\n/);

// get sum for each group
const sums = groups.map((g) => {
  const a = g.split('\n').filter((x) => x !== '');

  const total = a.reduce((acc, curr) => {
    return acc + parseInt(curr);
  }, 0);

  return total;
});

// sort the sums to get the top;
const sorted = sums.sort((a, b) => b - a);

// part 1
console.log('most cals: ', sorted[0]);

// part 2 - sum the top 3
const sliced = sorted.slice(0, 3);
const total = sliced.reduce((acc, curr) => acc + curr, 0);
console.log(total);
