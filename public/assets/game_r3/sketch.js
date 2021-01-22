let socket = io();

var audio = document.getElementById('myaudio');
var roomname = "3";
var playerIn = true;
var palette = [
  {r: 3, g: 196, b: 216 },
  {r: 0, g: 146, b: 255 },
  {r: 151, g: 71, b: 214 },
  {r: 178, g: 0, b: 114 },
  {r: 234, g: 31, b: 109 },
  {r: 255, g: 80, b: 51 },
  {r: 255, g: 103, b: 0 }
];
var audioIsPlaying = false;
var sc = 0;

let beatmap = [];
let beatmapLength;
let beatDuration = 1.5;
let beatSize = 65;
let beatInputDelay = 0.2;
let mouseCursorSize = 50;
let spacebarBool = false;
let hitBool = false;
let currentBeat = 0;
let haloBlur = 10;
let songTime;
let songPercent;
let songStarted = false;
let inputColor = "rgba(0,146,255,1)";
let inputSize = 20; //mouse collision area is an n pixel square around mouseX and mouseY

let sliderImg = [];
let sliderInputImg = [];

//riflessione
var myCursor0;
var myCursor1;
var myCursor2;
var myCursor3;
var myCursor4;
var myCursor5;
var myCursor6;
var myCursor7;
var clickEffect = [];
var particles = []; //particelle che si propagano al click

//
let sliderSizeX = [
  352, //1
  272, //2
  392, //3
  591, //4
  352, //5
  472, //6
  671, //7
  398, //8
  631, //9
  551, //10
  551, //11
  472, //12
  381, //13
  408, //14
  552, //15
  631, //16
  631 //17
];
let sliderSizeY = [
  233, //1
  314, //2
  570, //3
  554, //4
  397, //5
  513, //6
  313, //7
  399, //8
  273, //9
  353, //10
  362, //11
  393, //12
  473, //13
  473, //14
  358, //15
  432, //16
  432 //17
]

function preload(){
  clap = loadSound("/assets/sounds/botto3.wav");
  whist = loadSound("/assets/sounds/fischio.wav");
  roll = loadSound("/assets/sounds/scintilla.wav");
  data = loadJSON("/assets/game_r1/beatmap.json");
  beatImg = loadImage('/assets/images/gm/r1/beat.png');
  spinImg = loadImage('/assets/images/gm/r1/spin.png');
  for (let i = 1; i <= 17; i++){
    sliderImg.push(loadAnimation('/assets/images/gm/r1/slider'+i+'.png', '/assets/images/gm/r1/slider'+i+'-input.png'));
  }

  roll.setVolume(0.6);
  clap.setVolume(0.9);
  whist.setVolume(0.3);
}

function setup() {
  frameRate(60);

  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);

  //riflessione
  myCursor0 = new myCursor(255, 255, 255);
  myCursor1 = new myCursor(3, 196, 216);
  myCursor2 = new myCursor(0, 146, 255);
  myCursor3 = new myCursor(151, 71, 214);
  myCursor4 = new myCursor(178, 0, 114);
  myCursor5 = new myCursor(234, 31, 109);
  myCursor6 = new myCursor(255, 80, 51);
  myCursor7 = new myCursor(255, 103, 0);

  createBeatmap();
}

function createBeatmap(){
  //build beatmap
  for (let i = 0; i < data.beats.length; i++) {
    addBeats(
      i,
      data.beats[i].time,
      data.beats[i].timeEnd,
      data.beats[i].type,
      data.beats[i].sliderType,
      data.beats[i].posX,
      data.beats[i].posY,
      data.beats[i].endX,
      data.beats[i].endY,
      data.beats[i].cornerX,
      data.beats[i].cornerY,
    );
  }
}

