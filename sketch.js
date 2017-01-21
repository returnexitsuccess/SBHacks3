var canvas;
var x;
var y;
var afinn;
var input;
var startP;
var userTweets = {};

var startState = true;
var analysisState = false;

function preload() {
  afinn = loadJSON("afinn111.json");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index: -1");
  x = mouseX;
  y = mouseY;

  startP = createP("Input Twitter Username").parent("start");

  input = createInput("@");
  //input.position(width / 2, height / 2);
  input.class("start");
}

function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode == ENTER) {
    //console.log("enter");
    startState = false;
    analysisState = true;
    startP.remove();
    var username = input.value();
    input.remove();
    getUserTweets(username);
  }
}

function draw() {
  background(51);
  noStroke();

  if (startState) {
    x = lerp(x, mouseX, 0.2);
    y = lerp(y, mouseY, 0.2);
    ellipse(x, y, 50);
    ellipse(width - x, y, 50);
    ellipse(x, height - y, 50);
    ellipse(width - x, height - y, 50);
    startDraw();
  }
}

function startDraw() {
  if (input.value() == "" || input.value()[0] != "@") {
    input.value("@");
  } else {
    input.value(input.value());
  }
}
