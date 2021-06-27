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

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let inputWord = "";

function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  inputWord = input.question("Enter a word: ");
}

function simpleLetterScore(inputWord){
  let letterCount = inputWord.length;
  return letterCount;
}

function vowelScore(inputWord){
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

  console.log(score);
  return score;

}

let simpleScore = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: function (){
    return simpleLetterScore(inputWord);
  }
};

let vowelBonusScore = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction: function (){
    return vowelScore(inputWord);
  }
};

let scrabbleScore = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoreFunction: function (){
    return oldScrabbleScorer(inputWord);
  }
};

const scoringAlgorithms = [simpleScore,vowelBonusScore,scrabbleScore];

function scorerPrompt() {
  let scoringAlgorithm;
  console.log(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system`)
  scoringAlgorithm = input.question("Enter 0, 1, or 2: ");

  while(scoringAlgorithm !== '0' && scoringAlgorithm !=='1' && scoringAlgorithm !=='2'){
    scoringAlgorithm = input.question("Enter 0, 1, or 2: ");
  }
  
  if(scoringAlgorithm === '0'){
    //simpleLetterScore(inputWord);
    console.log("Score for '" + inputWord + "':" ,scoringAlgorithms[0].scoreFunction(inputWord))
  }
  else if(scoringAlgorithm === '1'){
    console.log("Score for '" + inputWord + "':", scoringAlgorithms[1].scoreFunction(inputWord));
  }
  else if(scoringAlgorithm === '2'){
    console.log(scoringAlgorithms[2].scoreFunction(inputWord));
  }
}

function transform(oldPointStructure) {
  const newScore = {}
  for (score in oldPointStructure) {
    newScore[oldPointStructure[score]] = score;  
}
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
