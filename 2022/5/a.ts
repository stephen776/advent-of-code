const input = await Deno.readTextFile('./input.txt');

// split on empty line
const [stacks, instructions] = input.split(/\n\s*\n/);

// iterate the stacks and build theme into arrays
const rows = stacks.split('\n');

// parse the stacks and build a map of arrays
const stackArrays: string[][] = [];

function parseRow(row: string) {
  const chunks = [];
  for (let i = 0; i < row.length; i += 4) {
    const chunk = row
      .substring(i, i + 4)
      .replace(/[\[\]]+/g, '')
      .trim();
    if (chunk[0] === '1') break;

    chunks.push(chunk);
  }

  return chunks;
}

rows.forEach((r) => {
  const items = parseRow(r);

  // add the items in each row to the proper stack
  for (let i = 0; i < items.length; i++) {
    if (!stackArrays[i]) stackArrays[i] = [];
    if (!items[i]) continue;
    stackArrays[i].unshift(items[i]);
  }
});

// parse the instructions
const canMoveMultiple = true;
const procedure = instructions
  .split(/\n/)
  .map((x) => x.split(' '))
  .map((x) => ({
    qty: parseInt(x[1]),
    src: parseInt(x[3]) - 1, // because of 0 based index of stack
    dst: parseInt(x[5]) - 1, // because of 0 based index of stack
  }));

// run the procedure
procedure
  .filter((x) => x.qty)
  .forEach((operation) => {
    // grab qty from end of src
    let toMove = stackArrays[operation.src].slice(-operation.qty);
    const remaining = stackArrays[operation.src].slice(0, -operation.qty);

    if (!canMoveMultiple) {
      toMove = toMove.reverse();
    }

    // remove the ones we are moving from src
    stackArrays[operation.src] = remaining;

    // add them to dst
    stackArrays[operation.dst] = [...stackArrays[operation.dst], ...toMove];
  });

const topOfStack = stackArrays.map((s) => s[s.length - 1]).join('');

console.log({topOfStack});
