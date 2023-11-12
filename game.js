"use strict";
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const buttons = document.querySelectorAll(".btn");
const greenSound = new Audio("sounds/green.mp3");
const redSound = new Audio("sounds/red.mp3");
const yellowSound = new Audio("sounds/yellow.mp3");
const blueSound = new Audio("sounds/blue.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const message = document.querySelector("#level-title");
const body = document.querySelector("body");

const loseMessage = "Game Over, Press Any Key to Restart";
const initialMessage = "Press Any Key to Start";
const winMessage = "Congrats! You Won. Press Any Key to Restart";
