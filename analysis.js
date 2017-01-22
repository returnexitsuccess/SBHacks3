var best_tweet;
var worst_tweet;
var avg_score;
var monthly_avg = new Array(12);
var sentiment_total = 0;

function analyze(text) {
	console.log(text);
	var text2 = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
	//console.log(text);
	var new_text = text2.split(/[^\w#']+/);
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
	var sentiments = [avg_rating, new_text.length];
	console.log(avg_rating);
	return sentiments;
}

function iterator() {
	for(var i = 0; i < 100; i++) {
		if(toAnalyze.length == 0)
			break;
		else {
			var tweet = toAnalyze[0];
			var sentiment = analyze(tweet.text);
			console.log(sentiment);
			sentiment_total += sentiment[0];
			if(best_tweet == null) {
				best_tweet = {string:tweet.text, score:sentiment[0], word_count:sentiment[1], likes:(tweet.favorite_count+tweet.retweet_count)};
				worst_tweet = {string:tweet.text, score:sentiment[0], word_count:sentiment[1], likes:(tweet.favorite_count+tweet.retweet_count)};
			}
			else if(sentiment[0] >= best_tweet.score) {
				if(sentiment[0] > best_tweet.score) {
					best_tweet.string = tweet.text;
					best_tweet.score = sentiment[0];
					best_tweet.word_count = sentiment[1];
					best_tweet.likes = (tweet.favorite_count+tweet.retweet_count);
				}
				else {
					if((tweet.favorite_count+tweet.retweet_count) > (best_tweet.likes)) {
						best_tweet.string = tweet.text;
						best_tweet.score = sentiment[0];
						best_tweet.word_count = sentiment[1];
						best_tweet.likes = (tweet.favorite_count+tweet.retweet_count);
					}
				}
			}
			else if(sentiment[0] <= worst_tweet.score) {
				if(sentiment[0] < worst_tweet.score) {
					worst_tweet.string = tweet.text;
					worst_tweet.score = sentiment[0];
					worst_tweet.word_count = sentiment[1];
					worst_tweet.likes = (tweet.favorite_count+tweet.retweet_count);
				}
				else {
					if((tweet.favorite_count+tweet.retweet_count) > (best_tweet.likes)) {
						worst_tweet.string = tweet.text;
						worst_tweet.score = sentiment[0];
						worst_tweet.word_count = sentiment[1];
						worst_tweet.likes = (tweet.favorite_count+tweet.retweet_count);
					}
				}
			}
			toAnalyze.shift();
			console.log(sentiment[0]);
		}
	}
	console.log(sentiment_total);
	avg_score = sentiment_total/13;
	userData = {best:best_tweet, worst:worst_tweet, average:avg_score};
	console.log(userData);
}
