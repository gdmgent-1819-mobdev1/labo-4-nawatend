//initiate map
//map
let profileLong = 5;
let profileLat = 5;

let userLat = "";
let userLong = "";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    console.log("got geo location");
  });
} else {
  console.log("No GEO LOCATION FROM USER");
}

mapboxgl.accessToken =
  "pk.eyJ1IjoibmF3YW5ndGVuZCIsImEiOiJjam40aXZhN2EwcDNrM3FxeWR1cXpwNDQxIn0.QJHY3Gs8J2UaypqDj77NhA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/outdoors-v10",
  zoom: 10,
  center: [profileLong, profileLat] // starting position
});

//**---=====Show or Hide map==================== MAPBOX  MAAAAP---------------------------------- */

let btnMap = document.getElementsByClassName("btn__map")[0];
let map_dom = document.getElementById("map");

// toggle to show or hide map
btnMap.addEventListener("click", function() {
  if (map_dom.className == "map__show") {
    map_dom.setAttribute("class", "map__hide");
  } else {
    map_dom.setAttribute("class", "map__show");
  }

  console.log("btnMap clicked");
});
//add layer with circle
function drawCircleAndFly() {
  if (map.loaded()) {
    // r = radius
    let r = 100;
    // Click fast makes map.loaded return false
    map.flyTo({
      center: [profileLong, profileLat],
      zoom: 10,
      speed: 10 // make the flying fast
    });

    //console.log(long + " ++++" + lat);
    map.addLayer({
      id: "middle" + profileCounter,
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [profileLong, profileLat]
          }
        }
      },
      paint: {
        "circle-color": "red",
        "circle-radius": r,
        "circle-opacity": 0.4
      }
    });

    //unable to zoom on map
    map.scrollZoom.disable();

    console.log(
      "ProfileLat: " +
        profileLat +
        " ProfileLong: " +
        profileLong +
        "userLat: " +
        userLat +
        " userLong: " +
        userLong
    );
    //distance between user and profile
    let distanceKM = distance(profileLat, profileLong, userLat, userLong, "K");
    document.getElementsByClassName("distance")[0].textContent =
      distanceKM + " KM";
  } else {
    console.log("Map Not loaded yet");
  }
}
