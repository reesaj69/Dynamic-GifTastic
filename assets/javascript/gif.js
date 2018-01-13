
	$("button").on("click", function(){
		var basketballPlayer = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + basketballPlayer + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		})

		.done(function(response){
			console.log(queryURL);
			console.log(response);

			var results = response.data;
			for (var i = 0; i <results.length; i++) {
				var basketballPlayerDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var basketballImage = $("<img>");
				basketballImage.addClass('anImg');

				basketballImage.attr("src", results[i].images.fixed_height.url);
				

				basketballPlayerDiv.append(p);
				basketballPlayerDiv.append(basketballImage);

				$("#gifs").prepend(basketballPlayerDiv);
			}

			
			});

		});
	

	