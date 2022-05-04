const express = require("express");

const http = require("http");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const port = 4801;

const obj = {
  name: "",
  message: "",
  time: new Date().toLocaleTimeString(),
};

app.use(express.static("public"));

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("message", (msg) => {
    console.log(msg);
    obj.message = msg.message;
    obj.name = msg.nickname;
    io.emit("message", obj);
  });
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});

server.on("error", (err) => {
  console.log("Error: " + err);
});
