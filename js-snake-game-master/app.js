const canvas = document.getElementById("snake")
const context = canvas.getContext("2d")
const box = 32

let backgroundImage = new Image();
backgroundImage.src = 'background.jpg';

let snakeHeadImage = new Image();
snakeHeadImage.src = 'head.png';



let isPause = true
let direction = "right"
let food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box }
let snake = []
snake[0] = { x: 8 * box, y: 8 * box }

function initializeCanvas() {
    // Dibuja la imagen de fondo en el lienzo
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            // Dibuja la cabeza de la serpiente con la imagen
            context.drawImage(snakeHeadImage, snake[i].x, snake[i].y, box, box);
        } else {
            // Crea un gradiente
            const gradient = context.createLinearGradient(snake[i].x, snake[i].y, snake[i].x + box, snake[i].y + box);
            gradient.addColorStop(0, 'green'); // Color inicial
            gradient.addColorStop(1, 'dodgerblue'); // Color final

            context.fillStyle = gradient;
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }
}


function checkCollision () {
    if (snake[0].x > (15 * box) && direction == "right") snake[0].x = 0
    else if (snake[0].x < 0 && direction == "left") snake[0].x = (16 * box)
    else if (snake[0].y > (15 * box) && direction == "down") snake[0].y = 0
    else if (snake[0].y < 0 && direction == "up") snake[0].y = (16 * box)
}

function drawFood() {
    let img = new Image();
    img.src = 'icon-banana.png';
    
    img.onload = function() {
        context.drawImage(img, food.x, food.y, box * 1.5, box * 1.5);
    };
}



function toEat() { // cuando come
    if (snake[0].x == food.x && snake[0].y == food.y) {
        // snake.unshift({ x: box, y: box })
        food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box }
        return;
    }
    
    snake.pop()
}

function checkGameOver() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game)
            alert("Game over :(")
            snake = []
            snake[0] = { x: 8 * box, y: 8 * box }
            game = setInterval(initGame, 100)
        }
    }
}

function start () {
    isPause = false
    document.getElementById("start").classList.add("hide")
    document.getElementById("pause").classList.remove("hide")
}

function pause () {
    isPause = true
    document.getElementById("pause").classList.add("hide")
    document.getElementById("start").classList.remove("hide")
}

document.addEventListener('keydown', update)

function update (event) {
    if (event.keyCode == 37 && direction != "right") direction = "left"
    else if (event.keyCode == 38 && direction != "down") direction = "up"
    else if (event.keyCode == 39 && direction != "left") direction = "right"
    else if (event.keyCode == 40 && direction != "up") direction = "down"
}

function initGame() {
    if (!isPause) {
        checkCollision()
        checkGameOver() 
        initializeCanvas()
        drawSnake()
        drawFood()

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction == "right") snakeX += box
        else if (direction == "left") snakeX -= box
        else if (direction == "up") snakeY -= box
        else if (direction == "down") snakeY += box

        toEat()
        let newHead = { x: snakeX, y: snakeY }
        snake.unshift(newHead)
    }
}

// let game = initGame()
let game = setInterval(initGame, 120)