function draw() {
  background('#0F1122');
  noCursor();


  if (playerIn == true) {
    drawSprites();

    //run beatmap
    for(let i = 0; i < beatmap.length; i++) {
        beatmap[i].run();
    }

    translate(width / 2, height / 2);

    myCursor0.update();
    myCursor0.display();

    push();
    rotate(45);
    myCursor1.update();
    myCursor1.display();
    pop();

    push();
    rotate(90);
    myCursor2.update();
    myCursor2.display();
    pop();

    push();
    rotate(135);
    myCursor3.update();
    myCursor3.display();
    pop();

    push();
    rotate(180);
    myCursor4.update();
    myCursor4.display();
    pop();

    push();
    rotate(225);
    myCursor5.update();
    myCursor5.display();
    pop();

    push();
    rotate(270);
    myCursor6.update();
    myCursor6.display();
    pop();

    push();
    rotate(315);
    myCursor7.update();
    myCursor7.display();
    pop();

    if (hitBool) {
       myCursor0.displayColor();
       for (var i = 0; i < random(0, 80); i++) { //quantità particelle
          particles.push(new particelle((mouseX + random(-15, 15)), mouseY + random(-15, 15)));
       }
       var circle = new circles();
       clickEffect.push(circle);

       if (clickEffect.length > 3) { // per far sparire i cerchi dopo un tot
        clickEffect.splice(0, 1);
       }
    } else {
       myCursor0.display();
    }

    for (var i = 0; i < clickEffect.length; i++) {
      var circle = clickEffect[i];
      circle.display();
    }

    for (var i = 0; i < particles.length; i++) {
       particles[i].update();
       particles[i].render();
       if (particles[i].particlesIsFinished()) {
          particles.splice(i, 1);
       }
    }

    if (frameCount % 60 == 0) {
      sc++;
    }
    if (sc >= 1 && audioIsPlaying == false) {
      audio.play();
      audioIsPlaying = true;
    }

  } else {
    if (audioIsPlaying == true) {
      audio.pause();
      audioIsPlaying = false;
      // sc = 0;
    }
  }

  if (audio.currentTime > 0) {
    songTime = audio.currentTime;
    songPercent = songTime / (audio.duration);
  }

  if(audio.ended){ //loop song and beatmap
    beatmap.length = 0; //clear beatmap array after song ends
    createBeatmap();
    //currentBeat = 0;
    audio.play();
  }

}

function circles() {
  this.x = mouseX - width / 2;
  this.y = mouseY - height / 2;
  this.dim = 0;
  this.opacity = 200;

  this.display = function() {
    this.dim += 10;
    this.opacity -= 10;

    noFill()
    strokeWeight(3);
    stroke(255, 255, 255, this.opacity);
    ellipse(this.x, this.y, this.dim);
  }
}


// __ Sockets Listeners __

socket.on("connect", newPlayerConnected);
socket.on("playerJoined", myPlayerJoined);
socket.on("playerLeft", myPlayerLeft);

function newPlayerConnected() {
  console.log("game_r3 id:", socket.id);
  socket.emit('subscribe', roomname);
}

function myPlayerJoined() {
  playerIn = true;
}

function myPlayerLeft() {
  playerIn = false;
}



class myCursor {
   constructor(temp_r, temp_g, temp_b) {
   this.x = mouseX - width / 2;
   this.y = mouseY - height / 2;
   this.size = 50;
   this.history = [];
   this.r = temp_r;
   this.g = temp_g;
   this.b = temp_b;
   }
   update() {
      var prevPos = {
         x: mouseX - width / 2,
         y: mouseY - height / 2
      }
      this.history.push(prevPos);

      if (this.history.length > 40) {
         this.history.splice(0, 1);
      }
   }

   display() {
     push();
      noStroke();
      for (var i = 0; i < this.history.length; i++) {
         fill(this.r, this.g, this.b, 50);
         ellipse(this.history[i].x, this.history[i].y, i / 1.5);
      }
    pop();
   }

   displayColor() {
    push();
      noStroke();

      for (var i = 0; i < this.history.length; i++) {
         fill(255,255,255, 50);
         ellipse(this.history[i].x, this.history[i].y, i / 1.5);
      }
    pop();
   }
}

// classe particelle che si propagano al click
class particelle {
  constructor(x, y) {
    this.x = x - width / 2;
    this.y = y - height / 2;
    this.speed = 3;
    this.gravity = 0.1;
    this.diameter = (dist(x, y, mouseX, mouseY)) * 0.7;

    this.ax = random(-this.speed, this.speed);
    this.ay = random(-this.speed, this.speed);
    this.colour = color(255,255,255, random(1, 150));
  }

