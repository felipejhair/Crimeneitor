var express = require('express'),
    status = require('http-status'),
    multer = require('multer'),
    fs = require('fs'),
    upload = multer({ dest: 'public/images/incidents' }),
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

    // ========= Incident =========
    api.get('/incidents', wagner.invoke(function(Incident) {
        return function(req, resp) {
            var distance = req.query.distance || 2000, // meters
                lng = req.query.lng,
                lat = req.query.lat,
                query = {};

            distance /= 6371;   // Distance meters to radians
                                // Earth radius in Km is 6371

            if (lng && lat) {
                query = {
                    geo: {
                        $near: [ lng, lat ],
                        $maxDistance: distance
                    }
                };
            }

            Incident.find(query)
                .exec(handleMany.bind(null, 'incidents', resp));
        };
    }));

    // ========= Uploads =========
    var upFields = upload.fields([ { name: 'file', maxCount: 1 }, { name: 'photos', maxCount: 4 } ]);
    api.post('/photos', upload.array('photos', 4), function(req, resp) {
        var file = null,
            i = 0;

        function removeTmpFiles() {
            for (i = 0; i < req.files.length; i++)
                fs.unlink(file.path);
        }

        //console.log('BODY');
        //console.log(req.files);
        //console.log('end BODY');

        for (i = 0; i < req.files.length; i++) {
            if ( req.files[i].mimetype.indexOf('image/') == -1 ) {
                removeTmpFiles();

                return resp
                    .status(status.BAD_REQUEST)
                    .json({ error: 'Must upload a valid image. Error with file ' + req.files[i].originalname });
            }
        }

        for (i = 0; i < req.files.length; i++) {
            fs.rename(req.files[i].path, 'public/images/incidents/' + req.files[i].originalname); 
        }

        return resp.status(200).json({ files: req.files.length });
    });

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
