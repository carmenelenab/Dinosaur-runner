let character = document.getElementById("character");
let obstacle = document.getElementById("obstacle");
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
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second
}

// Function to update the timer display
function updateTimer() {
    timeElapsed = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
}

function jump() {
    if (character.classList != "jump") {
        character.classList.add("jump");

        setTimeout(function () {
            character.classList.remove("jump");
        }, 500);
    }
}

document.addEventListener("keydown", function (event) {
    jump();
});

let obstacleInterval = setInterval(moveObstacle, 10); // Start moving the obstacle

function moveObstacle() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    if (obstacleLeft <= -20) {
        obstacle.style.left = '100%'; // Reset obstacle position when it goes out of the screen
    } else {
        obstacle.style.left = obstacleLeft - 4 + 'px'; // Move obstacle to the left
    }
}

let checkCollision = setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    if (obstacleLeft < 25 && obstacleLeft > 5 && characterTop >= 120) {
        clearInterval(checkCollision); // Stop checking for collisions
        clearInterval(obstacleInterval); // Stop moving the obstacle
        gameOver();
    }
}, 10); // Adjust this value to control collision checking frequency

function gameOver() {
    document.getElementById("game-over").style.display = "block";
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "Time: " + timeElapsed + " seconds"; // Display elapsed time
}

function refresh() {
    window.location.reload();
}
