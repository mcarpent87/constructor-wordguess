//Variables 
var Word = require("./word.js");
var inquirer = require("inquirer");
var wordBank = [
  "mariners", "athletics", "astros",
  "angels", "rangers", "whitesox",
  "royals", "tigers", "indians",
  "twins", "yankees", "redsox",
  "orioles", "rays", "bluejays"
];

let guesses;
let pickedWords;
let word;
let pickedWord;

//Function that starts the game with a message and runs the playGame function. 
function init() {
  pickedWords = [];
  console.log("Hello, and welcome to MLB American League Word Guess!");
  console.log("------------------------------------------");
  playGame();
}

//Function that retrieves a word from the words array and sets the users guesses at 15
function playGame() {
  pickedWord = "";
  guesses = 15;
  if(pickedWords.length < wordBank.length) {
    pickedWord = getWord();
  } else {
    // Console log message if user has guessed the word and won
    console.log("You know your American League teams!");
    continuePrompt();
  }
  if(pickedWord) {
    word = new Word(pickedWord);
    word.makeLetters();
    makeGuess();
  }
}

//Function to grab random word from the wordbank array
function getWord() {
  let rand = Math.floor(Math.random() * wordBank.length);
  let randomWord = wordBank[rand];
  if(pickedWords.indexOf(randomWord) === -1) {
    pickedWords.push(randomWord);
    return randomWord;
  } else {
    return getWord();
  }
}
//Using inquirer prompt the user to guess a letter
function makeGuess() {
  let checker = [];
  inquirer.prompt([
    {
      name: "guessedLetter",
      message: word.update() + 
              "\nGuess a letter!" +
              "\nGuesses Left: " + guesses
    }
  ])

  //If user selects an incorrect letter, subtract one from thier remaining guesses
  .then(data => {
    word.letters.forEach(letter => {
      letter.checkLetter(data.guessedLetter);
      checker.push(letter.getCharacter());
    });
    //If guesses equal zero, console log a message that the game is over and the user has lost. 
    if(guesses > 0 && checker.indexOf("_") !== -1) {
      guesses--;
      if(guesses === 0) {
        console.log("GAME OVER! TRY AGAIN!");
        continuePrompt();
      } else {
        makeGuess();
      }
    //Message if the user correctly guessed the word 
    } else {
      console.log("CONGRATULATIONS! YOU CORRECTLY GUESSED THE WORD!");
      console.log(word.update());
      playGame();
    }
  });
}
//Using inquirer, ask the user if they want to play again. Give the user a choice to select yes or no. 
function continuePrompt() {
  inquirer.prompt([
      {
        name: "continue",
        type: "list",
        message: "Would you like to play again?",
        choices: ["Yes", "No"]
      }
    ])

  //If user selects yes, then restart the game, if they select no then print thanks for playing to the console.
  .then(data => {
      if(data.continue === "Yes") {
        init();
      } else {
        console.log("Thanks for playing!");
      }
  });
}

//Call function init to start the game
init();