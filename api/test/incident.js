var assert = require('assert'),
    util = require('util'),
    express = require('express'),
    wagner = require('wagner-core'),
    status = require('http-status'),
    superagent = require('superagent');

var URL_ROOT = 'http://localhost:3000';

describe('Incident API', function() {
    var server,
        Incident;

    before(function() {
        var app = express();
        var models = require('../schema/models')(wagner);
        Incident = models.Incident;

        app.use(require('../api')(wagner));
        server = app.listen(3000);
    });

    after(function() {
        if (server)
            server.close();
    });

    beforeEach(function(done) {
        Incident.remove({}, function(error) {
            assert.ifError(error);
            done();
        });
    });

    beforeEach(function(done) {
        var incidents = [
                {
                    description: "Asalto de pruebas 1",
                    geo: [ -100.3974197, 25.608602 ]
                },
                {
                    description: "Bajando del camión se me acercó un cholo corriendo",
                    geo: [ -100.3174197, 25.678602 ]
                }
            ];

        Incident.create(incidents, function(error, docs) {
            assert.ifError(error);
            done();
        });
    });

    it('can fetch incidents', function(done) {
        var url = URL_ROOT + '/incidents';

        superagent.get(url, function(error, resp) {
            assert.ifError(error);
            var results;

            assert.doesNotThrow(function() {
                results = JSON.parse(resp.text).incidents;
            });

            assert.equal(results.length, 2);
            assert.equal(results[0].description, 'Asalto de pruebas 1');
            done();
        });
    });

    //it('can fetch incidents within radius', function(done) {
    //    var url = URL_ROOT + '/incidentes';

    //    url += '?distance=500';
    //    url += '&lat=25.674652';
    //    url += '&lng=-100.3170397';

    //    superagent.get(url, function(error, resp) {
    //        assert.ifError(error);
    //        var results;

    //        assert.doesNotThrow(function() {
    //            results = JSON.parse(resp.text).incidentes;
    //        });

    //        assert.equal(results.length, 5);
    //        assert.equal(results[0].description, 'Asalto de pruebas 1');
    //        done();
    //    });
    //});
})
