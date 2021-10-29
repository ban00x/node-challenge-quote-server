// const { response } = require('express');
const express = require('express');
const cors = require('cors');
const lodash = require('lodash');
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const app = express();

//load the quotes JSON
const quotes = require('./quotes.json');

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.use(cors());
app.get('/', function (request, response) {
	response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get('/quotes', function (req, res) {
	res.send(quotes);
});
app.get('/quotes/random', function (req, res) {
	res.send(lodash.sample(quotes));
});
const searchForATerm = (req, res) => {
	const searchQuery = req.query.term;
	if (searchQuery != null) {
		const terms = quotes.filter((quote) => {
			return (
				quote.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
				quote.author.toLowerCase().includes(searchQuery.toLowerCase())
			);
		});
		res.send(terms);
	} else {
		res.end;
	}
};
app.get('/quotes/search', searchForATerm);
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen(port, function () {
	console.log('Your app is listening on port ' + port);
});
