const markers = {};
let map;

function zoomToFit(newPoint) {
  const bounds = new google.maps.LatLngBounds();
  for (const key in markers) {
    bounds.extend(markers[key].position);
  }
  if (newPoint != null) {
    bounds.extend(newPoint);
  }
  map.fitBounds(bounds);
  if (map.getZoom() > 17) map.setZoom(17);
}

function getMemberLinks(membersStr) {
  let output = '';
  if (membersStr !== undefined) {
    const memberStrArr = membersStr.split(',');

    memberStrArr.forEach((memberStr) => {
      output += `<li><a href="./firefighter/${memberStr}">${
        memberStr}</a></li>`;
    });
  }
  return output;
}

function startInterval(callback) {
  setInterval(() => {
    $.ajax({
      url: './api/teams',
      type: 'GET',
      success: (response) => {
        $('.overlay').css('display', 'none');
        callback(response.data);
      },
      error: (request, error) => {
        $('.overlay').css('display', 'block');
      },
    });
  }, 1000);
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(38.5616539, -121.512952),
    zoom: 12,
  });

  const infoWindow = new google.maps.InfoWindow();
  startInterval((teams) => {
    teams.forEach((team) => {
      const { id } = team;
      const point = new google.maps.LatLng(
        parseFloat(team.lat),
        parseFloat(team.lng),
      );
      if (markers[id] === undefined) {
        const label = id.toString() || '';
        const marker = new google.maps.Marker({
          title: name,
          map,
          label,
        });
        zoomToFit(point);
        markers[id] = marker;
      }

      const currMarker = markers[id];
      // clear all listeners
      google.maps.event.clearListeners(currMarker, 'click');
      // popup content
      const infowincontent = `<div style="color: black"><b><a href="./team/${id}">`
        + `Team ${id
        }</b><a><br/>Status: ${
          team.status}<br/> Devices: <br/><ul>${
          getMemberLinks(team.members)
        }</ul></div>`;


      currMarker.setPosition(point);
      currMarker.setIcon(icons[team.status] || icons.Deployed);
      currMarker.addListener('click', () => {
        infoWindow.setContent(infowincontent);
        infoWindow.open(map, currMarker);
      });
    });
  });
}
