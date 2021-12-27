const express = require("express");
const app = express();
const http = require('http');
const { stringify } = require("querystring");
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const PORT = 8000;
const socket = require('socket.io');


io.use((socket, next)=>{
	console.log(socket.handshake.headers.auth);
	next();
})

io.on('connection', (socket)=>{
	console.log(`user ${socket.id} connected `);
	// socket.on('message', (str)=>{console.log(str + "from User " + socket.id)});
	socket.on('message', (message)=>{
		io.emit('message', "Sent from Sever " + message);
	});
	socket.on('disconnect', ()=>{
		console.log(`user ${socket.id} disconnected `);
	})
})

server.listen(PORT, ()=> console.log(`Server Listening on Port ${PORT}`));