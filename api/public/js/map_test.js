(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var IDB = function() {};


IDB.prototype.Config = {
    MTY_LAT: 25.718653,
    MTY_LNG: -100.329887
};

IDB.prototype.names = [ "John", "Jane", "Jill", "Adam", "James", "Elyse" ];
IDB.prototype.lastNames = [ "Greene", "Kovik", "Peake", "Slander", "Sonntag", "Gonzalez" ];

IDB.prototype.Streets = [ "Primera", "Segunda", "Tercera", "Cuarta", "Quinta", "Sexta" ];
IDB.prototype.PONumbers = [ 66400, 66410, 66420, 66440, 66440, 66450 ];
IDB.prototype.Cities = [ "San Nicolas de los Garza", "Monterrey", "Apodaca", "San Pedro Garza García", "Santa Catarina" ];
IDB.prototype.States = [ "Nuevo León" ];
IDB.prototype.Countries = [ "México" ];

IDB.prototype.People = [];

var DB = new IDB();

module.exports = DB;

},{}],2:[function(require,module,exports){
"use strict";

module.exports = function() {
    var Address = function(options) {
        this.street = options.street || "Desconocida";
        this.poNumber = options.poNumber ? "#" + options.poNumber : "NA";
        this.city = options.city || "Monterrey";
        this.state = options.state || "Nuevo León";
        this.country = options.country || "México";
        this.latLng = options.latLng || [ DB.Config.MTY_LAT, DB.Config.MTY_LNG ];

        this.toString = function() {
            return this.street
                + ", " + this.poNumber
                + ", " + this.city
                + ", " + this.state
                + ", " + this.country;
        };
    }

    Address.genLatLng = function() {
        var radius = 0.15;

        function randLat() {
            return Math.random() * ( (DB.Config.MTY_LAT + radius) - (DB.Config.MTY_LAT - radius) ) + (DB.Config.MTY_LAT - radius);
        }

        function randLng() {
            return Math.random() * ( (DB.Config.MTY_LNG + radius) - (DB.Config.MTY_LNG - radius) ) + (DB.Config.MTY_LNG - radius);
        }

        return [ randLat(), randLng() ];
    };

    Address.genAddress = function() {
        return new Address({
            street: DB.Streets[getRandomIntInclusive(0, 5)],
            poNumber: DB.PONumbers[getRandomIntInclusive(0, 5)],
            city: DB.Cities[getRandomIntInclusive(0, 5)],
            latLng: Address.genLatLng()
        });
    };

    return Address;
}

},{}],3:[function(require,module,exports){
var DB = require('./DB'),
    utils = require('./utils'),
    Address = require('./address'),
    Person = require('./person')(DB, Address);

console.log('db => ' , DB);

},{"./DB":1,"./address":2,"./person":4,"./utils":5}],4:[function(require,module,exports){
"use strict";

module.exports = function(DB, Address) {
    var Person = function(options) {
        this.name = options.name || "No name";
        this.lastName = options.lastName || "No last name";
        this.age = options.age || -1;
        this.address = options.address || new Address();

        this.fullName = this.name + " " + this.lastName;

        this.setMarker = function(marker) {
            this.marker = marker;
            this.marker.bindPopup("<b>" + this.fullName + "</b><br>"
                    + this.address.toString()
                );
        };
    }

    Person.genPerson = function() {
        return new Person({
            name: DB.names[getRandomIntInclusive(0, 5)],
            lastName: DB.lastNames[getRandomIntInclusive(0, 5)],
            age: getRandomIntInclusive(18, 36),
            address: Address.genAddress()
        });
    }

    // Initial population
    for (var i = 0; i < 20; i++) {
        DB.People.push(Person.genPerson());
    }

    return Person;
}

},{}],5:[function(require,module,exports){
"use strict";

window.getRandomIntInclusive = function(min, max) {
    min = Math.ceil(min || 0);
    max = Math.floor(max || 1);

    return Math.floor( Math.random() * (max - min + 1) + min );
}

},{}]},{},[3])