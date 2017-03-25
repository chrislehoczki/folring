function socket(server, app) {

	app.io = require('socket.io')(server);
	
	const rooms = {};

	for (var i = 0; i < 5; i++) {

		rooms[`room_${i+1}`] = {
			name: `room_${i+1}`,
			messages: [],
			game: [],
			players: [],
			spectators: []
		}

	}

	// handle incoming connections from clients
	app.io.on('connection', function(socket) {

		var currentRoomId = null;

		socket.on('message', function(message) {
			console.log('MESSAGE', message)
			console.log('CURRENT ROOM', currentRoomId)
			if (currentRoomId) {
				rooms[currentRoomId].messages.push(message);
			
				app.io.to(currentRoomId).emit('message', message);
			}
			
		});

		socket.on('join_room', function(config) {
			console.log('CONFIG', config)
			const room = config.room;
			const user = config.user;
			if (!room) {
				return;
			}
			if(currentRoomId) {
				socket.leave(currentRoomId);
	    		// socket.room = rooms[room];
			}
	       		
	    	socket.join(rooms[room].name);
	    	currentRoomId = rooms[room].name;
	    	const { sockets, length } = app.io.sockets.adapter.rooms[room];

	    	// add client to room
	    	rooms[room].players.push(user); 

	    	app.io.to(currentRoomId).emit('update_room', {room: rooms[room]});
		});

		socket.on('leave_room', function(config) {
			console.log('leaving room now', config)
			if (!config) {
				return;
			}
			const room = config.room;
			const user = config.user;

			if(!room) {
				socket.leave(currentRoomId);
				
				const currentPlayers = rooms[currentRoomId].players;
				const index = currentPlayers.findIndex((player) => player === player);
				const newPlayers = [...currentPlayers.slice(0, index), ...currentPlayers.slice(index + 1)];
				
				rooms[currentRoomId].players = newPlayers;
				console.log(rooms);
			} else {
				socket.leave(room);
			}



		});

		socket.on('update_room', function(config) {
			console.log("UPDATING STATE ON SERVER", config)
			rooms[currentRoomId].game = {...rooms[currentRoomId].game, ...config};
			console.log('CURRENT ROOM', rooms[currentRoomId])
			console.log(rooms);
			app.io.to(currentRoomId).emit('update_room', {room: rooms[currentRoomId]});
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