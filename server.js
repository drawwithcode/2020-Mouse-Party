// load express library
let express = require("express");

// create the app
let app = express();

// define the port where client files will be provided
let port = process.env.PORT || 3000;

// start to listen to that port
let server = app.listen(port);

// provide static access to the files
// in the "public" folder
app.use(express.static("public"));

// load socket library
let socket = require("socket.io");

// create a socket connection
let io = socket(server);

var ctr = 0;
var usersAr = [];

io.on("connection", function (socket) {
  usersAr.push(socket.id);

  if (ctr == 1) {
    socket.emit("first", "first");
  }
  ctr++;

  socket.on("join", function(data) {
    userIndex = usersAr.indexOf(data.id);
    userIndex = userIndex + 1;
    userId = usersAr[userIndex];
    socket.to(userId).emit("playerJoined", "playerJoined");
  });

  socket.on('subscribe', function (room) {
    socket.join(room);
  });

  socket.on("where", function (data) {
    console.log(data);
    io.to(data.room).emit("current", data.times);
  });

  socket.on("play", function (data) {
    io.to(data.room).emit("playsong", data.times);
  });

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
    // socket.broadcast.emit("mouseBroadcast", mouseData);
  });

  socket.on("countPlayers", function(data) {
    var playersData = {
      pl: data.pl,
      room: data.room,
    }
    socket.broadcast.emit("playersNumber", playersData);
  });

  socket.on("leave", function(data) {
    userIndex = usersAr.indexOf(data.id);
    userIndex = userIndex + 1;
    userId = usersAr[userIndex];
    socket.to(userId).emit("playerLeft", "playerLeft");
  });

  socket.on("disconnect", function() {
    var socketData = {
      id: socket.id,
    }
    socket.broadcast.emit("deleteCursor", socketData);
    ctr--;
  });

});


console.log("node server is running");
