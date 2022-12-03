const input = await Deno.readTextFile('./input.txt');

// split by the new line to get the groups
const rounds = input.split(/\n/);

const ROCK = 'A';
const PAPER = 'B';
const SCISSORS = 'C';

const LOSE = 'X';
const DRAW = 'Y';
const WIN = 'Z';

function shapeScore(shape: string) {
  switch (shape) {
    case ROCK:
      return 1;
    case PAPER:
      return 2;
    case SCISSORS:
      return 3;
    default:
      return 0;
  }
}

function outcomeScore(opp: string, you: string) {
  // draws are always 3
  if (opp === you) return 3;

  // wins
  if (opp === ROCK && you === PAPER) return 6;
  if (opp === PAPER && you === SCISSORS) return 6;
  if (opp === SCISSORS && you === ROCK) return 6;

  return 0;
}

function getYourThrow(opp: string, desiredOutcome: string) {
  if (desiredOutcome === DRAW) return opp;

  if (desiredOutcome === LOSE) {
    if (opp === ROCK) return SCISSORS;
    if (opp === PAPER) return ROCK;
    return PAPER;
  }

  // win
  if (opp === ROCK) return PAPER;
  if (opp === PAPER) return SCISSORS;
  return ROCK;
}

let totalScore = 0;

for (const round of rounds) {
  if (!round) break;

  const [opp, desiredOutcome] = round.split(' ');
  const yourThrow = getYourThrow(opp, desiredOutcome);

  const shape = shapeScore(yourThrow);
  const outcome = outcomeScore(opp, yourThrow);

  totalScore += shape + outcome;
}

console.log({totalScore});
