
 	    function getLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
      alert("Geolocation is not supported by this browser.");
      }
  }
    
    function showPosition(position) {
      var myPos = {lat: position.coords.latitude, lng: position.coords.longitude};

      var map = new google.maps.Map(document.getElementById('map'), {
        center: myPos,
        scrollwheel: false,
        zoom: 18
      });

      var marker = new google.maps.Marker({
        position: myPos,
        map: map,
        title: 'Tu posición'
      });
    }
 