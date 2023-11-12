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

function ComputerTurn(iter) {
  level += 1;

  message.innerHTML = `Level ${level}`;

  answer = [];
  for (let i = 0; i < iter; i++) {
    //1choose random (red,blue,...)
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
    answer.push(translation);
  }
  //2-show animation based on chosen sequence pushed into answer
  for (let i = 0; i < answer.length; i++) {
    setTimeout(function () {
      let box = document.querySelector(`#${answer[i]}`);
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
      setTimeout(function () {
        box.classList.remove("pressed");
      }, 100);
    }, i * 700);
  }

  message.innerHTML = `Level ${level}`;
}

//user part
container.addEventListener("click", function (e) {
  const choice = e.target.classList[1];

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
        ComputerTurn(iter);
      }, 1000);
      return;
    }
  }
});

function first() {
  body.removeEventListener("click", first);
  ComputerTurn(1);
}

body.addEventListener("click", first);
