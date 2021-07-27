const c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

class pongPaddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };
}

class pongBall {
  constructor(x,y,speedX,speedY){
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
  };
}

const paddle1 = new pongPaddle(15, 130);
const paddle2 = new pongPaddle(570, 130);
const ball = new pongBall(250,125,2,3);
let keysPressed = {};

document.addEventListener("keydown", event => {
  if (event.keyCode === 87) {
    // w is pressed
    keysPressed[event.key] = true;
  }
  
  if (event.keyCode === 83) {
    // s is pressed
    keysPressed[event.key] = true;
  }
  
  if (event.keyCode === 73) {
    // i is pressed
    keysPressed[event.key] = true;
  }

  if (event.keyCode === 75) {
    // k is pressed
    keysPressed[event.key] = true;
  }

  if (keysPressed['w']) {
    if (paddle1.y < 25){
    } else {
      paddle1.y = paddle1.y - 20;
    }
  }

  if (keysPressed['s']) {
    if (paddle1.y > 325){

    } else {
      paddle1.y = paddle1.y + 20;
    }
  }

  if (keysPressed['i']) {
    if (paddle2.y < 25) {

    } else {
      paddle2.y = paddle2.y - 20;
    }
  }

  if (keysPressed['k']) {
    if (paddle2.y > 325){

    } else {
      paddle2.y = paddle2.y + 20;
    }
  }
  
  if (event.keyCode === 27) {
    // esc is pressed
    console.log("exited");
    clearInterval(run)
  }
})

document.addEventListener("keyup", event => {
  if (event.keyCode === 87) {
    // w is pressed
    keysPressed[event.key] = false;
  }
  
  if (event.keyCode === 83) {
    // s is pressed
    keysPressed[event.key] = false;
  }
  
  if (event.keyCode === 73) {
    // i is pressed
    keysPressed[event.key] = false;
  }

  if (event.keyCode === 75) {
    // k is pressed
    keysPressed[event.key] = false;
  }
})

function refreshScreen(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 400);
  ctx.fillStyle = 'white';
  ctx.fillRect(15, paddle1.y, 15, 60);
  ctx.fillRect(570, paddle2.y, 15, 60);
  ctx.fillRect(ball.x,ball.y,15,15);
}

function moveBall(){
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  if (ball.y > 385){
    ball.speedY = ball.speedY * -1;
  }
  if (ball.y < 0){
    ball.speedY = ball.speedY * -1;
  }
}

let run = setInterval(function() {
  refreshScreen();
  moveBall()
}, 16)
