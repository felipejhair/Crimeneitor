"use strict";

window.getRandomIntInclusive = function(min, max) {
    min = Math.ceil(min || 0);
    max = Math.floor(max || 1);

    return Math.floor( Math.random() * (max - min + 1) + min );
}
