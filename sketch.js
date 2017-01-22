var canvas;
var x;
var y;
var roff;
var angle;

var afinn;
var input;
var startP;
var userTweets = {};
var toAnalyze;
var currentUser;
var userData = {};

var startState = true;
var analysisState = false;
var viewState = false;

function preload() {
  afinn = loadJSON("afinn111.json");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index: -1");
  x = mouseX;
  y = mouseY;
  roff = 0;
  angle = 0;

  startP = createP("Input Twitter Username:").parent("start");

  input = createInput("@");
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
    currentUser = username;
    toAnalyze = userTweets[username];
  }
}

function draw() {
  background(51);

  //drawing
  noStroke();
  if (startState) {
    // x = lerp(x, mouseX, 0.2);
    // y = lerp(y, mouseY, 0.2);
    x = lerp(x, (200 + map(noise(roff), 0, 1, -100, 100)) * cos(angle) + width /
      4, 0.2);
    y = lerp(y, (200 + map(noise(roff), 0, 1, -100, 100)) * sin(angle) + height /
      4, 0.2);;
    ellipse(x, y, 50);
    ellipse(width - x, y, 50);
    ellipse(x, height - y, 50);
    ellipse(width - x, height - y, 50);
    roff += 0.05;
    angle += 0.05;
  } else if (analysisState) {
    x = lerp(x, 50 * cos(angle) + width / 2, 0.2);
    y = lerp(y, 50 * sin(angle) + height / 2, 0.2);
    angle += 0.1;

    push();
    ellipse(x, y, 20);
    translate(width / 2, height / 2);
    rotate(PI / 2);
    translate(-width / 2, -height / 2);
    ellipse(x, y, 20);
    translate(width / 2, height / 2);
    rotate(PI / 2);
    translate(-width / 2, -height / 2);
    ellipse(x, y, 20);
    translate(width / 2, height / 2);
    rotate(PI / 2);
    translate(-width / 2, -height / 2);
    ellipse(x, y, 20);
    pop();
  }

  if (startState) {
    startDraw();
  } else if (analysisState) {
    if (toAnalyze.length != 0) {
      partialAnalysis();

      //dummy code
      toAnalyze.shift();;
    } else {
      analysisState = false;
      viewState = true;
      viewInit();
    }
  }
}

function startDraw() {
  if (input.value() == "" || input.value()[0] != "@") {
    input.value("@");
  } else {
    input.value(input.value());
  }
}

function viewInit() {
  createP(currentUser).parent("view");
}
