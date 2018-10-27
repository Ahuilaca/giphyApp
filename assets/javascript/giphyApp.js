$(document).ready(function () {

    //Array of movies
    var movies = ["Jurrasic Park", "Tombstone", "Dances with Wolves", "Annabelle",
        "Titanic", "Man on Fire", "X-Men", "Dirty Harry", "King Kong", "GoodFellas", "Lord of the Rings", "Alien",
        "The Count of Monte Cristo", "Avatar", "Terminator", "The Conjuring", "Scarface"];

    //Function for displaying movie buttons
    function renderButtons() {
        $("#movie-buttons").empty();

        for (var i = 0; i < movies.length; i++) {

            //Code for generating buttons
            var addButton = $("<button>");
            //Adding a class (but why??)
            addButton.addClass("movie");
            //Adding a data attribute with the value of the movie at index i
            addButton.attr("data-name", movies[i]);
            //Providing the buttons text with a value of the movie at index i
            addButton.text(movies[i]);
            //Adding the button to the HTML
            $("#movie-buttons").append(addButton);
        }
    }

    //This function prevents form from refreshing and adds movie to array
    $("#add-movie").on("click", function (event) {
        event.preventDefault();
        //Gets movie from input box and removes any spaces
        var movie = $("#movie-input").val().trim();
        //Adds (pushes) movie into movies array
        movies.push(movie);

        //Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    //Trying to connect giphy
    $(document).on("click", function () {
        $("#movie-search-results").empty();

        var movies = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=jRge9W0eEBduCk4djUlAhUKB3UtKJK9q&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After the data comes back from the API
            .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(response.data);

                //Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    //Grabbing only movies with a rating less than "r"
                    if (results[i].rating !== "r") {
                        //Creating a div for the gif
                        var movieDiv = $("<div>");
                        //Storing the result item's rating
                        var rating = results[i].rating;
                        //Paragraph tag with the movies rating
                        var p = $("<p>").text("Rating: " + rating);
                        //Creating an image tag
                        var movieGif = $("<img>");
                        //Giving the image tag an src attribute of a proprty pulled off the result item
                        movieGif.attr("src", results[i].images.fixed_height.url);
                    
                        movieDiv.append(p);
                        movieDiv.append(movieGif);

                        //Prepending movieDiv in the HTML
                        $("#movie-search-results").prepend(movieDiv);
                    }
                }
            });

    })



    //Calling renderButtons function at least once to display the initial list of movies
    renderButtons();

});