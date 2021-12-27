const express = require("express");
const app = express();
const http = require('http');
const { stringify } = require("querystring");
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const PORT = 8000;
const socket = require('socket.io');


io.on('connection', (socket)=>{
	console.log(`user ${socket.id} connected `);
	socket.on('message', (str)=>{console.log(str + "from User " + socket.id)});
	socket.on('disconnect', ()=>{
		console.log(`user ${socket.id} disconnected `);
	})
})

server.listen(PORT, ()=> console.log(`Server Listening on Port ${PORT}`));