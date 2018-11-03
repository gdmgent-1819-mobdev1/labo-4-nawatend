//profiles counter variable en initiated
let profileCounter = 1;
let nextGroupOfProfileCounter = 1;
let profileAddedCounter = 1;

function showProfile() {
  drawCircleOnMap();
  //console.log(long + "   ==" + lat);

  name.textContent = JSON.parse(
    localStorage.getItem("profile" + profileCounter)
  )[0];
  age.textContent = JSON.parse(
    localStorage.getItem("profile" + profileCounter)
  )[1];
  locationPerson.textContent = JSON.parse(
    localStorage.getItem("profile" + profileCounter)
  )[2];
  image.setAttribute(
    "src",
    JSON.parse(localStorage.getItem("profile" + profileCounter))[3]
  );

  long = JSON.parse(localStorage.getItem("profile" + profileCounter))[4];
  lat = JSON.parse(localStorage.getItem("profile" + profileCounter))[5];

  //console.log(profileCounter);
  //console.log(JSON.parse(localStorage.getItem("profile" + profileCounter)));
  // console.log("ProfileNr: " + profileCounter);
}
