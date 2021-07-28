const c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
ctx.font = "30px Arial";
let p1Score = 0;
let p2Score = 0;

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

let s = new sound("blip.wav");

class pongPaddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };
}

class pongBall {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
  };
}

const paddle1 = new pongPaddle(15, 170);
const paddle2 = new pongPaddle(585, 170);
const ball = new pongBall(250, 200, 2, 3);
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
    if (paddle1.y < 25) {
    } else {
      paddle1.y = paddle1.y - 20;
    }
  }

  if (keysPressed['s']) {
    if (paddle1.y > 325) {
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
    if (paddle2.y > 325) {
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

function refreshScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 400);
  ctx.fillStyle = 'white';
  ctx.fillRect(15, paddle1.y, 15, 60);
  ctx.fillRect(570, paddle2.y, 15, 60);
  ctx.fillRect(ball.x, ball.y, 15, 15);
  ctx.fillText(p1Score, 250, 50);
  ctx.fillText(p2Score, 350, 50);
}

function moveBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
}

function resetBall(side){
  if (side == 1){
    ball.x = 300;
    ball.y = 200;
    ball.speedX = -3;
    ball.sppedY = -4;
    p1Score++;
  }
  if (side == 2){
    ball.x = 300;
    ball.y = 200;
    ball.speedX = 3;
    ball.sppedY = 4;
    p2Score++;
  }
}
function checkBallCollision(){
  if (ball.y < -3) {
    ball.speedY = ball.speedY * -1;
    s.play();
  }
  if (ball.y > 388) {
    ball.speedY = ball.speedY * -1;
    s.play()
  }
  if (ball.x > 560) {
    if (ball.y > paddle2.y - 15){
      if (ball.y < paddle2.y + 60){
        if (ball.x < 565){
          ball.speedX = ball.speedX *-1;
          s.play();
        }
      }
    }
  }
  if (ball.x < 30) {
    if (ball.y > paddle1.y - 15){
      if (ball.y < paddle1.y + 60){
        if (ball.x > 25){
          ball.speedX = ball.speedX *-1;
          s.play();
        }
      }
    }
  }
  if (ball.x > 610) {
    resetBall(1);
  }
  if (ball.x < -10){
    resetBall(2);
  }
}
let run = setInterval(function() {
  refreshScreen();
  moveBall();
  checkBallCollision();

  if (p1Score === 5) {
     clearInterval(run);
     refreshScreen();
     ctx.fillText('Player 1 Won!', 100, 100);
  } else if (p2Score === 5) {
    clearInterval(run);
    refreshScreen();
    ctx.fillText('Player 2 Won!', 00, 100);
  }
}, 16)
