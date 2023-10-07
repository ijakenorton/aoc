import * as readLine from "readline";
import * as fs from "fs";

async function process(filePath: string) {
  let current: number = 0;
  let arr: number[] = [0, 0, 0];
  const fileStream = fs.createReadStream(filePath);

  const lines = readLine.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of lines) {
    if (line === "") {
      if (current > arr[0]) {
        arr[0] = current;
        arr.sort();
      }
      current = 0;
    }
    current += Number(line);
    console.log(`Line from file: ${line}, current: ${current}`);
  }
  return arr;
}

const filePath = "./input";
let answer: number[] = await process(filePath);
let total: number = 0;
for (const num of answer) {
  total += num;
}
console.log(total);
console.log(answer);
