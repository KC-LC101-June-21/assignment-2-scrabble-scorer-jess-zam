// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let inputWord = "";

function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  inputWord = input.question("Enter a word: ");
}

function simpleScore(inputWord){
  let letterCount = inputWord.length;
  return letterCount;
}

function vowelBonusScore(inputWord){
  let vowelCount = 0;
  let consonantsCount = 0;
  let score = 0;

  const vowels = ['a','e','i','o','u'];
  for(let char of inputWord){
    if(vowels.includes(char)){
      vowelCount++
    }
    else if(!vowels.includes(char)){
      consonantsCount++
    }
  }
  score = (vowelCount * 3) + consonantsCount;

  return score;
}

function scrabbleScore(inputWord){
  inputWord = inputWord.toLowerCase();
  let letter;
  let score = 0
  for (i = 0; i < inputWord.length; i++) {
    letter = inputWord[i];
    score += newPointStructure[letter];
  }
  return (score*1);
}

const scoringAlgorithms = [
  
    {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scoringFunction: simpleScore
        
    },
    {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: vowelBonusScore
      
    },
    {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scoringFunction: scrabbleScore
    }  
];

function scorerPrompt() {
  let scoringRequest;
  console.log(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system`)
  scoringRequest = input.question("Enter 0, 1, or 2: ");
  scoringRequest = Number(scoringRequest);


  if(scoringRequest === 0){
    //simpleLetterScore(inputWord);
    console.log("Score for '" + inputWord + "':" ,scoringAlgorithms[0].scoringFunction(inputWord))
  }
  else if(scoringRequest === 1){
    console.log("Score for '" + inputWord + "':", scoringAlgorithms[1].scoringFunction(inputWord));
  }
  else if(scoringRequest === 2){
    console.log("Score for '" + inputWord + "':",scoringAlgorithms[2].scoringFunction(inputWord));
  }
}

function transform(oldPointStructure) {
  const newScore = {}
  Object.keys(oldPointStructure).forEach((key)=>{
        oldPointStructure[key].forEach((character)=>{
          key = Number(key);
          newScore[character.toLowerCase()] = key;
        });
    });
    return newScore; 
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
