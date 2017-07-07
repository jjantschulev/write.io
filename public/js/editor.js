var input = document.getElementById('main_text');
autosize(input);

//Socket io connection.
var socket;
socket = io("localhost:8888");
// when client recieves text data from server:
socket.on("push",function (text) {
  input.value = text;
});


var url = window.location.href
var index = url.indexOf("=") + 1;
var FILENAME = url.substring(index, url.length);

get();

//dark theme functions.
var dark_theme = true;
set_dark_theme(dark_theme);
key('⌘+⇧+l, ⌃+⇧+l', function(){
  if(dark_theme){
    dark_theme = false;
    set_dark_theme(dark_theme);
  }else{
    dark_theme = true;
    set_dark_theme(dark_theme);
  }
});
function set_dark_theme(theme) {
  if(theme){
    document.getElementById('body').style.backgroundColor = "black";
    document.getElementById('main_text').style.backgroundColor = "black";
    document.getElementById('main_text').style.color = "rgb(200,200,200)";
  }else{
    document.getElementById('body').style.backgroundColor = "white";
    document.getElementById('main_text').style.backgroundColor = "white";
    document.getElementById('main_text').style.color = "black";
  }
}

//save file
key('⌘+⇧+s, ⌃+⇧+s', function () {
  save()
})

//get file
key("g", /*'⌘+⇧+g, ⌃+⇧+g', */ function () {
  get();
})

setInterval(function () {
  save();
}, 1000);


function get() {
  filename = FILENAME;
  socket.emit("get", filename)
  console.log("get request sent for: " + filename);
}

function save() {
  data = {
    text: input.value,
    filename: FILENAME
  }
  socket.emit("save", data);
}
