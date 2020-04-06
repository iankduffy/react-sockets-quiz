const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = express.Router();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { questions } = require('./getQuestion');


app.use(cors());

app.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('getQuestion', () => {
    console.log({questions})
    socket.emit('getQuestion', questions);    
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

app.use(express.static("../dist"));
app.use(express.static("../dist"));

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));