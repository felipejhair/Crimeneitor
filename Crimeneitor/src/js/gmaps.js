
 	    function getLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
      alert("Geolocation is not supported by this browser.");
      }
  }
    
    function showPosition(position) {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        scrollwheel: false,
        zoom: 16
      });
    }
 