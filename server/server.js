const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    const dateConnection = new Date().getTime();

    socket.emit('newMessage', {
        from: 'Admin',
        text: "Welcome to the chat app",
        createdAt: dateConnection
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: "New user joined",
        createdAt: dateConnection
    });

    socket.on('createMessage', message => {
        console.log('createMessage', message);
        io.emit('newMessage', Object.assign({}, {createdAt: new Date().getTime()}, message) );
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`);
});