var express = require('express');
var router = express.Router();

// router.get('/movies/:id', function(req, res) {
// 	res.render("YOLO SWAG");
// 	console.log("Enters movies get.");
// 	// res.send("Hi");
// 	var id = req.params.id;
// 	var db = req.db;
// 	var collection = db.get('moviecollection');
// 	collection.find({id: id}, function(err, data) {
// 		if (data.length > 1) {
// 			// movie is found
// 			res.render(data);
// 			console.log(data);
// 		}
// 		console.log("Inside the router.get!");
// 	});
// });

// router.post('/movies/:id', function(req, res) {
// 	console.log("INSIDE POST");
// 	res.send("Success!");
// 	// var id = req.params.id;
// 	// var data = req.params.data;
// 	// var db = req.db;
// 	// var collection = db.get('moviecollection');
// 	// collection.insert({
// 	// 	'id': id,
// 	// 	'data': data
// 	// }, function(err, doc) {
// 	// 	if (err) {
// 	// 		res.send("There was a problem sending the information to the database.");
// 	// 	} else {
// 	// 		res.send("Successful!");
// 	// 		res.location("/");
// 	// 		res.redirect("/");
// 	// 	}
// 	// });

// });

module.exports = router;