//profiles counter variable en initiated
let profileCounter = 1;
let nextGroupOfProfileCounter = 1;
let profileAddedCounter = 1;

function showProfile() {
  drawCircleAndFly();
  //console.log(long + "   ==" + lat);

  name.textContent = JSON.parse(
    localStorage.getItem("profile" + profileCounter)
  )["name"];
  age.textContent = JSON.parse(
    localStorage.getItem("profile" + profileCounter)
  )["age"];
  locationPerson.textContent = JSON.parse(
    localStorage.getItem("profile" + profileCounter)
  )["city"];
  image.setAttribute(
    "src",
    JSON.parse(localStorage.getItem("profile" + profileCounter))["imageurl"]
  );

  profileLong = JSON.parse(localStorage.getItem("profile" + profileCounter))[
    "long"
  ];
  profileLat = JSON.parse(localStorage.getItem("profile" + profileCounter))[
    "lat"
  ];

  //console.log(profileCounter);
  //console.log(JSON.parse(localStorage.getItem("profile" + profileCounter)));
  // console.log("ProfileNr: " + profileCounter);
}

//go to next profile from localstorage
function goToNextProfile() {
  if (profileCounter < localStorage.length) {
    if (nextGroupOfProfileCounter === 9) {
      setTenProfilesInLocalStorage();

      nextGroupOfProfileCounter = 1;
    } else {
      nextGroupOfProfileCounter++;
    }
    profileCounter++;
    showProfile();
  }
}

function distance(lat1, lon1, lat2, lon2, unit) {
  let radlat1 = (Math.PI * lat1) / 180;
  let radlat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist.toFixed(2);
}
