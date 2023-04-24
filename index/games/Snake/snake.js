// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the game variables
let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food = generateFood();
let score = 0;
let gameLoop;

// Set up the game loop
function startGame() {
    gameLoop = setInterval(update,300 );
}

// Update the game state
function update() {
    clearCanvas();
    drawFood();
    drawSnake();
    moveSnake();
    checkCollision();
    checkFood();
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Draw the snake on the canvas
function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(function (segment) {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

// Move the snake in the current direction
function moveSnake() {
    let head = { x: snake[0].x, y: snake[0].y };

    if (direction === "right") {
        head.x += 10;
    } else if (direction === "left") {
        head.x -= 10;
    } else if (direction === "up") {
        head.y -= 10;
    } else if (direction === "down") {
        head.y += 10;
    }

    snake.unshift(head);
    snake.pop();
}

// Check for collisions with walls and the snake's body
function checkCollision() {
    // Check for collision with walls
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        gameOver();
        return;
    }

    // Check for collision with the snake's body
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver();
            return;
        }
    }
}

// Check if the snake has eaten the food
function checkFood() {
    let head = snake[0];

    if (head.x === food.x && head.y === food.y) {
        score++;
        snake.push(snake[snake.length - 1]);
        food = generateFood();
    }

    document.getElementById("score").innerHTML = "Score: " + score;
}

// Generate a random position for the food
function generateFood() {
    let foodX = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    let foodY = Math.floor(Math.random() * (canvas.height / 10)) * 10;

    return { x: foodX, y: foodY };
}

// End the game
function gameOver() {
    clearInterval(gameLoop);
    alert("Game Over!");
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    // Ignore input if the game is over
    if (!gameLoop) {
        return;
    }

    if (event.key === "d" && direction !== "left") {
        direction = "right";
    } else if (event.key === "a" && direction !== "right") {
        direction = "left";
    } else if (event.key === "w" && direction !== "down") {
        direction = "up";
    } else if (event.key === "s" && direction !== "up") {
        direction = "down";
    }
    function reset() {
        // Stop the game loop
        clearInterval(gameLoop);
      
        // Reset the game variables
        score = 0;
        direction = "right";
        snake = [{ x: 9, y: 9 }];
        apple = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
      
        // Reset the HTML elements
        scoreElement.innerHTML = "Score: 0";
        canvas.style.borderColor = "#333";
      
        // Restart the game loop
        gameLoop = setInterval(game, speed);
      }
      });


// Start the game
startGame();

