var canvas;
var x;
var y;
var afinn;
var input;
var userTweets = {};

function preload() {
  afinn = loadJSON("afinn111.json");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index: -1");
  x = mouseX;
  y = mouseY;

  createP("Input Twitter Username").parent("start");

  input = createInput("@");
  //input.position(width / 2, height / 2);
  input.class("start");
}

function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(51);
  noStroke();
  x = lerp(x, mouseX, 0.2);
  y = lerp(y, mouseY, 0.2);
  ellipse(x, y, 50);
  ellipse(width - x, y, 50);
  ellipse(x, height - y, 50);
  ellipse(width - x, height - y, 50);

  if (input.value() == "" || input.value()[0] != "@") {
    input.value("@");
  } else {
    input.value(input.value());
  }

  //console.log("hi #goals".split(/[^\w#]+/));
}
