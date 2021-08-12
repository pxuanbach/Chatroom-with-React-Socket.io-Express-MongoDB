const app = require('express')();
const http = require('http').createServer(app);
const socketio = require("socket.io");
const io = socketio(http);
const PORT = process.env.PORT || 8082
const {addUser, removeUser, getUser} = require('./helper')

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('create-room', name => {
      console.log('Then room name received is ', name);
  })
  socket.on('join', ({name, room_id, user_id}) => {
    const {error, user} = addUser({
      socket_id: socket.id,
      name,
      user_id,
      room_id
    })
    socket.join(room_id);
    if (error) {
      console.log('join error', error)
    } else {
      console.log('join user', user)
    }
  })
  socket.on('sendMessage', (message, room_id, callback) => {
    const user = getUser(socket.id);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message
    }
    console.log('message', msgToStore)
    io.to(room_id).emit('message', msgToStore);
    callback();
  })
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
  })
});

http.listen(PORT, () => {
  console.log(`listening on : ${PORT}`);
});