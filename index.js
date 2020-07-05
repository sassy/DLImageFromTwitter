/**
 *  Copyright (c) 2014-2020 Satoshi Watanabe
 */

const twitter = require('twitter');
const fs = require('fs');
const yargs = require('yargs');

function download(urlStr, dirname) {
    const url = require('url');
    const http = require("http");
    const filename = url.parse(urlStr).pathname.split('/')[2];
    try {
        fs.statSync(dirname);
    } catch(e) {
        fs.mkdirSync(dirname);
    }
    http.get(urlStr, function(res) {
        console.log("save " + urlStr + " ....");
        res.pipe(fs.createWriteStream(dirname + "/" + filename));
    }).on('error', function(e) {
        console.log(e);
    });
}

module.exports.exec = function() {
    const argv = yargs.argv;
    if (argv._.length < 1) {
        console.log("missing argument.");
        return;
    }

    const twitter_id = argv._[0];

    const key_path = argv.k ? argv.k : "./key.json";
    if (!fs.existsSync(key_path)) {
        console.log("you should provide key.json");
        return;
    }
    const json = fs.readFileSync(key_path, "utf-8");
    const twit = new twitter(JSON.parse(json));

    const dirname = argv.d ? argv.d : "image";

    twit.get('/statuses/user_timeline', {screen_name: twitter_id , include_rts : false , count : 200 }, function(error, tweets) {
        if (error) {
            console.error(error);
            return
        }
        tweets.forEach((data) => {
            if (data.extended_entities && data.extended_entities.media) {
                const medias = data.extended_entities.media;
                medias.forEach((media) => {
                    if (media.type === "photo") {
                        download(media.media_url, dirname);
                    }
                });
            }
        });
    });
};
