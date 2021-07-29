const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

class Snake {
  constructor(x,y,xVel,yVel,) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.tailLength = 2;
    this.trail = [];
  }

  up() {
    if (this.xVel === 0 && this.yVel === 20) return;
    this.xVel = 0;
    this.yVel = -20;
  }
  down() {
    if (this.xVel === 0 && this.yVel === -20) return;
    this.xVel = 0;
    this.yVel = 20;
  }
  right() {
    if (this.xVel === -20 && this.yVel === 0) return;
    this.xVel = 20;
    this.yVel = 0;
  }
  left() {
    if (this.xVel === 20 && this.yVel === 0) return;
    this.xVel = -20;
    this.yVel = 0;
  }

  move() {
    if (this.x < 0){
      this.x = 400;
      this.left();
    }
    if (this.x > 400) {
      this.x = -20;
      this.right()
    }
    if (this.y < 0){
      this.y = 400;
      this.up();
    }
    if (this.y > 400) {
      this.y = -20;
      this.down();
    }
    this.x += this.xVel;
    this.y += this.yVel;
    
    this.trail.push({x:this.x,y:this.y});
    if (this.tailLength < this.trail.length){
      this.trail.shift();
    }

    this.trail.forEach((block, index) => {
      if (index === 0) return;

      if (block.x === this.trail[0].x){
        if (block.y === this.trail[0].y){
          clearInterval(runCode)
          console.log("dead")
        }
      }
    })
  }
}

class Apple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  eaten() {
    this.x = Math.floor(Math.random() * 20) * 20;
    this.y = Math.floor(Math.random() * 20) * 20;
    
    player.trail.forEach(trail => {
      if (trail.x === this.x || trail.y === this.y) {
        this.eaten();
      }
    })
  }
}

const player = new Snake(200,200,0,20);
const apple = new Apple(20, 20)

ctx.fillStyle = '#6a8059';
ctx.fillRect(0,0,400,400);

function refreshScreen() {
  //draw the square
  ctx.fillStyle = '#6a8059';
  ctx.fillRect(0,0,400,400);

  // draws player
  ctx.fillStyle = 'black';
  ctx.fillRect(player.x,player.y,20,20);
  

  // draws trail
  player.trail.forEach(block => {
    ctx.fillRect(block.x, block.y, 20, 20)
  })

  //draw apple
  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x,apple.y,20,20);
}

function running() {
  player.move();
  if (player.x === apple.x) {
    if (player.y === apple.y) {
      apple.eaten();
      player.tailLength++;
    }
  }

  refreshScreen();
}

window.addEventListener("keydown", event => {
  if (event.key === "w") {
    player.up();
  }
  if (event.key === "a") {
    player.left()
  }
  if (event.key === "s") {
    player.down();
  }
  if (event.key === "d") {
    player.right();
  }
  if (event.keyCode === 27) {
    clearInterval(runCode)
    console.log("exited")
  }
})

let runCode = setInterval(running, 1000/10);
