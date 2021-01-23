// load express library
let express = require("express");

// create the app
let app = express();

// define the port where client files will be provided
let port = process.env.PORT || 3000;

// start to listen to that port
let server = app.listen(port);

// provide static access to the files in the "public" folder
app.use(express.static("public"));

// load socket library
let socket = require("socket.io");

// create a socket connection
let io = socket(server);

// variables
var ctr = 0;
var usersAr = [];

// socket connection
io.on("connection", function (socket) {
  // create an array with all the socket ids
  usersAr.push(socket.id);

  // check if the the player is the first one to connect
  // and starts the streaming of the music
  if (ctr == 2) {
    socket.emit("first", "first");
  }
  ctr++;

  // when a player joins a room from the landing page send the message
  // to the sketch to activate its cursor, music and beatmap
  socket.on("join", function(data) {
    userIndex = usersAr.indexOf(data.id);
    userIndex = userIndex + 2;
    userId = usersAr[userIndex];
    socket.to(userId).emit("playerJoined", "playerJoined");
  });

  // join the selected room
  socket.on('subscribe', function (room) {
    socket.join(room);
  });

  // receive the time of the track and send it to every player in that room
  socket.on("where", function (data) {
    console.log(data);
    io.to(data.room).emit("current", data.times);
  });

  // // receive the signal to play the song and emit it
  // socket.on("play", function (data) {
  //   userId = data.id
  //   var trackTime = {
  //     times: data.times,
  //   }
  //   io.to(userId).emit("playsong", trackTime);
  // });

  // check the mouse position and send it to each player in a room
  socket.on("mouse", function(data) {
    var mouseData = {
      x: data.x,
      y: data.y,
      width: data.width,
      height: data.height,
      id: socket.id,
      room: data.room,
    }
    socket.to(data.room).emit("mouseBroadcast", mouseData);
  });

  // receive the number of player connected to a room and send it to the lp
  socket.on("countPlayers", function(data) {
    var playersData = {
      pl: data.pl,
      room: data.room,
    }
    socket.broadcast.emit("playersNumber", playersData);
  });

  // send the message to the lp to close the tutorial
  socket.on("fineTutorial", function(data) {
    var chiudiBenvenuto = {
      wf: data.wf,
    }
    userIndex = usersAr.indexOf(data.id);
    userIndex = userIndex - 1;
    userId = usersAr[userIndex];
    socket.to(userId).emit("closeWelcome", chiudiBenvenuto);
  });

  // send the message to remove the cursor and stop the music and beatmap
  socket.on("leave", function(data) {
    userIndex = usersAr.indexOf(data.id);
    userIndex = userIndex + 2;
    userId = usersAr[userIndex];
    var cursorId = {
      id: userId,
    }
    socket.to(userId).emit("playerLeft", "playerLeft");
    socket.broadcast.emit("deleteCursor", cursorId);
  });

  // player disconnected
  socket.on("disconnect", function() {
    var socketData = {
      id: socket.id,
    }
    socket.broadcast.emit("deleteCursor", socketData);
    ctr--;
  });

});


console.log("node server is running");
