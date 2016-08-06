
// Initial array of gif queries
var giphyQueries = ['tiger', 'whale'];

/**
 * - [x] Use an array to store your animals,
 * - [x] make the buttons on the page using a function (for loop may be required),
 * - [ ] query link to the API should be saved to a variable,
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
	var apiEndpoint = "https://api.giphy.com/v1/gifs/search";
	var api_key = "dc6zaTOxFJmzC";
	var limit = 8;
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
		console.log(response);
	});

	console.log(q);
}

function renderButtons(){
	// Deletes buttons, prior to adding new buttons to avoid repeats
	$('#buttonsView').empty();

	for (var i = 0; i < giphyQueries.length; i++) {
		var b = $('<button>');
		b.attr("data-query", giphyQueries[i]);
		b.addClass("btn btn-default btn-query");
		b.text(giphyQueries[i]);
		$("#buttonsView").append(b);
	}
}