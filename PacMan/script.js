const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const pellets = [{'x':10,'y':10}]

context.fillStyle = "black";
context.fillRect(0,0,canvas.width,canvas.height);