function analyze(text) {
	text = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
	console.log(text);
	var new_text = text.split(/[^\w#']+/);
	console.log(new_text);
	var total_rating = 0;
	for(var index in new_text) {
		var word = new_text[index].toLowerCase();
		if(afinn.hasOwnProperty(word)) {
			var rating = afinn[word];
			total_rating += rating;
		}
	}
	var avg_rating = total_rating/(new_text.length);
	return avg_rating;
}
