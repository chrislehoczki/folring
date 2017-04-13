var socketioJwt = require('socketio-jwt');
var socketIo = require('socket.io');

import { db_joinRoom, db_leaveRoom, db_updateRoomGame } from '../controllers/room';

module.exports = function socketSetup(server) {

	var sio = socketIo.listen(server);

	sio.sockets
  	.on('connection', socketioJwt.authorize({
	    secret: process.env.SECRET,
	    timeout: 15000 // 15 seconds to send the authentication message
		  })).on('authenticated', function(socket) {
		    //this socket is authenticated, we are good to handle more events from it.
		    const userId = socket.decoded_token.sub;
		    console.log('hello! ' + JSON.stringify(socket.decoded_token));

		    socket.on('join_room', (config) => joinRoom(socket, config));

		    socket.on('leave_room', (config) => leaveRoom(socket, config));  

		    socket.on('update_room_game', (config) => updateRoomGame(socket, config));
		  });





function joinRoom(socket, {roomId, role}) {
	const userId = socket.decoded_token.sub;
	socket.join(roomId);
	db_joinRoom({userId, role, roomId})
		.then((room) => {
			console.log('EMITTING UPDATE ROOM', room)
			sio.to(room._id).emit('update_current_room', {players: room.players, spectators: room.spectators});
		})
		.catch((err) => {
			// socket.emit('err', 'error joining room');
			console.log('err')
		})

}

function leaveRoom(socket, {roomId, role}) {
	const userId = socket.decoded_token.sub;
	socket.leave(roomId);
	db_leaveRoom({userId, role, roomId})
		.then((room) => {
			console.log("ROOM INFO", room)
			sio.to(room._id).emit('update_current_room', {players: room.players, spectators: room.spectators});
		})
		.catch((err) => {
			// socket.emit('err', 'error joining room');
			console.log(err);
		})
}

function updateRoomGame(socket, {roomId, game}) {
	const userId = socket.decoded_token.sub;
	db_updateRoomGame({userId, roomId, game})
		.then((room) => {
			console.log(room)
			sio.to(room._id).emit('update_current_room', {game: game.game});
		})
		.catch((err) => {
			// socket.emit('err', 'error joining room');
			console.log(err);
		})

}
}
