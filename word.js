//This file needs to be linked to the letter.js file to function 
var Letter = require("./letter.js");

function Word(word) {
  this.word = word;
  this.letters = [];

  this.makeLetters = function() {
    let wordArr = this.word.split("");
    for(let i = 0; i < wordArr.length; i++) {
      let newLetter = new Letter(wordArr[i]);
      this.letters.push(newLetter);
    }
  }

  this.makeGuess = function(guess) {
    this.letters.forEach(letter => {
      letter.checkLetter(guess);
    });
  }

  this.update = function() {
    let printedWord = "";
    this.letters.forEach(letter => {
      printedWord += letter.getCharacter() + " ";
    });
    return printedWord;
  }
}

//Export the word constructor so that it can be reference it in index.js
module.exports = Word;