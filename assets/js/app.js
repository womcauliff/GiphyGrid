
// Initial array of gif queries
var topics = ['tiger', 'whale'];

/**
 * - [x] Use an array to store your animals,
 * - [x] make the buttons on the page using a function (for loop may be required),
 * - [x] query link to the API should be saved to a variable,
 * - [ ] you should use the data attribute at least once,
 * - [ ] gifs should be added to the webpage correctly,
 * - [x] the jQuery cdn (or local jQuery file) must be used
 * - [x] the project must be deployed to Heroku.
 */

$(document).ready(function(){
	console.log("ready");

	renderButtons();
});
$(document).on('click', '.btn-query', getGiphs);

function getGiphs() {
	console.log("getGiphs()");
	/**
	 * GIPHY API parameters
	 */
	var apiEndpoint = "https://api.giphy.com/v1/gifs/search";
	var api_key = "dc6zaTOxFJmzC";
	var limit = 10;
	var offset = 0;
	var q = $(this).attr('data-query');

	var request = apiEndpoint + "?" 
					+ "q=" + q 
					+ "&api_key=" + api_key
					+ "&limit=" + limit
					+ "&offset=" + offset;
	$.ajax({
		url: request,
		method: "GET"
	}).done(function(response) {
		responseHandler(response);
	});
}

function responseHandler (response) {
		console.log(response);

		if (response.meta.status !== 200) {
			console.log(response.meta);
			return;
		}
		for (var i = 0; i < response.data.length; i++) {
			giftoHTML(response.data[i]);
		}
}

function giftoHTML(gifObject) {
	console.log("giftoHTML()");

	var ratingDiv = $("<div>").addClass("gifrating");

	//Check if GIPHY result has rating 
	if (gifObject.rating === "") {
		ratingDiv.append(
			$("<p>").text("Rating: " + "Not Specified")
		);
	}
	else {
		ratingDiv.append(
			$("<p>").text("Rating: " + gifObject.rating)
		);
	}


	var outerDiv = $("<div>")
					.addClass("col-md-3 gifresult")
					.append(
						ratingDiv
					)
					.append(
						$("<img>")
						.addClass("img-responsive")
						.attr("src", gifObject.images.original_still.url)
					);
	$("#gif-row").append(outerDiv);
}

function renderButtons(){
	console.log("renderButtons()");
	// Deletes buttons, prior to adding new buttons to avoid repeats
	$('#buttonsView').empty();

	for (var i = 0; i < topics.length; i++) {
		var b = $('<button>');
		b.attr("data-query", topics[i]);
		b.addClass("btn btn-default btn-query");
		b.text(topics[i]);
		$("#buttonsView").append(b);
	}
}