'use strict';

const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");

const COLLISION_FREQUENCY_MS = 10;
const TIMER_UPDATE_INTERVL_MS = 1000;
const MILLISECONDS_IN_A_SECOND = 1000;
const JUMP_DURATION_MS = 500;
const OBSTACLE_RESET_POSITION = '100%';
const MOVE_INTERVAL = 10;
const OBSTACLE_MOVE_STEP_PX = 4;
const OBSTACLE_LEFT_THRESHOLD_PX = -20;
const COLLISION_DETECTION_THRESHOLD_LEFT_MIN_PX = 5;
const COLLISION_DETECTION_THRESHOLD_LEFT_MAX_PX = 25;
const COLLISION_DETECTION_THRESHOLD_TOP_PX = 120;

let startTime;
let timerInterval;
let timeElapsed = 0;

window.onload = startGame;

function startGame() {
    startTime = Date.now(); // Record the start time
    startTimer(); // Start the timer
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(updateTimer, TIMER_UPDATE_INTERVL_MS);
}

// Function to update the timer display
function updateTimer() {
    // Calculate elapsed time in seconds
    timeElapsed = Math.floor((Date.now() - startTime) / MILLISECONDS_IN_A_SECOND);
}

function jump() {
    if (character.classList != "jump") {
        character.classList.add("jump");

        setTimeout(function () {
            character.classList.remove("jump");
        }, JUMP_DURATION_MS);
    }
}

document.addEventListener("keydown", function (event) {
    jump();
});

// Start moving the obstacle
let obstacleInterval = setInterval(moveObstacle, MOVE_INTERVAL);


function moveObstacle() {
    let obstacleLeft =
        parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    if (obstacleLeft <= -OBSTACLE_LEFT_THRESHOLD_PX) {
        obstacle.classList.cssText = OBSTACLE_RESET_POSITION;
    } else {
        obstacle.classList.add("moveObstacle");
    }
}

function checkCollisions() {
    let characterTop =
        parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let obstacleLeft =
        parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    if (obstacleLeft < COLLISION_DETECTION_THRESHOLD_LEFT_MAX_PX &&
        obstacleLeft > COLLISION_DETECTION_THRESHOLD_LEFT_MIN_PX &&
        characterTop >= COLLISION_DETECTION_THRESHOLD_TOP_PX) {
        clearInterval(obstacleInterval);
        gameOver();
    }
}
// Adjust this value to control collision checking frequency
let collisionFrequency = setInterval(checkCollisions, COLLISION_FREQUENCY_MS);

function gameOver() {
    document.getElementById("game-over").style.display = "block";
    clearInterval(timerInterval);
    document.getElementById("timer").textContent =
        "Time: " + timeElapsed + " seconds";
}

function refresh() {
    window.location.reload();
}
