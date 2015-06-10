var express = require('express');
var router = express.Router();
var request = require("request");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Movie Search' });
});

router.get('/movies/:id', function(req, res) {
	// res.render("YOLO SWAG");
	console.log("Enters movies get.");
	// res.send("Hi");
	var id = req.params.id;
	// console.log(id);
	var db = req.db;
	var collection = db.get('moviecollection');
	collection.find({'id': id}, function(err, data) {
		if (data.length >= 1) {
			console.log("FOUND A MATCH!");
			// movie is found
			res.send(data[0].data);
			console.log(data);
		} else {
			console.log("Apparently we didn't like what we found!");
			var apiKeyString = "?api_key=c4e31caadc8ff16a803c303dfbad9f41";
			var wurl = "https://api.themoviedb.org/3/movie/" + id + apiKeyString;
			console.log("URL to grab info about movie: " + wurl);
			request({
				uri: wurl,
				method: 'GET',
				json: true
			}, function(error, response, body) {
				console.log("We're in!");
				console.log(body);
				res.send(body);
				collection.insert({'id': id, 'data': body});
			});
			// $.get(wurl, function(data) {
			// 	showMovieData(data);
			// 	$.ajax({
			// 		url: 'http://localhost:3000/movies/' + movieId,
			// 		method: 'POST',
			// 		json: true,
			// 		data: JSON.stringify(data),
			// 		contentType: 'application/json',
			// 		dataType: 'json'
			// 	});
			// 	// console.log("About to grab the specific movie info!");
			// });				

		}
	});
	// not found
	console.log("finished with get!");
	// res.send("Nothing good here.");
});

router.post('/movies/:id', function(req, res) {
	// console.log("INSIDE POST");
	var id = req.params.id;
	var data = req.body;
	// console.log(data);
	var db = req.db;
	var collection = db.get('moviecollection');
	collection.insert({
		'id': id,
		'data': data
	}, function(err, doc) {
		if (err) {
			console.log("Failed to put into the database!");
			// res.send("Error putting into the database!");
			// res.send("There was a problem sending the information to the database.");
		} else {
			// res.send("Successfully placed in database!");
			console.log("Successfully placed in the database!");
			res.location("/");
			res.redirect("/");
		}
	});


});
module.exports = router;
