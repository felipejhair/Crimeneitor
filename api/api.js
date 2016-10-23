var express = require('express'),
    status = require('http-status'),
    bodyparser = require('body-parser');

module.exports = function(wagner) {
    var api = express.Router();

    // Bodyparser middleware for JSON
    // it exposes data to handlers through req.body
    api.use(bodyparser.json());

    // ========= User =========
    api.get('/me', function(req, resp) {
        if (!req.user) {
            return resp
                .status(status.UNAUTHORIZED)
                .json({ error: 'Not logged in' });
        }

        handleOne.bind(null, 'user', resp, null, req.user)();
    });

    api.put('/me', wagner.invoke(function(User) {
        return function(req, resp) {
            if (!req.user) {
                return resp
                    .status(status.UNAUTHORIZED)
                    .json({ error: 'Not logged in' });
            }

            try {
                var picture = req.body.profile.picture;
            } catch (ex) {
                return resp
                    .status(status.BAD_REQUEST)
                    .json({ error: 'No picture URL specified' });
            }

            req.user.profile.picture = picture;
            req.user.save(function(error, user) {
                if (error) {
                    return resp
                        .status(status.INTERNAL_SERVER_ERROR)
                        .json({ error: error.toString() });
                }

                return resp.json({ user: user });
            });
        }
    }));

    return api;
};

function handleOne(property, resp, error, result) {
    if (error) {
        return resp
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }

    if (!result) {
        return resp
            .status(status.NOT_FOUND)
            .json({ error: 'Not found' });
    }

    var json = {};
    json[property] = result;
    resp.json(json);
}

function handleMany(property, resp, error, result) {
    if (error) {
        return resp
            .status(status.INTERNAL_SERVER_ERROR)
            .json({ error: error.toString() });
    }

    var json = {};
    json[property] = result;
    resp.json(json);
}