  update() {
    this.diameter = this.diameter - 0.3;
    this.x += this.ax;
    this.y += this.ay;

    this.x += random(-this.speed / 2, this.speed / 2);
    this.y += random(-this.speed / 2, this.speed / 2);
  }

  particlesIsFinished() {
    if (this.diameter < 0) {
      return true;
    }
  }

  render() {
    push();
    noStroke();
    if (this.diameter > 0) {
      fill(this.colour);
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }
pop();
  }
}



//create beat istances calling the class
function addBeats(id, time, timeEnd, type, sliderType, posX, posY, endX, endY, cornerX, cornerY) {
  const newBeat = new Beat(id, time, timeEnd, type, sliderType, posX, posY, endX, endY, cornerX, cornerY)
  beatmap.push(newBeat);
  beatmapLength = beatmap.length;
}


class Beat {
  constructor(id, time, timeEnd, type, sliderType, posX, posY, endX, endY, cornerX, cornerY) {
    this.id = id;
    this.time = time;
    this.timeEnd = timeEnd;
    this.type = type;
    this.sliderType = sliderType;
    this.posX = width/2+posX*width/20;
    this.posY = height/2-posY*height/20;
    this.endX = width/2+endX*width/20;
    this.endY = height/2-endY*height/20;
    this.cornerX = width/2+cornerX*width/20;
    this.cornerY = height/2-cornerY*height/20;


    this.beatStatus = null;
    this.countPercent = 0;
    this.count = 0;
    this.countPercentEnd = 0;
    this.countEnd = 0;
    this.timePercent = this.time/(audio.duration);

    this.beatHit = false;
    this.spriteLoaded = false;

    this.whistleFX = false;
  }

  displayBeat() { //builds the beat visualization
    this.animColor = "rgba(255,255,255,"+map(this.count*beatSize/(beatDuration*60), 20, 65, 0, 1, true) + ")"
    this.animEndColor = "rgba(255,255,255,"+map(this.countEnd*beatSize/(beatDuration*60), 20, 65, 0, 1, true) + ")"
    this.fixedColor = "rgba(255,255,255,"+map(this.id-currentBeat, 0, 4, 1, 0, true) + ")"
    this.lineColor = "rgba(255,255,255,"+map(this.id-currentBeat, 0, 3, 1, 0, true)/3 + ")"

    //line
    push();
      strokeWeight(3);
      stroke(this.lineColor);
      drawingContext.setLineDash([12, 12]);
      if (this.id > 0){
        if (beatmap[this.id-1].type != 'beat' && songTime <= beatmap[this.id-1].timeEnd + beatInputDelay){ //serve line to ending point of slider or just regular position of beat
          line(this.posX, this.posY, beatmap[this.id-1].endX, beatmap[this.id-1].endY);
        }
        else if (songTime <= beatmap[this.id-1].time + beatInputDelay){line(this.posX, this.posY, beatmap[this.id-1].posX, beatmap[this.id-1].posY);}
      }
    pop();

    //beat anim circle
    push();
      noFill();
      // stroke(this.animColor);
      stroke(this.animColor);
      strokeWeight(2);
      if (this.type == 'beat'){
        if (this.count >= 40){
          ellipse(this.posX, this.posY, this.countPercent);}
      }
      else{
        if (this.type == 'spin'){
          //ellipse(this.posX, this.posY, map(this.countPercent, 207, beatSize/3, 207*3, 207));
          this.endX = this.posX;
          this.endY = this.posY;
          push();
            imageMode(CENTER);
            translate(this.posX, this.posY);
            rotate(frameCount*3+this.countPercentEnd);
            drawingContext.setLineDash([10, 10]);
            strokeWeight(4);
            stroke('white');
            if(this.countPercentEnd == 0){
              ellipse(0, 0, 200);
            }
            else{
              ellipse(0, 0, this.countPercentEnd);
            }
            translate(-this.posX, -this.posY);
          pop();
        }
        else{
          if (this.count >= 40 && songTime <= this.time+beatInputDelay){
            ellipse(this.posX, this.posY, this.countPercent);}
          if (this.countEnd >= 40 && songTime < this.timeEnd+beatInputDelay){
            stroke(this.animEndColor);
            if(songTime >= this.timeEnd){
              ellipse(this.endX, this.endY, beatSize);
            }
            else{
              ellipse(this.endX, this.endY, this.countPercentEnd);}
            }
        }
      }
    pop();
  }

