function socket(server) {

	var io = require('socket.io')(server);

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
	io.on('connection', function(socket) {

		var currentRoomId = null;

		socket.on('message', function(message) {
			console.log('MESSAGE', message)
			console.log('CURRENT ROOM', currentRoomId)
			if (currentRoomId) {
				rooms[currentRoomId].messages.push(message);
			
				io.to(currentRoomId).emit('message', message);
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
	    	const { sockets, length } = io.sockets.adapter.rooms[room];

	    	// add client to room
	    	rooms[room].players.push(user); 

	    	console.log('ROOM OBJ', rooms)
	    	console.log('clients length', length)
	    	console.log('clients', sockets)
	    	
		});

		socket.on('leave_room', function(config) {
			const room = config.room;
			const user = config.user;

			if(!room) {
				socket.leave(currentRoomId);
				const index = rooms[currentRoomId].users.find((user) => user === user);
				console.log("index", index)
			} else {
				socket.leave(room);
			}



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