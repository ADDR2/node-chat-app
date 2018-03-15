const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const Users = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('createMessage', ({ text }, callback) => {
        const user = users.getUser(socket.id);

        if(user && isRealString(text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, text));
        }

        callback();
    });

    socket.on('join', ({ name = '', room = '' }, callback) => {
        if(!isRealString(name) || !isRealString(room))
            callback('Name and room name are required.');
        else {
            socket.join(room);
            users.removeUser(socket.id);
            users.addUser(socket.id, name, room);
            // socket.leave(room);

            io.to(room).emit('updateUserList', users.getUserList(room));
            socket.emit('newMessage', generateMessage('Admin', "Welcome to the chat app"));
            socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined.`));


            // io.to(room).emit
            // socket.broadcast.to(room).emit

            callback();
        }
    });

    socket.on('createLocationMessage', coords => {
        const user = users.getUser(socket.id);

        if(user) io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords));
    });

    socket.on('disconnect', () => {
        const userDeleted = users.removeUser(socket.id);

        if(userDeleted){
            io.to(userDeleted.room).emit('updateUserList', users.getUserList(userDeleted.room));
            io.to(userDeleted.room).emit('newMessage', generateMessage('Admin', `${userDeleted.name} has left.`));
        }
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`);
});