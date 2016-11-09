var assert = require('assert'),
    express = require('express'),
    status = require('http-status'),
    fs = require('fs'),
    wagner = require('wagner-core'),
    request = require('request'),
    superagent = require('superagent');

var URL_ROOT = 'http://localhost:3000';

describe('Upload API', function() {
    var server;

    before(function() {
        var app = express(),
            models = require('../schema/models')(wagner);

        app.use(require('../api')(wagner));
        server = app.listen(3000);
    });

    after(function() {
        if (server)
            server.close();
    });

    it('can upload multiple files', function(done) {
        var data = {
                photos: [
                    fs.createReadStream(__dirname + '/file1.jpg'),
                    fs.createReadStream(__dirname + '/file2.jpg')
                ]
            },
            url = URL_ROOT + '/photos';

        request.post({ url: url, formData: data }, function(error, resp, body) {
            assert.ifError(error);
            assert.equal(resp.statusCode, status.OK);

            var result;
            assert.doesNotThrow(function() {
                result = JSON.parse(body);
            });

            assert.equal(result.files, data.photos.length);

            fs.unlink('public/images/incidents/file1.jpg');
            fs.unlink('public/images/incidents/file2.jpg');
            done();
        });
    });
});
