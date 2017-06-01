'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var action = arguments[1];


	switch (action.type) {
		case _types.LOAD_USER:
			return action.payload;
			break;
		case _types.ADD_USER_ROOM:
			return _extends({}, state, { ownedRooms: [].concat(_toConsumableArray(state.ownedRooms), [action.payload]) });
			break;
		case _types.DELETE_USER_ROOM:
			var deleteRoomIndex = state.ownedRooms.findIndex(function (room) {
				return room._id === action.payload;
			});
			console.log('index', deleteRoomIndex);
			return _extends({}, state, { ownedRooms: [].concat(_toConsumableArray(state.ownedRooms.slice(0, deleteRoomIndex)), _toConsumableArray(state.ownedRooms.slice(deleteRoomIndex + 1))) });
	}

	return state;
};

var _types = require('../actions/types');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }