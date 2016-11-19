var mongoose = require('mongoose');

var incidentSchema = {
        description: { type: String, required: true },
        geo: {
            type: [ Number ], // [ Longitude, Latitude ]
            required: true,
            index: '2dsphere'
        },
        pictures: [ { type: String, match: /^http[s]?:\/\//i } ],
        burglars: [{
            gender: { type: String, default: 'Masculino' },
            age: {
                type: String,
                enum: [ '15-20', '21-25', '26-35', 'Mayor de 35' ]
            },
            description: String
        }],
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    };

var schema = new mongoose.Schema(incidentSchema);

schema.pre('save', function(next) {
    var now = new Date();

    this.updated_at = now;

    if (!this.created_at)
        this.created_at = now

    next();
});

module.exports = schema;
module.exports.incidentSchema = incidentSchema;
