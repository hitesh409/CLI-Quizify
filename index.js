/** Creating dataset */
let readlineSync = require("readline-sync");
let kuler = require("kuler");
let score;
let userName;

/** Question database */
const database = {
  data: [
    {
      question: `let a = {}, let b = {}
      console.log(a==b)
      console.log(a===b)`,
      options: {
        a: "false false",
        b: "false true",
        c: "true false",
        d: "true true"
      },
      correctAnswer: "a"
    },

    {
      question: `Object.assign(target,source)
      creates which type of copy?`,
      options: {
        a: "deep copy",
        b: "shallow copy",
        c: "nested copy",
        d: "creates a new reference"
      },
      correctAnswer: "b"
    },

    {
      question: `Is method chaining possible with forEach?`,
      options: {
        a: "Yes",
        b: "No"
      },
      correctAnswer: "b"
    },
  ]
}

/** Creating a leader board */
const leaderBoard = {
  data: []
}

/** Checking user's answer */
function playGame(userAnswer, correctAnswer) {

    if (userAnswer === correctAnswer) {
      console.log(kuler("\nNice! Correct Answer", "#22c55e"));
      score++;
    }
    else {
      console.log(kuler("\nOpps! Incorrect Answer", "#b91c1c"));
      console.log(`Correct Answer is ${correctAnswer}`);
    }
}

/** Showing questions */
function ShowQuestionAndOptions(database,leaderBoard) {
  
  score=0;
  userName = readlineSync.question("\nEnter your name: ");
  console.log(kuler(`\nGood luck ${userName}...\n `, "#6d28d9"));
  
  for (let i = 0; i < database.data.length; i++) 
  {
    console.log(`Q-${i + 1} : ${database.data[i].question}\n`);
    for (let key in database.data[i].options) {
      console.log(`(${key}) ${database.data[i].options[key]}`);
    }
    let userAnswer = readlineSync.question("Enter your answer - ").toLowerCase();
    playGame(userAnswer, database.data[i].correctAnswer);
    console.log('\n\n'); 
  }

  if(score==3)
    console.log("Great, You've made all right...");
  else if(score==2)
    console.log("Nice...");
  else
    console.log("Better Luck next Time...");
  
  console.log(kuler(`Your final score is ${score}\n`,"#67e8f9"));

    leaderBoard.data.push({
    name: userName,
    score: score
  });
}

/** Showing leaderBoard */
function showLeaderBoard(leaderBoard) {
  if(userName===undefined)
    console.log(kuler("Please play the game first","#7f1d1d"));
  else{
    let sortedScoreList = leaderBoard.data.sort((a, b) => b.score - a.score);
  
    console.log(kuler("\n-------------------- LeaderBoard -------------------", "#3b0764"));
    for (let leader in sortedScoreList) {
      console.log(`${sortedScoreList[leader].name} - Score: ${sortedScoreList[leader].score}`);
    }
      console.log(`\nCongrats ${sortedScoreList[0].name}!! You are on the top of leaderBoard...\n`);
    }
  }






console.log(kuler(`\n---------------- Welcome to Quizify ---------------- `, "#6d28d9"));

let click = readlineSync.question("\nAre you ready?(Y/N): ").toUpperCase();
if(click==='Y')
{
  console.log("Let's start...");
  ShowQuestionAndOptions(database,leaderBoard);
}
else{
  return;
}

  console.log("\n\n----------------------------------------------------")
  
while(true)
{
  let choice = readlineSync.question("\nWanna play again? (Y/N): ").toUpperCase();
  switch (choice) {
    case 'Y':
      ShowQuestionAndOptions(database,leaderBoard);
      break;

    case 'N':
      showLeaderBoard(leaderBoard);
      return;
  }
}
