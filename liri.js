//Read and set any environment variables with the dotenv package
require("dotenv").config();
//First step it will be to get all keys connected;
var infoKeys = require('./keys.js');
//File System for rear and write
var fs = require('fs');
//Twitter NPM 
var twitter = require('twitter');
//sPotify NMP
var spotify2 = require('node-spotify-api');
//OMdb NPM
var request = require('request');
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var sptfy = new spotify2(infoKeys.spotify);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var client = new twitter(infoKeys.twitter);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Store arguments
var argvNode = process.argv;
var actionLiri = process.argv[2];
//```````````````````````````````````````````````
//Select movie or song
var q = "";
for (var i = 3; i < argvNode.length; i++) {
    if (i > 3 && i < argvNode.length) {
        q = q + '+' + argvNode[i];
    } else {
        q = q + argvNode[i];
    }
}
//```````````````````````````````````````````````
//Switch Cases
switch (actionLiri) {
    case "tweetIT":
        tweetIT();
        break;
    case "spotifyIT":
        if (q) {
            spotifyIT(q)
        } else {
            spotifyIT("Another day in paradise")
        }
        break;
    case "movieIT":
        if (q) {
            movieIT(q)
        } else {
            movieIT("Mr. Nobody")
        }
        break;
    case "defaultSong":
        doITfromIT();
        break;
    default:
        console.log("[Options available: tweetIT, spotifyIT, movieIT, defaultSong]");
}
//```````````````````````````````````````````````
function tweetIT() {
    console.log('~~~My Tweets~~~'+"\n")
    var displayName = {
        screen_name: 'sergio_bordo'
    };
    client.get('statuses/user_timeline', displayName, function (err, tweets, response) {
        if (!err) {
            for (var i = 0; i < tweets.length; i++) {
                var info = tweets[i].created_at;
                console.log("@sergio_bordo: " + tweets[i].text +'\n'+ " Tweeted on: " + info.substring(0, 20));
                console.log(" *** ");
                //Log the data to a .txt file called log.txt
                fs.appendFile("log.txt",
                "\n" + tweets[i].created_at + 
                "\n" + tweets[i].text + 
                "\n" + "***" , function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
    
            }
        } else {
            console.log('There is something wrong, and error occurred.');
        }
    });
} //bottom

function spotifyIT(song) {
    console.log('~~~My Songs~~~'+"\n")
    sptfy.search({
        type: 'track',
        query: song,
        limit: 1
    }, function (err, info) {
        if (!err) {
            for (var i = 0; i < info.tracks.items.length; i++) {

                var songInfo = info.tracks.items[i];

                console.log(
                    "\n" + 'Artist name: ' + songInfo.artists[0].name +
                    "\n" + 'Song name: ' + songInfo.name +
                    "\n" + 'Album name: ' + songInfo.album.name +
                    "\n" + 'Active URL: ' + songInfo.preview_url);
                //Update log.txt with new info
                fs.appendFile("log.txt",
                    "\n" + 'Artist name: ' + songInfo.artists[0].name +
                    "\n" + 'Song name: ' + songInfo.name + "\n" + 'Album name: ' + songInfo.album.name +
                    "\n" + 'Active URL: ' + songInfo.preview_url + 
                    "\n" + "***" ,function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
            }
        } else {
            console.log('There is something wrong, and error occurred. ');
        }
    });
} //bottom

function movieIT(movie) {
    console.log('~~~My Movies~~~'+"\n")
    var omdbConnection = 'http://www.omdbapi.com/?apikey=b0dbec64&t=' + movie + '&plot=short&tomatoes=true';
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
            fs.appendFile("log.txt",
                "\n" + "Title: " + body.Title +
                "\n" + "Year Released: " + body.Year +
                "\n" + "Rating IMdB: " + body.imdbRating +
                "\n" + "Country: " + body.Country +
                "\n" + "Language: " + body.Language +
                "\n" + "Plot: " + body.Plot +
                "\n" + "Actors: " + body.Actors +
                "\n" + "Rotten Tomatoes Rating: " + body.tomatoRating +
                "\n" + "Rotten Tomatoes URL: " + body.tomatoURL +
                "\n" + "***", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });

        } else {
            console.log('There is something wrong, an error occurred. ');
        }
        if (movie === "Mr. Nobody") {
            console.log("***");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
        }
    });
} //bottom

function doITfromIT() {
    fs.readFile('random.txt', "utf8", function (err, info) {
        if (err) throw err;
        var splitIT = info.split(',');

        spotifyIT(splitIT[1] + "\n" + "***");
    });
} //bottom
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~