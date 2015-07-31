
[![Build Status](https://travis-ci.org/sassy/DLImageFromTwitter.svg?branch=master)](https://travis-ci.org/sassy/DLImageFromTwitter)

DLImageFromTwitter
===================

[![NPM](https://nodei.co/npm/dl-image-twitter.png)](https://nodei.co/npm/dl-image-twitter/)

This package allows you to download images by twitter id.

# Usage

* `dl-image-twitter <twitter_id>`
* Download by twitter id.
* prepare `key.json` file required to authenticate your account.

## Options

```
  -d <directory_name>  : set direcorry saveing image (default is "image")
  -k <key.json path>  : set file path of key.json (default is "./key.json")

```

# key.json format

```
{
    "consumer_key" : "CONSUMER_KEY",
    "consumer_secret" : "CONSUMEr_SECRET",
    "access_token_key" : "ACCESS_TOKEN_KEY",
    "access_token_secret" : "ACCESS_TOKEN_SECRET"
}
```
