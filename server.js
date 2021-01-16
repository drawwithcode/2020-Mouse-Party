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

io.on("connection", function (socket) {

  if (ctr == 0) {
    console.log("first client: " + socket.id);
    socket.emit("first", "first");
  }

  ctr++;
  console.log(ctr);

  socket.on('subscribe',function (room) {
    socket.join(room);
  });

  socket.on("where",function (data) {
    console.log(data);
    // socket.emit("current",data.times);
    io.to(data.room).emit("current",data.times);
  });

  socket.on("play",function (data) {
    // socket.emit('playsong',data.times);
    io.to(data.room).emit('playsong',data.times);
  });

  socket.on("mouse", function(data) {
    var mouseData = {
      x: data.x,
      y: data.y,
      width: data.width,
      height: data.height,
      id: socket.id,
    }
    socket.broadcast.emit("mouseBroadcast", mouseData);
  });

  socket.on("disconnect", function() {
    var socketData = {
      id: socket.id,
    }
    socket.broadcast.emit("deleteCursor", socketData);
    ctr--;
    console.log(ctr);
  });

  // socket.on("songTime", function(data) {
  //   var timeData = {
  //     time: data.time,
  //   }
  //   console.log("time: ", timeData.time);
  //   socket.emit("timeBroadcast", timeData);
  // });

});

console.log("node server is running");
