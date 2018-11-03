//initiate map
//map
let long = 5;
let lat = 5;
mapboxgl.accessToken =
  "pk.eyJ1IjoibmF3YW5ndGVuZCIsImEiOiJjam40aXZhN2EwcDNrM3FxeWR1cXpwNDQxIn0.QJHY3Gs8J2UaypqDj77NhA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/outdoors-v10",
  zoom: 10,
  center: [long, lat] // starting position
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
function drawCircleOnMap() {
  if (map.loaded()) {
    // r = radius
    let r = 100;
    // console.log("this is map loaded " + map.loaded());
    map.flyTo({
      center: [long, lat],
      zoom: 10,
      speed: 5 // make the flying fast
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
            coordinates: [long, lat]
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
  }
}
