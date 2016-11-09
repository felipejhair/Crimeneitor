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
