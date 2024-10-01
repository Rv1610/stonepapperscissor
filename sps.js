let userScore = 0;
let roboScore = 0;

let user = document.querySelector("#user-score");
let usersName = document.querySelector("#userName");
let robo = document.querySelector("#robo-score");
let msg = document.querySelector(".msg");
let result = document.querySelector(".result");
let newStart = document.querySelector("#newStart");
const choices = document.querySelectorAll(".choice");
let body = document.querySelector("body");
let totalTurn = document.querySelector("#total-turn");
let remainingTurn = document.querySelector("#remaining-turn");


let getUserName = prompt("Please Enter your name!");
// console.log(getUserName);
usersName.innerText = getUserName;

let userPlayTimes = prompt("Enter how many times you want to play!");


totalTurn.innerText = `Total turn - ${userPlayTimes}`;
remainingTurn.innerText = `Remaining turn - ${userPlayTimes}`;




const genRoboChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const roboChoice = Math.floor(Math.random() * 3);
  return options[roboChoice];
};

const playGame = (userChoice,playTimes) => {
  // console.log("User choice is ", userChoice);

  //calling robo choice function below
  const robosChoice = genRoboChoice();
  // console.log("robo choice is ", robosChoice);
  if (
    (userChoice === "rock" && robosChoice === "rock") ||
    (userChoice === "paper" && robosChoice === "paper") ||
    (userChoice === "scissor" && robosChoice === "scissor")
  ) {
    playTimes++;
    user.innerText = userScore;
    robo.innerText = roboScore;
    msg.innerText = "Match is draw!!";
    result.classList.add("resultShow");
    result.innerText = `Your Choice is ${userChoice} & Robo's choice is also ${robosChoice}`;
  }
  else if(
    (userChoice === "paper" && robosChoice === "rock") ||
    (userChoice === "scissor" && robosChoice === "paper")||
    (userChoice === "rock" && robosChoice === "scissor")
  ){
    playTimes++;
    userScore++;
    user.innerText = userScore;
    msg.innerText = "Hurray!! You won";
    result.classList.add("resultShow");
    result.innerText = `Your Choice is ${userChoice} & Robo choice is ${robosChoice}`;
  }
  else{
    playTimes++;
    roboScore++;
    robo.innerText = roboScore;
    msg.innerText = "Oops!! Robo Won!!";
    result.classList.add("resultShow");
    result.classList.remove("resultHide");
    result.innerText = `Your Choice is ${userChoice} & Robo choice is ${robosChoice}`;
  }
};


const gameEnd = ()=>{
  alert("Game is End Now!");
  for(let choice of choices){
    choice.disabled = true;
  }
}


let clickCount = 1;
let playTime = clickCount;
let remainingPlayTimes = userPlayTimes;

choices.forEach((choice) => {
  // console.log(choice);
  choice.addEventListener("click", () => {
    clickCount++;
    remainingPlayTimes--;
    const userChoice = choice.getAttribute("id");
    if(playTime <= userPlayTimes){
      playTime++;
      playGame(userChoice);
      remainingTurn.innerText = remainingPlayTimes === 0 
      ? `Remaining turn - No More Turns!` 
      : `Remaining turn - ${remainingPlayTimes}`;
  
      }
      else{
        gameEnd();
        resultAnalysis();
      }
  });
});

newStart.addEventListener("click", ()=>{
    let userrName = prompt("Please Enter your name!");
    userPlayTimes = prompt("Enter how many times you want to play!")
    totalTurn.innerText = userPlayTimes;
    totalTurn.innerText = `Total turn - ${userPlayTimes}`;
    remainingPlayTimes = userPlayTimes
    remainingTurn.innerText = `Remaining turn - ${remainingPlayTimes}`;
    clickCount = 1;
    playTime = clickCount;
    usersName.innerText = userrName;
    user.innerText = "0";
    robo.innerText = "0";
    userScore = 0;
    roboScore = 0;
    msg.innerText = "Play Your Move!";
    result.classList.remove("resultShow");
    result.classList.add("resultHide");

})

const resultAnalysis = ()=>{
  if(userScore>roboScore){
    result.classList.add("resultHide");
    result.classList.remove("resultShow");
    msg.innerHTML = `<div>So. the final winner is <i>${getUserName}!</i><br>it's score is ${userScore} and robo's score is ${roboScore} `;
  }
  else if(userScore<roboScore){
    result.classList.add("resultHide");
    result.classList.remove("resultShow");
    msg.innerHTML = `<div>So. the final winner is <i>Robo!</i><br>it's score is ${roboScore} and ${getUserName}'s score is ${userScore} `;
  }
  else{
    result.classList.add("resultHide");
    result.classList.remove("resultShow");
    msg.innerHTML = `<div>This match is draw! <i>because</i><br>${getUserName}'s score is ${userScore} and Robo's score is also ${roboScore} `;
  }
}


