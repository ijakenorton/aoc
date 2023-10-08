import * as readline from "readline";
import * as fs from "fs";

type gameState = {
  A: string;
  B: string;
  C: string;
  points: number;
}

const win: gameState = {
  A : "Y",
  B: "Z",
  C: "X",
  points: 6,
};
const draw: gameState = {
  A: "X",
  B: "Y",
  C: "Z",
  points: 3,
};
const lose: gameState = {
  A: "Z",
  B: "X",
  C: "Y",
  points: 0,
};
const conditions = {
  X: lose,
  Y: draw,
  Z: win,
};
const scores = {
  X: 1,
  Y: 2,
  Z: 3,
};
const createLineReader = async (filePath: string) => {
  const fileStream = fs.createReadStream(filePath);
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  return lines;
};

const process = async (lines: readline.Interface) => {
  const total = new Promise((resolve, reject) => {
    let score: Number = 0;
    lines.on("line", (line) => {
      let split: string[] = line.split(" ");
      let opponent: string = split[0];
      let strategy: string = split[1];
      let letter: string = conditions[strategy][opponent];
      score += conditions[strategy].points;
      score += scores[letter]
    });
    lines.on("close", () => {
      resolve(score);
    });
    lines.on("error", (err) => {
      reject(err);
    });
  });
  return await total;
};

(async () => {
  try {
    const lineReader = await createLineReader("rps");
    const score = await process(lineReader);
    console.log(score);
  } catch (error) {
    console.error(error);
  }
})();
