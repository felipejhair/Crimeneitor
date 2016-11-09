var DB = require('./DB'),
    utils = require('./utils'),
    Address = require('./address'),
    Person = require('./person')(DB, Address);

console.log('db => ' , DB);
