let arrOfTenProfile = [];
let btnLike = document.getElementsByClassName("chooseContainer__like")[0];
let btnDislike = document.getElementsByClassName("chooseContainer__dislike")[0];
let btnPreviouse = document.getElementsByClassName(
  "chooseContainer__previouse"
)[0];
let name = document.getElementsByClassName("profileContainer__info--name")[0];
let age = document.getElementsByClassName("profileContainer__info--age")[0];
let locationPerson = document.getElementsByClassName(
  "profileContainer__info--location"
)[0];
let image = document.getElementsByClassName(
  "profileContainer__images--image"
)[0];
let profileContainer = document.getElementsByClassName("profileContainer")[0];
let clear = document.getElementsByClassName("clear")[0];

//Choosing Gender In menu -------------------------- !!! MENU FEATURE WERK NIET !!!
let female = document.getElementsByClassName("menu__burger--female")[0];
let male = document.getElementsByClassName("menu__burger--male")[0];
let both = document.getElementsByClassName("menu__burger--X ")[0];
let url = "https://randomuser.me/api/?results=10";

//Hammer js Libary, Touch like mobile Phone

//create a simple instance
//by default, it only adds horizontal recognizers
let myHammer = new Hammer(profileContainer);
myHammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
myHammer.on("swiperight swipeleft", function(event) {
  console.log(event.type + " gesture detected.");

  switch (event.type) {
    case "swiperight":
      UpdateProfile("liked");
      break;
    case "swipeleft":
      UpdateProfile("dis");
      break;

    default:
      break;
  }
});

//handle drag and drop
let dropZone = document.getElementsByClassName("drop__zone")[0];
let dropZoneLeft = document.getElementsByClassName("drop__zone--left")[0];
let dropZoneRight = document.getElementsByClassName("drop__zone--right")[0];
function handleDragStart(e) {
  this.style.opacity = "0.5"; // this / e.target is the source node.
}
profileContainer.addEventListener("dragstart", function() {
  console.log("draggged start");
});

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = "move"; // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over"); // this / e.target is previous target element.
}

function handleDrop(e) {
  // this / e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  // See the section on the DataTransfer object.

  return false;
}

profileContainer.addEventListener(
  "dragstart",
  function() {
    //this.classList.add("over");
    dropZone.style.visibility = "visible";
  },
  false
);

profileContainer.addEventListener("dragover", handleDragOver, false);
profileContainer.addEventListener("dragleave", handleDragLeave, false);
profileContainer.addEventListener("drop", handleDrop, false);

dropZoneLeft.addEventListener("dragenter", handleDragEnter, false);
dropZoneLeft.addEventListener("dragover", handleDragOver, false);
dropZoneLeft.addEventListener("dragleave", handleDragLeave, false);
dropZoneLeft.addEventListener(
  "drop",
  function(e) {
    handleDrop(e);
    this.classList.remove("over");
    UpdateProfile("dis");
    console.log("Dropped Left");
  },
  false
);

dropZoneRight.addEventListener("dragenter", handleDragEnter, false);
dropZoneRight.addEventListener("dragover", handleDragOver, false);
dropZoneRight.addEventListener("dragleave", handleDragLeave, false);
dropZoneRight.addEventListener(
  "drop",
  function(e) {
    handleDrop(e);
    this.classList.remove("over");
    UpdateProfile("liked");
    console.log("Dropped Right");
  },
  false
);
// get only female
female.addEventListener("click", function() {
  url = "https://randomuser.me/api/?gender=female";
  UpateProfilesByGenderChosen();

  console.log(url);
});

// get only male
male.addEventListener("click", function() {
  url = "https://randomuser.me/api/?gender=male";
  UpateProfilesByGenderChosen();

  console.log(url);
});

// get both females and males -> default

both.addEventListener("click", function() {
  url = "https://randomuser.me/api/";
  UpateProfilesByGenderChosen();

  console.log(url);
});

//Update Profiles to Chosen Gender
function UpateProfilesByGenderChosen() {
  localStorage.clear();
  setTenProfilesInLocalStorage();
}
//Everything with menu
let btnMenu = document.getElementsByClassName("headerContainer__burgermenu")[0];
let menu = document.getElementsByClassName("menu__burger")[0];

let menuItems = document.getElementsByClassName("menu__burger--items")[0];
btnMenu.addEventListener("click", function() {
  menu.classList.toggle("menu__expand");
  menuItems.classList.toggle("menu__show");
  btnMenu.style.color = "white";
});

//Choosing Gender In menu ---------END---------------- !!! MENU FEATURE WERK NIET !!!\

//LOAD

