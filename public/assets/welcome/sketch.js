let socket = io();

let tutorial;
let gifBenvenuto;
let gif1;
let gif2;
let h1 = 'WELCOME!';
let h2 = 'Mouse Party is an interactive\nchoreographical experience\neveryone can join. \n\nRound up a group of friends\nor strangers and feel the beat\ntogether!\n\nHere\'s a quick introduction.';
let i = 1;
let bckgcol = '#2b7077' //#c2797a //#375a64 //#186977


function preload() {
  gifBenvenuto = loadImage('assets/logo4.png');
  gif1 = loadImage('assets/banvenuto1.gif');
  gif2 = loadImage('assets/banvenuto2.gif');
  gif3 = loadImage('assets/banvenuto3.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tutorial = gifBenvenuto;
  document.getElementById("freccina").style.display = "block";
  document.getElementById("freccinaPre").style.display = "block";
  document.getElementById("X").style.display = "block";
}

function draw() {
  if (i == 1) {
    document.getElementById("freccinaPre").style.opacity = "0.3";
  }

  push();
  noStroke();
  fill(bckgcol);
  rect(0, 0, windowWidth, windowHeight, 30);
  pop();

  push();
  noStroke();
  image(tutorial, 60, height / 2 - 250, 500, 500);

  noFill();
  strokeWeight(20);
  stroke(bckgcol)
  rect(60-10, height / 2 - 250-10, 515, 515, 30);
  pop();

  push();
  textFont('quicksand');
  textAlign(LEFT);

  textStyle(BOLD);
  textSize(30);
  fill(255);
  text(h1, 630, height / 10 * 2.6, 250, 500);

  textStyle(NORMAL);
  textSize(20);
  fill(255);
  text(h2, 630, height / 10 * 4.0, 300, 500);
  pop();
}


function next() {
  if (i == 0) {
    h1 = "WELCOME!"
    h2 = 'Mouse Party is an interactive\nchoreographical experience\neveryone can join. \n\nRound up a group of friends\nor strangers and feel the beat\ntogether!\n\nHere\'s a quick introduction.';
    tutorial = gifBenvenuto;
    i++
    document.getElementById("freccinaPre").style.opacity = "0.3";
    document.getElementById("freccina").style.opacity = "1";
  } else if (i == 1) {
    h1 = "CIRCLE BEATS"
    h2 = 'Aim with your mouse and click\nor press spacebar when the\ntiming is right.\n\nLet the music guide you!';
    tutorial = gif1;
    i++
    document.getElementById("freccinaPre").style.opacity = "1";
    document.getElementById("freccina").style.opacity = "1";
  } else if (i == 2) {
    h1 = "SLIDER"
    h2 = 'Position yourself on the + sign\nand click or press spacebar\nas you slide across.\n\nPrecision is key!';
    tutorial = gif2;
    i++
    document.getElementById("freccinaPre").style.opacity = "1";
    document.getElementById("freccina").style.opacity = "1";
  } else if (i == 3) {
    h1 = "SPINNER"
    h2 = 'Wait until the dashed circle\nstarts moving, click or press\nspacebar, and spin around\nto your heart\'s content.\n\nBut don\'t get dizzy!';
    tutorial = gif3;
    i++
    document.getElementById("freccinaPre").style.opacity = "1";
    document.getElementById("freccina").style.opacity = "0.3";
  }
}

function prev() {
  if (i == 2) {
    h1 = "WELCOME!"
    h2 = 'Mouse Party is an interactive\nchoreographical experience\neveryone can join. \n\nRound up a group of friends\nor strangers and feel the beat\ntogether!\n\nHere\'s a quick introduction.';
    tutorial = gifBenvenuto;
    i=i-1
    document.getElementById("freccinaPre").style.opacity = "0.3";
    document.getElementById("freccina").style.opacity = "1";
  } else if (i == 3) {
    h1 = "CIRCLE BEATS"
    h2 = 'Aim with your mouse and click\nor press spacebar when the\ntiming is right.\n\nLet the music guide you!';
    tutorial = gif1;
    i=i-1
    document.getElementById("freccinaPre").style.opacity = "1";
    document.getElementById("freccina").style.opacity = "1";
  } else if (i == 4) {
    h1 = "SLIDER"
    h2 = 'Position yourself on the + sign\nand click or press spacebar\nas you slide across.\n\nPrecision is key!';
    tutorial = gif2;
    i=i-1
    document.getElementById("freccinaPre").style.opacity = "1";
    document.getElementById("freccina").style.opacity = "1";
  }
}

function chiudi() {
  var welcomeFinished = {
    wf: true,
    id: socket.id,
  }
  socket.emit("fineTutorial", welcomeFinished);
  i=0
  h1 = "WELCOME!"
  h2 = 'Mouse Party is an interactive\nchoreographical experience\neveryone can join. \n\nRound up a group of friends\nor strangers and feel the beat\ntogether!\n\nHere\'s a quick introduction.';
  tutorial = gifBenvenuto;
  i++
  document.getElementById("freccina").style.display = "block";
  document.getElementById("freccina").style.opacity = "1";
  document.getElementById("freccinaPre").style.display = "block";
  document.getElementById("freccinaPre").style.opacity = "0.3";
}
