'use strict';

var _room = require('../controllers/room');

var _game = require('../controllers/game');

var _user = require('../controllers/user');

var socketioJwt = require('socketio-jwt');
var socketIo = require('socket.io');

module.exports = function socketSetup(server) {

	var sio = socketIo.listen(server);

	sio.sockets.on('connection', socketioJwt.authorize({
		secret: process && process.env && process.env.SECRET || 'blahblah',
		timeout: 15000 // 15 seconds to send the authentication message
	})).on('authenticated', function (socket) {
		socket._id = socket.decoded_token.sub;
		console.log(socket);
		//this socket is authenticated, we are good to handle more events from it.
		var userId = socket.decoded_token.sub;
		console.log('hello! ' + JSON.stringify(socket.decoded_token));

		socket.on('join_room', function (config) {
			return joinRoom(socket, config);
		});

		socket.on('leave_room', function (config) {
			return leaveRoom(socket, config);
		});

		socket.on('update_room_game', function (config) {
			return updateRoomGame(socket, config);
		});

		socket.on('message', function (config) {
			return sendMessage(socket, config);
		});
	});

	function sendMessage(socket, _ref) {
		var room = _ref.room,
		    message = _ref.message,
		    user = _ref.user;

		console.log(room, message, user);
		var composedMessage = { user: user, message: message };
		sio.to(room).emit('message', composedMessage);
	}

	function joinRoom(socket, _ref2) {
		var roomId = _ref2.roomId,
		    role = _ref2.role;

		var userId = socket.decoded_token.sub;
		socket.join(roomId);
		(0, _room.db_joinRoom)({ userId: userId, role: role, roomId: roomId }).then(function (_ref3) {
			var room = _ref3.room,
			    user = _ref3.user;


			// console.log(Object.keys(sio.sockets.adapter.rooms["ROOM_NAME"].sockets));


			// socket.to(<socketid>).emit('hey', 'I just met you');

			// update user
			socket.emit('update_user', user);
			// update room
			sio.to(room._id).emit('update_current_room', { players: room.players, spectators: room.spectators });
		}).catch(function (err) {
			// socket.emit('err', 'error joining room');
			console.log(err);
		});
	}

	function leaveRoom(socket, _ref4) {
		var roomId = _ref4.roomId,
		    role = _ref4.role;

		var userId = socket.decoded_token.sub;
		socket.leave(roomId);
		(0, _room.db_leaveRoom)({ userId: userId, role: role, roomId: roomId }).then(function (_ref5) {
			var room = _ref5.room,
			    user = _ref5.user;

			// update user
			socket.emit('update_user', user);
			// update room
			sio.to(room._id).emit('update_current_room', { players: room.players, spectators: room.spectators, game: room.game });
		}).catch(function (err) {
			// socket.emit('err', 'error joining room');
			console.log(err);
		});
	}

	function updateRoomGame(socket, _ref6) {
		var roomId = _ref6.roomId,
		    game = _ref6.game;

		var userId = socket.decoded_token.sub;
		(0, _room.db_updateRoomGame)({ userId: userId, roomId: roomId, game: game }).then(function (room) {
			// update room
			sio.to(room._id).emit('update_current_room', { game: game.game });
			// check for game win
			var winner = (0, _game.checkGameWin)(game.game.board);
			if (!winner) {
				console.log('NO WINNER');
			} else {
				sio.to(room._id).emit('notification_win', { winner: winner });
				var winnerId = void 0,
				    loserId = void 0;
				if (winner === 'black') {
					winnerId = room.players[0]._id;
					loserId = room.players[1]._id;
				} else {
					winnerId = room.players[1]._id;
					loserId = room.players[0]._id;
				}

				// need to find way to send to both players in the room - not just the one sending the data
				storeGameWin(socket, { roomId: roomId, winnerId: winnerId, loserId: loserId }).then(function (data) {
					console.log('WIN DATA', data);
					// console.log(sio.sockets.in(roomId))
					// const socketIds = Object.keys(sio.sockets.in(roomId));
					// console.log("CURRENT SOCKET ID", socket._id);
					// console.log('socketIds', socketIds)

					// var namespace = '/';
					// var roomName = roomId;
					// console.log('WINNER ID', winnerId, 'LOSER ID', loserId)
					// for (var socketId in sio.nsps[namespace].adapter.rooms[roomName].sockets) {
					//     console.log('socketId', socketId);
					//     console.log("socket _id", socket._id);
					//     console.log('winner id', socket._id);
					//     console.log(socket._id.toString() == loserId.toString());
					//     console.log('socket _id equals user _id', socket._id == loserId)
					//     if (socket._id === winnerId) {
					//     	console.log('this is the winnder', socket._id)
					//     }
					//     if (socket._id === loserId) {
					//     	console.log('this is the loser', socket._id)
					//     }
					// }
					// socketIds.forEach((socketId, i) => {
					// 	console.log('WINNDER', winnerId)
					// 	console.log('LOSER', loserId)
					// 	const socket = sio.sockets.in(roomId)[socketId];
					// 	console.log("SOCKET " + i, socket._id)
					// 	if (socket._id === winnerId) {
					// 		console.log('WINNER SOCKET', socket);
					// 	}
					// 	if (socket._id === loserId) {
					// 		console.log("LOSER SOCKET", socket);
					// 	}
					// })
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
				}).catch(function (err) {
					console.log(err);
				});
			}
		}).catch(function (err) {
			// socket.emit('err', 'error joining room');
			console.log(err);
		});
	}

	function storeGameWin(socket, _ref7) {
		var roomId = _ref7.roomId,
		    winnerId = _ref7.winnerId,
		    loserId = _ref7.loserId;

		var promises = [(0, _user.addWin)(winnerId), (0, _user.addLoss)(loserId), (0, _room.db_restartRoomGame)({ roomId: roomId })];

		return new Promise(function (resolve, reject) {
			Promise.all(promises).then(function (data) {
				resolve(data);
			}).catch(function (err) {
				reject(err);
			});
		});
	}
};