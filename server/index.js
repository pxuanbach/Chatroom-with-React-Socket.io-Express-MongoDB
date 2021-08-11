const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 8081

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('create-room', name => {
      console.log('Then room name received is ', name);
  })
});

server.listen(PORT, () => {
  console.log(`listening on : ${PORT}`);
});