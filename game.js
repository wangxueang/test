// Game variables
var score1 = 0;
var score2 = 0;
var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;
var paddleWidth = 0.06 * gameWidth;
var paddleHeight = 0.2 * gameHeight;
var ballWidth = 0.02 * gameWidth;
var ballHeight = 0.04 * gameHeight;
var ballSpeed = 5;
var ballSpeedY = ballSpeed;
var ballSpeedX = ballSpeed;
var ballTop = 0.48 * gameHeight;
var ballLeft = 0.49 * gameWidth;
var paddle1Top = 0.4 * gameHeight;
var paddle2Top = 0.4 * gameHeight;

// Game elements
var paddle1 = document.getElementById("paddle1");
var paddle2 = document.getElementById("paddle2");
var ball = document.getElementById("ball");
var score = document.getElementById("score");

// Move paddles
document.addEventListener("touchmove", function(event) {
    event.preventDefault();
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        if (touch.clientX < gameWidth / 2) {
            paddle1Top = touch.clientY - (paddleHeight / 2);
        }
        if (touch.clientX > gameWidth / 2) {
            paddle2Top = touch.clientY - (paddleHeight / 2);;
        }
    }
});

// Update game
setInterval(function() {
    // Move ball
    ballTop += ballSpeedY;
    ballLeft += ballSpeedX;
    ball.style.top = ballTop + "px";
    ball.style.left = ballLeft + "px";

    // Check collisions with paddles
    if (ballTop < 0 || ballTop > (gameHeight - ballHeight)) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballLeft < (paddleWidth + ballWidth) && ballTop > paddle1Top && ballTop < (paddle1Top + paddleHeight)) {
        ballSpeedX = -ballSpeedX;
        ballSpeedY = ballSpeedY + Math.random() * 2 - 1; // Add some randomness to rebound angle
    }
    if (ballLeft > (gameWidth - paddleWidth - ballWidth) && ballTop > paddle2Top && ballTop < (paddle2Top + paddleHeight)) {
        ballSpeedX = -ballSpeedX;
        ballSpeedY = ballSpeedY + Math.random() * 2 - 1; // Add some randomness to rebound angle
    }

    // Check score
    if (ballLeft < (-ballWidth)) {
        score2++;
        score.innerHTML = score1 + " - " + score2;
        ballTop = 0.48 * gameHeight;
        ballLeft = 0.49 * gameWidth;
        ballSpeedY = ballSpeed;
        ballSpeedX = ballSpeed;
    }
    if (ballLeft > (gameWidth + ballWidth)) {
        score1++;
        score.innerHTML = score1 + " - " + score2;
        ballTop = 0.48 * gameHeight;
        ballLeft = 0.49 * gameWidth;
        ballSpeedY = ballSpeed;
        ballSpeedX = ballSpeed;
    }

    // Move paddles
    paddle1.style.top = paddle1Top + "px";
    paddle2.style.top = paddle2Top + "px";
}, 20);