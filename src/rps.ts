import * as readline from "readline";
import * as fs from "fs";
const wins = {
  A: "Y",
  B: "Z",
  C: "X",
};
const draw = {
  A: "X",
  B: "Y",
  C: "Z",
};

const conditions = {
  X: -1,
  Y: 0,
  Z: 1,
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
    let score = 0;
    lines.on("line", (line) => {
      let split = line.split(" ");

      score += scores[split[1]];
      console.log("choice: ", score);
      console.log("win left: ", split[0], "|| right: ", wins[split[0]]);
      if (draw[split[0]] === split[1]) {
        score += 3;
        console.log("draw: ", score);
      } else if (wins[split[0]] === split[1]) {
        score += 6;
      }
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
