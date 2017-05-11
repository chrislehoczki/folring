'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = getUser;
exports.addWin = addWin;
exports.addLoss = addLoss;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// gets single user from db
function getUser(req, res) {

  _user2.default.findOne({ _id: req.user._id }, { password: 0 }).populate('ownedRooms playingRooms').exec(function (err, userDoc) {
    if (err) {
      res.send({ error: true });
      return;
    };
    res.send(userDoc);
  });
}

function addWin(_id) {
  return new Promise(function (resolve, reject) {

    _user2.default.findOneAndUpdate({ _id: _id }, { $inc: { wins: 1, games: 1 } }, { new: true }).populate('ownedRooms playingRooms').exec(function (err, userDoc) {
      if (err) {
        reject(err);
        return;
      };
      resolve(userDoc);
    });
  });
}

function addLoss(_id) {
  return new Promise(function (resolve, reject) {

    _user2.default.findOneAndUpdate({ _id: _id }, { $inc: { losses: 1, games: 1 } }, { new: true }).populate('ownedRooms playingRooms').exec(function (err, userDoc) {
      if (err) {
        reject(err);
        return;
      };
      resolve(userDoc);
    });
  });
}