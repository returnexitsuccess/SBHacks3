function analyze(text) {
	console.log(text);
	text = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
	//console.log(text);
	var new_text = text.split(/[^\w#']+/);
	//console.log(new_text);
	var total_rating = 0;
	for(var i = new_text.length-1; i >= 0; i--) {
		var word = new_text[i].toLowerCase();
		if(/^[a-zA-Z]+$/.test(word)) {
			if(afinn.hasOwnProperty(word)) {
				var rating = afinn[word];
				//console.log(word, rating);
				total_rating += rating;
			}
		}
		else
		{
			new_text.splice(i, 1);
		}
	}
	//console.log(new_text);
	var avg_rating = total_rating/(new_text.length);
	return avg_rating;
}

function iterator() {
	for(var i = 0; i < 100; i++) {
		if(toAnalyze.length == 0)
			break;
		else {
			var tweet = toAnalyze[0];
			var sentiment = analyze(tweet.text);
			toAnalyze.shift();
			console.log(sentiment);
		}
	}
}
