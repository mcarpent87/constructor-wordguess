//letter.js contains a constructor called Letter. 
//This constructor will display either a blank underscore or a hidden character



function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;
  
    //If letter is not correctly guessed, return an underscore. Otherwise, if letter is correctly guessed, return that letter
    this.getCharacter = function() {
      if(!this.isGuessed) {
        return "_";
      } else {
        return this.letter;
      }
    }
  //Check is guessed letter is equal to one of the letters in the answer
    this.checkLetter = function(guess) {
      if(guess === this.letter) {
        this.isGuessed = true;
      }
    }
  }
  
  //Export the letter constructor so that we can use it in word.js
  module.exports = Letter;
