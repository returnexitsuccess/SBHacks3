var canvas;
var x;
var y;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  x = mouseX;
  y = mouseY;
}

function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(51);
  x = lerp(x, mouseX, 0.2);
  y = lerp(y, mouseY, 0.2);
  ellipse(x, y, 50);
  ellipse(width - x, y, 50);
  ellipse(x, height - y, 50);
  ellipse(width - x, height - y, 50);
}
