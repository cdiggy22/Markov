/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chain = {};

    for(let i = 0; i < this.words.length; i++){
      let word = this.words[i];
      let next = this.words[i + 1] || null;

      if(chain[word] == undefined){
        chain[word] = new Array();
      } else {
        chain[word].push(next)
      }
      this.chain = chain
    }

  }

  static select(array) {
    return array[Math.floor(Math.random() * array.length)];
   
  }

  /** return random text from chains */

  makeText(numWords = 100) {
  // pick a random key to begin
  let keys = Array.from(Object.keys(this.chain));
  let key = MarkovMachine.select(keys);
  let output = [];

  // produce markov chain until reaching termination word
  while (output.length < numWords && key !== null) {
    output.push(key);
    key = MarkovMachine.select(Object.keys(this.chain));
  }

    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};