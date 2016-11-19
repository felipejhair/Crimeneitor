(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])