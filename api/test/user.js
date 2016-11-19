var util = require('util'),
    assert = require('assert'),
    express = require('express'),
    status = require('http-status'),
    wagner = require('wagner-core'),
    superagent = require('superagent');
var util = require('util');

var URL_ROOT = 'http://localhost:3000',
    PRODUCT_ID = '000000000000000000000001';

describe('User API', function() {
    var server,
        User;

    before(function() {
        var app = express();

        // Bootstrap server
        models = require('../schema/models')(wagner);

        // Make models available in tests
        User = models.User;

        app.use(function(req, res, next) {
            User.findOne({}, function(error, user) {
                assert.ifError(error);
                req.user = user;
                next();
            });
        });

        app.use(require('../api')(wagner));

        server = app.listen(3000);
    });

    after(function() {
        // Shut the server down when we're done
        server.close();
    });

    beforeEach(function(done) {
        // Make sure users are empty before each test
        User.remove({}, function(error) {
            assert.ifError(error);
            done();
        });
    });

    beforeEach(function(done) {
        var users = [{
            profile: {
                username: 'JuanKman94',
                picture: 'http://image.com/pp.png'
            },
            data: {
                oauth: 'invalid'
            }
        }];

        User.create(users, function(error, user) {
            assert.ifError(error);

            done();
        });
    });

    it('can update users', function(done) {
        var url = URL_ROOT + '/me';

        superagent
            .put(url)
            .send({
                profile: {
                    picture: 'http://image.com/pp2.png'
                }
            })
            .end(function(error, resp) {
                assert.ifError(error);
                assert.equal(resp.status, status.OK);

                User.findOne({}, function(error, user) {
                    assert.ifError(error);

                    assert.equal(user.profile.picture, 'http://image.com/pp2.png');

                    done();
                });
            });
    });
});
