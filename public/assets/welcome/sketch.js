let socket = io();

let tutorial;
let gifBenvenuto;
let gif1;
let gif2;
let h1 = 'WELCOME!';
let h2 = 'testo di introduzione lorem ipsum dolor sit amet, consectetur adipiscing elit.';
let i = 1;


function preload() {
  gifBenvenuto = loadImage('assets/logo4.png');
  gif1 = loadImage('assets/banvenuto1.gif');
  gif2 = loadImage('assets/banvenuto2.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tutorial = gifBenvenuto;
  document.getElementById("freccina").style.display = "block";
  document.getElementById("X").style.display = "block";
}

function draw() {
  push();
  noStroke();
  fill('#375a64');
  rect(0, 0, windowWidth, windowHeight, 30);
  pop();


  push();
  noStroke();
  image(tutorial, 100, height / 2 - 250, 500, 500);
  pop();

  push();
  textFont('quicksand');
  textAlign(LEFT);
  textStyle(BOLD);

  textSize(30);
  fill(255);
  text(h1, 650, height / 10 * 3, 250, 500);
  textSize(20);
  fill(255);
  text(h2, 650, height / 10 * 4, 250, 500);
  pop();
}


function next() {
  if (i == 0) {
    h1 = "WELCOME!"
    h2 = 'testo di introduzione lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    tutorial = gifBenvenuto;
    i++
  } else if (i == 1) {
    h1 = "CLICK"
    h2 = 'Premi su il cerchiolino che appare con il giusto tempismo (testo da riscrivere)';
    tutorial = gif1;
    i++
  } else if (i == 2) {
    h1 = "SLIDER"
    h2 = 'trascina il puntatore sullo slider (testo da riscrivere)';
    tutorial = gif2;
    i++
  } else if (i == 3) {
    h1 = "SPINNER"
    h2 = 'bla blablabla spiegare spinner';
    tutorial = gif1;
    i++
    document.getElementById("freccina").style.display = "none";
  }
}

function chiudi(){
  let welcomeFinished = true;
  socket.emit("fineTutorial", welcomeFinished);
  i=0
  h1 = "WELCOME!"
  h2 = 'testo di introduzione lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  tutorial = gifBenvenuto;
  i++
  document.getElementById("freccina").style.display = "block";
}
