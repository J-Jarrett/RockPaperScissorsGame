console.log('hello');
// not sure why this didn't come up in the dev tools. Pressing on:

// cache the DOM
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById("r");
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

rock_div.addEventListener("click", function() {
  console.log('Hey, you clicked on rock');
});
