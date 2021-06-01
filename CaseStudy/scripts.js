let container = document.getElementById('container') ;
let player2 = document.getElementById("player2");
let canvas = document.getElementById("gameCanvas");
canvas.addEventListener("mousedown", handleMouseClick);
let framePerSecond = 30;
let game = false;
let check = false;
let canvasContext;
let ballX = 400;
let ballY = 250;
let defaultX = 8;
let defaultY = 3;
let ballSpeedX = defaultX;
let ballSpeedY = defaultY;
let paddle1Y = 100;
let paddle2Y = 100;
const PADDLE_HEIGHT = 100;
const PADDLE_THINKNESS = 10;
let Player1Score = 0;
let Player2Score = 0;
const WIN_SCORE = 3;
let showingWinScreen = false;
function handleMouseClick() {
  if(!game){container.style.display = 'block';
  canvas.style.display = "none";
  player2.style.display = "none";
  }
}

function startGame() {

  check =false;
  game =true;
  canvas.style.display = "block";
  container.style.display = 'none';
  canvasContext = canvas.getContext("2d");
  setInterval(callBoth, 1000 / framePerSecond);// remove setinterval sau mỗi lần chơi
  canvas.addEventListener("mousemove", function (evt) {
    x = evt.clientX;
    y = evt.clientY;
    if(y>=0 &&  y<= canvas.height - PADDLE_HEIGHT){
      paddle1Y = y;
    }
    // console.log(paddle1Y,y);
   
  });
  if (showingWinScreen) {
    Player1Score = 0;
    Player2Score = 0;
    showingWinScreen = false;
  }
 
}
function startGame1(){
  canvas.style.display = "block";
  container.style.display = 'none';
  canvasContext = canvas.getContext("2d");
  player2.style.display = "block";
  game =true;
  check = true;
  setInterval(callBoth, 1000 / framePerSecond);
  window.addEventListener("keydown", myFunction);
  window.addEventListener("keydown", myFunction1);
  if (showingWinScreen) {
    Player1Score = 0;
    Player2Score = 0;
    showingWinScreen = false;
  }

}
function myFunction(evt) {
  let x = evt.keyCode;
  if (x == 38) {
    moveup();
  }
  if (x == 40) {
    movedown();
  }
}
function myFunction1(evt) {
  let x = evt.keyCode;
  if (x == 87) {
    moveup1();
  }
  if (x == 83) {
    movedown1();
  }
  
}
function moveup1() {
  if(paddle1Y <= 0){
    paddle1Y = 0;
  }else {
    paddle1Y -= 15;
  }
}

function movedown1() {
  if(paddle1Y >= canvas.height - PADDLE_HEIGHT){
    paddle1Y = canvas.height - PADDLE_HEIGHT;
  }else {
    paddle1Y += 15;
  }
}
function moveup() {
  if(paddle2Y <= 0){
    paddle2Y = 0;
  }else {
    paddle2Y -= 15;
  }
}

function movedown() {
  if(paddle2Y >= canvas.height - PADDLE_HEIGHT){
    paddle2Y = canvas.height - PADDLE_HEIGHT;
  }else {
    paddle2Y += 15;
  }
}

function ballreset() {
  console.log("resetball");
  if (Player1Score >= WIN_SCORE || Player2Score >= WIN_SCORE) {
    showingWinScreen = true;
    game = false;
  }
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -defaultX;
 
}

function callBoth() {
  moveEverything();
  drawEverything();
}
function computerMovement() {
  let paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;
  if(!check){
    if (paddle2YCenter < ballY - 25) {
      if(paddle2Y <= canvas.height -PADDLE_HEIGHT){
        paddle2Y = paddle2Y + 6;
      }
    } else if (paddle2YCenter > ballY + 25) {
      if(paddle2Y>=0){
        paddle2Y = paddle2Y - 6;
      }
    }
  }
  
}
function moveEverything() {
  computerMovement();
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  console.log( 'ballX :'+ ballX);
  console.log('ballY :'+ ballY);
  if (ballX >= canvas.width-PADDLE_THINKNESS-13) {

    // ballSpeedX = -ballSpeedX;
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {

      Player1Score++;
    
      ballreset();
    
    }
  }
  if (ballX <=  PADDLE_THINKNESS+13) {
    // ballSpeedX = -ballSpeedX;
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      Player2Score++;
      reset();
      ballreset();
    
    }
  }
  if (ballY >= canvas.height-10) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY <= 10) {
    ballSpeedY = -ballSpeedY;
  }
}
function drawNet() {
  for (let i = 70; i < canvas.height; i += 20) {
    createRect(canvas.width / 2 - 1, i, 2, 10, "tomato");
  }
}

function drawEverything() {
  //create the screen
  createRect(0, 0, canvas.width, canvas.height, "black");

  if (showingWinScreen) {
    canvasContext.fillStyle = "red";
    canvasContext.font = "40px Arial";
    canvasContext.textAlign = "center";

    if (Player1Score >= WIN_SCORE) {     
 
      canvasContext.fillText(
        "Player1 Win!",
        canvas.width / 2,
        canvas.height / 2
      );
      canvasContext.fillText(
        "Click to Play Again",
        canvas.width / 2,
        canvas.height / 2+40
        
      );
  
      return;

    }
     else if (Player2Score >= WIN_SCORE) {   
    
      canvasContext.fillText(
        "Player2 Win!",
        canvas.width / 2,
        canvas.height / 2
        
      ); canvasContext.fillText(
        "Click to Play Again",
        canvas.width / 2,
        canvas.height / 2+40
        
      );
  
      return;
    }
    
  }
  drawNet();
  createRect(0, paddle1Y, PADDLE_THINKNESS, PADDLE_HEIGHT, "white");
  createRect(
    canvas.width - PADDLE_THINKNESS,
    paddle2Y,
    PADDLE_THINKNESS,
    PADDLE_HEIGHT,
    "red"
  );
  canvasContext.font = "40px Arial";
  canvasContext.fillText("score wins:10!",280,50);
  canvasContext.fillText(Player1Score, 100, 100);
  canvasContext.fillText(Player2Score, canvas.width - 100, 100);

  //create ball
  createCircle(ballX, ballY, 10, "blue");
}
function createCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}
function createRect(leftX, topY, width, height, drawColor) {
  
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
/*=============================================================================*/
