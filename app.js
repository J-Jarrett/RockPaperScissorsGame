// 1. cache the DOM - prevents typos later and sets up all our connection points ready for use, much more efficient that typing it out each time. But first: set up our vars to assign scores, they must be lets not consts because we're going to modify their value.
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById("r");
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

// 4. Write another function to generate the computer choice and invoke it. Test it, then use Math.random to generate the actual id.
function getComputerChoice() {
  const choices = ["r", "p", "s"];
  // console.log(Math.random());
  const randomNumber = Math.floor(Math.random()*3);
  return choices[randomNumber];
}
// getComputerChoice(); // see 5 for invoking within game() fn.

// 4a. this is part of the test, each refresh of screen should generate one of the 3 ids
// console.log(getComputerChoice());

// 3. Write the function game() to be used in function main(), test it with a con log.
// function game(userChoice) {
//   console.log(userChoice);
// }

// 5. invoke getComputerChoice() within game() fn. Use refresh to test, should generate computerChoice on one line, c on the next. Then comment out game("c") and try clicking on the buttons. 
// function game(userChoice) {
//   const computerChoice = getComputerChoice();
//   console.log("computer choice => " + computerChoice);
//   console.log("user choice => " + userChoice);
// }
// // game("c");

// 6. Use a switch statement to compare these choices and evaluate the result to be a win, lose or draw. test it.
// 7. Now add the logic to send results to the browser instead of console and make changes to the scoreboard by replacing con logs with other functions, win(), lose(), draw(), then write those fns just above fn game(). 
// test with con log, then add some logic and test again. in basic win() test, should see "win!" then an incremented number.
// then add logic to show it on page by changing html without refreshing page.
// function win() {
//   userScore++;
//   console.log("win!");
//   console.log(userScore);
//   userScore_span.innerHTML = userScore;
//   computerScore_span.innerHTML = computerScore;
// }
// function lose() {
//   console.log("lose!")
// }
// function draw() {
//   console.log('draw!')
// }

// 7e: Adjusting the result message in browser: we need to pass in parameters userChoice and computerChoice to our result functions. These have to come from game(), so in each switch case result & calling of result function, pass these in, then add them to our win(), lose(), draw()
// 7f. target result_p to call the DOM to our class ".result", use .innerHTML method to pass a string to output. Replace the con logs with this call and pass. 
// function win(userChoice, computerChoice) {
//   userScore++;
//   result_p.innerHTML = userChoice + " beats " + computerChoice + ". You Win!";
//   userScore_span.innerHTML = userScore;
//   computerScore_span.innerHTML = computerScore;
// }

// 7g. That's nice and it works, but it's not easy to read or very informative. Need to convert our "r" etc to a word to show in browser.
// Going to write a function to do that, then call it within the result functions and pass in our "r" etc.
// Later we could consider phrasing for each outcome, ie "rock blunts scissors, paper covers rock, scissors cut paper" etc. 
function convertToWord(letter) {
  if (letter==="r") return "Rock";
  if (letter==="p") return "Paper";
  return "Scissors";
}
// function win(userChoice, computerChoice) {
//   userScore++;
//   // result_p.innerHTML = convertToWord(userChoice) + " beats " + convertToWord(computerChoice) + ". You Win!";
// //    this line is a bit clunky, change it up to ES6:
//   result_p.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. You Win!`;
//   userScore_span.innerHTML = userScore;
//   computerScore_span.innerHTML = computerScore;
// }
// function lose(userChoice, computerChoice) {
//   console.log("lose!")
// }
// function draw(userChoice, computerChoice) {
//   console.log('draw!')
// }

// 8. Just a little extra, adding a way to show on screen who picked what by using small text,
//  then add rest of logic for other outcomes:
const smallUserWord = "user".fontsize(3).sub();
const smallCompWord = "comp".fontsize(3).sub();

// 9. little extras: after adding glow classes to end of css, add the class to the element selected. Then, using JS instead of CSS this time, remove this after a setTimeout, or it will just sit there.
// can also replace the call to DOM with a shorter var 

// 10. Tidy it up and clean it up with ES6, arranging all vars to top of each function, then increment, then assign scores, then message, then timeout. Also, i'm not keen on this '${convertToWord(userChoice)}${smallUserWord}' stuff, it's too clunky, and we need to replace beats with appropriate verb.
function win(userChoice, computerChoice) {
  userScore++;
  result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You Win!`;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  // document.getElementById(userChoice).classList.add("green-glow");
  // setTimeout(function() {
  //   document.getElementById(userChoice).classList.remove("green-glow");  
  // }, 500);
  const userChoice_div = document.getElementById(userChoice);
  userChoice_div.classList.add("green-glow");
  setTimeout(function() {
    userChoice_div.classList.remove("green-glow");  
  }, 500);
}
function lose(userChoice, computerChoice) {
  computerScore++;
  result_p.innerHTML = `${convertToWord(computerChoice)}${smallCompWord} beats ${convertToWord(userChoice)}${smallUserWord}. You lose.`
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  const userChoice_div = document.getElementById(userChoice);
  userChoice_div.classList.add("red-glow");
  setTimeout(function() {
    userChoice_div.classList.remove("red-glow");  
  }, 500);
}
function draw(userChoice, computerChoice) {
  result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWord} equals ${convertToWord(computerChoice)}${smallCompWord}. It's a draw.`; 
  const userChoice_div = document.getElementById(userChoice);
  userChoice_div.classList.add("gray-glow");
  setTimeout(function() {
    userChoice_div.classList.remove("gray-glow");  
  }, 500);
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  // console.log("user choice => " + userChoice);
  // console.log("computer choice => " + computerChoice);
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      // console.log("USER WINS!");
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      // console.log("USER LOSES!");
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      // console.log("IT'S A DRAW!");
      draw(userChoice, computerChoice);
      break;
  }
}

// 2. add each event listener individually and test with a con log to prove connection, then replace that test with a function passing in the id, i.e. game("r"). This will generate error, "game is not defined". Wrap all these in one function main(), invoke it, then write the function game() above here.
function main() {
rock_div.addEventListener("click", function() {
  // console.log('Hey, you clicked on rock');
  game("r");
});
paper_div.addEventListener("click", function() {
  // console.log("You clicked paper");
  game("p");
});
scissors_div.addEventListener("click", function() {
  // console.log("You clicked scissors");
  game("s");
});
}
main();