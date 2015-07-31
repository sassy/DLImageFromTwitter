/**
 *  Copyright (c) 2014-2015 Satoshi Watanabe
 */

var util = require('util');
var twitter = require('twitter');
var fs = require('fs');
var yargs = require('yargs');

function download(urlStr, dirname) {
    var url = require('url');
    var http = require("http");
    var filename = url.parse(urlStr).pathname.split('/')[2];
    try {
        fs.statSync(dirname);
    } catch(e) {
        fs.mkdirSync(dirname, 0777);
    }
    http.get(urlStr, function(res) {
        console.log("save " + urlStr + " ....");
        res.pipe(fs.createWriteStream(dirname + "/" + filename));
    }).on('error', function(e) {
        console.log(e);
    });
}

module.exports.exec = function() {
    var argv = yargs.argv;
    if (argv._.length < 1) {
        console.log("missing argument.");
        return;
    }

    var twitter_id = argv._[0];
    if (!fs.existsSync("./key.json")) {
        console.log("you should provide key.json");
        return;
    }

    var dirname = argv.d ? argv.d : "image";
    var json = fs.readFileSync("./key.json", "utf-8");

    var twit = new twitter(JSON.parse(json));


    twit.get('/statuses/user_timeline.json', {screen_name: twitter_id , include_rts : false , count : 200 }, function(datas) {
        datas.forEach(function(data) {
            if (data.extended_entities && data.extended_entities.media) {
                var medias = data.extended_entities.media;
                medias.forEach(function(media) {
                    if (media.type === "photo") {
                        download(media.media_url, dirname);
                    }
                });
            }
        });
    });
};
