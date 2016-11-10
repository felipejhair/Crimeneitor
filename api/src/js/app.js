"use script";

// Inicializamos modulo de Angular
var app = angular.module('crimeneitor', [ 'ngMap' ]);

// Lo configuramos
app.config(function($httpProvider) {
    // Habilitar CORS
    //$httpProvider.defaults.useXDomain = true;

    // Para que no se muestren como AJAX
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.directive('crimeMap', function() {
    return {
        scope: {},
        link: function() {},
        templateUrl: '/templates/crime-map.html',
        controller: [ '$scope', '$http', 'NgMap', function($scope, $http, NgMap) {
            $scope.incident = null;

            //$scope.$watch('incident', function(newVal, oldVal, ev) {
            //    console.debug('watch! args =>', arguments);
            //});

            $http.get('/api/v1/incidents')
            .success(function(resp) {
                addMarkers(resp.incidents);
            }).error(function(error) {
                console.error('Error:', error);
            });

            function addMarkers(incidents) {
                $scope.markers = [];

                NgMap.getMap().then(function(map) {
                    angular.forEach(incidents, function(incident, index, arr) {
                        //var latLng = { lat: incident.geo[1], lng: incident.geo[0] };
                        incident.uglyPos = incident.geo[1] + "," + incident.geo[0];

                        $scope.markers.push(incident);
                    });
                });
            }
        }]
    };
});
