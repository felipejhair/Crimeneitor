var assert = require('assert'),
    express = require('express'),
    status = require('http-status'),
    fs = require('fs'),
    request = require('request'),
    superagent = require('superagent');

var URL_ROOT = 'http://localhost:3000';

describe('Upload API', function() {
    it('can upload a file', function(done) {
        var data = {
                photos: [
                    fs.createReadStream(__dirname + '/file1.jpg'),
                    fs.createReadStream(__dirname + '/file2.jpg')
                ]
            },
            url = URL_ROOT + '/photos';

        request.post(url, data, function(error, resp, body) {
            assert.ifError(error);
            console.log('resp => ', resp);
            done();
        });
    })
});