  userBeatInput(){
    if (this.beatCollide && songTime >= this.time - beatInputDelay){
      this.beatHit = true;
    }
  }

  userSliderInput(){
    if (this.beatCollide){
      push();
        drawingContext.shadowBlur = haloBlur;
        drawingContext.shadowColor = inputColor;
        push();
          noFill();
          strokeWeight(4);
          stroke(inputColor);
          fill("rgba(0,146,255,0.2)");
          ellipse(mouseX, mouseY, beatSize);
        pop();
        this.beatSprite.animation.changeFrame(1)
      pop();
      if(songTime >= this.time - beatInputDelay){
        this.beatHit = true;
        if (!roll.isPlaying()){roll.play();}
      }
      else if(!this.beatCollide && roll.isPlaying()){roll.stop();}
    }
  }

  userSpinInput(){
    if (this.beatCollideMain){
      if(songTime >= this.time - beatInputDelay){
        push();
          strokeWeight(4);
          stroke(inputColor);
          fill("rgba(0,146,255,0.2)");
          drawingContext.shadowBlur = haloBlur;
          drawingContext.shadowColor = inputColor;
          ellipse(this.posX, this.posY, 200);
        pop();
        this.beatHit = true;
        if (!roll.isPlaying()){roll.play();}
      }
      else if(!this.beatCollide && roll.isPlaying()){roll.stop();}
    }
  }

