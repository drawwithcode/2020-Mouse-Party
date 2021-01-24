let socket = io();

var w = 0;
var i = 1;
var sc = 0;
var home_2 = false;

let toastBool = false;
let isHome = false;

let playersData;
let roomData;

function preload(){
  document.getElementById("welcome").style.display = "none";
}

function setup() {
  frameRate(60);
}

function draw() {
  if (home_2 == true) {
    if (frameCount % 30 == 0) {
      sc++;
    }
  }
  if (sc == 1) {
    socket.emit("leave", {id: socket.id});
    sc = 0;
    home_2 = false;
  }
  if(toastBool && playersData > 1 && roomData == '2'){
    notify1p_hide();
  }
  else if(playersData <= 1 && roomData == '2' && !toastBool && !isHome){
    notify1p_show();
  }
}

function watch() {
  if (w == 0) {
    document.getElementById("overlay").style.opacity = "0";
    document.getElementById("bt2").style.backgroundImage = "url(/assets/images/lp/occhio-barrato.png)";
    w = 1
  } else if (w == 1) {
    document.getElementById("overlay").style.opacity = "1";
    document.getElementById("bt2").style.backgroundImage = "url(/assets/images/lp/occhio.png)";
    w = 0
  }
}

function gioca_1() {

}

function gioca_2() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("elementiDx").style.display = "none";
  socket.emit("join", {id: socket.id});
  if(playersData <= 1 && roomData == '2' && !toastBool){
    notify1p_show();
  }
  isHome = false;
}

function gioca_3() {

}

function home() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("elementiDx").style.display = "flex";
  notify1p_hide();
  socket.emit("leave", {id: socket.id});
  isHome = true;
  home_2 = true;
}

socket.on("closeWelcome", benvenuto);

function benvenuto(data) {
  if (data.wf == true) {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("elementiDx").style.pointerEvents = "auto";
    document.getElementById("logo").style.pointerEvents = "auto";
    i = 1;
  } else if (data.wf == false) {
    document.getElementById("welcome").style.display = "block";
    document.getElementById("welcome").style.opacity = "100";
    document.getElementById("elementiDx").style.pointerEvents = "none";
    document.getElementById("logo").style.pointerEvents = "none";
    i = 0;
  }
}

function info(){
  if (i == 0) {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("elementiDx").style.pointerEvents = "auto";
    document.getElementById("logo").style.pointerEvents = "auto";
    i = 1
  } else if (i == 1) {
    document.getElementById("welcome").style.display = "block";
    document.getElementById("welcome").style.opacity = "100";
    document.getElementById("elementiDx").style.pointerEvents = "none";
    document.getElementById("logo").style.pointerEvents = "none";
    i = 0
  }
}

socket.on("playersNumber", displayPlayers);

