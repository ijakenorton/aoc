import * as readline from "readline";
import * as fs from "fs";
const win = {
    A: "Y",
    B: "Z",
    C: "X",
    points: 6,
};
const draw = {
    A: "X",
    B: "Y",
    C: "Z",
    points: 3,
};
const lose = {
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
const createLineReader = async (filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    return lines;
};
const process = async (lines) => {
    const total = new Promise((resolve, reject) => {
        let score = 0;
        lines.on("line", (line) => {
            let split = line.split(" ");
            console.log("split: ", split);
            let opponent = split[0];
            let strategy = split[1];
            console.log("strategy: ", strategy);
            let letter = conditions[strategy][opponent];
            console.log("letter: ", letter);
            score += conditions[strategy].points;
            score += scores[letter];
            console.log("choice: ", score);
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
    }
    catch (error) {
        console.error(error);
    }
})();
//# sourceMappingURL=rps.js.map