import * as fs from 'fs';
import * as readline from 'readline';


const lines = async (filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })
};

// const process = async (lines) => {
//     const total = new Promise
// }