function displayPlayers(data) {
  // qui ci va la gestione degli omini
  // questo sketch riceve dal server il pacchetto di dati "playersData"
  // all'interno c'è:
  // data.pl = numoro di giocatori;
  // data.room = stanza da cui arrivano i dati (data.room è una stringa, non un numero);
  playersData = data.pl;
  roomData = data.room;

  if(data.pl == 0 && data.room == '1'){
    document.getElementById("u1r1").style.display = "none";
    document.getElementById("u2r1").style.display = "none";
    document.getElementById("u3r1").style.display = "none";
    document.getElementById("u4r1").style.display = "none";
    document.getElementById("u5r1").style.display = "none";
    document.getElementById("plusR1").style.display = "none";
    document.getElementById("noneR1").style.display = "block";
  } else if(data.pl == 1 && data.room == '1'){
    document.getElementById("u1r1").style.display = "block";
    document.getElementById("u2r1").style.display = "none";
    document.getElementById("u3r1").style.display = "none";
    document.getElementById("u4r1").style.display = "none";
    document.getElementById("u5r1").style.display = "none";
    document.getElementById("plusR1").style.display = "none";
    document.getElementById("noneR1").style.display = "none";
  } else if(data.pl == 2 && data.room == '1'){
    document.getElementById("u1r1").style.display = "block";
    document.getElementById("u2r1").style.display = "block";
    document.getElementById("u3r1").style.display = "none";
    document.getElementById("u4r1").style.display = "none";
    document.getElementById("u5r1").style.display = "none";
    document.getElementById("plusR1").style.display = "none";
    document.getElementById("noneR1").style.display = "none";
  } else if(data.pl == 3 && data.room == '1'){
    document.getElementById("u1r1").style.display = "block";
    document.getElementById("u2r1").style.display = "block";
    document.getElementById("u3r1").style.display = "block";
    document.getElementById("u4r1").style.display = "none";
    document.getElementById("u5r1").style.display = "none";
    document.getElementById("plusR1").style.display = "none";
    document.getElementById("noneR1").style.display = "none";
  } else if(data.pl == 4 && data.room == '1'){
    document.getElementById("u1r1").style.display = "block";
    document.getElementById("u2r1").style.display = "block";
    document.getElementById("u3r1").style.display = "block";
    document.getElementById("u4r1").style.display = "block";
    document.getElementById("u5r1").style.display = "none";
    document.getElementById("plusR1").style.display = "none";
    document.getElementById("noneR1").style.display = "none";
  }else if(data.pl == 5 && data.room == '1'){
    document.getElementById("u1r1").style.display = "block";
    document.getElementById("u2r1").style.display = "block";
    document.getElementById("u3r1").style.display = "block";
    document.getElementById("u4r1").style.display = "block";
    document.getElementById("u5r1").style.display = "block";
    document.getElementById("plusR1").style.display = "none";
    document.getElementById("noneR1").style.display = "none";
  } else if(data.pl > 5 && data.room == '1'){
    document.getElementById("u1r1").style.display = "block";
    document.getElementById("u2r1").style.display = "block";
    document.getElementById("u3r1").style.display = "block";
    document.getElementById("u4r1").style.display = "block";
    document.getElementById("u5r1").style.display = "block";
    document.getElementById("plusR1").style.display = "block";
    document.getElementById("noneR1").style.display = "none";
  }

  else if(data.pl == 0 && data.room == '2'){
    document.getElementById("u1r2").style.display = "none";
    document.getElementById("u2r2").style.display = "none";
    document.getElementById("u3r2").style.display = "none";
    document.getElementById("u4r2").style.display = "none";
    document.getElementById("u5r2").style.display = "none";
    document.getElementById("plusR2").style.display = "none";
    document.getElementById("noneR2").style.display = "block";
  } else if(data.pl == 1 && data.room == '2'){
    document.getElementById("u1r2").style.display = "block";
    document.getElementById("u2r2").style.display = "none";
    document.getElementById("u3r2").style.display = "none";
    document.getElementById("u4r2").style.display = "none";
    document.getElementById("u5r2").style.display = "none";
    document.getElementById("plusR2").style.display = "none";
    document.getElementById("noneR2").style.display = "none";
  } else if(data.pl == 2 && data.room == '2'){
    document.getElementById("u1r2").style.display = "block";
    document.getElementById("u2r2").style.display = "block";
    document.getElementById("u3r2").style.display = "none";
    document.getElementById("u4r2").style.display = "none";
    document.getElementById("u5r2").style.display = "none";
    document.getElementById("plusR2").style.display = "none";
    document.getElementById("noneR2").style.display = "none";
  } else if(data.pl == 3 && data.room == '2'){
    document.getElementById("u1r2").style.display = "block";
    document.getElementById("u2r2").style.display = "block";
    document.getElementById("u3r2").style.display = "block";
    document.getElementById("u4r2").style.display = "none";
    document.getElementById("u5r2").style.display = "none";
    document.getElementById("plusR2").style.display = "none";
    document.getElementById("noneR2").style.display = "none";
  } else if(data.pl == 4 && data.room == '2'){
    document.getElementById("u1r2").style.display = "block";
    document.getElementById("u2r2").style.display = "block";
    document.getElementById("u3r2").style.display = "block";
    document.getElementById("u4r2").style.display = "block";
    document.getElementById("u5r2").style.display = "none";
    document.getElementById("plusR2").style.display = "none";
    document.getElementById("noneR2").style.display = "none";
  }else if(data.pl == 5 && data.room == '2'){
    document.getElementById("u1r2").style.display = "block";
    document.getElementById("u2r2").style.display = "block";
    document.getElementById("u3r2").style.display = "block";
    document.getElementById("u4r2").style.display = "block";
    document.getElementById("u5r2").style.display = "block";
    document.getElementById("plusR2").style.display = "none";
    document.getElementById("noneR2").style.display = "none";
  } else if(data.pl > 5 && data.room == '2'){
    document.getElementById("u1r2").style.display = "block";
    document.getElementById("u2r2").style.display = "block";
    document.getElementById("u3r2").style.display = "block";
    document.getElementById("u4r2").style.display = "block";
    document.getElementById("u5r2").style.display = "block";
    document.getElementById("plusR2").style.display = "block";
    document.getElementById("noneR2").style.display = "none";
  }
}

function notify1p(){ //close toast on click
  document.getElementById('p1toast').style.animation = "toastanim-rev 0.5s ease normal forwards"
  copyLink = document.getElementById("pageLink");
  copyLink.select();
  copyLink.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

function notify1p_show(){ //open toast
  document.getElementById('p1toast').style.animation = "toastanim 0.5s ease normal forwards"
  toastBool = true;
}

function notify1p_hide(){ //close toast on new user connection
  document.getElementById('p1toast').style.animation = "toastanim-rev 0.5s ease normal forwards"
  toastBool = false;
}
