let socket = io();

let tutorial;
let gifBenvenuto; //change
let gif1;
let gif2;
let i = 1;
let bckgcol = '#2b7077' //#c2797a //#375a64 //#186977

let creditsBool = false;

let tut1H1 = 'WELCOME!';
let tut1H2 = 'Mouse Party is an interactive\nchoreographical experience\neveryone can join. \n\nRound up a group of friends\nor strangers and feel the beat\ntogether!\n\nHere\'s a quick introduction.';
let tut2H1 = 'CIRCLE BEATS';
let tut2H2 = 'Aim with your mouse and click\nor press spacebar when the\ntiming is right.\n\nLet the music guide you!';
let tut3H1 = 'SLIDER';
let tut3H2 = 'Position yourself on the + sign\nand click or press spacebar\nas you slide across.\n\nPrecision is key!';
let tut4H1 = 'SPINNER';
let tut4H2 = 'Wait until the dashed circle\nstarts moving, click or press\nspacebar, and spin around\nto your heart\'s content.\n\nBut don\'t get dizzy!';

let cred1H1 = 'Coded with 🤍 by';
let cred1H2 = 'Andrea Bellavita, \nSharon Manfredi, \nNicole Moreschi, \nRiccardo Rigamondi';
let cred1H3 = 'Politecnico di Milano - Scuola del Design\nCorso di laurea in Design della Comunicazione\n\nCreative Coding\nA.A. 2020-2021\n\nDocenti\nMichele Mauri, Tommaso Elli, Andrea Benedetti'
let cred2H1 = 'SOUND';
let cred2H2 = 'Aim with your mouse and click\nor press spacebar when the\ntiming is right.\n\nLet the music guide you!';
let cred2H3 = 'Aim with your mouse and click\nor press spacebar when the\ntiming is right.\n\nLet the music guide you!';


let h1 = tut1H1;
let h2 = tut1H2;

