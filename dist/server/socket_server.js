'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function socket(server) {

	var io = require('socket.io')(server);

	var rooms = {};

	for (var i = 0; i < 5; i++) {

		rooms['room_' + (i + 1)] = {
			name: 'room_' + (i + 1),
			messages: [],
			game: [],
			players: [],
			spectators: []
		};
	}

	// handle incoming connections from clients
	io.on('connection', function (socket) {

		var currentRoomId = null;

		socket.on('message', function (message) {
			console.log('MESSAGE', message);
			console.log('CURRENT ROOM', currentRoomId);
			if (currentRoomId) {
				rooms[currentRoomId].messages.push(message);

				io.to(currentRoomId).emit('message', message);
			}
		});

		socket.on('join_room', function (config) {
			console.log('CONFIG', config);
			var room = config.room;
			var user = config.user;
			if (!room) {
				return;
			}
			if (currentRoomId) {
				socket.leave(currentRoomId);
				// socket.room = rooms[room];
			}

			socket.join(rooms[room].name);
			currentRoomId = rooms[room].name;
			var _io$sockets$adapter$r = io.sockets.adapter.rooms[room],
			    sockets = _io$sockets$adapter$r.sockets,
			    length = _io$sockets$adapter$r.length;

			// add client to room

			rooms[room].players.push(user);

			io.to(currentRoomId).emit('update_room', { room: rooms[room] });
		});

		socket.on('leave_room', function (config) {
			console.log('leaving room now', config);
			if (!config) {
				return;
			}
			var room = config.room;
			var user = config.user;

			if (!room) {
				socket.leave(currentRoomId);

				var currentPlayers = rooms[currentRoomId].players;
				var index = currentPlayers.findIndex(function (player) {
					return player === player;
				});
				var newPlayers = [].concat(_toConsumableArray(currentPlayers.slice(0, index)), _toConsumableArray(currentPlayers.slice(index + 1)));

				rooms[currentRoomId].players = newPlayers;
				console.log(rooms);
			} else {
				socket.leave(room);
			}
		});

		socket.on('update_room', function (config) {
			console.log("UPDATING STATE ON SERVER", config);
			rooms[currentRoomId].game = _extends({}, rooms[currentRoomId].game, config);
			console.log('CURRENT ROOM', rooms[currentRoomId]);
			console.log(rooms);
			io.to(currentRoomId).emit('update_room', { room: rooms[currentRoomId] });
		});

		// once a client has connected, we expect to get a ping from them saying what room they want to join
		// socket.on('room', function(roomNo) {
		// 	room = roomNo;
		// 	// hard coded as room 1 for now
		//     socket.join(room);
		// });

		// io.sockets.in(room).emit('message', 'what is going on, party people?');

		//   socket.on('my other event', function (data) {
		//   	console.log(data);
		// });
	});

	// now, it's easy to send a message to just the clients in a given room

}

// leaving room 
// socket.on('room', function(room){
//     if(socket.room)
//         socket.leave(socket.room);

//     socket.room = room;
//     socket.join(room);
// });

module.exports = socket;