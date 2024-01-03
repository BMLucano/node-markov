/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    // TODO: implement this!

    //create object
    //loop through words
    //get each word, add as a key to the object
      // next word will be a value of that key or null if no next word

      const chains = {}

      for(let i = 0; i < this.words.length; i++){
        let word = this.words[i];
        let nextWord = this.words[i+1] || null;

        if(word in chains){
          chains[word].push(nextWord);
        }else{
          chains[word] = [nextWord];
        }
      }
      return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    let randomText = "";
    let currWord = this.words[0]

    //while following word is not null
      //pick random index of array
      //add to an array of new text
    while(currWord !== null){
      let randomIdx = Math.floor(Math.random() * this.chains[currWord].length - 1);
      let randomWord = this.chains[currWord][randomIdx];
      randomText += randomWord;
      currWord = randomWord;
    }
    return randomText;
  }
}
