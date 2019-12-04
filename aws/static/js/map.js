var markers = {};
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(38.5616539, -121.512952),
    zoom: 12
  });

  var infoWindow = new google.maps.InfoWindow;
  startInterval((teams) => {
    teams.forEach((team) => {
      var id = team.id;
      var point = new google.maps.LatLng(
        parseFloat(team.lat),
        parseFloat(team.lng));
      if (markers[id] === undefined) {
        var label = id.toString() || "";
        var marker = new google.maps.Marker({
          title: name,
          map: map,
          label: label
        });
        zoomToFit(point);
        markers[id] = marker;
      }

      var currMarker = markers[id];
      //clear all listeners
      google.maps.event.clearListeners(currMarker, 'click');
      //popup content
      let infowincontent = '<div style="color: black"><b><a href="../team/' + id + '">' +
        id +
        '</b><a><br/>Status: ' +
        team.status + '<br/> Devices: ' +
        team.members +
        '</div>';


      currMarker.setPosition(point);
      currMarker.setIcon(icons[team.status] || icons["Deployed"]);
      currMarker.addListener('click', function() {
        infoWindow.setContent(infowincontent);
        infoWindow.open(map, currMarker);
      });



    });
  });
}

function zoomToFit(newPoint) {
  let bounds = new google.maps.LatLngBounds();
  for (var key in markers) {
    bounds.extend(markers[key].position);
  }
  if (newPoint != null) {
    bounds.extend(newPoint);
  }
  map.fitBounds(bounds);
  if (map.getZoom() > 17)
    map.setZoom(17);
}

function startInterval(callback) {
  // let data;
  var date = new Date();
  interval = setInterval(() => {
    $.ajax({
      url: '../api/teams',
      type: 'GET',
      success: (response) => {
        $('.overlay').css('display', 'none');
        callback(response.data);
      },
      error: (request, error) => {
        $('.overlay').css('display', 'block');
      }
    });
  }, 1000);
}