// 1 fetch, ipv van 10 fetches
function setTenProfilesInLocalStorage() {
  fetch(url, {
    method: "GET"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //Binnen deze functie kan je de json data manipuleren
      //we need name, age, location, foto,
      for (let i = 0; i < 10; i++) {
        // let profile = [
        //   data.results[i].name.first,
        //   data.results[i].dob.age,
        //   data.results[i].location.city,
        //   data.results[i].picture.large,
        //   data.results[i].location.coordinates.longitude,
        //   data.results[i].location.coordinates.latitude
        // ];

        let profile = new Profile(
          data.results[i].name.first,
          data.results[i].dob.age,
          data.results[i].location.city,
          data.results[i].picture.large,
          data.results[i].location.coordinates.longitude,
          data.results[i].location.coordinates.latitude
        );

        arrOfTenProfile.push(profile);

        localStorage.setItem(
          "profile" + profileAddedCounter.toString(),
          JSON.stringify(profile)
        );

        //console.log("Profile Add: " + profileAddedCounter);
        profileAddedCounter++;
      }
    });
}
setTenProfilesInLocalStorage();

for (let i = 1; i <= 10; i++) {
  console.log(localStorage.getItem("profile" + i));
}
//Liking en disliking btns
btnLike.addEventListener("click", function() {
  UpdateProfile("liked");
});
btnPreviouse.addEventListener("click", function() {
  goToPreviouseProfile();
});
btnDislike.addEventListener("click", function() {
  UpdateProfile("dis");
});

// profileContainer.addEventListener("load", function() {
//   console.log(
//     JSON.parse(localStorage.getItem("profile" + profileCounter.toString()))
//   );
//   console.log(profileCounter);
// });

//clear localstorage
clear.addEventListener("click", function() {
  console.log("Cleared Storage");
  localStorage.clear();
});
// add like or dis string to localstorage value.
function addLikeOfDislikeToProfile(likeStatus) {
  //get profileCurrentProfile to update
  let profileToUpdate = localStorage.getItem("profile" + profileCounter);

  let likeOrdislike;
  if (
    //found liked or dis in profileToUpdate
    profileToUpdate.search("liked") !== -1 ||
    profileToUpdate.search("dis") !== -1
  ) {
    //found liked in profileToUpdate
    if (profileToUpdate.search("liked") !== -1) {
      profileToUpdate = profileToUpdate.replace("liked", likeStatus);
      console.log("Changed to Dis");
      localStorage.setItem("profile" + profileCounter, profileToUpdate);
    } else {
      //not found liked in profileToUpdate, so dis
      profileToUpdate = profileToUpdate.replace("dis", likeStatus);
      localStorage.setItem("profile" + profileCounter, profileToUpdate);
    }
  } else {
    // Not found liked or dis in profileToUpdate
    if (likeStatus === "liked") {
      likeOrdislike = '","rate":"liked"}';
    } else {
      likeOrdislike = '","rate":"dis"}';
    }
    //,"lat":"-83.0340"
    let index = profileToUpdate.indexOf("}") - 1;

    profileToUpdate = profileToUpdate.slice(0, index) + likeOrdislike;
    localStorage.setItem("profile" + profileCounter, profileToUpdate);
    // let checkProfile = JSON.parse(
    //   localStorage.getItem("profile" + profileCounter)
    // );
    // console.log(checkProfile);
  }

  //console.log(profileToUpdate);

  //Change like or dislike -- search 4th ','
  let komma4thIndex = profileToUpdate.lastIndexOf(",");
  //console.log("komme:  " + komma4thIndex);
  // console.log(profileToUpdate.slice(komma4thIndex - 1, profileToUpdate.length));
  // console.log(index);
  // console.log(localStorage.getItem("profile" + profileCounter));
}

function UpdateProfile(likeStatus) {
  addLikeOfDislikeToProfile(likeStatus);
  goToNextProfile();
}

function goToPreviouseProfile() {
  //console.log(profileCounter);
  if (profileCounter !== 1) {
    profileCounter--;
  }

  //console.log(profileCounter);
  showProfile();
}

showProfile();

function removeProfile() {
  localStorage.removeItem("profile" + profileCounter);
}

/* ------------------------------------------List visited Profiles Liked-Dis change--------------*/

let listVisitedProfiles = document.getElementsByClassName(
  "list__visitedprofiles"
)[0];
let btnTinder = document.getElementsByClassName("fas fa-fire")[1];

btnTinder.addEventListener("click", function() {
  listVisitedProfiles.classList.toggle("list__visitedprofiles--show");
  showVisitedProfiles();
});

