var canvas, context, width, height;
var ballX, ballY, ballSpeedX, ballSpeedY;
var paddle1Y, paddle2Y, paddleHeight, paddleWidth;

function initialize() {
    
    // 获取 Canvas 元素
    var canvas = document.getElementById('canvas');

    // 禁止浏览器滚动
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, {passive: false});
    
    // Set up game variables
    canvas = document.getElementById('game_canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    paddleHeight = 60;
    paddleWidth = 10;
    ballX = width/2;
    ballY = height/2;
    ballSpeedX = -5;
    ballSpeedY = 5;
    paddle1Y = (height/2) - (paddleHeight / 2);
    paddle2Y = paddle1Y;
    
    // Set up touch event listeners
    canvas.addEventListener('touchmove', function(event) {
        var touch = event.targetTouches[0];
        paddle1Y = touch.pageY - (paddleHeight/2);
    });
    
    // Call update function 30 times per second
    setInterval(update, 1000/30);
}

function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Check for collisions with walls and paddles
    if (ballY < 0 || ballY > height) {
        ballSpeedY *= -1;
    }
    if (ballX < paddleWidth) {
        if (ballY > paddle1Y && ballY < (paddle1Y + paddleHeight)) {
            ballSpeedX *= -1;
            var deltaY = ballY - (paddle1Y + paddleHeight/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            ballSpeedX *= -1;
            ballX = width/2;
            ballY = height/2;
        }
    }
    if (ballX > (width - paddleWidth)) {
        if (ballY > paddle2Y && ballY < (paddle2Y + paddleHeight)) {
            ballSpeedX *= -1;
            var deltaY = ballY - (paddle2Y + paddleHeight/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            ballSpeedX *= -1;
            ballX = width/2;
            ballY = height/2;
        }
    }
    
    // Move paddle 2 to track the ball
    paddle2Y = ballY - paddleHeight/2;
    
    // Draw game
    draw();
}

function draw() {
    // Draw black background
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    // Draw left paddle
    context.fillStyle = 'white';
    context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    
    // Draw right paddle
    context.fillStyle = 'white';
    context.fillRect((width - paddleWidth), paddle2Y, paddleWidth, paddleHeight);
    
    // Draw ball
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, Math.PI*2, true);
    context.fill();
}

initialize();