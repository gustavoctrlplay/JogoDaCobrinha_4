//Recuperando os elementos html
const gameBoard = document.querySelector("#gameBoard")
const ctx = gameBoard.getContext("2d")
let scoreText = document.querySelector("#scoreText")
const resetBtn = document.querySelector("#resetBtn")

//Tamanho do jogo
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height

// Atividade 1) Criação das variáveis para o jogo 
const boardBackground = "green"
const snakeColor = "blue"
const snakeBorder = "black"
const foodColor = "red"
const unitSize = 25

let running = false //Analisando se o jogo está rodando ou não
let xVelocity = unitSize 
let yVelocity = 0
let foodX 
let foodY
let score = 0 

//A cobra é um array de objetos, onde cada parte desse array é uma parte da cobra
let snake = [
    {
        x: unitSize * 4 , y: 0
    },
    {
        x: unitSize * 3 , y: 0
    },
    {
        x: unitSize * 2 , y: 0
    },
    {
        x: unitSize , y: 0
    },
    {
        x: 0, y: 0
    }
]



//Iniciar o jogo
function gameStart(){
    running = true 
    scoreText.textContent = score 
    createFood()
    drawFood()
    nextTick()
}

//Manter o jogo atualizando
function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        }, 75)
    } else {
        displayGameOver()
    }
}

// Limpar o tabuleiro
function clearBoard(){
    ctx.fillStyle = boardBackground
    ctx.fillRect(0, 0, gameWidth, gameHeight)
}

//Criar a comida
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum
    }

    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}

//Desenhar a comida
function drawFood(){
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
}

function drawSnake(){
    ctx.fillStyle = snakeColor
    ctx.strokeStyle = snakeBorder
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })

}
drawSnake()

//Mover a cobra
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity}

    snake.unshift(head)

    //Verificando se a cobra comeu a comida
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+= 1
        scoreText.textContent = score 
        createFood()

    } else {
        snake.pop()
    }
}

//Mudar a direção
function changeDirection(event) {
    const keyPressed = event.key; 

    const esquerda = "ArrowLeft";
    const direita = "ArrowRight";
    const cima = "ArrowUp";
    const baixo = "ArrowDown";

    const subindo = (yVelocity == -unitSize);
    const descendo = (yVelocity == unitSize);
    const indoParaEsquerda = (xVelocity == -unitSize);
    const indoParaDireita = (xVelocity == unitSize);

    if (keyPressed === esquerda && !indoParaDireita) {
        xVelocity = -unitSize;
        yVelocity = 0;
    } else if (keyPressed === cima && !descendo) {
        xVelocity = 0;
        yVelocity = -unitSize;
    } else if (keyPressed === direita && !indoParaEsquerda) {
        xVelocity = unitSize;
        yVelocity = 0;
    } else if (keyPressed === baixo && !subindo) {
        xVelocity = 0;
        yVelocity = unitSize;
    }
}


//Verificar se o jogo terminoi
function checkGameOver(){
    if(snake[0].x < 0){
        running = false
    } else if (snake[0].x >= gameWidth){
        running = false 
    } else if (snake[0].y < 0){
        running = false 
    } else if (snake[0].y >= gameHeight){
        running = false 
    }

    for (let i = 1; i < snake.length; i+= 1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false
        }
    }
}

//Mostrar mensagem de game over
function displayGameOver(){
    ctx.font = "50px MV Boli"
    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.fillText("GAME OVER", gameWidth/2, gameHeight/2)
    running = false

}

//Resetar o jogo
function resetGame(){
    xVelocity  = unitSize
    yVelocity = 0
}



//Final: Funções para fazer o jogo iniciar e resetar
window.addEventListener("keydown", changeDirection)
resetBtn.addEventListener("click", resetGame)
gameStart()
resetBtn.addEventListener("click", resetGame);

