
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 15
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true
    });

    var request = {
        origin: { lat: 37.7749, lng: -122.4194 },
        destination: { lat: 37.8049, lng: -122.4274 },
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
            animatePerson(response.routes[0].legs[0]);
        }
    });
}

function animatePerson(leg) {
    var step = 0;
    var numSteps = leg.steps.length;
    var animation = document.getElementById('animation');
    var routePath = new google.maps.Polyline({
        path: [],
        geodesic: true,
        strokeColor: '#3498db',
        strokeOpacity: 0.8,
        strokeWeight: 5
    });

    for (var i = 0; i < numSteps; i++) {
        for (var j = 0; j < leg.steps[i].path.length; j++) {
            routePath.getPath().push(leg.steps[i].path[j]);
        }
    }

    function move() {
        if (step >= numSteps) return;
        animation.style.display = 'block';
        var path = routePath.getPath();
        animation.style.top = path.getAt(step).lat() + 'px';
        animation.style.left = path.getAt(step).lng() + 'px';
        step++;
        setTimeout(move, 1000);
    }

    move();
}