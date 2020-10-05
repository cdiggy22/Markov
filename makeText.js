/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");




function makeMachine(text){
    let machine = new markov.MarkovMachine(text);
    console.log(machine.makeText());
}

function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.log("ERROR:", err);
          process.kill(1)
        }
        makeMachine(data);
      })
}

async function readUrl (url) {
    let resp;

    try {
        resp = await axios.get(url);
    } catch (err){
        console.log("ERROR:", err);
        process.kill(1)
    }
}


let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
} else if (method === "url") {
  readUrl(path);
} else {
  console.error(`Error: ${method}`);
  process.exit(1);
}