function preload() {
  gifBenvenuto = loadImage('assets/intro.gif');
  gifLogo = loadImage('assets/logo4.png');
  gif1 = loadImage('assets/banvenuto1.gif');
  gif2 = loadImage('assets/banvenuto2.gif');
  gif3 = loadImage('assets/banvenuto3.gif');
  poli = loadImage('assets/logo-poli.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tutorial = gifBenvenuto;
  document.getElementById("freccina").style.display = "block";
  document.getElementById("freccinaPre").style.display = "block";
  document.getElementById("X").style.display = "block";
  document.getElementById("freccinaPre").style.opacity = "0.3";
  document.getElementById("freccinaPre").style.cursor = "default";
}

function draw() {

  push();
  noStroke();
  fill(bckgcol);
  rect(0, 0, windowWidth, windowHeight, 30);
  pop();

  push();
  noStroke();
  if(!creditsBool){
    image(tutorial, 60, height / 2 - 250, 500, 500);

    noFill();
    strokeWeight(20);
    stroke(bckgcol)
    rect(60-10, height / 2 - 250-10, 515, 515, 30);
  }
  pop();

  push();
  textFont('quicksand');
  textAlign(LEFT);

  if(!creditsBool){
    textStyle(BOLD);
    textSize(30);
    fill(255);
    text(h1, 630, height / 10 * 2.6, 250, 500);

    textStyle(NORMAL);
    textSize(20);
    fill(255);
    text(h2, 630, height / 10 * 4.0, 300, 500);
  }
  else{
    document.getElementById("freccinaPre").style.left = "60px";
    document.getElementById("freccina").style.left = "100px";

    if (i==1){
      document.getElementById("link2").style.display = 'none';
      document.getElementById("link3").style.display = 'none';
      document.getElementById("link4").style.display = 'none';
      document.getElementById("link5").style.display = 'none';
      document.getElementById("link6").style.display = 'none';

      textStyle(BOLD);
      textSize(30);
      fill(255);
      text(cred1H1, 580, height / 10 * 1.8, 350, 500);

      textStyle(NORMAL);
      textSize(20);
      text(cred1H2, 580, height / 10 * 3.2, 350, 500);

      text(cred1H3, 60, height / 10 * 1.8, 450, 500);

      document.getElementById("link1").style.display = 'block';
      document.getElementById("link1").style.left = "60px";
      document.getElementById("link1").style.top = "325px";

      image(poli, 60, height / 10 * 6.6, 165, 56);
    }
    else{
      document.getElementById("link1").style.display = 'none';

      textStyle(BOLD);
      textSize(30);
      fill(255);
      text(cred2H1, 60, height / 10 * 1.8, 910, 500);

      textStyle(NORMAL);
      textSize(20);
      text(cred2H2, 60, height / 10 * 3.2, 910, 500);
    }
  }

  pop();
}


function next() {
  if(!creditsBool){
    if (i == 0) {
      h1 = tut1H1;
      h2 = tut1H2;
      tutorial = gifBenvenuto;
      i++
      document.getElementById("freccinaPre").style.opacity = "0.3";
      document.getElementById("freccina").style.opacity = "1";
    } else if (i == 1) {
      h1 = tut2H1;
      h2 = tut2H2;
      tutorial = gif1;
      i++
      document.getElementById("freccinaPre").style.opacity = "1";
      document.getElementById("freccina").style.opacity = "1";
      document.getElementById("freccina").style.cursor = "pointer";
      document.getElementById("freccinaPre").style.cursor = "pointer";
    } else if (i == 2) {
      h1 = tut3H1;
      h2 = tut3H2;
      tutorial = gif2;
      i++
      document.getElementById("freccinaPre").style.opacity = "1";
      document.getElementById("freccina").style.opacity = "1";
      document.getElementById("freccina").style.cursor = "pointer";
    } else if (i == 3) {
      h1 = tut4H1;
      h2 = tut4H2;
      tutorial = gif3;
      i++
      document.getElementById("freccinaPre").style.opacity = "1";
      document.getElementById("freccina").style.opacity = "0.3";
      document.getElementById("freccina").style.cursor = "default";
      document.getElementById("crediti").style.display = "block";
    }
  }
  else{
    i=2
    document.getElementById("freccinaPre").style.opacity = "1";
    document.getElementById("freccina").style.opacity = "0.3";
  }
}

function prev() {
  if(!creditsBool){
    if (i == 2) {
      h1 = tut1H1;
      h2 = tut1H2;
      tutorial = gifBenvenuto;
      i--
      document.getElementById("freccinaPre").style.cursor = "default";
      document.getElementById("freccinaPre").style.opacity = "0.3";
      document.getElementById("freccina").style.opacity = "1";
    } else if (i == 3) {
      h1 = tut2H1;
      h2 = tut2H2;
      tutorial = gif1;
      i--
      document.getElementById("freccinaPre").style.opacity = "1";
      document.getElementById("freccina").style.opacity = "1";
    } else if (i == 4) {
      h1 = tut3H1;
      h2 = tut3H2;
      tutorial = gif2;
      i--
      document.getElementById("freccinaPre").style.opacity = "1";
      document.getElementById("freccina").style.opacity = "1";
      document.getElementById("freccina").style.cursor = "pointer";
      bckgcol = '#2b7077';
      document.getElementById("crediti").style.display = "none";
      document.getElementById("freccina").style.backgroundColor = "#2b7077";
      document.getElementById("freccinaPre").style.backgroundColor = "#2b7077";
      document.getElementById("crediti").style.backgroundColor = "#2b7077";
      document.getElementById("X").style.backgroundColor = "#2b7077";
    }
  }
  else{
    i=1
    document.getElementById("freccinaPre").style.opacity = "0.3";
    document.getElementById("freccina").style.opacity = "1";
  }
}

function credits(){
i = 1;
creditsBool = true;
bckgcol = '#c2797a';
h1 = cred1H1;
h2 = cred1H2;
document.getElementById("freccinaPre").style.opacity = "0.3";
document.getElementById("freccina").style.opacity = "1";
document.getElementById("freccinaPre").style.left = "60px";
document.getElementById("freccina").style.left = "100px";
document.getElementById("freccina").style.display = "block";
document.getElementById("freccinaPre").style.display = "block";
document.getElementById("freccina").style.backgroundColor = "#c2797a";
document.getElementById("freccinaPre").style.backgroundColor = "#c2797a";
document.getElementById("crediti").style.backgroundColor = "#c2797a";
document.getElementById("X").style.backgroundColor = "#c2797a";
document.getElementById("crediti").style.display = "none";
}
//sound credits
//sfx by fesliyanstudios.com, audiomicro.com, bigsoundbank.com
//"Musik Liegt in Der Luft" by Phillip Gross (CC BY-NC-SA 3.0) [https://creativecommons.org/licenses/by-nc-sa/3.0/]
//"Fireworks" by Alexander Nakarada (CC 0 1.0) [https://creativecommons.org/publicdomain/zero/1.0/deed.it]

function chiudi() {
  var welcomeFinished = {
    wf: true,
    id: socket.id,
  }
  socket.emit("fineTutorial", welcomeFinished);
  i=0
  bckgcol = '#2b7077';
  h1 = tut1H1;
  h2 = tut1H2;
  creditsBool = false;
  tutorial = gifBenvenuto;
  i++
  document.getElementById("freccina").style.display = "block";
  document.getElementById("freccina").style.opacity = "1";
  document.getElementById("freccinaPre").style.display = "block";
  document.getElementById("freccinaPre").style.opacity = "0.3";
  document.getElementById("crediti").style.display = "none";
  document.getElementById("freccina").style.backgroundColor = "#2b7077";
  document.getElementById("freccinaPre").style.backgroundColor = "#2b7077";
  document.getElementById("crediti").style.backgroundColor = "#2b7077";
  document.getElementById("X").style.backgroundColor = "#2b7077";
  document.getElementById("freccina").style.cursor = "pointer";
  document.getElementById("freccinaPre").style.cursor = "default";
}
