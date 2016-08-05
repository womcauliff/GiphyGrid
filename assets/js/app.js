
// Initial array of gif queries
var giphyQueries = ['tiger', 'python'];

/**
 * Use an array to store your animals,
 * make the buttons on the page using a function (for loop may be required),
 * query link to the API should be saved to a variable,
 * you should use the data attribute at least once,
 * gifs should be added to the webpage correctly,
 * the jQuery cdn (or local jQuery file) must be used
 * the project must be deployed to Heroku.
 */

$(document).ready(function(){
	console.log("ready");

	renderButtons();
});

function getGiphs() {
	var q = $(this).attr('data-query');
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

$(document).on('click', '.btn-query', getGiphs);
