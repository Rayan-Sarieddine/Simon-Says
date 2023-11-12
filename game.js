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
function showAnimation(arr) {
  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      animation(arr[i]);
    }, i * 700);
  }
}
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

function animation(color) {
  const box = document.querySelector(`#${color}`);

  box.classList.add("pressed");
  if (box.classList.contains("green")) {
    greenSound.play();
  } else if (box.classList.contains("red")) {
    redSound.play();
  } else if (box.classList.contains("yellow")) {
    yellowSound.play();
  } else {
    blueSound.play();
  }
  setTimeout(() => {
    box.classList.remove("pressed");
  }, 100);
}
//user part

function userPart(choice) {
  const index = userAnswer.push(choice) - 1;
  document.querySelector(`#${choice}`).classList.add("pressed");
  setTimeout(function () {
    document.querySelector(`#${choice}`).classList.remove("pressed");
  }, 100);
  const sound = document.querySelector(`#${choice}`);
  if (sound.classList.contains("green")) {
    greenSound.play();
  } else if (sound.classList.contains("red")) {
    redSound.play();
  } else if (sound.classList.contains("yellow")) {
    yellowSound.play();
  } else {
    blueSound.play();
  }

  if (userAnswer[index] !== answer[index]) {
    message.innerHTML = loseMessage;
    answer = [];
    userAnswer = [];
    level = 0;
    iter = 1;
    body.classList.add("red");
    setTimeout(function () {
      body.classList.remove("red");
      body.addEventListener("click", first);
    }, 200);
    return;
  }

  if (userAnswer.length == answer.length) {
    if (level == 10) {
      message.innerHTML = winMessage;
      answer = [];
      userAnswer = [];
      level = 0;
      iter = 1;
      setTimeout(function () {
        body.addEventListener("click", first);
      }, 1000);
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

function first() {
  body.removeEventListener("click", first);
  levelIncrease(1);
}

body.addEventListener("click", first);
container.addEventListener("click", function (e) {
  const choice = e.target.classList[1];
  userPart(choice);
});
