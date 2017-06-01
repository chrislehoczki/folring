'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _user_reducer = require('./user_reducer');

var _user_reducer2 = _interopRequireDefault(_user_reducer);

var _ui_reducer = require('./ui_reducer');

var _ui_reducer2 = _interopRequireDefault(_ui_reducer);

var _main_room_reducer = require('./main_room_reducer');

var _main_room_reducer2 = _interopRequireDefault(_main_room_reducer);

var _current_room_reducer = require('./current_room_reducer');

var _current_room_reducer2 = _interopRequireDefault(_current_room_reducer);

var _notification_reducer = require('./notification_reducer');

var _notification_reducer2 = _interopRequireDefault(_notification_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  routing: _reactRouterRedux.routerReducer,
  user: _user_reducer2.default,
  ui: _ui_reducer2.default,
  mainRooms: _main_room_reducer2.default,
  currentRoom: _current_room_reducer2.default,
  notification: _notification_reducer2.default
});

exports.default = rootReducer;