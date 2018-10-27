$(document).ready(function () {

    //Array of movies
    var movies = ["Jurrasic Park", "Tombstone", "Dances with Wolves", "Annabelle",
    "Titanic", "Man on Fire", "X-Men", "Dirty Harry", "King Kong", "GoodFellas", "Lord of the Rings", "Alien", 
    "The Count of Monte Cristo", "Avatar", "Terminator", "The Conjuring", "Scarface"];

    //Function for displaying movie data
    function renderButtons() {
        $("#movie-buttons").empty();

        for (var i = 0; i < movies.length; i++) {

            //Code for generating buttons
            var addButton = $("<button>");
            //Adding a class (but why??)
            addButton.addClass("movie");
            //Adding a data attribute with the value of the movie at index i
            addButton.attr("data-name", movies[i]);
            //Providing the buttons text with a value of the movei at index i
            addButton.text(movies[i]);
            //Adding the button to the HTML
            $("#movie-buttons").append(addButton);
        }
    }

    //This function handles events where one button is clicked
    $("#add-movie").on("click", function (event) {
        //event.preventDefault() prevents form from resubmitting, user can click return
        event.preventDefault();

        //This line will grab the text from the input box
        var movie = $("#movie-input").val().trim();

        //The movie from the textbox is then added to our array
        movies.push(movie);

        //Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    //Trying to connect giphy
    $(document).on("click", function () {
        $("#searches").empty();

        var movies = $(this).attr("addButton");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            movies + "&api_key=jRge9W0eEBduCk4djUlAhUKB3UtKJK9q&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div for the gif
                        var gifDiv = $("<div>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        var personImage = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        personImage.attr("src", results[i].images.fixed_height.url);

                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(personImage);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#gifs-appear-here").prepend(gifDiv);
                    }
                }
            });

    })



    //Calling renderButtons function at least once to display the initial list of movies
    renderButtons();

});