function showVisitedProfiles() {
  let n = 0;
  listVisitedProfiles.innerHTML = "";
  //console.log(profileCounter);

  if (profileCounter === 1) {
    let div = document.createElement("div");
    div.innerText = "Like Or Dislike Profiles To See History";
    listVisitedProfiles.appendChild(div);
  } else {
    //start of key name: profile1
    for (let i = 1; i < profileCounter; i++) {
      let profileToUpdate = JSON.parse(localStorage.getItem("profile" + i));
      console.log(i + "------------");
      let div = document.createElement("div");
      let img = document.createElement("img");
      let divName = document.createElement("div");
      let divChangeStatus = document.createElement("div");
      let divLike = document.createElement("div");
      let divDis = document.createElement("div");

      divLike.setAttribute("class", "list__visitedprofiles--profile-btnLike");
      divDis.setAttribute("class", "list__visitedprofiles--profile-btnDis");
      divLike.innerHTML = "<i class='far fa-heart'></i>";
      divDis.innerHTML = "<i class='far fa-thumbs-down'></i>";

      div.setAttribute("class", "list__visitedprofiles--profile");
      img.setAttribute("class", "list__visitedprofiles--profile-image");
      img.setAttribute("src", profileToUpdate.imageurl);
      divName.setAttribute("class", "list__visitedprofiles--profile-name");

      if (profileToUpdate.rate === "liked") {
        divChangeStatus.setAttribute(
          "class",
          "list__visitedprofile--status-liked"
        );
      } else {
        divChangeStatus.setAttribute(
          "class",
          "list__visitedprofile--status-dis"
        );
      }

      divName.textContent = profileToUpdate.name;
      div.appendChild(divDis);
      div.appendChild(divLike);
      div.appendChild(img);
      div.appendChild(divName);
      div.appendChild(divChangeStatus);
      listVisitedProfiles.appendChild(div);
      n++;

      //changeMindLikeOrDis(profileToUpdate);
    }
  }

  btnsLike = [
    ...document.getElementsByClassName("list__visitedprofiles--profile-btnLike")
  ];
  btnsDis = [
    ...document.getElementsByClassName("list__visitedprofiles--profile-btnDis")
  ];
  // btnsLike.forEach(btnLike => {
  //   btnLike.addEventListener("click", () => {
  //     console.log(" hello thsdnf");
  //   });
  // });

  for (let i = 0; i < btnsLike.length; i++) {
    btnsLike[i].addEventListener("click", () => {
      let profileToUpdate = localStorage.getItem("profile" + (i + 1));
      //-1 = not found
      if (profileToUpdate.search("dis") !== -1) {
        profileToUpdate = profileToUpdate.replace("dis", "liked");
        //console.log("Changed to liked: " + profileToUpdate);
        localStorage.setItem("profile" + (i + 1), profileToUpdate);
        showVisitedProfiles();
      }
    });
  }

  for (let i = 0; i < btnsDis.length; i++) {
    btnsDis[i].addEventListener("click", () => {
      let profileToUpdate = localStorage.getItem("profile" + (i + 1));
      //-1 = not found
      if (profileToUpdate.search("liked") !== -1) {
        profileToUpdate = profileToUpdate.replace("liked", "dis");
        //console.log("Changed to dis: " + profileToUpdate);
        localStorage.setItem("profile" + (i + 1), profileToUpdate);
        showVisitedProfiles();
      }
    });
  }
}
// Change Your Mind with like or Dis

function changeMindLikeOrDis(profileToUpdate) {
  // to  do : make it good
  let profileToUpdate = JSON.stringify(profileToUpdate);
  //-1 = not found
  if (profileToUpdate.search("liked") !== -1) {
    profileToUpdate = profileToUpdate.replace("liked", "dis");
    //console.log("Changed to Dis: " + profileToUpdate);
    localStorage.setItem("profile" + i, profileToUpdate);
  } else {
    profileToUpdate = profileToUpdate.replace("dis", "liked");
    //console.log("Changed to Liked: " + profileToUpdate);
    localStorage.setItem("profile" + i, profileToUpdate);
  }
}

//some tests to run
let listLocalStorage = document.getElementsByClassName("list__localstorage")[0];
let btnShowList = document.getElementsByClassName("btn__showList")[0];

function showLocalStorageList() {
  for (let key in localStorage) {
    let p = document.createElement("p");

    p.textContent = key + " : " + localStorage.getItem(key);
    listLocalStorage.appendChild(p);
    //console.log(JSON.parse(localStorage.getItem(key)));
  }
  // console.log(localStorage.length);
}

btnShowList.addEventListener("click", function() {
  listLocalStorage.textContent = "";
  showLocalStorageList();
});
