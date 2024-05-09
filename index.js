const express = require("express");
const socket = require("socket.io");
const http = require("http");
const app = express();

const PORT = 3000;
const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  socket.on("connect", (data) => {
    console.log(` ${data} connected`);
    io.emit(messages);
  });

  socket.on("message", (data) => {
    messages.push(data);
    messages.map((msg) => {
      console.log("name: ", msg.name, "message: ", msg.message);
    });
    io.emit("message", data);
  });

  socket.on("disconnect", (data) => {
    console.log(`${data} disconnected`);
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
