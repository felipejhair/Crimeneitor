(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])