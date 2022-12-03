const input = await Deno.readTextFile('./input.txt');

// split by the new line to get the groups
const rounds = input.split(/\n/);

// ROCK     A | X
// PAPER    B | Y
// SCISSORS C | Z

// X = LOSE
// Y = DRAW
// Z = WIN

function shapeScore(shape: string) {
  switch (shape) {
    case 'X':
      return 1;
    case 'Y':
      return 2;
    case 'Z':
      return 3;
    default:
      return 0;
  }
}

function outcomeScore(opp: string, you: string) {
  if (opp === 'A') {
    if (you === 'Z') return 0;
    if (you === 'X') return 3;
    return 6;
  }

  if (opp === 'B') {
    if (you === 'X') return 0;
    if (you === 'Y') return 3;
    return 6;
  }

  if (opp === 'C') {
    if (you === 'Y') return 0;
    if (you === 'Z') return 3;
    return 6;
  }

  console.log('got here ');
  return 0;
}

let totalScore = 0;

for (const round of rounds) {
  if (!round) break;

  const [opp, you] = round.split(' ');
  const shape = shapeScore(you);
  const outcome = outcomeScore(opp, you);

  totalScore += shape + outcome;

  // console.log(`opp: ${opp} - you: ${you} - shapeScore: ${shapeScore(you)}`);
}

console.log({totalScore});