  run(){
    if(currentBeat == beatmapLength){currentBeat=this.id}
    if (this.spriteLoaded == false){//load the correct sprite
      if(this.type == 'beat'){
        this.beatSprite = createSprite(this.posX, this.posY);
        this.beatSprite.addImage(beatImg);
      }
      else if(this.type == 'slider'){
        this.beatSprite = createSprite(this.cornerX+sliderSizeX[this.sliderType-1]/2, this.cornerY+sliderSizeY[this.sliderType-1]/2);
        this.beatSprite.addAnimation('hit', sliderImg[this.sliderType-1]);
        this.beatSprite.animation.stop();
        this.beatSprite.animation.changeFrame(0);
        //this.beatSprite.addImage(loadImage('/assets/images/gm/r1/slider1.png'));
      }
      else if(this.type == 'spin'){
        this.beatSprite = createSprite(this.posX, this.posY);
        this.beatSprite.addImage(spinImg);
      }
      this.spriteLoaded = true;
    }
    this.beatSprite.visible = false;

    //check collision on 4 points arount the pointer (allows for more forgiving inputs)
    this.beatCollideA = this.beatSprite.overlapPixel(mouseX+inputSize, mouseY+inputSize);
    this.beatCollideB = this.beatSprite.overlapPixel(mouseX-inputSize, mouseY+inputSize);
    this.beatCollideC = this.beatSprite.overlapPixel(mouseX-inputSize, mouseY-inputSize);
    this.beatCollideD = this.beatSprite.overlapPixel(mouseX+inputSize, mouseY-inputSize);
    this.beatCollideMain = this.beatSprite.overlapPixel(mouseX, mouseY);
    if (this.beatCollideA || this.beatCollideB || this.beatCollideC || this.beatCollideD || this.beatCollideMain){
      this.beatCollide = true;
    }
    else{this.beatCollide = false}

    //run beats
    if (this.type == 'beat'){
      if (songTime >= this.time - beatDuration && songTime <= this.time + beatInputDelay){ //display beats in the allocated time slot
        this.beatSprite.visible = true;
        this.displayBeat();
        if (songTime <= this.time){ //manage animated external circle
          this.count += 1;
          this.countPercent = map(this.count*beatSize/(beatDuration*60), 0, beatSize, beatSize*5, beatSize);
        }
        if (hitBool && currentBeat == this.id){ //if user inputs command through either mouse or SPACEBAR
          this.userBeatInput();
        }
      }
      if (this.beatHit && currentBeat == this.id || songTime > this.time + beatInputDelay && currentBeat == this.id){
        //deactivate the next beats until the current one is cleared or expired
        //this.beatSprite.remove()
        currentBeat = this.id + 1
      }
      if (songTime <= this.time + beatInputDelay && this.beatHit){ //show hit feedback
        push();
          strokeWeight(4);
          stroke(inputColor);
          fill("rgba(0,146,255,0.2)");
          drawingContext.shadowBlur = haloBlur;
          drawingContext.shadowColor = inputColor;
          ellipse(this.posX, this.posY, beatSize);
        pop();
      }
    }
    //run sliders & spinners
    else{
      if (songTime >= this.time - beatDuration && songTime <= this.timeEnd + beatInputDelay){ //display beats in the allocated time slot
        if (this.type == 'spin'){this.countEndBehavior = this.time}
        else {this.countEndBehavior = this.timeEnd-beatDuration}
        if (songTime <= this.time && this.type == 'slider'){ //manage animated external circle
          this.count += 1;
          this.countPercent = map(this.count*beatSize/(beatDuration*60), 0, beatSize, beatSize*5, beatSize);
        }
        if (songTime <= this.timeEnd+beatInputDelay && songTime >= this.countEndBehavior){ //manage animated external circle
          this.countEnd += 1;
          if(this.type == 'spin'){
            this.countPercentEnd = map(this.countEnd*beatSize/((this.timeEnd-this.time)*60), 0, beatSize, 200, beatSize/3, true);
          }
          else{ //this.type == 'slider'
            this.countPercentEnd = map(this.countEnd*beatSize/((beatDuration)*60), 0, beatSize, beatSize*5, beatSize, true);
          }
        }
        this.displayBeat();
        this.beatSprite.visible = true;
        if (hitBool && currentBeat == this.id){ //if user inputs command through either mouse or SPACEBAR
          if(this.type == 'slider'){ //slider input
            this.beatSprite.animation.changeFrame(0);
            this.userSliderInput();
          }
          else{ //spin input
            this.userSpinInput();
          }
        }
      }
      if (songTime > this.timeEnd + beatInputDelay && currentBeat == this.id){ //deactivate the next beats until the current one is cleared or expired
        //this.beatSprite.remove()
        currentBeat = this.id + 1
      }
      if (songTime <= this.time + beatInputDelay && this.beatHit && this.type == 'slider'){ //show hit feedback on sliders
        push();
          strokeWeight(4);
          stroke(inputColor);
          fill("rgba(0,146,255,0.2)");
          drawingContext.shadowBlur = haloBlur;
          drawingContext.shadowColor = inputColor;
          ellipse(this.posX, this.posY, beatSize);
        pop();
      }
    }

    if (songTime >= this.timeEnd-beatInputDelay && this.type != 'beat' && this.beatHit && !this.whistleFX && roll.isPlaying() && currentBeat == this.id){
      whist.play();
      roll.stop();
      this.whistleFX = true;
    }

  }
}


function keyTyped(){ //spacebar input
  if (keyCode === 32 && spacebarBool == false){
    clap.play();
    spacebarBool = true;
    hitBool = true;
    return 'SPACE';

  }
}

function keyReleased(){
  if (keyCode === 32 && spacebarBool){
    roll.stop();
    spacebarBool = false;
    keyCode = null;
    hitBool = false;
  }
}

function mousePressed(){ //mouse input
    clap.play();
    hitBool = true;

  //riflessione
  if (hitBool == true) {

     for (var i = 0; i < random(0,80); i++) { //quantità particelle(100, 800)
       particles.push(new particelle((mouseX + random(-20, 20)), mouseY + random(-20, 20))); //area posizione iniziale particelle
     }

     if (clickEffect.length > 3) { //per far sparire i cerchi dopo un tot
       clickEffect.splice(0, 1);
     }
  }
}

function mouseReleased() {
  roll.stop();
  hitBool = false;
}
