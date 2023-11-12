"use strict";
//buttons
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const buttons = document.querySelectorAll(".btn");

//sounds
const greenSound = new Audio("sounds/green.mp3");
const redSound = new Audio("sounds/red.mp3");
const yellowSound = new Audio("sounds/yellow.mp3");
const blueSound = new Audio("sounds/blue.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

//UI elements
const message = document.querySelector("#level-title");
const body = document.querySelector("body");
const container = document.querySelector(".container");

//messages
const loseMessage = "Game Over, Press Any Key to Restart";
const initialMessage = "Press Any Key to Start";
const winMessage = "Congrats! You Won. Press Any Key to Restart";
let answer = [];
let userAnswer = [];
let level = 0;
let iter = 1;

//if user starts game by clicking on body go to level 1 and remove the event handler on body
body.addEventListener("click", first);
function first() {
  body.removeEventListener("click", first);
  levelIncrease(1);
}

//generate a new sequence of boxes pressed where a new box press will be added each iteration
function levelIncrease(iter) {
  level += 1;

  message.innerHTML = `Level ${level}`;

  answer = [];
  for (let i = 0; i < iter; i++) {
    answer.push(random());
  }
  showAnimation(answer);

  message.innerHTML = `Level ${level}`;
}

//choose a random box between the available 4 and return it
function random() {
  let randombox = Math.trunc(Math.random() * 4) + 1;
  let translation;
  if (randombox == 1) {
    translation = "green";
  } else if (randombox == 2) {
    translation = "red";
  } else if (randombox == 3) {
    translation = "yellow";
  } else {
    translation = "blue";
  }

  return translation;
}

//loop through the answer array to show the animation of each item in it on screen
function showAnimation(arr) {
  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      animation(arr[i]);
    }, i * 700);
  }
}

//change the background color of the box to make it look like it is pressed by user or selected by computer
function animation(color) {
  const box = document.querySelector(`#${color}`);

  box.classList.add("pressed");
  sound(box);
  setTimeout(() => {
    box.classList.remove("pressed");
  }, 100);
}

//play the sound corresponding to the box color
function sound(box) {
  if (box.classList.contains("green")) {
    greenSound.play();
  } else if (box.classList.contains("red")) {
    redSound.play();
  } else if (box.classList.contains("yellow")) {
    yellowSound.play();
  } else {
    blueSound.play();
  }
}

//check what box the user clicked on
container.addEventListener("click", function (e) {
  const choice = e.target.classList[1];
  userInput(choice);
});

/*storing the user's answer in his/her own sequence(userAnswer) then checking if it matches the answer strored in the computer
generated sequence*/
function userInput(choice) {
  const index = userAnswer.push(choice) - 1;
  document.querySelector(`#${choice}`).classList.add("pressed");
  setTimeout(function () {
    document.querySelector(`#${choice}`).classList.remove("pressed");
  }, 100);
  const box = document.querySelector(`#${choice}`);
  sound(box);
  //if user answer is not correct, glow red buzz wrong, then reset the game(by adding the body click event back on it)
  if (userAnswer[index] !== answer[index]) {
    message.innerHTML = loseMessage;
    answer = [];
    userAnswer = [];
    level = 0;
    iter = 1;
    body.classList.add("red");
    wrongSound.play();
    setTimeout(function () {
      body.classList.remove("red");
      body.addEventListener("click", first);
    }, 200);
    return;
  }

  if (userAnswer.length == answer.length) {
    //if user reached 10 level make him win the game and reset the game
    if (level == 10) {
      message.innerHTML = winMessage;
      answer = [];
      userAnswer = [];
      level = 0;
      iter = 1;
      setTimeout(function () {
        body.addEventListener("click", first);
      }, 1000);
      //if user answer is correct continue the game
    } else {
      userAnswer = [];
      setTimeout(function () {
        iter++;
        levelIncrease(iter);
      }, 1000);
      return;
    }
  }
}
