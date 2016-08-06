
// Initial array of gif queries
var topics = ['tiger', 'whale', 'frog', 'penguin'];

/**
 * - [x] Use an array to store your animals,
 * - [x] make the buttons on the page using a function (for loop may be required),
 * - [x] query link to the API should be saved to a variable,
 * - [x] you should use the data attribute at least once,
 * - [x] gifs should be added to the webpage correctly,
 * - [x] the jQuery cdn (or local jQuery file) must be used
 * - [x] the project must be deployed to Heroku.
 */

$(document).ready(function(){
	console.log("ready");
	renderButtons();
});

/**
 * These click event listeners use jQuery to select the document,
 * so that DOM elements added dynamically are included.
 */
$(document).on('click', '.btn-query', getGiphs);
$(document).on('click', '.gifresult', animateGif);


/**
 * getGiphs()
 *
 * Makes a call to the GIPHY API 1.0,
 * using the query stored in the UI button.
 */
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

	//replace white space with '+' characters
	q = q.replace(/ /g, '+');

	var request = apiEndpoint + "?" 
					+ "q=" + q 
					+ "&api_key=" + api_key
					+ "&limit=" + limit
					+ "&offset=" + offset;
	$.ajax({
		url: request,
		method: "GET"
	}).done(function(response) {
		//
		responseHandler(response);
	});
}

/**
 * responseHandler()
 *
 * Parses the JSON response retrieved
 * via the GIPHY API
 */
function responseHandler (response) {
		console.log(response);

		// Return if bad response
		if (response.meta.status !== 200) {
			console.log(response.meta);
			return;
		}
		
		$("#gif-row").empty(); //Remove any results from prior API calls

		/* Loop through GIPHY JSON response,
		 * passing GIPHY result objects to giftoHTML()
		 */
		for (var i = 0; i < response.data.length; i++) {
			giftoHTML(response.data[i]);
		}
}

/**
 * giftoHTML()
 *
 * Parses a GIPHY gif Object, constructing an HTML element
 * with data attribute values necessary for animateGif()
 */
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

	var gifResult = $("<img>")
						.addClass("gifresult img-responsive")
						//add still as initial source
						.attr("src", gifObject.images.fixed_height_still.url)
						//add gif-url as attribute
						.attr("data-animate", gifObject.images.fixed_height.url)
						//add still-url as attribute
						.attr("data-still", gifObject.images.fixed_height_still.url)
						//add still as initial state
						.attr("data-state", "still");
	var outerDiv = 
		$("<div>")
			.addClass("col-md-3")
			.append( ratingDiv )
			.append( gifResult );
	$("#gif-row").append(outerDiv);
}

/**
 * animateGif()
 *
 * Checks an img element for the value in the state data-attribute,
 * and swaps the src with the url stored in the corresponding
 * attribute.
 */
function animateGif() {
	var state = $(this).attr('data-state');
	if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
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

$('#addAnimal').on('click', function(){
	console.log("submitted");
	// Retrieve the input from the textbox
	var animal = $('#animal-input').val().trim();

	if(animal !== ''){
		// Add animal from the textbox to global array
		topics.push(animal);
		
		//Render buttons, with user's addition included
		renderButtons();
	}

	//Reset input text field
	$("#animal-input").val('');

	//Prevent page refresh
	return false;
})