//Read and set any environment variables with the dotenv package
require("dotenv").config();
//First step it will be to get all keys connected;
var infoKeys = require('./keys.js');
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var spotify = require('spotify');
var request = require('request');
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// var spotify = new spotify(infoKeys.spotify);
var client = new twitter(infoKeys.twitter);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Store argument
var argvNode = process.argv;
var actionLiri = process.argv[2];
//```````````````````````````````````````````````
//Select movie or song
var q = "";
for (var i = 3; i < argvNode.length; i++) {
    if (i > 3 && i < argvNode.length) {
        q += '+' + argvNode[i];
    }
}
//```````````````````````````````````````````````
switch (actionLiri) {
    case "my-tweets":
        tweetIT();
        break;
    case "spotify-this-song":
        if (q) {
            spotifyIT(q)
        } else {
            spotifyIT("Another day in paradise")
        }
        break;
    case "movie-this":
        if (q) {
            movieIT(q)
        } else {
            movieIT("Mr. Nobody")
        }
        break;
    case "this-should-be-done":
        doIT();
        break;
    default:
        console.log("[Options available: my-tweets, spotify-this-song, movie-this, this-should-be-done]");
}
//```````````````````````````````````````````````
function tweetIT() {
    var displayName = {
        screen_name: 'sergio_bordo'
    };
    client.get('statuses/user_timeline', displayName, function (err, tweets, response) {
        if (!err) {
            for (var i = 0; i < tweets.length; i++) {
                var info = tweets[i].created_at;
                console.log("@sergio_bordo: " + tweets[i].text + " Created At: " + info.substring(0, 20));
                console.log(" *** ");

                //Output the data to a .txt file called log.txt.
                fs.appendFile('log.txt', "@sergio_bordo: " + tweets[i].text + " Created At: " + info.substring(0, 20));
                fs.appendFile("log.txt", " *** ")
            }
        } else {
            console.log('There is something wrong, and error occurred.');
        }
    });
} //bottom

function spotifyIT(song) {
    spotify.search({
        type: 'track',
        query: song,

    }, function (err, info) {
        if (!err) {
            for (var i = 0; i < info.tracks.items.length; i++) {
                var songInfo = data.tracks.items[i];
                console.log('Artist: ' + songInfo.artists[0].name);
                console.log('Song: ' + songInfo.name);
                console.log('Album: ' + songInfo.album.name);
                console.log('Active URL: ' + songInfo.preview_url);
                //Update log.txt with new info
                fs.appendFile('log.txt', songInfo.artists[0].name);
                fs.appendFile('log.txt', songInfo.name);
                fs.appendFile('log.txt', songInfo.preview_url);
                fs.appendFile('log.txt', songInfo.album.name);
                fs.appendFile('log.txt', "-----------------------");
            }
        } else {
            console.log('There is something wrong, and error occurred. ');
        }
    });
} //bottom

function movieIT(movie) {
    var omdbConnection = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';
    request(omdbConnection, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Year Released: " + body.Year);
            console.log("Rating IMdB: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
            //Update log.txt file
            // fs.appendFile('log.txt', "Title: " + body.Title);
            // fs.appendFile('log.txt', "Year Released: " + body.Year);
            // fs.appendFile('log.txt', "Rating IMdB: " + body.imdbRating);
            // fs.appendFile('log.txt', "Country: " + body.Country);
            // fs.appendFile('log.txt', "Language: " + body.Language);
            // fs.appendFile('log.txt', "Plot: " + body.Plot);
            // fs.appendFile('log.txt', "Actors: " + body.Actors);
            // fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
            // fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
        } else {
            console.log('There is something wrong, and error occurred. ');
        }
        if (movie === "Mr. Nobody") {
            console.log("************************");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");

            //Update log.txt
            fs.appendFile('log.txt', "*******************************");
            fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('log.txt', "It's on Netflix!");
        }
    });
} //bottom

function doIT(){
    fs.readFile('random.txt', "utf8", function(err,info){
var splitIt = info.split(', ');

spotifyIT(splitIt[1]);
    });
}//bottom
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~