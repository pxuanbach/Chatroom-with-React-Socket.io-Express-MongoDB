const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
const http = require('http').createServer(app);
const mongoose = require('mongoose');
const socketio = require('socket.io');
const io = socketio(http);
const mongoDB = "mongodb+srv://pxuanbach:094864Bach@cluster0.axgxb.mongodb.net/chat-database?retryWrites=true&w=majority"
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected'))
  .catch(err => console.log(err))
const PORT = process.env.PORT || 8082
const {addUser, removeUser, getUser} = require('./helper');
const Message = require('./models/Message');
const Room = require('./models/Room');

app.get('/set-cookies', (req, res) => {
  res.cookie('username', 'Tony');
  res.cookie('isAuthenticated', true, {maxAge: 24*60*60*1000});
  res.send('cookie are set');
})

app.get('/get-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
})

io.on('connection', (socket) => {
  console.log(socket.id);
  Room.find().then(result => {
    console.log('output-rooms: ', result)
    socket.emit('output-rooms', result)
  })
  socket.on('create-room', name => {
      //console.log('Then room name received is ', name);
      const room = new Room({name});
      room.save().then(result => {
        io.emit('room-created', result)
      })
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
    const msg = new Message(msgToStore);
    msg.save().then(result => {
      io.to(room_id).emit('message', result);
      callback();
    })
  })
  socket.on('get-messages-history', room_id => {
    Message.find({ room_id }).then(result => {
      console.log('message history', result)
        socket.emit('output-messages', result)
    })
  })
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
  })
});

http.listen(PORT, () => {
  console.log(`listening on : ${PORT}`);
});