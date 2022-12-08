// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

//Object.defineProperty(exports, "__esModule", { value: true });

let map;
let service;
let infowindow;
let lat = 0;
let lon = 0;

function initMap() {
    let sydney = new google.maps.LatLng(-33.867, 151.195);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15,
    });
		
    let request = {
        query: "Museum of Contemporary Art Australia",
        fields: ["name", "geometry"],
    };
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}
function createMarker(place) {
    if (!place.geometry || !place.geometry.location)
        return;
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
    });
    google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
    });
}

let x = document.getElementById("demo");

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

	let x = document.getElementById("demo");
	let frame = document.getElementById("map");
	let search =  position.coords.latitude + "," + position.coords.longitude;

	lat = position.coords.latitude;
	lon = position.coords.longitude;

	let sydney = new google.maps.LatLng(lat, lon);
	infowindow = new google.maps.InfoWindow();
	map = new google.maps.Map(document.getElementById("map"), {
	center: sydney,
	zoom: 15,
	});

	window.query = "Restaurants near " + position.coords.latitude + " " + position.coords.longitude;
	x.innerHTML = "Restaurants near " + search;

	let requestOptions = {
		method: 'GET',
	};
	const reverseGeocodingUrl = "https://api.geoapify.com/v1/geocode/reverse?lat=" + position.coords.latitude +"&lon=" + position.coords.longitude + "&apiKey=fdcf5482f8dc471a9d04308036a0d050";

	let addr = fetch("https://api.geoapify.com/v1/geocode/reverse?lat=" + position.coords.latitude +"&lon=" + position.coords.longitude + "&apiKey=fdcf5482f8dc471a9d04308036a0d050", requestOptions)
		.then(response => response.json())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));

	let foundAddress;
	let formatted;
	let addr1;
	let zipaddr;

	fetch(reverseGeocodingUrl).then(result => result.json())
		.then(featureCollection => {
			if (featureCollection.features.length === 0) {
				document.getElementById("status").textContent = "The address is not found";
				x.innerHTML = "address not found";
				return;
			}
			foundAddress = featureCollection.features[0];
			formatted = foundAddress.properties.formatted;
			addr1 = foundAddress.properties.address_line1;
			zipaddr = foundAddress.properties.postcode;
		});

	let str1 = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
	let loc = lat + "%2C" + lon;
	let str2 = '&radius=800&type=restaurant&key=';
	let key = 'AIzaSyDQaafaxlkiWcCbgTPy37JNe4uz-4pP2ng';
	let searchterms = str1 + loc + str2 + key;
	
	//x.innerHTML = searchterms;

	service = new google.maps.places.PlacesService(map);

	let currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	let request = {
		location: currentLocation,
		radius: '500',
		type: ['restaurant']
	};

	service.nearbySearch(request, (results, status) => {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			for (let i = 0; i < results.length; i++) {
			  if(results[i].name == "Macado's" || results[i].name == "McAlister's Deli" || results[i].name == "Chick-Fil-A" || results[i].name == "Jimmy John's"){
				  //do nothing
			  }
			  else{
				  
			  createMarker(results[i]);
			  }
			}
			
			map.setCenter(results[0].geometry.location);
		  }
	});

	// fetch(searchterms, {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'Access-Control-Allow-Origin': '*'
	// 	}
	// })
	// .then(function (response) {
	// 	console.log(response.json());
	// })
	// .catch(function (error) {
	// 	console.log(error);
	// });
	
	
	//let request = {
		//query: "Restaurants",
		//fields: ["geometry", "formatted_address"],
		//locationBias: {radius: 5000, center: {lat: lat, lng: lon}}
	//};

	// service.findPlaceFromQuery(request, function (results, status) {
	// if (status === google.maps.places.PlacesServiceStatus.OK && results) {
	// 	for (let i = 0; i < results.length; i++) {
	// 		createMarker(results[i]);
	// 	}
	// 	map.setCenter(sydney);
	// }
	// x.innerHTML = results[0].formatted_address;
	// });



	// let first3= addr1.charAt(0) + addr1.charAt(1) + addr1.charAt(2);

	// let regex = /[0-9][0-9][0-9]/;

	// if(regex.test(first3)){
	// 	//frame.src = "https://www.google.com/maps/embed/v1/search?key=AIzaSyC4Uzg3zthFWP4SrkIgDMAosJywYfARp_g"
	// 		//+ "&q=restaurants+near+" + addr1 +"&zoom=15&center=" + search;
	// }
	// else{
	// //frame.src = "https://www.google.com/maps/embed/v1/search?key=AIzaSyC4Uzg3zthFWP4SrkIgDMAosJywYfARp_g"
	// 		//+ "&q=restaurants+near+" + zipaddr +"&zoom=15&center=" + search;
	// } });
	window.initMap = initMap;
}