const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./sample.txt');

const text = input.split('');

function getStartChar(messageSize: number) {
  for (let i = 0; i < text.length; i++) {
    const chars = text.slice(i, i + messageSize);
    const match = chars.some((v, i, a) => a.lastIndexOf(v) != i);

    if (!match) {
      return i + messageSize;
    }
  }
}

// Part A
const packetStart = getStartChar(4); // packet start

//Part B
const messageStart = getStartChar(14); // packet start

console.log({packetStart, messageStart});
