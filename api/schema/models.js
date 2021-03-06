var mongoose = require('mongoose'),
    _ = require('underscore');

module.exports = function(wagner) {
    mongoose.connect('mongodb://localhost:27017/crimeneitor');

    var User = mongoose.model('User', require('./user'), 'users'),
        Incident = mongoose.model('Incident', require('./incident'), 'incidents');

    var models = {
        User: User,
        Incident: Incident
    };

    // To ensure DRY-ness, register factories in a loop
    _.each(models, function(value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });

    return models;
};
