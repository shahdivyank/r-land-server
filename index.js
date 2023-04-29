const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    socket.join(room);
  });

  socket.on("leave", (room) => {
    socket.leave(room);
  });

  socket.on("games", (msg) => {
    console.log(socket.rooms, "GOT GAMES MESSAGE", msg);
    socket.to("RANDOM ROOM ID").emit("games", msg);
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
