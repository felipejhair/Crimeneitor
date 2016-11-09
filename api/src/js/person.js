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
