var w = 0;

function preload(){
  // put preload code here
  // track = loadSound("/assets/sounds/ItFeelsGood.mp3");
}

function setup() {
  // put setup code here
  // createCanvas(windowWidth,windowHeight);
  // track.play();
}

function draw() {
  // put drawing code here
  // trackTime = track.currentTime();
  // console.log(trackTime);
}

function watch() {
  if (w == 0) {
    document.getElementById("overlay").style.opacity = "0";
    document.getElementById("bt2").style.backgroundImage = "url(/assets/images/lp/occhio-barrato.png)";
    w = 1
  } else if(w == 1) {
    document.getElementById("overlay").style.opacity = "0.8";
    document.getElementById("bt2").style.backgroundImage = "url(/assets/images/lp/occhio.png)";
    w = 0
  }
}

function gioca() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("header").style.display = "none";
}

function home() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("header").style.display = "flex";
}

function info(){
  if (w == 0) {
    document.getElementById("welcome").style.display = "none";
    w = 1
  } else if(w == 1) {
    document.getElementById("welcome").style.display = "block";
    w = 0
  }
}
