var express = require("express");
var app = express();
var server = app.listen(8888, listen);
app.use(express.static("public"));

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('write.io server listening at http://' + host + ':' + port);
}

var io = require("socket.io")(server);
fs = require("fs");

io.sockets.on("connection", function (socket) {
  socket.on("save",function (data) {
    saveFile(data.filename, data.text);
  });
  socket.on("get",function (filename) {
    var text = "";
    fs.readFile("files/"+filename+".txt", function (err, data) {
      if (err) {
        console.log("error while reading file" + err);
      } else {
        text = ab2str(data);
        io.to(socket.id).emit("push", text);
      }
    });
  });
});



// UTILITY FUNCTIONS

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function saveFile(filename, text) {
  fs.writeFile("files/"+filename+".txt", text, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });
}
