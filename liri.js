require("dotenv").config();

var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var keys = require("./keys");
console.log(keys);
// console.log(keys.spotify);
// console.log(keys.movies);

var spotify = new Spotify(keys.spotify);
// console.log(spotify);

var omdb = keys.movies.id;
var bands = keys.bands.id;
// console.log(omdb);

var userChoice = process.argv[2];

console.log(bands);

// if/else:

// if (userChoice === "") {
//     // one
// } else if (userChoice === "") {
//     // two
// } else if (userChoice === "") {
//     // three
// } else if (userChoice === "") {
//     // four
// } else {
//     console.log("I don't understand that.");
// }

// get apis working:
// do what it says

// switch:
switch (userChoice) {
    case "concert-this":
        console.log("concert");
        axios
            .get(
                "https://rest.bandsintown.com/artists/panic+at+the+disco/events?app_id=" +
                    bands
            )
            .then(function(result) {
                // Then we print out the imdbRating
                // console.log(result.data);
                for (var i = 0; i < result.data.length; i++) {
                    console.log(result.data[i].venue.name);
                    console.log(result.data[i].venue.country);
                    console.log(result.data[i].venue.city);
                    console.log(result.data[i].datetime);
                }
                // console.log(result.data.venue.name);
                // console.log(result.data.venue.country);
                // console.log(result.data.venue.city);
                // console.log(result.data.datetime);
            });
        break;
    case "spotify-this-song":
        console.log("spotify");
        spotify.search({ type: "track", query: "django jane" }, function(
            err,
            result
        ) {
            if (err) {
                console.log(err);
            }
            // console.log(result);
            console.log(result.tracks.items[0].album.name);
            console.log(result.tracks.items[0].artists);
            console.log(result.tracks.items[0].preview_url);
            console.log(result.tracks.items[0].name);
        });
        break;
    case "movie-this":
        console.log("movie");
        axios
            .get(
                "http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=" +
                    omdb
            )
            .then(function(result) {
                // Then we print out the imdbRating
                console.log(result);
                console.log(result.data.Title);
                console.log(result.data.Year);
                console.log(result.data.Ratings[0].Value);
                console.log(result.data.Ratings[1].Value);
                console.log(result.data.Country);
                console.log(result.data.Plot);
                console.log(result.data.Actors);
            });

        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.

        break;
    case "do-what-it-says":
        console.log("doit");
        break;
    default:
        console.log("Sorry - I didn't understand that");
        break;
}

// Artist(s)

//         - The song's name

//         - A preview link of the song from Spotify

//         - The album that the song is from
