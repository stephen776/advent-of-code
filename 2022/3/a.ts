const input = await Deno.readTextFile('./input.txt');
const rucksacks = input.split(/\n/);

// prettier-ignore
const items = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function getPriority(item: string) {
  if (!item) return 0;
  const result = items.indexOf(item);
  if (result > -1) return result + 1;
  return items.indexOf(item.toLowerCase()) + 27;
}

// Part 1
let totalPriority = 0;
rucksacks.forEach((sack) => {
  const half = Math.ceil(sack.length / 2);
  const first = sack.slice(0, half).split('');
  const second = sack.slice(half).split('');
  const intersection = first.filter((item) => second.includes(item));
  const priority = getPriority(intersection[0]);
  totalPriority += priority;
});

// Part 2
const chunks = rucksacks.reduce((chunk, sack, index) => {
  const chunkIndex = Math.floor(index / 3);
  if (chunk[chunkIndex] === undefined) {
    chunk[chunkIndex] = []; // start new
  }

  chunk[chunkIndex].push(sack);
  return chunk;
}, [] as string[][]);

let badgePriority = 0;
chunks.forEach((group) => {
  const sacks = group.map((g) => g.split(''));
  const badge = sacks.reduce((a, b) => a.filter((c) => b.includes(c)));
  badgePriority += getPriority(badge[0]);
});

console.log({totalPriority, badgePriority});
