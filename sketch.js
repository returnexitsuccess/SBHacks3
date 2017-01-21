var afinn;

function preload() {
  afinn = loadJSON('afinn111.json');
}

function setup() {
  noCanvas();
  //console.log(afinn);

  var txt = select('#txt');
  txt.input(typing);

  function typing() {
    var textinput = txt.value();
    var words = textinput.split(/\W/);
    //console.log(words);
    var scoredwords = [];
    var score = 0;
    for (var i = 0; i < words.length; i++) {
      var word = words[i].toLowerCase();
      if (afinn.hasOwnProperty(word)) {
        score += afinn[word];
        scoredwords.push(word + ': ' + afinn[word]);
      }
    }
    var scoreP = select('#score');
    scoreP.html('score: ' + score);
    var comp = select('#comparative');
    comp.html('comparative: ' + score / words.length);
    var wordlist = select('#wordlist');
    wordlist.html(scoredwords);

    //console.log(txt.value());
  }
}



function draw() {

}
