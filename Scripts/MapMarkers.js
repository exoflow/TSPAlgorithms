var mapMarkers = [];
var mapConnections = [];

function AddMarker(cityName, color = "red") {
    if (cityName in allCities && !(cityName in activeCities)) {
        var marker = L.circle(allCities[cityName][0], { "color": color, "weight": 8 })
        marker.addTo(map);
        mapMarkers.push(marker);
        activeCities[cityName] = allCities[cityName];
        document.getElementById("activeCities").innerHTML = Object.keys(activeCities).length
    }
}

function AddConnection(cityFrom, cityTo, color = "#3388ff") {
    if (cityFrom in allCities && cityTo in allCities) {
        var marker = L.polyline(
            [allCities[cityFrom][0], allCities[cityTo][0]],
            { "color": color, "weight": 2 })
        marker.addTo(map);
        mapConnections.push(marker);
    }
}

function ResetConnections() {
    mapConnections.forEach(item => map.removeLayer(item));
}

function RemoveMarker(cityName) {
    if (cityName in activeCities && Object.keys(activeCities).length > 2) {
        var lat = activeCities[cityName][0][0]
        var long = activeCities[cityName][0][1]
        Object.keys(mapMarkers).forEach(item => {
            var markerCoords = mapMarkers[item]['_latlng']
            if (markerCoords['lat'] == lat && markerCoords['lng'] == long) {
                map.removeLayer(mapMarkers[item])
                delete mapMarkers[item];
            }
        })
        Object.keys(activeCities).forEach(item => {
            if (activeCities[item][0][0] == lat && activeCities[item][0][1] == long) {
                delete activeCities[item];
            }
        })
        document.getElementById("activeCities").innerHTML = Object.keys(activeCities).length
    }
}

function CenterMap() {
    var bounds = []
    Object.keys(allCities).forEach(city => {
        bounds.push(allCities[city][0])
    })
    map.fitBounds(bounds);
}



