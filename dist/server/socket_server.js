'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(userObject) {
  _classCallCheck(this, User);

  console.log('USER OBJECT', userObject);
  this.username = userObject.username;
  this.id = Date.now();
  this.currentRoom = null;
  this.spectatedRooms = [];
  console.log('OUTPUT', this);
};

var Folring = function () {
  function Folring(server) {
    var _this = this;

    _classCallCheck(this, Folring);

    // setup sockets
    var options = {
      'transports': ['websockets']
    };
    this.io = require('socket.io', options)(server);

    // setup rooms
    var rooms = {};
    for (var i = 0; i < 10; i++) {
      rooms['room_' + (i + 1)] = {
        id: 'room_' + (i + 1),
        messages: [],
        game: [],
        players: [],
        spectators: []
      };
    }
    this.rooms = rooms;

    // setup users
    this.users = [];

    this.io.on('connection', function (socket) {

      socket.on('connection', function (user) {
        return _this.establishConnection(socket, user);
      });

      socket.on('join_room', function (config) {
        return _this.joinRoom(socket, config);
      });

      socket.on('leave_room', function (config) {
        return _this.leaveRoom(socket, config);
      });

      socket.on('spectate_room', function (config) {
        return _this.spectateRoom(socket, config);
      });

      socket.on('unspectate_room', function (config) {
        return _this.unSpectateRoom(socket, config);
      });

      socket.on('update_room', function (roomConfig, user) {
        return _this.updateGame(roomConfig, user);
      });

      socket.on('message', function (message, user) {
        return _this.sendMessage(message, user);
      });
    });
  }

  _createClass(Folring, [{
    key: 'spectateRoom',
    value: function spectateRoom(socket, config) {
      console.log('SPECTATING ROOM', config);
      var room = config.room;
      var user = config.user;
      if (!room) {
        return;
      }

      socket.join(this.rooms[room].id);

      // update user
      this.addSpectatorToRoom(this.rooms[room].id, user.id);

      var _io$sockets$adapter$r = this.io.sockets.adapter.rooms[room],
          sockets = _io$sockets$adapter$r.sockets,
          length = _io$sockets$adapter$r.length;

      console.log('UPDATED ROOM', this.rooms[room]);
      this.io.emit('update_room', this.rooms[room]);
    }
  }, {
    key: 'unSpectateRoom',
    value: function unSpectateRoom(socket, config) {
      var room = config.roomId;
      var user = config.user;

      console.log("REMOVING SPECATORS", config);
      // update socket
      socket.leave(room);

      // remove here
      this.removeSpectatorFromRoom(room, user.id);

      console.log('updated room', this.rooms[room]);
      // send back to client
      this.io.emit('update_room', this.rooms[room]);
    }
  }, {
    key: 'updateGame',
    value: function updateGame(roomConfig, user) {
      var currentRoom = this.getUser(user.id).currentRoom;
      console.log('CURRENT ROOM', currentRoom);
      console.log('ROOM CONFIG', roomConfig);
      this.updateRoom(currentRoom, _extends({}, this.rooms[currentRoom], roomConfig));
      console.log('UPDATED ROOM', this.rooms[currentRoom]);
      // this.rooms[currentRoom].game = {...this.rooms[currentRoom].game, ...room};
      // console.log('updated game', this.rooms[currentRoom])
      this.io.emit('update_room', this.rooms[currentRoom]);
    }
  }, {
    key: 'establishConnection',
    value: function establishConnection(socket, user) {
      // make and store our user
      var newUser = new User(user);

      this.users.push(newUser);

      console.log(this.rooms);
      console.log('USERS', this.users);

      // emit data to client
      this.io.emit('send_all_rooms', this.rooms);
      socket.emit('user', newUser);
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(message, user) {

      var currentRoom = this.getUser(user.id).currentRoom;

      var currentMessages = this.rooms[currentRoom].messages;
      var composedMessage = { id: user.id, message: message };
      var newMessages = [].concat(_toConsumableArray(currentMessages), [composedMessage]);

      this.updateRoom(currentRoom, { messages: newMessages });

      this.io.to(currentRoom).emit('message', composedMessage);
    }
  }, {
    key: 'leaveRoom',
    value: function leaveRoom(socket, config) {
      var room = config.room;
      var user = config.user;

      var currentRoom = this.getUser(user.id).currentRoom;
      console.log('CURRENT ROOM', currentRoom);
      // update socket
      socket.leave(currentRoom);

      // remove here
      this.removePlayerFromRoom(currentRoom, user.id);

      // send back to client
      this.io.emit('update_room', this.rooms[currentRoom]);
    }
  }, {
    key: 'joinRoom',
    value: function joinRoom(socket, config) {
      console.log('JOINING ROOM');
      var room = config.room;
      var user = config.user;
      if (!room) {
        return;
      }

      var currentRoom = this.getUser(user.id).currentRoom;

      // update socket
      if (currentRoom) {
        this.socket.leave(currentRoom);
        this.removePlayerFromRoom(currentRoom, user.id);
      }
      socket.join(this.rooms[room].id);

      // update user
      this.addPlayerToRoom(this.rooms[room].id, user.id);

      var _io$sockets$adapter$r2 = this.io.sockets.adapter.rooms[room],
          sockets = _io$sockets$adapter$r2.sockets,
          length = _io$sockets$adapter$r2.length;

      console.log(this.rooms[room]);
      this.io.emit('update_room', this.rooms[room]);
    }
  }, {
    key: 'getRoom',
    value: function getRoom(roomId) {
      return _extends({}, this.rooms[roomId]);
    }
  }, {
    key: 'addRoom',
    value: function addRoom() {}
  }, {
    key: 'removeRoom',
    value: function removeRoom() {}
  }, {
    key: 'updateRoom',
    value: function updateRoom(roomId, updateConfig) {
      var newRoom = _extends({}, this.getRoom(roomId), updateConfig);
      var newRooms = _extends({}, this.rooms);
      newRooms[roomId] = newRoom;

      this.rooms = newRooms;
    }
  }, {
    key: 'addSpectatorToRoom',
    value: function addSpectatorToRoom(roomId, userId) {
      var user = this.getUser(userId);
      var newSpectators = [].concat(_toConsumableArray(this.rooms[roomId].spectators), [user]);
      this.updateRoom(roomId, { spectators: newSpectators });
      this.updateUser(userId, { spectatedRooms: [].concat(_toConsumableArray(user.spectatedRooms), [roomId]) });
    }
  }, {
    key: 'removeSpectatorFromRoom',
    value: function removeSpectatorFromRoom(roomId, userId) {
      var index = this.rooms[roomId].spectators.findIndex(function (user) {
        return user.id === userId;
      });
      var newSpectators = [].concat(_toConsumableArray(this.rooms[roomId].spectators.slice(0, index)), _toConsumableArray(this.rooms[roomId].spectators.slice(index + 1)));
      this.updateRoom(roomId, { spectators: newSpectators });

      var spectatedRooms = [].concat(_toConsumableArray(this.getUser(userId).spectatedRooms));
      var roomIndex = spectatedRooms.findIndex(function (id) {
        return id === roomId;
      });
      var newSpectatedRooms = [].concat(_toConsumableArray(spectatedRooms.slice(0, roomIndex)), _toConsumableArray(spectatedRooms.slice(roomIndex + 1)));
      this.updateUser(userId, { spectatedRooms: newSpectatedRooms });
    }
  }, {
    key: 'addPlayerToRoom',
    value: function addPlayerToRoom(roomId, userId) {
      var index = this.rooms[roomId].players.findIndex(function (user) {
        return user.id === userId;
      });
      var user = this.getUser(userId);

      var newPlayers = [].concat(_toConsumableArray(this.rooms[roomId].players));
      newPlayers.push(user);

      // const newPlayers = [...this.rooms[roomId].players.slice(0, index), user, ...this.rooms[roomId].players.slice(index + 1)];
      this.updateRoom(roomId, { players: newPlayers });
      this.updateUser(userId, { currentRoom: roomId });
    }
  }, {
    key: 'removePlayerFromRoom',
    value: function removePlayerFromRoom(roomId, userId) {
      console.log('ROOM ID', roomId);
      console.log('USER ID', userId);
      var index = this.rooms[roomId].players.findIndex(function (user) {
        return user.id === userId;
      });
      var newPlayers = [].concat(_toConsumableArray(this.rooms[roomId].players.slice(0, index)), _toConsumableArray(this.rooms[roomId].players.slice(index + 1)));
      this.updateRoom(roomId, { players: newPlayers });
      this.updateUser(userId, { currentRoom: null });
    }
  }, {
    key: 'getUser',
    value: function getUser(userId) {
      return this.users.find(function (user) {
        return user.id === userId;
      });
    }
  }, {
    key: 'removeUser',
    value: function removeUser(userId) {
      var index = this.users.findIndex(function (user) {
        return user.id === userId;
      });
      this.users = [].concat(_toConsumableArray(this.users.slice(0, index)), _toConsumableArray(this.user.slice(index + 1)));
    }
  }, {
    key: 'updateUser',
    value: function updateUser(userId, updateConfig) {
      var index = this.users.findIndex(function (user) {
        return user.id === userId;
      });
      var newUser = _extends({}, this.users[index], updateConfig);
      this.users = [].concat(_toConsumableArray(this.users.slice(0, index)), [newUser], _toConsumableArray(this.users.slice(index + 1)));
    }
  }]);

  return Folring;
}();

module.exports = Folring;