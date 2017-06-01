'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _new_game = require('../../client/js/helpers/new_game');

var _new_game2 = _interopRequireDefault(_new_game);

var _win_game = require('../../client/js/helpers/win_game');

var _win_game2 = _interopRequireDefault(_win_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our model
var roomSchema = new Schema({
  name: String,
  creator: { type: Schema.Types.ObjectId, ref: 'user' },
  messages: Array,
  game: { type: Object, default: _win_game2.default },
  players: {
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    validate: [playerLimit, '{PATH} exceeds the limit of 2']
  },
  spectators: [{ type: Schema.Types.ObjectId, ref: 'user' }]
}, {
  timestamps: true,
  minimize: false
});

function playerLimit(val) {
  return val.length <= 2;
}

roomSchema.pre('save', function (next) {
  _user2.default.findOneAndUpdate({
    _id: this.creator
  }, {
    $push: { ownedRooms: this._id }
  }, {
    new: true
  }, function (err, user) {
    if (err) {
      next(new Error('Error adding room to user'));
      return;
    }
    next();
  });
});

roomSchema.pre('remove', function (next) {

  _user2.default.findOneAndUpdate({ _id: this.creator }, {
    $pull: { ownedRooms: this._id }
  }, {
    new: true
  }).exec(function (err, user) {
    if (err) {
      next(new Error('Error removing room from user'));
      return;
    };
    console.log('USER WITH REMOVED', user);
    next();
  });
});

// Create the model class
var ModelClass = mongoose.model('room', roomSchema);

// Export the model
exports.default = ModelClass;