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
                    geo: [ -102.141631, 28.591869 ],
                    pictures: [],
                    burglars: [
                        {
                            gender: "Masculino",
                            age: "21-25",
                            description: "Cholo rapado"
                        }
                    ] },{ description: "Bajando del camión se me acercó un cholo corriendo",
                    geo: [ -100.3174197, 25.678602 ],
                    pictures: [],
                    burglars: [
                        {
                            gender: "Masculino",
                            age: "21-25",
                            description: "Cholo rapado"
                        }
                    ]
                },
                {
                    description: "Al hacer fila para pagar el boleto del estacionamiento",
                    geo: [ -100.316333, 25.799816 ],
                    pictures: [],
                    burglars: [
                        {
                            gender: "Masculino",
                            age: "26-35",
                            description: "Señor blanco con lentes oscuro y bigote"
                        }
                    ]
                },
                {
                    description: "Caminando a la parada del camión por la avenida venían de frente y no les pude sacar la vuelta",
                    geo: [ -100.3170397, 25.674652 ],
                    pictures: [],
                    burglars: [
                        {
                            gender: "Masculino",
                            age: "15-20",
                            description: "Cholo con camisa tumbada"
                        },
                        {
                            gender: "Masculino",
                            age: "15-20",
                            description: "Cholo con pantalón tumbado"
                        },
                        {
                            gender: "Masculino",
                            age: "15-20",
                            description: "Cholo con camisa tumbada"
                        }
                    ]
                },
                {
                    description: "Caminando por la calle se paró un taxista y me asalto",
                    geo: [ -100.188391, 25.776216 ],
                    pictures: [],
                    burglars: [
                        {
                            gender: "Masculino",
                            age: "Mayor de 35",
                            description: "Señor moreno y gordo"
                        }
                    ]
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

            assert.equal(results.length, 5);
            assert.equal(results[0].description, 'Asalto de pruebas 1');
            done();
        });
    });

    it('can fetch incidents within radius', function(done) {
        var url = URL_ROOT + '/incidents';

        url += '?distance=500';
        url += '&lat=25.674652';
        url += '&lng=-100.3170397';

        superagent.get(url, function(error, resp) {
            assert.ifError(error);
            var results;

            assert.doesNotThrow(function() {
                results = JSON.parse(resp.text).incidents;
            });

            assert.equal(results.length, 2);
            assert.equal(results[0].burglars.length, 3);
            done();
        });
    });
})
