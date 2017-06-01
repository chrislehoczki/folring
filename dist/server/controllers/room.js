'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRoom = addRoom;
exports.getRoom = getRoom;
exports.deleteRoom = deleteRoom;
exports.getRooms = getRooms;
exports.db_joinRoom = db_joinRoom;
exports.db_leaveRoom = db_leaveRoom;
exports.db_updateRoomGame = db_updateRoomGame;
exports.db_restartRoomGame = db_restartRoomGame;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _room = require('../models/room');

var _room2 = _interopRequireDefault(_room);

var _new_game = require('../../client/js/helpers/new_game');

var _new_game2 = _interopRequireDefault(_new_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addRoom(req, res) {
  var roomName = req.body.roomName;
  var _id = req.user._id;

  var newRoom = new _room2.default({ name: roomName, creator: _id });

  newRoom.save(function (err, room) {

    if (err) {
      res.status(500).send({ error: 'Error making room' });
      return;
    }

    res.send({ _id: room._id, name: room.name });
  });
}

function getRoom(req, res) {

  _room2.default.findOne({ _id: req.params.roomId }).populate('players spectators', { "facebook.displayName": 1, username: 1, _id: 1 }).exec(function (err, room) {
    if (err) {
      res.send({ error: 'Error getting room' });
      return;
    };
    res.send(room);
  });
}

function deleteRoom(req, res) {

  _room2.default.findOne({ _id: req.params.roomId })
  // .populate('owner', { name: 1, _id: 1 })
  .exec(function (err, room) {
    if (err) {
      res.send({ error: 'Error deleting room' });
      return;
    };

    if (!room) {
      res.send({ error: 'could not find room to remove' });
    }

    room.remove(function (err, removed) {
      if (err) {
        res.send({ error: 'error deleting room' });
      }
      res.send({ roomId: removed._id });
    });
  });
}

function getRooms(req, res) {

  _room2.default.find({}).exec(function (err, rooms) {
    if (err) {
      res.send({ error: 'Error listing rooms' });
      return;
    };
    res.send(rooms);
  });
}

function db_joinRoom(_ref) {
  var userId = _ref.userId,
      role = _ref.role,
      roomId = _ref.roomId;


  return new Promise(function (resolve, reject) {

    var modifier = void 0;
    if (role === 'player') {
      modifier = { $addToSet: { players: userId } };
    } else {
      modifier = { $addToSet: { specators: userId } };
    }

    _room2.default.findOneAndUpdate({ _id: roomId }, modifier, { new: true }).populate('players spectators', { "facebook.displayName": 1, username: 1, _id: 1 }).exec(function (err, room) {
      if (err) {
        console.log(err);
        reject({ error: 'Error getting room' });
      };

      _user2.default.findOneAndUpdate({ _id: userId }, { $addToSet: { playingRooms: roomId } }, { new: true }).populate('playingRooms').exec(function (err, user) {

        if (err) {
          console.log(err);
          reject({ error: 'error updating user playing rooms' });
        };

        resolve({ room: room, user: user });
      });
    });
  });
}

function db_leaveRoom(_ref2) {
  var userId = _ref2.userId,
      role = _ref2.role,
      roomId = _ref2.roomId;


  return new Promise(function (resolve, reject) {

    var modifier = void 0;
    if (role === 'player') {
      modifier = { $pull: { players: userId }, $set: { game: _new_game2.default } };
    } else {
      modifier = { $pull: { specators: userId } };
    }

    _room2.default.findOneAndUpdate({ _id: roomId }, modifier, { new: true }).populate('players spectators', { "facebook.displayName": 1, username: 1, _id: 1 }).exec(function (err, room) {
      if (err) {
        console.log(err);
        reject({ error: 'Error getting room' });
      };

      _user2.default.findOneAndUpdate({ _id: userId }, { $pull: { playingRooms: roomId } }, { new: true }).populate('playingRooms').exec(function (err, user) {

        if (err) {
          console.log(err);
          reject({ error: 'error updating user playing rooms' });
        };

        resolve({ room: room, user: user });
      });
    });
  });
}

function db_updateRoomGame(_ref3) {
  var userId = _ref3.userId,
      roomId = _ref3.roomId,
      game = _ref3.game;

  console.log('roomId', roomId, 'game', game);
  return new Promise(function (resolve, reject) {

    var modifier = { game: game.game };

    _room2.default.findOneAndUpdate({ _id: roomId }, modifier, { new: true }).populate('players spectators', { "facebook.displayName": 1, username: 1, _id: 1 }).exec(function (err, room) {
      if (err) {
        console.log(err);
        reject({ error: 'Error getting room' });
      };
      console.log(room);
      resolve(room);
    });
  });
}

function db_restartRoomGame(_ref4) {
  var roomId = _ref4.roomId;

  return new Promise(function (resolve, reject) {

    var modifier = { game: _new_game2.default };

    _room2.default.findOneAndUpdate({ _id: roomId }, modifier, { new: true }).populate('players spectators', { "facebook.displayName": 1, username: 1, _id: 1 }).exec(function (err, room) {
      if (err) {
        console.log(err);
        reject({ error: 'Error getting room' });
      };
      resolve(room);
    });
  });
}