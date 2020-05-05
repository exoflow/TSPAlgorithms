var startTime;
var timeout;
var edgeArray;
var activeCities;

function PageLoad() {
    activeCities = {};
    for (var i = 0; i < 12; i++) {
        AddMarker(GetRandomInactiveCity());
    }
    CenterMap();

    console.log(map.getPanes() )
}

function Run(algorithm) {
    timeout = false;
    startTime = performance.now();
    edgeArray = CalculateCityDistances(activeCities);
    path = [];
    CleanResults(algorithm);

    switch (algorithm) {
        case "NN":
            setTimeout(SolveNearestNeighbor, 100);
            break;
        case "DP":
            setTimeout(SolveDynamicProgramming, 100);
            break;
        default: null;
    }
}

function CleanResults(algorithm) {
    ResetConnections();
    document.getElementById("spinner" + algorithm).className = "fa fa-spinner fa-spin";
    document.getElementById("runtime" + algorithm).innerHTML = " ";
    document.getElementById("check" + algorithm).className = "";
}

function ShowResult(algorithm, travelledDistance, runtime) {
    var travelledDistance = "Travelled " + Math.round(travelledDistance) + " km"
    var runtime = Math.round(runtime) + " ms"
    var checkIcon = "fa fa-check"
    var iconColor = "color:#15c904;"

    if (timeout) {
        travelledDistance = "";
        runtime = 'Timeout'
        checkIcon = "fa fa-times"
        iconColor = "color:red;"
    }
    document.getElementById("result" + algorithm).innerHTML = travelledDistance;
    document.getElementById("runtime" + algorithm).innerHTML = runtime;
    document.getElementById("spinner" + algorithm).className = "";
    document.getElementById("check" + algorithm).className = checkIcon;
    document.getElementById("check" + algorithm).style = iconColor;
}

function GetRandomActiveCity() {
    return Object.keys(activeCities)[Math.floor(Math.random() * Object.keys(activeCities).length)]
}

function GetRandomInactiveCity() {
    var nonActiveCityNames = Object.keys(allCities).filter(x => !Object.keys(activeCities).includes(x))
    return nonActiveCityNames[Math.floor(Math.random() * nonActiveCityNames.length)]
}

function getCityDistanceKm(city1Position, city2Position) {
    lat1 = city1Position[0];
    lat2 = city2Position[0];
    long1 = city1Position[1];
    long2 = city2Position[1];
    var radius = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLong = deg2rad(long2 - long1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = radius * c; // Distance in km

    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function CalculateCityDistances(activeCities) {
    var cityDistances = []
    var cityNames = Object.keys(activeCities)
    for (var i = 0; i < cityNames.length; i++) {
        for (var j = i; j < cityNames.length; j++) {
            cityDistances.push([]);
            var distance = getCityDistanceKm(activeCities[cityNames[i]][0], activeCities[cityNames[j]][0])
            cityDistances[i][j] = distance;
            cityDistances[j][i] = distance;
        }
    }
    return cityDistances
}











