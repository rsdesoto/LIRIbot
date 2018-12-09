# LIRIbot

This is a bot used to look up movie info, song info, concert info, or follow written instructions from a text file.

## Instructions

**Important:** make sure to install NPMs by typing "npm i" in your console!

In order to access the commands, navigate to the folder this program has been downloaded into. Start every command by typing "node liri.js".

#### Asking Questions

The options available are as follows:

-   spotify-this-song -- provides the song title; the artist; the album; and a preview clip, if available.
-   movie-this -- provides the title of the movie, the year it was released, IMDB and Rotten Tomatoes ratings (if available), the country the movie was made in, a plot summary, and the actors.
-   concert-this -- provides a list of concerts for a band, including the venue name, the venue city and country, and the date of the concert.

Each query will also print this information out into the log file.

#### do-what-it-says

The "do-what-it-says" command will access a text file called "random.txt", read in the command and search criteria saved in the file, and perform that search.

#### Log file

All searches are saved to "log.txt".

### APIs Used

BandsInTown, Spotify, and the Open Movie Database were used.

### NPMs Used

Axios, spotify-node-api, momentjs, and fs used.

### Contact

For questions or bugs, contact me at ry.e.desoto@gmail.com
