var args = process.argv.slice(2);

var Twitter = require('twitter');

var client = new Twitter({
        consumer_key: 'H3Ko1Gu0o5IoCyMCXHBEDciTE',
        consumer_secret: 'dJUhh7vgjcHOyg7wbFB8In5MrYlmotvHNagQDNcxaX4eAGjjoK',
        access_token_key: '245641395-h1vybo8TAOAlIVfQntbmeolnyfeJRAO6v0znqYYb',
        access_token_secret: 'goIzMsNaLPrSws2QHhiYHLNF5EOLSK9P8L1tmOJEeogDn'
    });

var params = {screen_name: args[0], count: 200};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
	    userTweets[args[0]] = tweets;
        }
    });