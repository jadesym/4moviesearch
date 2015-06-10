dataToListToCommaSeparate = function(jsonDataList) {
	var dataList = [];
	$.each(jsonDataList, function(key, value) {
		dataList.push(value.name);
	});
	return dataList;
}

minutesToHours = function(minutes) {
	var mins = parseInt(minutes);
	var remainder = minutes % 60;
	var hours = Math.floor(minutes/60);
	var returnString = hours.toString() + " hours " + remainder.toString() + " minutes"
	return returnString
}

showMovieData = function(data) {
	$("h3#movieTitle").text(data.original_title);
	$("h3#tagline").text(data.tagline);
	$("h3#movieStatus").text(data['status']);
	$("h3#movieDescription").text(data.overview);

	// Run time, do rounding and convert mins to hours and mins
	$("h3#movieLength").text(minutesToHours(data.runtime));

	// Convert 2012-09-28 to date in words
	$("h3#releaseDate").text(data.release_date);
	$("h3#popularityRating").text(data.popularity);
	$("h3#voteAverage").text(data.vote_average + "/10");
	$("h3#voteCount").text(data.vote_count + " votes");
	$("h3#movieBudget").text("$" + (data.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	$("h3#totalRevenue").text("$" + (data.revenue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

	// var genreList = data.genres;
	// var genreNameList = [];
	// $.each(genreList, function(key, value) {
	// 	genreNameList.push(value.name);
	// });
	$("h3#movieGenres").text(dataToListToCommaSeparate(data.genres).join(", "));
	$("h3#movieHomePage").text(data.homepage);
	$("h3#originalLanguage").text(data.original_language.toUpperCase());

	// var spokenLanguages = data.spoken_languages;
	// var spokenList = [];
	// $.each(spokenList, function(key, value) {
	// 	spokenList.push(value.name);
	// });
	$("h3#spokenLanguages").text(dataToListToCommaSeparate(data.spoken_languages).join(", "));

	$("h3#productionCompanies").text(dataToListToCommaSeparate(data.production_companies).join(", "));
	$("h3#productionCountries").text(dataToListToCommaSeparate(data.production_countries).join(", "));

}


$(document).ready(function() {
	$('#movieSearch').autocomplete({
		delay: 300,
		minLength: 3,
		source: function(req, res) {
			// console.log("Inside autocomplete");
			var curl = "http://api.themoviedb.org/3/search/movie?api_key=c4e31caadc8ff16a803c303dfbad9f41&query="
			curl += req.term;
			// console.log(req.term);
			// console.log(curl);
			$.ajax({
				url: curl,
				dataType: "jsonp",
				// jsonp: "cb",
				success: function(data) {
					var movies = data.results.map(function(movie) {
						return { label: movie.original_title, value: movie.id };
					});
					res(movies);
				}

			});

		},
		select: function(event, ui) {
			// console.log("Item Selected!");
			event.preventDefault();
			var selectedMovie = ui.item.label;
			$(this).val(selectedMovie);
			var movieId = ui.item.value;
			// console.log(movieId);
			$(".changeable").empty();

			var existsInDB = false;
			$.ajax({
				type: "GET",
				url: '/movies/' + movieId,
				dataType: 'json',
				success: function(data) {
					console.log(data);
					if (data.hasOwnProperty('original_title')){
						console.log("Found Original Title!")
						existsInDB = true;
						showMovieData(data);
					}
					console.log("Successfully got data from api");
				},
				error: function(data) {
					console.log('Could not get data from api!');
				}
			});

			var pictureUrl = "http://api.themoviedb.org/3/movie/" + movieId + "/images?api_key=c4e31caadc8ff16a803c303dfbad9f41";
			var pictureBaseLink = "http://image.tmdb.org/t/p/w500";
			$.get(pictureUrl, function(pictureData) {
				// console.log("Grabbing the movie pictures!");
				// $("#moviePictures").empty();
				// console.log("INSIDE GET FOR PICTURE URL");
				// console.log(pictureUrl);
				// console.log(pictureData);
				$.each(pictureData.backdrops, function(index, picture) {
					// console.log("Picture file path: " + picture.file_path);
					var picLink = pictureBaseLink + picture.file_path;
					// console.log("Picture link: " + picLink);
					$("#moviePictures").append("<img src=" + picLink + ">");
				});
			});

		}
	});
});

// var url = http://api.themoviedb.org/3/search/movie?api_key=c4e31caadc8ff16a803c303dfbad9f41&query=

// /* POST to Search Movie */
// router.post('/searchmovie', function(req, res) {
	
// 	// Set our internal DB variable
// 	var db = req.db;

// 	// Set our collection
//     var collection = db.get('searchcollection');

//     // Submit to the DB
//     collection.insert({
//     	"field1" : var1,
//     	"field2" : var2
//     }, function (err, doc) {
//     	if (err) {
//     		res.send("There was a problem conducting this search.");
//     		res.location("");
//     	} else {
//     		res.send("Successful Search!");
//     		res.location("");
//     	}

//     });
// });