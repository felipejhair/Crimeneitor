(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var platform = new H.service.Platform({
        "app_id": "5U2RwJvDr5atA9rTfk0p",
        "app_code": "KLeEXOqeb9rDwJQH63UVOg"
    }),
    mapContainer = document.querySelector('#map'),
    superIcon = new H.map.Icon('/images/marker-heart.png'),
    coords = { lat: 25.6592062, lng: -100.2840808 };

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
            mapContainer,
            defaultLayers.normal.base,
            {
                zoom: 10,
                center: coords
            }
        );
var mapEvents = new H.mapevents.MapEvents(map);

// Add event listener
/*
map.addEventListener('tap', function(ev) {
    // Log somethn' like 'tap' and 'mouse' events
    console.debug(ev.type, ev.currentPointer.type);
});
*/

// Add marker
window.setTimeout(function() {
    var marker = new H.map.Marker(coords, { icon: superIcon });

    map.addObject(marker);
    map.setZoom(12);
    map.setCenter(coords);
}, 3000);

// Add UI
var ui = new H.ui.UI.createDefault(map, defaultLayers, 'es-ES');
ui.getControl('zoom').setAlignment('top-right');

// Add bubble
var bubble = new H.ui.InfoBubble(coords, { content: '<b>Hola, mundo</b>' });

// Add info bubble to map
ui.addBubble(bubble);

},{}]},{},[1])