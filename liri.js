require("dotenv").config();

var fs = require("fs");

var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var keys = require("./keys");
// console.log(keys);
// console.log(keys.spotify);
// console.log(keys.movies);

var spotify = new Spotify(keys.spotify);
// console.log(spotify);

var omdb = keys.movies.id;
var bands = keys.bands.id;
// console.log(omdb);

var userChoice = process.argv[2];

var userInput = "";

// Store all of the arguments in an array
var nodeArgs = process.argv;

if (nodeArgs.length < 3) {
    console.log("Please enter an action and a search term!");
} else if ((nodeArgs.length === 3) & (nodeArgs[2] != "do-what-it-says")) {
    console.log("Please enter a search term!");
}

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {
    if (i === 3) {
        userInput = userInput + nodeArgs[i];
    } else {
        userInput = userInput + "+" + nodeArgs[i];
    }
}

console.log(userInput);
console.log(userChoice);

// console.log(bands);

// switch:
function lirithis(userInput, userChoice) {
    switch (userChoice) {
        case "concert-this":
            console.log("concert");
            bandLookup(userInput);

            break;
        case "spotify-this-song":
            console.log("spotify");
            songLookup(userInput);

            break;
        case "movie-this":
            console.log("movie");
            movieLookup(userInput);

            break;
        case "do-what-it-says":
            console.log("doit");

            fs.readFile("random.txt", "utf8", function(error, data) {
                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                // Then split it by commas (to make it more readable)
                var dataArr = data.split(",");

                // We will then re-display the content as an array for later use.
                console.log(dataArr);
                console.log(dataArr[0]);
                if (dataArr[0] === "spotify-this-song") {
                    songLookup(dataArr[1]);
                } else if (dataArr[0] === "movie-this") {
                    movieLookup(dataArr[1]);
                } else if (dataArr[0] === "concert-this") {
                    bandLookup(dataArr[1]);
                } else {
                    console.log("Sorry, I didn't understand that");
                }
            });
            break;
        default:
            console.log("Sorry - I didn't understand that");
            break;
    }
}

function songLookup(userInput) {
    spotify.search({ type: "track", query: userInput }, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result.tracks);
        // console.log(result.tracks.items[0]);
        console.log(result.tracks.items[0].album.name);
        console.log(result.tracks.items[0].artists[0].name);
        if (result.tracks.items[0].preview_url === null) {
            console.log("No preview URL available");
        } else {
            console.log(result.tracks.items[0].preview_url);
        }
        console.log(result.tracks.items[0].name);
    });
}

function movieLookup(userInput) {
    // placeholder
    axios
        .get(
            "http://www.omdbapi.com/?t=" +
                userInput +
                "&y=&plot=short&apikey=" +
                omdb
        )
        .then(function(result) {
            // Then we print out the imdbRating
            // console.log(result);
            console.log(result.data.Title);
            console.log(result.data.Year);
            if (result.data.Ratings.length > 2) {
                for (var i = 0; i < 2; i++) {
                    console.log(
                        `${result.data.Ratings[i].Source} Rating: ${
                            result.data.Ratings[i].Value
                        }`
                    );
                }
            } else {
                for (var i = 0; i < result.data.Ratings.length; i++) {
                    console.log(
                        `${result.data.Ratings[i].Source} Rating: ${
                            result.data.Ratings[i].Value
                        }`
                    );
                }
            }
            console.log(result.data.Country);
            console.log(result.data.Plot);
            console.log(result.data.Actors);
        });
}

function bandLookup(userInput) {
    axios
        .get(
            "https://rest.bandsintown.com/artists/" +
                userInput +
                "/events?app_id=" +
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
        });
}

/** To do:
 *
 * 2. implement "do what it says"
 *
 *
 * Done:
 * 1. get APIs working using axios
 * 3. turn the current test searches into user input searches
 * 4. reformat the organization to make it make sense
 */

songLookup("django jane");
lirithis(userInput, userChoice);
