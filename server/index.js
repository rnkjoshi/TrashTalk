const express = require('express');
const HTTP = require('http');
const socketio = require('socket.io');
const port = process.env.port || 5000;
const app = express();
const router = require("./router")
const server = HTTP.createServer(app);
const io = socketio(server);
const {addUser,removeUser,getUser,getUserInRoom} = require("./users")
io.on('connection',(socket)=>{
    console.log("we have a new connection!!");
    socket.on('onJoin', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        // if(error) return callback(error);
        console.log(user);
        socket.join(user.room);
        
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    
        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
        //callback();
      });

    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message',{user:user.name,text:message});
        io.to(user.room).emit('roomData',{room:user.room,users:getUserInRoom(user.room)});
        
        callback();
    });

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`})
        }
    })
})

app.use(router);

server.listen(port,()=>{
    console.log(`server has startes at port ${port}`);
})