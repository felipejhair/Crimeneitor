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

},{}]},{},[1])