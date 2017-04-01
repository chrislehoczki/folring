
class User {
	constructor(userObject) {
		console.log('USER OBJECT', userObject)
		this.username = userObject.username;
		this.id = Date.now();
		this.currentRoom = null;
		console.log('OUTPUT', this)
	}
}

class Folring {
    constructor(server) {

    	// setup sockets
        const options = {
			'transports': ['websockets']
		}
		this.io = require('socket.io', options)(server);

		// setup rooms
		const rooms = {};
		for (var i = 0; i < 5; i++) {
			rooms[`room_${i+1}`] = {
				id: `room_${i+1}`,
				messages: [],
				game: [],
				players: [],
				spectators: []
			}
		}
		this.rooms = rooms;

		// setup users
		this.users = [];


		this.io.on('connection', (socket) => {

			socket.on('connection', (user) => this.establishConnection(socket, user));
			
			socket.on('join_room', (config) => this.joinRoom(socket, config));

			socket.on('leave_room', (config) => this.leaveRoom(socket, config));

			socket.on('update_room', (roomConfig, user) => this.updateGame(roomConfig, user))

			socket.on('message', (message, user) => this.sendMessage(message, user));

            socket.on('spectate_room', (config) => this.spectateRoom(socket, config));
		
		});

    }


    spectateRoom(config) {
        console.log('SPECTATING ROOM')
        const room = config.room;
        const user = config.user;
        if (!room) {
            return;
        }

        socket.join(this.rooms[room].id);
        
        // update user
        this.addPlayerToRoom(this.rooms[room].id, user.id);

        const { sockets, length } = this.io.sockets.adapter.rooms[room];
        console.log(this.rooms[room])
        this.io.emit('update_room', this.rooms[room]);
    }

    updateGame(roomConfig, user) {
		const currentRoom = this.getUser(user.id).currentRoom;
		console.log('CURRENT ROOM', currentRoom);
		console.log('ROOM CONFIG', roomConfig)
		this.updateRoom(currentRoom, { ...this.rooms[currentRoom], ...roomConfig })
		console.log('UPDATED ROOM', this.rooms[currentRoom])
		// this.rooms[currentRoom].game = {...this.rooms[currentRoom].game, ...room};
		// console.log('updated game', this.rooms[currentRoom])
		this.io.emit('update_room', this.rooms[currentRoom]);
    }

    establishConnection(socket, user) {
		// make and store our user
		const newUser = new User(user);

		this.users.push(newUser);

		console.log(this.rooms);
		console.log('USERS', this.users);

		// emit data to client
		this.io.emit('send_all_rooms', this.rooms);
		socket.emit('user', newUser);
    }

    sendMessage(message, user) {

    	const currentRoom = this.getUser(user.id).currentRoom;

    	const currentMessages = this.rooms[currentRoom].messages;
    	const composedMessage = { id: user.id, message }
    	const newMessages = [...currentMessages, composedMessage ];

    	this.updateRoom(currentRoom, {messages: newMessages});

    	this.io.to(currentRoom).emit('message', composedMessage);

    }

    leaveRoom(socket, config) {
    	const room = config.room;
		const user = config.user;

		const currentRoom = this.getUser(user.id).currentRoom;
		console.log('CURRENT ROOM', currentRoom)
		// update socket
		socket.leave(currentRoom);

		// remove here
		this.removePlayerFromRoom(currentRoom, user.id);

		// send back to client
		this.io.emit('update_room', this.rooms[currentRoom]);
    }

    joinRoom(socket, config) {
    	console.log('JOINING ROOM')
		const room = config.room;
		const user = config.user;
		if (!room) {
			return;
		}

		const currentRoom = this.getUser(user.id).currentRoom;

		// update socket
		if (currentRoom) {
			this.socket.leave(currentRoom);
			this.removePlayerFromRoom(currentRoom, user.id);
		}
    	socket.join(this.rooms[room].id);
    	
    	// update user
    	this.addPlayerToRoom(this.rooms[room].id, user.id);

    	const { sockets, length } = this.io.sockets.adapter.rooms[room];
    	console.log(this.rooms[room])
    	this.io.emit('update_room', this.rooms[room]);
    }

    getRoom(roomId)  {
    	return { ...this.rooms[roomId] };
    }

    addRoom() {

    }

    removeRoom() {

    }

    updateRoom(roomId, updateConfig) {
    	const newRoom = { ...this.getRoom(roomId), ...updateConfig };
    	const newRooms = { ...this.rooms };
    	newRooms[roomId] = newRoom;

    	this.rooms = newRooms;
    }

    addSpectatorToRoom(roomId, userId) {
        const index = this.rooms[roomId].spectators.findIndex((user) => user.id === userId);
        const user = this.getUser(userId);
        const newSpectators = [...this.rooms[roomId].players.slice(0, index), user, ...this.rooms[roomId].players.slice(index + 1)];
        this.updateRoom(roomId, {spectators: newSpectators})
        this.updateUser(userId, {currentRoom: roomId})
    }



    addPlayerToRoom(roomId, userId) {
    	const index = this.rooms[roomId].players.findIndex((user) => user.id === userId);
    	const user = this.getUser(userId);
    	const newPlayers = [...this.rooms[roomId].players.slice(0, index), user, ...this.rooms[roomId].players.slice(index + 1)];
    	this.updateRoom(roomId, {players: newPlayers})
    	this.updateUser(userId, {currentRoom: roomId})
    }

    removePlayerFromRoom(roomId, userId) {
    	console.log('ROOM ID', roomId)
    	console.log('USER ID', userId)
    	const index = this.rooms[roomId].players.findIndex((user) => user.id === userId);
    	const newPlayers = [...this.rooms[roomId].players.slice(0, index), ...this.rooms[roomId].players.slice(index + 1)];
    	this.updateRoom(roomId, {players: newPlayers})
    	this.updateUser(userId, {currentRoom: null})
    }

    getUser(userId) {
    	return this.users.find((user) => user.id === userId);
    }

    removeUser(userId) {
    	const index = this.users.findIndex((user) => user.id === userId);
    	this.users = [...this.users.slice(0, index), ...this.user.slice(index + 1)];
    }

    updateUser(userId, updateConfig) {
    	const index = this.users.findIndex((user) => user.id === userId);
    	const newUser = {...this.users[index],
    		...updateConfig
    	}
    	this.users = [...this.users.slice(0, index), newUser, ...this.users.slice(index + 1)];
    }
    
}


module.exports = Folring;