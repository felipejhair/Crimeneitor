var express = require('express');

module.exports = function() {
    var app = express();

    app.get('/', function(req, resp) {
        resp.send('Hello, world!');
    });

    app.get('/user/:user', function(req, resp) {
        resp.send(' Page for user ' + req.params.user 
            + ' with option ' + req.query.option);
    });

    return app;
};
