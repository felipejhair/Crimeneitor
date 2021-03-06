var city;
 	    function getLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

      } else {
      alert("Geolocation is not supported by this browser.");
      }
  }
    
    function showPosition(position) {
      var myPos = {lat: position.coords.latitude, lng: position.coords.longitude};
      var icon = {
          url: '../../../css/images/flag.png',
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)

        };
      var mark1 = {lat: 25.784662, lng: -100.214533};
      var mark2 = {lat: 25.800942, lng: -100.299255};
      var mark3 = {lat: 25.738179, lng: -100.289299};
      var map = new google.maps.Map(document.getElementById('map'), {
        center: myPos,
        scrollwheel: false,
        zoom: 12
      });

      var marker = new google.maps.Marker({
        
        position: mark1,
        map: map,
        icon: icon,
        title: 'Base'
      });

      var marker2 = new google.maps.Marker({
        
        position: mark2,
        map: map,
        icon: icon,
        title: 'Base'
      });

      var marker3 = new google.maps.Marker({
        
        position: mark3,
        map: map,
        icon: icon,
        title: 'Base'
      });

      var myMarker = new google.maps.Marker({
        
        position: myPos,
        map: map,
        title: 'Tu posición'
      });

      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: mark1,
        radius: 4000
       });

      var cityCircle = new google.maps.Circle({
        strokeColor: '#2E9AFE',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#2E9AFE',
        fillOpacity: 0.35,
        map: map,
        center: mark2,
        radius: 4000
       });

      var cityCircle = new google.maps.Circle({
        strokeColor: '#2E9AFE',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#2E9AFE',
        fillOpacity: 0.35,
        map: map,
        center: mark3,
        radius: 4000
       });

     var geocoder = new google.maps.Geocoder;

      geocodeLatLng(geocoder,map,myPos);

    }


      function geocodeLatLng(geocoder, map, myPos) {
        var latlng = myPos;

        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
              map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              area(results[1].address_components[1].long_name);
              $('#nombre2').on('change', function() {
            showUser($("#nombre2").val(),results[1].address_components[1].long_name);
        });
              
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }


      function getMap(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap);
      } else {
      alert("Geolocation is not supported by this browser.");
      }
  }

function showMap(position) {
    var myPos2 = {lat: position.coords.latitude, lng: position.coords.longitude};
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
         var geocoder = new google.maps.Geocoder;

    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
    geocodeLatLng2(geocoder,myPos2)

}

function geocodeLatLng2(geocoder, myPos) {
        var latlng = myPos;

        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
              var marker = new google.maps.Marker({
                position: latlng,
              });
              but(results[1].address_components[1].long_name);
              $('#nombre2').on('change', function() {
            showUser($("#nombre2").val(),results[1].address_components[1].long_name);
        });
              
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

