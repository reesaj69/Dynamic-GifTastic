// -----Basketball players-------//

//Initial array of basketball players

var basketPlayersArr= ["Michael Jordan", "Magic Johnson", "Lebron James", "Stephen Curry", "Kyrie Irving"];

//renderButtons will display the basketball player buttons for all basketball players with the basketPlayersArr.

function renderButtons(){
	//Empty the buttons panel before redrawing it
	$("#buttonPanel").empty();

	//Loop through the array of basketball Players
	for (var i = 0; i < basketPlayersArr.length; i++) {
		//Dynamically generate a button for each basketball player in the array
		var button = $("<button>");
		button.addClass("basketballButton");
		button.attr("data-basketball", basketPlayersArr[i]);
		button.text(basketPlayersArr[i]);

	//Add the button to the HTML
	$("#buttonPanel").append(button);
	}
}
// ----Event Handlers ----//
//An event handler for the user form to add addtional basketball players to the array
$("#add-basketballPlayer").on("click", function(event) {
	event.preventDefault();

//Get the input from the textbox
var basketballPlayer = $("#basketball-input").val().trim();

//The basketball player from the textbox is then added to the basketball player array
basketPlayersArr.push(basketballPlayer);
$("#basketball-input").val("");

//Redraw the basketball player buttons
renderButtons();

});

//get Basketball Player gifs with giphy api
function fetchBasketballPlayersGif(){
	//Get the basketball player name from the button clicked
	var basketballPlayerName = $(this).attr("data-basketball");
	var basketballPlayerStr = basketballPlayerName.split(" ").join("+");

	//Construct the Giphy URL
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + basketballPlayerName + "&api_key=dc6zaTOxFJmzC&limit=10";

	//Make the AJAX call to the Giphy API

	$.ajax({
		method: "GET",
		url: queryURL,
	})
	.done(function(result){
		//Get the results array
		var dataArray = result.data;

		//create and display div elements for each of the returned Gifs
		$("#gifPanel").empty();
		for (var i = 0; i < dataArray.length; i++) {
			var newDiv = $("<div>");
			newDiv.addClass("basketballGif");

			var newRating = $("<h2>").html("Ratings: " + dataArray[i].rating);
			newDiv.append(newRating);

			var newImg = $("<img>");
			newImg.attr("src", dataArray[i].images.fixed_height_still.url);
			newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
			newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
			newImg.attr("data-state", "still");
			newDiv.append(newImg);

			//append the new Gifs to the gifPanel
			$("#gifPanel").append(newDiv);
		}

	});
}

//animate basketball gif will animate a still gif and stop a moving gif
function animatebasketballGif() {
	//the image state will either be "still" or "animated"
	var state = $(this).find("img").attr("data-state");

	//Make the Gif either animated or still depending on the data state
	if (state === "still") {
		$(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
		$(this).find("img").attr("data-state", "animate");
	} else {
		$(this).find("img").attr("src", $(this).find("img").attr("data-still"));
		$(this).find("img").attr("data-state", "still");
	}
}
//Render the initial basketball player buttons when the HTML has finished loading
$(document).ready(function() {
	renderButtons();
});

//An event handelr for the basketball buttons to get appropriate gifs
$(document).on("click", ".basketballButton", fetchBasketballPlayersGif);

//add an event handler for the basketball gifs to make the image animate and stop
$(document).on("click", ".basketballGif", animatebasketballGif);


