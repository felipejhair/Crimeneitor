var mongoose = require('mongoose');

module.exports = function() {
    var schemaIncidente = {
        descripcion: { type: String, required: true },
        fecha: { type: Date, required: true },
        coordenadas: { type: [Number], required: true }, // [ Longitude, Latitude ]
        imagenes: [ { type: String, match: /^http[s]?:\/\//i } ],
        asaltante: [{
            edad: {
                type: String,
                enum: [ '15-20', '21-25', '26-35', 'Mayor de 35' ],
            },
            descripcion: String
        }]
    };

    var schema = new mongoose.Schema(schemaIncidente);
};
