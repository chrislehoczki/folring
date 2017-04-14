var socketioJwt = require('socketio-jwt');
var socketIo = require('socket.io');

import { db_joinRoom, db_leaveRoom, db_updateRoomGame, db_restartRoomGame } from '../controllers/room';
import { checkGameWin } from '../controllers/game';
import { addLoss, addWin } from '../controllers/user';

module.exports = function socketSetup(server) {

	var sio = socketIo.listen(server);

	sio.sockets
  	.on('connection', socketioJwt.authorize({
	    secret: process.env.SECRET,
	    timeout: 15000 // 15 seconds to send the authentication message
		  })).on('authenticated', function(socket) {
  			socket._id = socket.decoded_token.sub; 
  			console.log(socket);
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
		.then(({room, user}) => {

			// console.log(Object.keys(sio.sockets.adapter.rooms["ROOM_NAME"].sockets));

			
			// socket.to(<socketid>).emit('hey', 'I just met you');

			// update user
			socket.emit('update_user', user)	
			// update room
			sio.to(room._id).emit('update_current_room', {players: room.players, spectators: room.spectators});
		})
		.catch((err) => {
			// socket.emit('err', 'error joining room');
			console.log(err)
		})

}

function leaveRoom(socket, {roomId, role}) {
	const userId = socket.decoded_token.sub;
	socket.leave(roomId);
	db_leaveRoom({userId, role, roomId})
		.then(({room, user}) => {
			// update user
			socket.emit('update_user', user);
			// update room
			sio.to(room._id).emit('update_current_room', {players: room.players, spectators: room.spectators, game: room.game});
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
			// update room
			sio.to(room._id).emit('update_current_room', {game: game.game});
			// check for game win
			const winner = checkGameWin(game.game.board);
			if (!winner) {
				console.log('NO WINNER');
			} else {
				sio.to(room._id).emit('notification_win', { winner });
				let winnerId, loserId;
				if (winner === 'black') {
					winnerId = room.players[0]._id;
					loserId = room.players[1]._id;
				} else {
					winnerId = room.players[1]._id;
					loserId = room.players[0]._id;
				}

				// need to find way to send to both players in the room - not just the one sending the data
				storeGameWin(socket, { roomId, winnerId, loserId })
					.then((data) => {

						// console.log(sio.sockets.in(roomId))
						const socketIds = Object.keys(sio.sockets.in(roomId));

						socketIds.forEach((socketId, i) => {

							const socket = sio.sockets.in(roomId)[socketId];
							console.log("SOCKET " + i, socket._id)
							if (socket._id === winnerId) {
								console.log('WINNER SOCKET', socket);
							}
							if (socket._id === loserId) {
								console.log("LOSER SOCKET", socket);
							}
						})
						// const { sockets, length } = sio.sockets.adapter;
						// console.log(JSON.stringify(sio.sockets.adapter.sockets))
						
						// if (JSON.stringify(userId) === JSON.stringify(winnerId)) {
						// 	console.log("WON")
						// 	socket.emit('update_user', data[0]);
						// 	socket.emit('notification', 'You won');
						// } else {
						// 	console.log("LOST")
						// 	socket.emit('notification', 'You lost');
						// 	socket.emit('update_user', data[1]);
						// }

						// refresh the room back to 0
						sio.to(room._id).emit('update_current_room', data[2]);
						
					})
					.catch((err) => {
						console.log(err);
					})
			}
			
		})
		.catch((err) => {
			// socket.emit('err', 'error joining room');
			console.log(err);
		})

}

function storeGameWin(socket, {roomId, winnerId, loserId}) {
		const promises = [addWin(winnerId), addLoss(loserId), db_restartRoomGame({roomId})];

		return new Promise((resolve, reject) => {
			Promise.all(promises).then((data) => {
				resolve(data)
			}).catch((err) => {
				reject(err);
			});

		})
		
}

}


