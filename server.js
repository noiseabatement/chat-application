const express = require("express");

const http = require("http");
const { disconnect } = require("process");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const port = 4801;
const path = require("path");

let dir = path.join(__dirname, "public");

app.use(express.static(dir));


const io = socketio(server);

let onlineUserList = [];
let actualUserIds = [];

io.on("connection", (socket) => {
  socket.on("sign-up", (msg) => {
    
    //msg = obj
    //obj={name,
    //  url}

    onlineUserList.push(msg);
    console.log(msg)

    setTimeout(() => {
      io.emit("registered", onlineUserList);
    }, 1000);
  });
  socket.on("actual-user", (id) => {
    if (!actualUserIds.includes(id)) {
      actualUserIds.push(id);
    }
    io.emit("actual-user", (id, actualUserIds, onlineUserList));
    
  });
  

  socket.on("disconnect", () => {
    const index = actualUserIds.indexOf(socket.id);
    if (index > -1) {
      onlineUserList.splice(index, 1);
      actualUserIds.splice(index, 1);
      // console.log(onlineUserList);
      io.emit("registered", onlineUserList);
    }
  });
});

io.on("connection", (socket) => {
  socket.on("chat-msg", (msg) => {
    io.emit("chat-msg", msg);
  });
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});

server.on("error", (err) => {
  console.log("Error: " + err);
});

