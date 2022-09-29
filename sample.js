// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

Object.defineProperty(exports, "__esModule", { value: true });
var map;
var service;
var infowindow;
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
window.initMap = initMap;