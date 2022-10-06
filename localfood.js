// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

//Object.defineProperty(exports, "__esModule", { value: true });
var map;
var service;
var infowindow;
var lat = 0;
var lon = 0;

function initMap() {
    var sydney = new google.maps.LatLng(-33.867, 151.195);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15,
    });
		
    var request = {
        query: "Museum of Contemporary Art Australia",
        fields: ["name", "geometry"],
    };
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location)
        return;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });
    google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
    });
}

		var x = document.getElementById("demo");

		function getLocation() {
		  if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		  } else { 
			x.innerHTML = "Geolocation is not supported by this browser.";
		  }
		}
		
		function showPosition(position) {
		  //x.innerHTML = "Latitude: " + position.coords.latitude + 
		  //"<br>Longitude: " + position.coords.longitude;
		  
		  //TODO 
		  //SET IFRAME.SRC = TO CORRECT QUERY
		  
		  
		  
		  
		  var x = document.getElementById("demo");
		  var frame = document.getElementById("map");
		  var search =  position.coords.latitude + "," + position.coords.longitude;
		  
		  lat = position.coords.latitude;
		  lon = position.coords.longitude;
		  
		  var sydney = new google.maps.LatLng(lat, lon);
		  infowindow = new google.maps.InfoWindow();
		  map = new google.maps.Map(document.getElementById("map"), {
			center: sydney,
			zoom: 15,
		  });
		  
		  
		  
		  window.query = "Restaurants near " + position.coords.latitude + " " + position.coords.longitude;
		  x.innerHTML = "Restaurants near " + search;
	//	   var requestOptions = {
		//	  method: 'GET',
		//	};
			const reverseGeocodingUrl = "https://api.geoapify.com/v1/geocode/reverse?lat=" + position.coords.latitude +"&lon=" + position.coords.longitude + "&apiKey=fdcf5482f8dc471a9d04308036a0d050";
//			let addr = fetch("https://api.geoapify.com/v1/geocode/reverse?lat=" + position.coords.latitude +"&lon=" + position.coords.longitude + "&apiKey=fdcf5482f8dc471a9d04308036a0d050", requestOptions)
//			  .then(response => response.json())
//			  .then(result => console.log(result))
//			  .catch(error => console.log('error', error));
			//fetch(reverseGeocodingUrl).then(result => result.json())
			//	.then(featureCollection => {
			//	  if (featureCollection.features.length === 0) {
			//		document.getElementById("status").textContent = "The address is not found";
			//		return;
			//	  }
			//var foundAddress = featureCollection.features[0];
			//var formatted = foundAddress.properties.formatted;
			//var addr1 = foundAddress.properties.address_line1;
			//var zipaddr = foundAddress.properties.postcode;
			
			
			
			//var request = {
				//query: "Restaurants near " + sydney,
				//fields: ["geometry"],
			//};
			
			//service = new google.maps.places.PlacesService(map);
			//service.findPlaceFromQuery(request, function (results, status) {
				
				
				const firstString = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
				//follow with location data
				const local = lat + '%2C' + lon;
				const secondString = '&radius=1500&type=restaurant&keyword='
				//follow with things to remove??
				
				const thirdString = '&key=AIzaSyDQaafaxlkiWcCbgTPy37JNe4uz-4pP2ng';
				const nearBySearchString = firstString + local + secondString + thirdString
				var axios = require(['axios']);

				var config = {
				  method: 'get',
				  url: nearBySearchString,
				  //url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyDQaafaxlkiWcCbgTPy37JNe4uz-4pP2ng',
				  headers: { }
				};

				axios(config)
				.then(function (response) {
				  console.log(JSON.stringify(response.data));
				})
				.catch(function (error) {
				  console.log(error);
				});	
				
			if (status === google.maps.places.PlacesServiceStatus.OK && results) {
				for (var i = 0; i < results.length; i++) {
					createMarker(results[i]);
				}
				map.setCenter(results[0].geometry.location);
			}
			
			
			
			
			var first3= addr1.charAt(0) + addr1.charAt(1) + addr1.charAt(2);
			
			let regex = /[0-9][0-9][0-9]/;
			
 			if(regex.test(first3)){
				//frame.src = "https://www.google.com/maps/embed/v1/search?key=AIzaSyC4Uzg3zthFWP4SrkIgDMAosJywYfARp_g"
					//+ "&q=restaurants+near+" + addr1 +"&zoom=15&center=" + search;
			}
			else{
			//frame.src = "https://www.google.com/maps/embed/v1/search?key=AIzaSyC4Uzg3zthFWP4SrkIgDMAosJywYfARp_g"
					//+ "&q=restaurants+near+" + zipaddr +"&zoom=15&center=" + search;
			} 
window.initMap = initMap;
			}